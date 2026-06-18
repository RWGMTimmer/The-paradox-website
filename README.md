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

Shared: `site.css` (all styling + tokens + webfont imports), `site.js` (nav condense,
scroll reveal, dark-mode toggle, mobile menu), `assets/` (logo, favicons, portrait).

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
