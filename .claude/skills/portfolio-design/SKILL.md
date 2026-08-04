---
name: portfolio-design
description: Design system, taste rules, and layout patterns for Matt Leete's portfolio (mattleete.github.io). Load this BEFORE creating or editing any page, component, or style in the Portfolio repo, so the work stays consistent and on-brand.
---

# Portfolio Design System

Single source of truth for building and editing pages on Matt Leete's portfolio. **Read this before touching any HTML/CSS in this repo.**

## Golden rules (non-negotiable)

1. **Never hardcode colours, sizes, or spacing.** Use the CSS custom properties from `docs/assets/design-system.css`. If you're typing a hex code or a raw px value that isn't a one-off layout number, stop — there's a token for it.
2. **Every page links the shared stylesheet:** `<link rel="stylesheet" href="assets/design-system.css">` (adjust the relative path if the page isn't in `docs/`). Page-specific CSS goes in a small inline `<style>` block *after* that link, and should only contain rules unique to that page (e.g. the home hero).
3. **Dark mode is first-class.** The theme is driven by `data-theme="light|dark"` on `<html>`. Never introduce a colour that only works in one theme. Test both.
4. **Responsive is required.** Every page must work at 768px and below. The shared breakpoint is `@media (max-width: 768px)`.
5. **One accent colour only:** electric blue `var(--accent)` (`#1a56ff`). Do not add second/third accent hues. Colour comes from the signature background animation, not from UI chrome.

## Aesthetic — "minimal / editorial"

Monochrome greyscale + a single electric-blue accent. Instrument Sans throughout. Generous whitespace. Motion is restrained and purposeful — the signature background (light mesh gradient / dark aurora) and the hero ring are the personality; everything else stays calm.

**Do:** large confident type, lots of breathing room, thin `1px` borders in `--border-default`, sentence case in body copy, uppercase only for labels/nav/tags, subtle hover transitions (~0.2s).

**Don't:** add drop shadows for depth (this system uses borders + whitespace, not shadows), introduce new fonts, use more than the one accent, add bouncy/heavy animation, or use pure `#000`/`#fff` directly instead of tokens.

## Tokens (defined in `docs/assets/design-system.css`)

**Colour** — raw palette `--black --grey-1..6 --white --accent --accent-hover --bg`; semantic aliases (prefer these) `--text-primary --text-secondary --text-tertiary --text-disabled --surface-page --surface-subtle --border-default --border-strong`. In dark mode these invert automatically — use the vars and it just works.

**Type scale** — `--size-display:72 --size-h1:40 --size-h2:24 --size-h3:16 --size-body:14 --size-small:12 --size-label:11 --size-micro:10` (px). Utility classes exist: `.t-display .t-h1 .t-h2 .t-h3 .t-body .t-small .t-label .t-micro`. Font weights used: 400 / 500 / 600.

**Space scale** — `--space-1:4 --space-2:8 --space-3:16 --space-4:32 --space-5:64 --space-6:128 --space-7:224` (px). Section padding is `128px 64px` desktop / `64px 24px` mobile.

**Layout** — `--max-width:1440px` (site wrapper), `--content-width:1312px` (section inner), `--radius-pill:9999px`.

## Component classes (already in the shared CSS — reuse, don't reinvent)

- `.site-wrapper` — max-width 1440 centred; wrap page content in it.
- `nav` + `.nav-logo` `.nav-links` `.nav-link` `.nav-hamburger` — the header. Includes the mobile hamburger + `.theme-toggle`/`.theme-btn` with sun/moon icons.
- `.banner` + `.banner-track` `.banner-item` — the scrolling skills marquee (pauses until hover).
- `.section` + `.section-inner` `.section-title` `.cards-row` — a content section.
- `.card` + `.card-image` `.card-title` `.card-desc` `.card-divider` `.card-bottom` `.card-tags` `.tag` `.card-arrow` — the work/fun/about cards (432px wide, horizontal-scroll on mobile).
- `footer` + `.footer-left` `.footer-static` `.footer-arrows-*` `.footer-links` `.footer-link` `.footer-mobile-label` — the footer.
- `.btn` / `.btn-secondary` — pill buttons.
- Background: `.mesh` (+ `.blob-1..5`, light) and `.aurora` (+ `.aurora-inner`, dark). Include both blocks near the top of `<body>` with `aria-hidden="true"`.

## Required page skeleton

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Matt Leete — {Page}</title>
  <meta name="description" content="{one-line page description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/design-system.css">
  <style>/* ONLY page-specific rules here */</style>
</head>
<body>
  <div class="mesh" aria-hidden="true"><div class="blob blob-1"></div>…<div class="blob blob-5"></div></div>
  <div class="aurora" aria-hidden="true"><div class="aurora-inner"></div></div>
  <div class="site-wrapper">
    <!-- nav -->
    <!-- page content in .section blocks -->
    <!-- footer -->
  </div>
  <script src="assets/theme.js"></script> <!-- theme toggle + persistence + mobile nav -->
</body>
</html>
```

Copy the exact nav + footer markup from `docs/index.html` (or use the shared include if one exists — see `docs/assets/`). Keep nav links and footer links identical across every page so navigation never drifts.

## Theme toggle behaviour

The sun/moon button flips `data-theme` on `<html>` and should persist the choice (localStorage) and respect `prefers-color-scheme` on first visit. Keep this logic in one shared script, not copy-pasted per page.

## Page-build / edit checklist

- [ ] Links `assets/design-system.css`; inline `<style>` holds only page-specific rules.
- [ ] No hardcoded hex/px where a token exists.
- [ ] Nav + footer markup matches every other page.
- [ ] Works in light AND dark (`data-theme` toggled).
- [ ] Works at ≤768px (nav collapses to hamburger, cards scroll, type scales down).
- [ ] `<title>` + `<meta description>` set; images have `alt`.
- [ ] Verified in a real browser, both themes, before declaring done.

## Case study pages

Case studies are **password-gated** (share password with recruiters) — keep the gate. Use `docs/portfolio-case-study-rest-super.html` as the reference implementation. Structure: hook/outcome → context & role → problem → process/decisions → outcome with metrics → reflection. Lead with impact and numbers.

## Pointers

- Tokens (Figma source): `Portfolio design system/tokens.json`
- Shared CSS: `docs/assets/design-system.css`
- Reference page (most modern): `docs/index.html`
- Reference case study: `docs/portfolio-case-study-rest-super.html`
- Overall plan + locked decisions: `PLAN.md` (repo root)
