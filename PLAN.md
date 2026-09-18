# Portfolio → Job-Ready Plan

**Goal:** Get the portfolio into a shippable, consistent, presentable state ASAP for a job search — and, along the way, build the reusable design system + Claude skill that keeps every future edit on-brand and to Matt's taste.

**Guiding principle:** Fix the *system* first, then apply it everywhere. Every page should render from one shared source of truth, so consistency is enforced in code — not remembered by hand each time.

---

## ▶ Current status / Next up (updated 2026-09-18 — read this first)

**Tracker:** the live, tickable version of this list lives in Notion —
**Portfolio — Job-Ready Plan** (private). Notion is the source of truth for
what's done; this file carries the *why* and the technical detail.

### CMS (2026-09-18) — done, all three stages live

Matt chose a git-backed CMS over web-editing HTML or Markdown-as-source. The site now
builds from `src/` with **Eleventy 3**, deploys via **GitHub Actions**, and every page is
editable at **https://mattleete.github.io/admin/** (Decap CMS; Save = draft PR, Publish =
live in ~90 s). Case studies are Markdown; About/CV/Contact and the home page are
front-matter/YAML content behind small Nunjucks layouts. The 648-line case-study CSS
duplication is gone (one `assets/case-study.css`). Login helper: `tools/decap-oauth/` on
Vercel. Architecture and the "how to add a page" rules are in the `portfolio-design` skill.

**Where we are:** Phases 0 & 1 done; the site is on one design system and live.
A full review on 2026-09-17 re-prioritised the remaining work around one
question: *what actually wins interviews?*

### Re-prioritisation (2026-09-17)

The previous "next up" list had **case-study CSS dedup as the top priority**.
That was wrong for the goal. It's ~1,900 lines of real duplication and worth
doing, but it is **invisible to a hiring manager**. It has moved to *Later*.

What the review found instead, in order of hiring impact:

1. **All 9 home-page cards are empty grey boxes** (`<div class="card-image"></div>`).
   A product designer's portfolio showing zero design work is the single
   biggest problem on the site. Occypicks is the only page with any imagery —
   REST Super, the anchor case study, has 5,400 words and **zero images**.
2. **2 of 3 case studies open to a bare white password box** — no nav, no title,
   no context, no way to request access, and it ignores dark mode. It reads as
   broken. Recruiters close the tab rather than email for a password.
3. **The mobile hamburger was invisible** → no navigation at all on a phone.
4. **No favicon and no OG tags anywhere** → a pasted link rendered as a blank
   grey rectangle in LinkedIn DMs, email and application forms.

### Done this session (2026-09-17)

- **Hamburger fix.** Root cause: `.nav-hamburger` is a `<button>`, and buttons
  don't inherit `color` (the UA sets `color: buttontext`), so the bars'
  `currentColor` resolved to **black**. The nav is white on purpose for
  `mix-blend-mode: difference` — and difference-blending black is a **no-op**,
  so the bars rendered invisibly on every backdrop, in *both* themes. Fixed
  with `color: inherit` on `.nav-hamburger`. *Only* affected the shared
  stylesheet; the case studies' nav isn't blend-moded, so their `var(--black)`
  bars were always correct.
- **Theme no longer splits mid-visit.** `theme.js` honoured the OS preference
  but never persisted it, and the case studies' separate inline copy defaulted
  to `'light'` — so with a dark OS, home rendered dark and case studies
  rendered light. Both copies now resolve the same way *and* persist on first
  visit.
- **Favicon + share image.** `docs/favicon.svg` (white M on `#1a56ff`, drawn as
  a stroked polyline so it needs no webfont), `docs/apple-touch-icon.png`
  (180×180), and `docs/images/og-image.jpg` (1200×630, real Instrument Sans,
  signature wave). Full OG + Twitter + canonical + icon tags on **all 7 pages**;
  `index.html`, `rest-super` and `occypicks` also gained missing meta
  descriptions.
