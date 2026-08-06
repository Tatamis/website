import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve("dist");
const requiredFiles = [
  "index.html",
  "404.html",
  "projects/index.html",
  "projects/security-hub/index.html",
  "projects/honeypot-lab/index.html",
  "projects/detection-replay/index.html",
  "projects/local-sentinel/index.html",
  "projects/osint-graph/index.html",
  "lab/index.html",
  "contact/index.html",
  "privacy/index.html",
  "contact.js",
  "_headers",
  "sitemap.xml",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    throw new Error(`Missing build artifact: ${file}`);
  }
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const htmlFiles = walk(root).filter((file) => extname(file) === ".html");

function routeExists(href) {
  const pathname = new URL(href, "https://cmpc.ro").pathname;
  if (pathname === "/") return existsSync(join(root, "index.html"));

  const directFile = join(root, pathname.slice(1));
  return existsSync(directFile) || existsSync(join(directFile, "index.html"));
}

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, "utf8");
  const internalLinks = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((match) => match[1]);

  for (const href of internalLinks) {
    if (!routeExists(href)) {
      throw new Error(`Broken internal link in ${htmlFile}: ${href}`);
    }
  }
}

const contactHtml = readFileSync(join(root, "contact/index.html"), "utf8");
if (!contactHtml.includes("https://formsubmit.co/ajax/hello@cmpc.ro")) {
  throw new Error("Contact form endpoint is missing from the build");
}
if (!contactHtml.includes('src="/contact.js"')) {
  throw new Error("External contact script is missing from the build");
}
if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(contactHtml)) {
  throw new Error("Unexpected inline script conflicts with the Content Security Policy");
}

const headers = readFileSync(join(root, "_headers"), "utf8");
for (const header of ["Content-Security-Policy", "X-Content-Type-Options", "Permissions-Policy"]) {
  if (!headers.includes(header)) throw new Error(`Missing security header: ${header}`);
}

console.log(`Validated ${htmlFiles.length} static pages and ${requiredFiles.length} required artifacts.`);
