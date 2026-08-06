# Publicarea proiectului CMPC pe Cloudflare Pages

Acest proiect este complet static. Cloudflare construiește fișierele Astro și publică folderul `dist`. Nu este nevoie de adaptor Cloudflare, Pages Functions, bază de date sau server propriu.

## 1. Ce trebuie personalizat înainte

Deschide `src/config.ts` și verifică:

- `email`: adresa care primește mesajele din formular;
- `formEndpoint`: aceeași adresă introdusă în URL-ul FormSubmit;
- `githubProfile`: profilul GitHub, dacă vrei să apară în footer;
- `url`: păstrează `https://cmpc.ro`.

Proiectele se modifică într-un singur loc: `src/data/projects.ts`. Pentru un link GitHub direct, completează câmpul opțional `repository` în proiectul respectiv.

## 2. Testare locală

Ai nevoie de Node.js 22.12 sau mai nou.

```bash
npm install
npm run dev
```

Deschide adresa afișată în terminal. Pentru verificarea versiunii finale:

```bash
npm run check
npm run build
npm run preview
```

Buildul final trebuie să existe în folderul `dist`.

## 3. Înlocuiește starterul care rulează acum pe cmpc.ro

`cmpc.ro` rulează deja starterul standard Astro Blog. Cel mai probabil proiectul Cloudflare Pages este conectat la un repository GitHub. Păstrează proiectul Cloudflare și domeniul existente; înlocuiește doar fișierele starterului din repository cu fișierele din această arhivă.

În folderul repository-ului existent:

```bash
git add .
git commit -m "Replace Astro starter with CMPC portfolio"
git push
```

Cloudflare Pages va porni automat un build după `git push`.

## 4. Setările corecte în Cloudflare Pages

În Cloudflare Dashboard deschide `Workers & Pages`, apoi proiectul care deservește `cmpc.ro`, apoi `Settings` > `Builds & deployments`.

| Setare | Valoare |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | gol / `/` |
| Node.js | `22.12.0` sau mai nou |

Dacă buildul folosește o versiune Node mai veche, adaugă variabila de build `NODE_VERSION` cu valoarea `22.12.0`.

## 5. Domeniul cmpc.ro

Domeniul funcționează deja pe proiectul actual, deci nu îl șterge și nu modifica DNS-ul. După un build reușit, `cmpc.ro` va servi automat noua versiune.

Dacă pornești vreodată un proiect Pages nou, domeniul se adaugă din proiectul Pages la `Custom domains` > `Set up a domain`. Pentru domeniul principal `cmpc.ro`, zona DNS trebuie să fie activă în același cont Cloudflare.

## 6. Activarea formularului de contact

Formularul folosește FormSubmit, astfel încât site-ul rămâne static. La prima trimitere, FormSubmit trimite un mesaj de activare către adresa configurată. Deschide acel email și confirmă adresa o singură dată; abia după confirmare mesajele sunt livrate.

Dacă `hello@cmpc.ro` nu are inbox sau redirecționare activă, setează mai întâi Cloudflare Email Routing ori înlocuiește adresa cu una la care ai acces.

Nu introduce chei API în cod. Tot ce se află într-un site static poate fi citit de vizitatori.

## 7. Verificarea după publicare

Verifică următoarele:

1. `/`, `/projects`, un proiect individual, `/lab`, `/contact` și `/privacy` se deschid fără eroare.
2. Meniul funcționează pe telefon și desktop.
3. Trimiți un mesaj de test fără informații sensibile și confirmi că ajunge la email.
4. În răspunsurile site-ului apar CSP, `X-Content-Type-Options`, `Referrer-Policy` și `Permissions-Policy` din fișierul `public/_headers`.

## Alternativă: Direct Upload

Folosește această metodă numai dacă proiectul Pages a fost creat ca Direct Upload. Rulează `npm run build`, apoi încarcă folderul `dist` sau o arhivă care conține fișierele din `dist`. Nu încărca arhiva cu sursele Astro ca build final.

Un proiect creat ca Direct Upload nu poate fi convertit ulterior în integrare Git; pentru deploy automat la fiecare `git push`, păstrează varianta Git deja folosită de proiectul actual.

Documentație oficială:

- Astro pe Cloudflare Pages: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Domenii custom: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Direct Upload: https://developers.cloudflare.com/pages/get-started/direct-upload/
