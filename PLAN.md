# Portfolio → Job-Ready Plan

**Goal:** get the portfolio shippable and persuasive for a job search, as fast as possible.
**The test for every item:** *does it help win an interview?* Work a hiring manager can see
beats work they can't.

**Tracker:** Notion, *Portfolio — Job-Ready Plan* and *Portfolio — Visual Assets Plan* (private)
are the tickable lists. This file carries the order, the reasons and the technical detail.
The full history (the Phase 0–4 audit, the old reviews, the CMS migration notes) is in
`archive/plan-history-2026-08-to-09.md`.

---

## Where we are (2026-09-29)

- **Platform: done.** Eleventy 3 builds `src/` → `_site/`; GitHub Actions deploys on push to
  `main`; every page is editable at `/admin/` (Decap, editorial workflow: Save = draft PR,
  Publish = live). One design system (`design-system.css`) and one case-study stylesheet.
- **Site: works, but mostly empty of design work.** Every home-card image, both
  client case-study hero images and the About portrait are still grey placeholders.
  Occypicks is the only page with real visuals.
- **2026-09-29 review, fixed in the same session:**
  - The CMS login helper could hand your GitHub token to any site that opened it. Now it
    only answers `mattleete.github.io` and asks for `public_repo` access instead of `repo`.
    The fixed helper is live on Vercel, and Matt revoked the old full-`repo` grant on
    GitHub, so the next `/admin/` login asks for approval again with the smaller access.
  - Home cards were cut off at every window width from 769px to about 1440px (most
    laptops). The cards now share the row.
  - The hero headline ran off the right edge from 769px to about 880px (portrait iPads).
    It now scales down in that range.
  - three.js (about 670 KB) was loaded to render a blob that is hidden. It's no longer
    loaded, and the blob code is kept dormant in `home.js`.
  - Dark-mode visitors saw a white flash on every page load. The theme is now set in `<head>`.
  - Gated case studies are marked `noindex`, and a malformed `#access=` link no longer
    breaks the gate.

## Next up

### Matt — the interview bottleneck
1. **Visual assets, rows 0–4** (Notion *Visual Assets Plan*): the Figma system, the card
   template, and the REST Super / AI accelerator / Occypicks cards. Upload through `/admin/` →
   Settings → Home page → card → Image.
2. **Fill the AI accelerator or pull it.** It's linked from a Work card and every section still
   shows `[add …]` placeholders: team size, deliverables, outcome, process, trust techniques,
   reflection. Anyone sent the password sees a template. Until it's written, set the card to
   *In progress*, or set the case study to `draft: true`.
3. **Decide the gate** (see the open decisions below). This is more urgent than it looks: the
   gate only hides text in the browser.
4. **Regenerate the CV PDF.** The site says KPMG ended Sep 2026; the PDF recruiters download
   hasn't been updated since the change.
5. **A portrait for About** (assets row 15).
6. **Save the University CRM drafts.** `design-source/case-studies/university-crm-*` is still
   untracked and exists on one machine only. Strip the NOT-FOR-PUBLICATION section and commit,
   or copy it somewhere safe.

### Claude — can start without decisions
1. **Fun cards "Move to the music" and "Sound of Mind":** their tags were copied from the
   Work cards ("CX, Journey Mapping" / "UX, AI") and their descriptions have no full stops.
   Needs the correct tags from Matt; the rest is mechanical.