- **Dead link fixed.** REST Super's "Next Project" pointed at **"Spix App"** —
  a project that doesn't exist anywhere on the site — via `href="#"`. It now
  chains to Occypicks, which also gives the gated page an exit to a public one.
- **Work card 3** ("Making formidable fun") links nowhere, so it no longer
  pretends to: new `.card-soon` variant (no pointer cursor, no hover shift, no
  arrow) plus an `In progress` badge on the image. The badge sits on the image
  rather than in the tag row because a status word there forces the tags to wrap.

### Code & plan review (2026-09-18, after the CMS migration)

Full pass over the generated site, the layouts, the CMS config, the deploy and the
helper. Nothing is broken on the live site; the findings are gaps and hardening.

**Defects (fix first — small, mine):**
1. **Home cards ignore the `image` field.** The CMS exposes *Image* per card
   (Settings → Home page) but `src/index.njk` never renders it and there is no
   `.card-image img` rule. Uploading a card image today does nothing. Fix: render
   `<img>` with `object-fit: cover` when `card.image` is set.
2. **`markdown-it` is required by `.eleventy.js` but not declared** in
   `package.json` — it works only because Eleventy pulls it in transitively. A
   future Eleventy bump can break the build. Declare it.
3. **`theme.js` has no guard around `localStorage`.** In Safari private mode or
   with storage blocked it throws on line 1 — and because the hamburger and wave
   handlers are in the same script, the mobile nav dies with it. Wrap in try/catch.
4. **No `<h1>` on Home or CV** (hero and name are `<div>`s). Accessibility and
   search both want one per page. Promote `.hero-display` and `.cv-name`.
