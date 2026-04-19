# Astro App med Cloudflare & Tailwind

Dette er et minimalt Astro-projekt, der er forudkonfigureret med:
- **Tailwind CSS** til styling.
- **@astrojs/cloudflare** adapter til SSR/Hybrid deployment.
- **IDX** konfiguration (.idx/dev.nix) til lokal udvikling på port 4321.

## 🚀 Lokal Udvikling

For at starte projektet lokalt:

```bash
npm install
npm run dev
```

Projektet vil køre på `http://localhost:4321`. (I IDX vil miljøet automatisk starte preview).

## ☁️ Deployment til Cloudflare Pages via GitHub

For at deploye dette projekt til Cloudflare Pages via GitHub, følg disse trin:

### 1. Push koden til GitHub
Først skal du initialisere git og pushe dit projekt til et nyt GitHub-repository:

```bash
git init
git add .
git commit -m "Initial commit: Astro + Tailwind + Cloudflare"
git branch -M main
git remote add origin https://github.com/DIT_BRUGERNAVN/DIT_REPO_NAVN.git
git push -u origin main
```

### 2. Opret projektet i Cloudflare Dashboard
1. Log ind på dit [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Naviger til **Workers & Pages** -> **Pages**.
3. Klik på **Connect to Git**.
4. Vælg dit nye GitHub-repository (`DIT_REPO_NAVN`) og klik på **Begin setup**.

### 3. Konfigurer Build Settings i Cloudflare
Når du opsætter projektet, skal du bruge følgende byggeindstillinger for Astro:

- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Build output directory**: `dist`

### 4. Deploy
Klik på **Save and Deploy**. 
Cloudflare Pages vil nu automatisk bygge og deploye din Astro-side. Fremover vil hvert push til din `main`-branch på GitHub udløse et nyt automatisk build og deployment.

## 🔍 Advanced SEO & IndexNow

Dette projekt er nu fuldt integreret med `@jdevalk/astro-seo-graph`, som byder på en robust, moderne SEO stak:
- **Automatisk Structured Data (JSON-LD)** generering.
- **Sitemaps** via `@astrojs/sitemap`.
- Dynamisk **robots.txt**.
- Pre-renderet dynamisk **Open Graph (OG)** image generering (hvis sat op).
- **LLM.txt** support til AI scaping.

### IndexNow Verifikation
For at søgemaskiner (Bing, Yandex, Seznam m.fl.) straks kan indeksere dine ændringer via IndexNow-protokollen, er en nøgleverifikationsfil tilføjet til projektet.
Filen ligger her: `public/82a9d8c7b6e5f4g3h2i1j0k9l8m7n6o5.txt`.

Når du har deployet til Cloudflare Pages via GitHub (og evt. har sat det opede domæne live), vil IndexNow automagisk kunne verificere din ejerskab via adressen:
`https://karmaveda.dk/82a9d8c7b6e5f4g3h2i1j0k9l8m7n6o5.txt`