2. **Contrast.** `--grey-3` (#8a8a8a) on white is 3.4:1. It's used for every 10–12px label,
   breadcrumb and piece of meta text, and fails the WCAG AA minimum of 4.5:1. Captions,
   `.journey-num` and `.concept-num` use `--grey-4`, which is 1.5:1 in light mode and 1.9:1 in
   dark. Propose a darker `--text-tertiary` in light mode and move content text off
   `--grey-4`. Check it against the look before shipping.
3. **Case-study CSS scope.** The "Occypicks media" block at the end of `case-study.css`
   resizes `.cs-hero-image` and `.cs-image-full` on *every* case study, which is why the
   placeholder heroes collapse to small boxes. Scope it to Occypicks.
4. **Wire image slots as files arrive** (concept screens, trust UI, personas, the About photo;
   the assets plan says which rows need markup).
5. **Small cleanups:**
   - Remove the unused `markdown` filter in `.eleventy.js`.
   - Merge the duplicate `.hero-animation` rules in `home.css`.
   - Fix the indentation in `about.css`, `cv.css` and `contact.css`, and swap their
     hardcoded sizes (56px etc.) for tokens.

### Later
- **Reconcile `case-study.css` with `design-system.css`.** About 200 lines of nav, mesh/aurora,
  footer, `.tag` and button rules are duplicated, so the case-study layout can't load the
  shared file. Merging gives case studies the blend-mode nav, the reduced-motion rule and the
  shared focus style they currently lack.
- The three migrated case-study bodies are raw HTML inside Markdown, so in `/admin/` they edit
  as HTML. New case studies use plain Markdown. Converting the old three is optional.
- `robots.txt`, `sitemap.xml`, a styled 404.
- WebP pass on `images/occypicks` (2.2 MB across 10 files), then run Lighthouse and aim for
  90+ everywhere.
- Real-device check on iPhone Safari and Android Chrome, in both themes. Everything so far
  has been checked in an emulated browser only.
- Optional: privacy-friendly analytics (e.g. GoatCounter), to see whether recruiters actually
  open the case studies.

---

## Decisions

### Open (Matt)
- **Gate: ungate REST Super, or keep it?** The password is in the page source and the repo,
  and the full text is in the public HTML and Markdown. `noindex` now keeps search engines
  out, but anyone can still read it. The URL also names the client (`rest-super`), while the
  About page anonymises them. If the gate exists for confidentiality, it doesn't provide it:
  either ungate and anonymise the slug, or move gated content off the public repo entirely.
  If it's just a courtesy, it's fine as is.
- **Occypicks: Fun → Work?** It's the only case study with real visuals and a shipped product.
- **The two unlinked Fun cards:** link them, or mark them *In progress*. Today they have no
  link but still show an arrow.
- **Dark-mode image variants.** A small template change; decide before exporting the cards.
- **AI accelerator facts:** team size, deliverables, outcome.
- **University CRM:** confirm the facts before it goes anywhere near `src/`.

### Locked (2026-08)
1. **Taste:** minimal / editorial. Monochrome greyscale plus one electric-blue accent
   (`#1a56ff`), Instrument Sans, generous whitespace, restrained motion.
2. **Signature motion:** the mesh-gradient / aurora background stays. The hero blob is hidden,
   not deleted.
3. **Dark mode** is first-class everywhere.
4. **Multi-page site:** separate About, Contact and CV pages. Work and Fun are home sections.
5. **Shared markup** comes from layouts (`base.njk`), not JS injection.
6. **CMS:** git-backed Decap over Eleventy (chosen 2026-09-18).

---

## Gotchas (don't re-break these — each is commented in the code)

- `body { overflow-x: hidden }` makes body a scroll container and **silently breaks
  `position: sticky`**. Use `overflow-x: clip`. Because horizontal overflow is clipped rather
  than scrollable, anything wider than the viewport is simply cut off, so **never give
  layout blocks a fixed px width**. That is what hid the third home card.
- `.nav-links` is itself a `<nav>`, so a bare `nav` selector hits **both** bars. Scope
  positional rules to `nav:not(.nav-links)`.
- **`mix-blend-mode` composites; it doesn't hide what's underneath.** Anything that must hide
  content has to be opaque.
- **Blend-difference + black = nothing happens.** Elements inside the blended nav need a
  non-black colour, and `<button>`/`<input>` need `color: inherit`.
- Don't transition `top` on a sticky element; it's the pin constraint.
- **The theme rule exists twice:** a one-liner in `base.njk` `<head>` (before first paint) and
  `theme.js`. Change both together.
- **The OAuth helper must only post to `CMS_ORIGIN`.** GitHub skips its consent screen for an
  app you've already approved, so answering "whoever asked" leaks the token.
- `/admin/` can serve a config that's up to 10 minutes stale. Verify CMS config changes with
  `curl`, not a reload. A CMS save re-writes a file's whole front matter; big diffs for small
  edits are normal.

## Watch-outs
- The repo is edited from more than one place: **`git fetch` first**, push after each
  milestone, ask before pushing, never force-push.
- **The repo is public.** Everything in it, including `src/` content, gated case studies and
  the case-study password, is readable by anyone. Keep personal notes and unpublished drafts
  out.
- Never `git add -A` while unpublished drafts sit in `design-source/`. Add paths explicitly.
- When testing locally the browser caches `assets/*` aggressively. Cache-bust or hard-reload
  when checking CSS.
