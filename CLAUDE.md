# Matt Leete — Portfolio (mattleete.github.io)

Personal portfolio site. Static HTML/CSS/JS built by **Eleventy** (`src/` → `_site/`), deployed to **GitHub Pages by GitHub Actions** on every push to `main`. A git-backed CMS (Decap, at `/admin/`) is being added in stages — see `PLAN.md`.

- **Live:** https://mattleete.github.io  ·  **Repo:** https://github.com/mattleete/mattleete.github.io
- **Custom domain / other live product:** the Occypicks project lives at https://occypicks.com (separate repo).

## Repository layout

```
├── src/                  ← PUBLIC. Eleventy input; everything here ends up on the live site. Live pages + assets ONLY.
│   ├── index.html                          home (single-page, with #work / #fun sections)
│   ├── portfolio-about.html                dedicated About page
│   ├── portfolio-contact.html              dedicated Contact page
│   ├── cv.html  +  matt-leete-cv.pdf        CV page + downloadable PDF
│   ├── portfolio-case-study-*.html          case studies (rest-super, ai-accelerator, occypicks)
│   ├── assets/            CODE: design-system.css, theme.js
│   ├── images/            MEDIA: images/occypicks/…, og-image.jpg
│   └── src.11tydata.js    keeps flat .html URLs (no /pretty/ paths)
├── _site/                ← BUILD OUTPUT (gitignored). Never edit; never commit.
├── .eleventy.js  +  package.json     Eleventy config
├── .github/workflows/pages.yml       build + deploy to Pages
├── design-source/        ← INTERNAL (not served). Design system source of truth.
│   ├── tokens.json                         colours / type / spacing tokens
│   ├── style-guide.html, usage-guide.html, figma-naming-guide.html
│   └── case-studies/     original .pages source docs
├── archive/              ← INTERNAL (not served). Superseded/old work, kept for reference.
├── .claude/skills/portfolio-design/        the design-system skill (see below)
├── PLAN.md               staged plan + locked design decisions for the job-hunt build
└── HOUSEKEEPING.md       repo-structure conventions + best-practice notes
```

**Golden rule:** only finished, linked pages + their assets go in `src/` — it's all public. Drafts, notes, and source belong in `design-source/` or `archive/`, never `src/`.

## Design system (must follow)

Load the **`portfolio-design` skill** before creating or editing any page — it carries the tokens, taste rules, and layout patterns. In short:
- Every page links `assets/design-system.css`; never hardcode colours/sizes — use its CSS variables.
- Dark mode is first-class (`data-theme` on `<html>`, driven by `assets/theme.js`); test light AND dark.
- Responsive is required (breakpoint `max-width: 768px`).
- Aesthetic: minimal / editorial — monochrome + one electric-blue accent, Instrument Sans, generous whitespace. Signature mesh-gradient / aurora background + hero ring animation.
- Tokens source of truth: `design-source/tokens.json`.

## Working with git (important — we had a divergence incident)

This repo may be edited from **more than one place/session**. To avoid duplicate work and merge pain:
1. **`git fetch origin` at the start of every session and before starting new work.** If `git log HEAD..origin/main` is non-empty, reconcile before building anything.
2. **Push after each committed milestone** — don't let commits pile up locally.
3. **Ask before pushing** (user preference), but **fetch freely** without asking.
4. Never force-push. On divergence, **merge** (keep both histories).

## Preview & deploy

- **Preview locally:** `npm install` once, then `npm run serve` → http://localhost:8080/ (live-reloads on edit).
- **Build only:** `npm run build` → `_site/`.
- **Deploy:** push to `main`; the Pages workflow builds and deploys (~1–2 min). Check the Actions tab if the site doesn't update.

## Conventions

- No spaces or typos in file/folder names (kebab-case).
- Case studies use a shared inline template (currently duplicated across case-study files — a known Phase-3 dedup item).
- Case-study access: Occypicks is **public** (own product); REST Super / AI accelerator are **password-gated** (`MattLeete`).