5. Minor: footer year hardcoded `2026` in `base.njk` (make it computed); one
   `res.status()` Vercel-helper call left in `tools/decap-oauth/api/callback.js`
   (the rest uses plain Node); Decap loaded as `^3.0.0` from unpkg (pin an exact
   version so a minor release can't change the editor under Matt).

**Tech debt (Later):**
- `case-study.css` still carries its own copies of the nav, aurora/mesh, footer and
  `.tag` rules (≈120 lines) that `design-system.css` also has. The case-study
  layout therefore loads *only* `case-study.css`. Reconciling them (one nav, one
  footer) is the next dedup — and the reason the case-study nav lacks the
  blend-mode inversion the other pages have.
- The three migrated case-study bodies are raw HTML inside Markdown. They render
  identically, but in `/admin/` they edit as HTML blocks. New case studies use
  clean Markdown; converting the old three is optional polish.
- No `robots.txt`, `sitemap.xml` or styled 404. All cheap; none urgent.
- `images/occypicks` is 2.2 MB across 9 files (see sizes in git); worth a WebP pass
  when the Phase-3 performance work happens.

**Risk (needs Matt):**
- The University CRM draft — `design-source/case-studies/university-crm-draft.html`
  plus the two source `.md` files — is **untracked**. It exists on one machine only.
  Strip the NOT-FOR-PUBLICATION section and commit, or copy it somewhere safe.

### Next up

**Matt (the interview bottleneck):**
1. **Figma: Visual Assets Plan rows 0–4** — the system, the card template, and the
   REST Super / AI accelerator / Occypicks cards. Full specs are in Notion
   (*Portfolio — Visual Assets Plan*). Upload via `/admin/` → Settings → Home page.
2. **CV:** `KPMG · Jan 2022 – Present` at `/admin/` → Pages → CV.
3. **A portrait** for About (assets row 15).

**Claude (can start now, no decisions needed):**
1. The five review defects above, one commit.
2. **The styled password gate** — 2 of 3 case studies still open to a bare white
   box. On-brand gate, nav intact, title + one-line summary + "email me for access"
   visible *before* the field.
3. Wire the new image slots as files arrive (concept screens, trust UI, personas,
   About photo — see the assets plan for which rows need markup).

**Decisions still open (Matt):** Occypicks Fun → Work? · ungate REST Super? · the
five home cards with an arrow but no link (Move to the music, Sound of Mind, the
three About cards) — link them or mark in-progress · dark-mode image variants
(a small template change; decide before exporting the cards) · AI accelerator
placeholders (team size, deliverables, outcome) · University CRM confirms.

**Gotchas learned (don't re-break these — all commented in the CSS):**
- `body { overflow-x: hidden }` makes body a scroll container and **silently
  breaks `position: sticky`** → use `overflow-x: clip` (both are present, as a
  progressive fallback).
- `.nav-links` is a `<nav>`: a bare `nav` selector hits **both** bars.
  Positional rules are scoped `nav:not(.nav-links)`.
- **`mix-blend-mode` composites, it does not occlude** — a blended element lets
  content show through. Anything that must hide content has to be opaque.
- **Blend-difference + black = nothing happens.** This is what hid the
  hamburger for months. Any element inside the blended nav needs a non-black
  colour, and `<button>`/`<input>` need explicit `color: inherit`.
- Don't transition `top` on a sticky element; it's the pin constraint.

**Watch-outs:**
- Repo is edited from >1 place — **`git fetch` first**. Repo is public — keep
  personal notes out of it.
- **The 3 case-study pages do NOT link `design-system.css` or `theme.js`** —
  they carry their own inline copies (648 byte-identical lines each). Every
  shared change must still be applied 4×. This is the *Later* dedup item.
- **Mobile is still browser-emulated, not device-verified.** This session's
  mobile checks were done at an emulated 375×812 viewport, which did work —
  but test on a real phone before relying on it.
- When testing locally, the browser **aggressively caches `assets/*`**. A stale
  stylesheet made a correct fix look broken for several minutes. Serve with
  `Cache-Control: no-store` or cache-bust the `<link>` when verifying CSS edits.

---

## Current state (audit) — *historical, from the Phase 0 audit (2026-08)*

> Kept for context only. It is **out of date**: `portfolio-case-study.html` and
> `icon-preview.html` no longer exist, and About/Contact/CV were retrofitted
> onto the design system in Phase 1. For the live picture, see the status
> section at the top of this file and the Notion tracker.

| Page | Tokens (CSS vars) | Dark mode | Responsive | Shared nav/footer | Notes |
|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ | ✅ | inline | Reference page — most modern |
| `portfolio-case-study-rest-super.html` | ✅ | ✅ | ✅ | inline | Password-gated, most complete case study |
| `portfolio-about.html` | ❌ hardcoded | ❌ | partial | inline | Older generation |
| `portfolio-contact.html` | ❌ hardcoded | ❌ | partial | inline | Older generation |
| `portfolio-case-study.html` | ❌ hardcoded | ❌ | partial | inline | Generic/template case study, password-gated |
| `cv.html` | ❌ hardcoded | ❌ | ? | inline | + `matt-leete-cv.pdf` |
| `icon-preview.html` | — | — | — | — | Scratch/dev file — likely delete or move out of `docs/` |

**Core problems to solve:**
1. Two design "generations" — no single source of truth. Tokens live in `tokens.json` (Figma) but nothing in HTML consumes them.
2. Nav + footer are duplicated inline on every page → drift.
3. No Claude skill, so each session re-derives "the design" from scratch and taste is inconsistent.
4. Content completeness unknown — likely the real job-search bottleneck (case studies matter more than pixels).

---

## Phase 0 — Foundation: design system + Claude skill *(do first; everything depends on it)*

> This is the "build Claude the skills" phase. It's front-loaded on purpose: once it exists, every later step is faster and stays consistent.

### 0.1 Calibrate taste *(needs Matt's input — see Decisions below)*
Nail down the aesthetic in writing so it can be encoded, not guessed:
- Mood words (e.g. minimal / editorial / confident / warm).
- 2–3 reference sites Matt admires + what specifically he likes about each.
- Motion appetite (the mesh-gradient + ring animation — keep as signature, dial back, or drop?).
- Light-only vs. dark-mode-as-first-class.
- Density: generous whitespace vs. compact.

**Working hypothesis (until Matt confirms):** minimal, monochrome greyscale + single electric-blue accent (`#1a56ff`), Instrument Sans, generous whitespace, restrained/purposeful motion, dark mode first-class.

### 0.2 Build the shared CSS design system
Create **`docs/assets/design-system.css`** — the single source of truth, generated from `tokens.json`:
- `:root` custom properties for every colour, type style, space step (`--space-3: 16px`, etc.).
- `@media (prefers-color-scheme: dark)` + `:root[data-theme=…]` overrides in one place.
- Base element styles (body, headings, links, focus states).
- Reusable component classes: `.nav`, `.footer`, `.card`, `.section`, `.btn`, `.tag`, `.marquee`.
- Type utility classes matching the scale: `.t-display`, `.t-h1`, `.t-h2`, `.t-body`, `.t-label`, etc.
- Responsive: define breakpoints once (e.g. 1440 / 1024 / 768 / 480) as documented tokens.

Every page then links this file and deletes its inline duplicate. Consistency becomes structural.

### 0.3 Extract shared nav + footer
Options (pick one in Decisions):
- **(a) Small JS include** — `nav.js` / `footer.js` inject shared markup. Zero build step, works on GitHub Pages.
- **(b) HTML partial + copy** — keep inline but source-controlled from one canonical block.
Recommendation: **(a)** — one edit updates all pages.

### 0.4 Write the Claude skill(s)
Create **`.claude/skills/portfolio-design/SKILL.md`** (project-scoped, committed to the repo). Contents:
- **Design tokens** — full colour / type / space reference (mirrors `design-system.css`).
- **Taste rules** — do / don't list from 0.1 (e.g. "one accent colour only", "never hardcode hex — use vars", "sentence case in body, uppercase only for labels", motion rules).
- **Layout patterns** — how nav, footer, cards, sections, case-study templates are structured, with copy-paste-ready snippets that reference the shared CSS.
- **Dark mode + responsive** — the required approach, non-negotiable.
- **Page-build checklist** — steps to add/edit a page and stay on-system.
- **Pointers** — to `design-system.css`, `tokens.json`, the reference page (`index.html`).

Optionally a second skill **`new-case-study`** that scaffolds a case-study page from the template with the right structure (problem → role → process → outcome → metrics).

**Acceptance for Phase 0:** `design-system.css` exists and `index.html` renders identically after switching to it; the skill loads and a fresh page built from it matches the reference visually.

---

## Phase 1 — Consistency pass: bring every page onto the system

Retrofit the older-generation pages so all pages share one look:
1. `portfolio-about.html` → link `design-system.css`, remove hardcoded values, add dark mode + responsive, swap in shared nav/footer.
2. `portfolio-contact.html` → same.
3. `portfolio-case-study.html` → same (or fold into the case-study template).
4. `cv.html` → same; ensure it matches and the PDF is linked/consistent.
5. Re-verify `index.html` and `rest-super` still match after CSS extraction.

**Acceptance:** open every page in light + dark, desktop + mobile — nav, footer, type, colour, spacing all identical in feel. No page looks "older".

---

## Phase 2 — Content: the actual job-search substance

> Pixels get you in the door; case studies get you hired. This phase likely matters most.
1. **Case studies** — decide how many to show (2–3 strong > many weak). For each: problem, your role, process, decisions, outcome + metrics. REST Super is the anchor; identify the next 1–2.
2. **Home** — sharpen the hero line and the card copy so it reads clearly to a hiring manager in 5 seconds.
3. **About** — positioning: who you are, what you do, what you're looking for.
4. **Contact** — working email link, LinkedIn, CV download. Make it frictionless.
5. **CV** — confirm `cv.html` + `matt-leete-cv.pdf` are current and consistent with the site.
6. **Password gates** — decide: keep case studies gated (share password with recruiters) or open them up for the job hunt. Gated content can't be discovered by someone browsing.

**Acceptance:** every card links somewhere real; no lorem/placeholder; every case study tells a complete story.

---

## Phase 3 — Polish & QA
1. **Images/assets** — replace grey `#d9d9d9` placeholders with real work. Optimise (WebP, sized, lazy-load).
2. **Meta / SEO / sharing** — `<title>`, meta description, Open Graph + Twitter card image per page (so links look good when shared with recruiters), favicon.
3. **Accessibility** — colour contrast, focus states, alt text, semantic landmarks, keyboard nav.
4. **Performance** — self-host or `font-display: swap` fonts, minimise layout shift, check Lighthouse.
5. **Cross-device** — real check on mobile Safari + Chrome, tablet, desktop; both themes.
6. **404 / edge** — a styled 404 page is a nice touch.

**Acceptance:** Lighthouse ≥ 90 across the board; looks intentional shared as a link.

---

## Phase 4 — Ship
1. Housekeeping: commit the untracked folders (or `.gitignore` the source `.pages`/`.docx` assets), remove/relocate `icon-preview.html` out of `docs/`, clean `Superceded/`.
2. Final commit(s) with descriptive messages; push.
3. Verify live on `mattleete.github.io` — every page, both themes, on a phone.
4. Confirm custom domain / DNS if one is planned.

---

## Sequencing (fast path)

```
Phase 0 (system + skill)  ─┐
                           ├─►  Phase 1 (consistency)  ──►  Phase 2 (content)  ──►  Phase 3 (polish)  ──►  Phase 4 (ship)
   ▲ do this first          │
   └── unblocks everything ─┘
```

If time is tight, the minimum shippable cut is: **Phase 0.2 (shared CSS) + Phase 1 + Phase 2 (1–2 case studies) + Phase 4.** Phase 3 polish and the full skill can follow after you're already applying.

---

## Decisions (resolved 2026-08)
1. **Taste** — ✅ **Minimal / editorial**: monochrome greyscale + single electric-blue accent (`#1a56ff`), Instrument Sans, generous whitespace, restrained/purposeful motion.
2. **Animations** — ✅ **Keep the mesh-gradient background + hero ring as the signature**, made consistent across pages.
3. **Dark mode** — ✅ First-class everywhere (implied by minimal/editorial + existing modern pages).
4. **Scope** — ✅ **Full plan, in order** (all phases including the full Claude skill + polish).
5. **Password gates** — ✅ **Keep case studies gated**; share password with recruiters.

6. **Site architecture** — ✅ **Multi-page**: dedicated About + Contact pages wired into the nav (nav links become page links, not just home-section anchors). Work/Fun remain home sections.
7. **Nav/footer sharing** — ✅ Canonical **inline** markup (not JS-injected) + shared `design-system.css` / `theme.js`. Better SEO / no FOUC / no JS dependency.
8. **Orphan drafts** — ✅ **Keep** `portfolio-about.html`, `portfolio-contact.html`, `portfolio-case-study.html`; **retrofit later**, paired with their Phase 2 content build so nav never points at an unstyled page.

### Phase 1 scope (revised)
Only `cv.html` is a live old-generation page today (linked from the home footer), so Phase 1 = retrofit `cv.html` + verify REST Super stays consistent. About/Contact page retrofit + nav rewiring moves into Phase 2 (built with their content).

### Still open (resolve during the relevant phase)
- **Reference sites** — optional: Matt can share 1–3 admired sites to sharpen taste rules.
- **Case studies** — how many total, and which 1–2 come after REST Super (Phase 2).
