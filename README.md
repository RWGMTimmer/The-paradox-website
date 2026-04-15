# The Paradox — Website

Static website for The Paradox. Pure HTML + Tailwind (via CDN). No build step.

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage / Advisory hub |
| `advisory.html` | `/advisory` | Strategic Advisory detail |
| `research.html` | `/research` | Research archive |
| `about.html` | `/about` | About / Robert Timmer |
| `inquiry.html` | `/inquiry` | Contact form |

## Deployment

Deployed via **Cloudflare Pages**, connected to this GitHub repository. Every push to `main` auto-deploys.

### Initial setup
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Select this repository
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Deploy

### Custom domain
Cloudflare Pages → project → Custom domains → add `the-paradox.com` and `www.the-paradox.com`.

## Before going fully live — TODO

- [ ] **Formspree endpoint** — replace `FORMSPREE_ENDPOINT` in `inquiry.html` with the actual form URL from formspree.io (signed up under info@the-paradox.com)
- [ ] **Email hosting** — ensure `info@the-paradox.com` actually receives mail (GoDaddy email or Google Workspace)
- [ ] **Images** — current placeholder images are hosted on Google's CDN and may expire. Replace with own assets in `/img` directory
- [ ] **Tailwind via CDN** — fine for prototype, but for production consider compiling Tailwind to a static CSS file (~10KB instead of ~300KB on every page load)
- [ ] **Privacy / Governance / Terms** pages — currently linked but don't exist
- [ ] **Analytics** — Cloudflare Web Analytics is free, privacy-friendly, no cookie banner needed

## Local preview

Just open any `.html` file in a browser, or run a simple server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
