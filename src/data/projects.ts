export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  challenge: string;
  approach: string;
  architecture: string[];
  outputs: string[];
  stack: string[];
  repository?: string;
};

export const projects: Project[] = [
  {
    slug: "security-hub",
    index: "01",
    title: "CMPC Security Hub",
    category: "Defender platform",
    status: "Active build",
    summary:
      "A focused workspace for repeatable security checks, enrichment, tracking, and defensive research.",
    challenge:
      "Small defensive workflows are often scattered across scripts, browser tabs, and one-off reports. The project explores how to bring them into one coherent workspace without creating another oversized enterprise platform.",
    approach:
      "A modular registry keeps each capability isolated while a shared interface, job queue, and result model make the workflows consistent. Every module is designed to produce a reviewable output rather than a black-box verdict.",
    architecture: [
      "Module registry and unified web interface",
      "API services for scans and enrichment",
      "Queued jobs for longer-running checks",
      "Structured results, history, and access control",
    ],
    outputs: [
      "Security header reviews",
      "IOC and URL enrichment",
      "CVE watchlists",
      "Honeypot event views",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "React"],
  },
  {
    slug: "honeypot-lab",
    index: "02",
    title: "IT / OT Honeypot Lab",
    category: "Research system",
    status: "Active research",
    summary:
      "A containerized, multi-protocol lab that turns hostile sessions into structured research evidence.",
    challenge:
      "Raw honeypot logs show activity but rarely explain the full sequence behind it. The project needs to preserve sessions across enterprise and industrial protocol surfaces while keeping the environment isolated and reproducible.",
    approach:
      "Each exposed service records protocol-specific interactions into a shared event model. Sessions are correlated, enriched, and presented as timelines so individual actions remain traceable to the original evidence.",
    architecture: [
      "Isolated protocol services",
      "Session and payload capture",
      "Normalization and correlation pipeline",
      "Research dashboard and report output",
    ],
    outputs: [
      "Session timelines",
      "Behavior clusters",
      "Source and payload context",
      "Detection-ready observations",
    ],
    stack: ["Python", "Docker", "PostgreSQL", "OpenSearch", "Grafana"],
  },
  {
    slug: "detection-replay",
    index: "03",
    title: "Detection Replay Lab",
    category: "Validation toolkit",
    status: "Prototype",
    summary:
      "A repeatable way to test detection logic against representative telemetry before production use.",
    challenge:
      "A valid query can still remain silent when source fields, parsers, or event formats differ from its assumptions. Manual verification is slow and difficult to repeat after a rule or parser changes.",
    approach:
      "Versioned telemetry fixtures are replayed through a controlled pipeline. The runner compares expected and observed detections, then surfaces mismatches as an inspectable regression report.",
    architecture: [
      "Versioned telemetry fixtures",
      "Controlled replay runner",
      "Detection execution and result capture",
      "Expected-versus-observed report",
    ],
    outputs: [
      "Regression runs",
      "Silent-rule findings",
      "Field-mapping gaps",
      "Coverage evidence",
    ],
    stack: ["Python", "Splunk", "Docker", "XML Event Logs", "pytest"],
  },
  {
    slug: "local-sentinel",
    index: "04",
    title: "Local LLM Sentinel",
    category: "Desktop agent",
    status: "Concept build",
    summary:
      "A local-first monitoring concept that explains unusual desktop activity without exporting raw telemetry.",
    challenge:
      "Desktop activity can be noisy and sensitive. Sending raw telemetry to a remote model creates privacy and operational concerns, while simple rules often lack enough context to explain a sequence.",
    approach:
      "Collection, filtering, event grouping, and model analysis stay on the device. The result is a concise explanation linked back to the local evidence a person can inspect before acting.",
    architecture: [
      "Local event collectors",
      "On-device filtering and grouping",
      "Local model analysis",
      "Human-readable activity review",
    ],
    outputs: [
      "Activity summaries",
      "Grouped event context",
      "Reviewable explanations",
      "Local evidence retention",
    ],
    stack: ["Python", "Local LLM", "SQLite", "Desktop UI"],
  },
  {
    slug: "osint-graph",
    index: "05",
    title: "OSINT Influence Graph",
    category: "Research toolkit",
    status: "Research",
    summary:
      "A relationship-mapping workflow for reviewing coordinated public activity with evidence behind every link.",
    challenge:
      "Shared timing, language, or infrastructure can suggest coordination, but a graph without evidence is easy to overinterpret. Findings must remain explainable and auditable.",
    approach:
      "Public signals are normalized into entities and observations, then scored using transparent rules. Each relationship retains its supporting evidence and can be reviewed outside the collection environment.",
    architecture: [
      "Public-source collection",
      "Entity and signal normalization",
      "Relationship scoring",
      "Graph and HTML report generation",
    ],
    outputs: [
      "Relationship graphs",
      "Evidence-linked findings",
      "Activity timelines",
      "Portable HTML reports",
    ],
    stack: ["Python", "NetworkX", "SQLite", "HTML reports"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
