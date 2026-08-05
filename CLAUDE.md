# Matt Leete — Portfolio (mattleete.github.io)

Personal portfolio site. Static HTML/CSS/JS, no build step. Hosted on **GitHub Pages, served from `docs/`**.

- **Live:** https://mattleete.github.io  ·  **Repo:** https://github.com/mattleete/mattleete.github.io
- **Custom domain / other live product:** the Occypicks project lives at https://occypicks.com (separate repo).

## Repository layout

```
├── docs/                 ← PUBLIC. GitHub Pages serves everything in here. Live pages + assets ONLY.
│   ├── index.html                          home (single-page, with #work / #fun sections)
│   ├── portfolio-about.html                dedicated About page
│   ├── portfolio-contact.html              dedicated Contact page
│   ├── cv.html  +  matt-leete-cv.pdf        CV page + downloadable PDF
│   ├── portfolio-case-study-*.html          case studies (rest-super, ai-accelerator, occypicks)
│   ├── assets/            CODE: design-system.css, theme.js
│   └── images/            MEDIA: images/occypicks/… (screenshots, video)
├── design-source/        ← INTERNAL (not served). Design system source of truth.
│   ├── tokens.json                         colours / type / spacing tokens
│   ├── style-guide.html, usage-guide.html, figma-naming-guide.html
│   └── case-studies/     original .pages source docs
├── archive/              ← INTERNAL (not served). Superseded/old work, kept for reference.
├── .claude/skills/portfolio-design/        the design-system skill (see below)
├── PLAN.md               staged plan + locked design decisions for the job-hunt build
└── HOUSEKEEPING.md       repo-structure conventions + best-practice notes
```

**Golden rule:** only finished, linked pages + their assets go in `docs/` — it's all public. Drafts, notes, and source belong in `design-source/` or `archive/`, never `docs/`.

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

- **Preview locally:** `cd docs && python3 -m http.server 8891` → open http://localhost:8891/
- **Deploy:** push to `main`; GitHub Pages rebuilds `docs/` automatically (~1 min).

## Conventions

- No spaces or typos in file/folder names (kebab-case).
- Case studies use a shared inline template (currently duplicated across case-study files — a known Phase-3 dedup item).
- Case-study access: Occypicks is **public** (own product); REST Super / AI accelerator are **password-gated** (`MattLeete`).
