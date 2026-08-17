# Portfolio → Job-Ready Plan

**Goal:** Get the portfolio into a shippable, consistent, presentable state ASAP for a job search — and, along the way, build the reusable design system + Claude skill that keeps every future edit on-brand and to Matt's taste.

**Guiding principle:** Fix the *system* first, then apply it everywhere. Every page should render from one shared source of truth, so consistency is enforced in code — not remembered by hand each time.

---

## ▶ Current status / Next up (updated 2026-08-17 — read this first)

**Where we are:** Phases 0 & 1 done. Site is on one design system, deployed live at mattleete.github.io, and the repo has been reorganised (see `HOUSEKEEPING.md`). Everything below is committed and pushed.

**Live & done:**
- Design system (`docs/assets/design-system.css` + `theme.js`) + `portfolio-design` skill.
- Home, About (real content, anonymised KPMG clients), Contact, CV (+ PDF) — all on-system, light+dark, responsive.
- **Case studies:** REST Super (gated) · AI accelerator (gated, **scaffold** — placeholders await Matt's details) · **Occypicks (public, complete** — combined version with video, mobile shots, mascot section, and 2026-season stats).
- Nav wired across all pages; git-sync discipline documented in `CLAUDE.md`.

### Header / background rework (2026-08-17 session)
Four commits: `f0c2386` aurora · `89ee68d` wave + nav · `72605f6` mobile menu · `faff3f1` menu colour.

- **Aurora (dark bg)** dialled back and given five tuning variables on `.aurora`
  (`--aurora-opacity/-shimmer/-blur/-duration/-reach`); originals kept in comments.
- **Wave divider replaced the scrolling skills marquee** on the home page. Opaque
  (SVG *mask* + `var(--black)`), tunable via `--wave-height/-period/-opacity`;
  thickness is the `stroke-width` inside the mask.
- **Nav** is now sticky, 100% transparent, **overlays** content (negative margin, so
  content starts at viewport top), and inverts via `mix-blend-mode: difference`
  so it stays legible on any backdrop.
- **Wave pins** with its *middle* on the nav's lower edge; once pinned, the area
  above it fills at the scroll rate (scroll handler in `theme.js`).
- **Mobile menu:** long-standing bug fixed — `.nav-links` is itself a `<nav>`, so the
  base `nav { height }` rule squashed the dropdown to the bar's height and links
  spilled out. Open menu now takes the wave's colour and the wave drops to its
  lower edge.
- New **`--nav-height`** token drives bar height, the overlay offset and the wave's
  pin point (previously three hardcoded 64px/56px pairs).

**Gotchas learned (don't re-break these — all are commented in the CSS):**
- `body { overflow-x: hidden }` makes body a scroll container and **silently breaks
  `position: sticky`** → use `overflow-x: clip`.
- `.nav-links` is a `<nav>`: a bare `nav` selector hits **both** bars. Positional rules
  are scoped `nav:not(.nav-links)`.
- **`mix-blend-mode` composites, it does not occlude** — a blended element lets content
  show through it. Anything that must hide content has to be opaque.
- Don't transition `top` on a sticky element; it's the pin constraint.

**Next up (pick any):**
1. **Work card 3** — "Making formidable fun" (gaming) still links nowhere → add a "coming soon" state or build it out.
2. **AI accelerator case study** — fill the bracketed placeholders with Matt's real project details (gated; don't share password until filled).
3. **Phase 3 polish** — OG/share images + favicon, accessibility + performance pass, and **dedupe the case-study CSS (now the top priority — see below)**.
4. **Phase 4 ship-tidy** — already largely live; confirm custom domain/DNS if wanted.

**Optional follow-ups from this session:**
- Mobile menu joins the wave only once the wave has *pinned*; at the top of the page the
  panel ends in a straight edge. Giving the panel its own wavy bottom edge (same mask)
  would join them at every scroll position.
- Nav text has no backing, so contrast varies with whatever scrolls under it — worth a
  re-check once real screenshots replace the grey card placeholders.

**Watch-outs:**
- Repo is edited from >1 place — **`git fetch` first**. Repo is public — keep personal notes out of it.
- **The 3 case-study pages do NOT link `design-system.css`** — they carry their own inline
  copies of the nav/aurora/wave CSS. Every fix this session had to be applied 4×, and the
  case studies still lack the nav inversion. This is why dedup is now the priority.
- **Mobile is unverified on a real device.** The browser tooling could not resize the
  viewport, so all mobile work was checked by applying the `max-width: 768px` rules at
  desktop width. Test on a phone before relying on it.
- `docs/cv.html` has an uncommitted stray blank line after `<!DOCTYPE html>` (a no-op,
  deliberately left out of every commit) — revert it to get a clean tree.

---

## Current state (audit)

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
