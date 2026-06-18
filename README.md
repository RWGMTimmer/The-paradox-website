# The Paradox — Website (Visual v2)

Restyled static website for The Paradox. Pure HTML + one CSS file + one JS file.
No build step, no Tailwind CDN, no framework. Drop-in replacement for the existing repo.

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage / advisory hub |
| `advisory.html` | `/advisory` | Strategic Advisory detail |
| `research.html` | `/research` | Research archive |
| `about.html` | `/about` | About / Robert Timmer |
| `inquiry.html` | `/inquiry` | Contact form |
| `privacy.html` | `/privacy` | Privacy statement (GDPR) |
| `imprint.html` | `/imprint` | Imprint (Dutch Civil Code) |

## Bilingual (EN / NL)

The site ships in **English (root)** and **Dutch (`nl/`)**. Every page carries an **EN / NL
switcher** in the nav (and mobile menu) that links to the same page in the other language.

| Dutch file | URL | EN counterpart |
|---|---|---|
| `nl/index.html` | `/nl/` | Home |
| `nl/advisory.html` | `/nl/advisory` | Advies |
| `nl/research.html` | `/nl/research` | Onderzoek |
| `nl/about.html` | `/nl/about` | Over |
| `nl/inquiry.html` | `/nl/inquiry` | Contact |
| `nl/privacy.html` | `/nl/privacy` | Privacyverklaring |
| `nl/imprint.html` | `/nl/imprint` | Colofon |

Dutch pages live in `nl/` and reference the shared `../site.css`, `../site.js`, and the
root-level images via `../` — so the whole site still deploys as one flat tree. `lang="nl"`
is set on each. Copy is fully translated in the firm's formal register (the British/European
spelling of the EN copy maps naturally to Dutch).

### Language auto-detection

Each page carries a tiny inline `<head>` script that runs before paint:

- **First visit, no stored choice** → Dutch-language browsers (`navigator.language` starts
  with `nl`) are sent to the `/nl/` version; everyone else stays on English. A Dutch browser
  landing directly on `/nl/` stays put; a non-Dutch browser landing on `/nl/` is sent to EN.
- **Manual choice wins** → clicking the EN / NL switcher stores `pdx-lang` in `localStorage`;
  from then on that preference is honoured and auto-detection no longer applies.
- **No loops / no trap** → a `sessionStorage` guard means the auto-redirect fires at most once
  per session, and the switcher always lets the visitor override.

> SEO note: this is a client-side redirect. For best crawler behaviour you may later add
> server-side `hreflang` alternates or a Cloudflare redirect rule, but the JS approach is
> sufficient for visitors and is non-destructive.

Shared: `site.css` (all styling + tokens + webfont imports), `site.js` (nav condense,
scroll reveal, dark-mode toggle, mobile menu). Images and favicons sit at the root
(`robert-timmer.png`, `favicon-*.png`, etc.) — a flat layout matching the original repo,
so every file deploys to the publish root together.

## What changed vs. the previous site (visual only — content is unchanged)

- **Imagery** — signature oxblood **duotone** treatment with film **grain** (replaces the
  expired Google-CDN placeholder images; the founder portrait is the one real photo).
- **Type** — added **IBM Plex Mono** for metadata / eyebrows / figure tags; Newsreader display
  now uses optical sizing and tighter tracking.
- **Colour rhythm** — deliberate paper → low-tint → dark → paper cadence; forest-green band as a
  rare second dark accent (Research early-access, About vision).
- **Dark mode** — a finished, persistent theme (toggle in the nav), replacing the half-built
  `dark:` classes.
- **Motion** — scroll-reveal, nav condenses on scroll, link underlines draw, image hovers.
  Fully respects `prefers-reduced-motion` and degrades gracefully with JS disabled.
- **No Tailwind CDN** — ~13 KB of hand-written CSS instead of ~300 KB on every page load.
- **Accessibility** — lifted low-opacity text, larger hit areas, the GDPR note on the form.

## Deploy (Cloudflare Pages — your existing flow)

The site auto-deploys from the GitHub repo on every push to `main`:

1. Replace the old files in `RWGMTimmer/The-paradox-website` with the contents of this `site/`
   folder (keep `_headers`, `wrangler.jsonc`, `robots`, etc. — only the HTML/CSS/JS/assets change).
2. Commit and push to `main`.
3. Cloudflare Pages rebuilds and deploys automatically (Framework preset: None, build command:
   empty, output dir: `/`).

> Note: this environment cannot push to your GitHub repo or Cloudflare account directly —
> deploy is the one step that must run from your side. Everything needed is in this folder.

## Before going fully live — TODO

- [ ] **Formspree endpoint** — in `inquiry.html`, replace `FORMSPREE_ENDPOINT` in the form's
  `action` with the real Formspree URL. (Until then the form shows the success state without
  sending.)
- [ ] **Imprint** — fill in the VAT/BTW number in `imprint.html` (the operating entity now reads "A Timmer Strategisch Advies BV initiative").
- [ ] **Share card** — `og:image` currently points at the favicon; add a 1200×630 share image.
- [ ] Optional: self-host the three Google fonts for full offline/independence.
