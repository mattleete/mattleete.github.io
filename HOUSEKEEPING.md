# Housekeeping & Repository Best Practices

Reference for keeping this repo clean. Done in the 2026-08 housekeeping pass; the conventions below are how to keep it that way.

---

## The mental model: three layers of structure

### 1. `docs/` is public — treat it that way
GitHub Pages serves **everything** in `docs/`. So `docs/` contains **only** finished, linked pages and the assets they use. Anything unlinked but present is still reachable by URL.
- ✅ In `docs/`: live pages, `assets/` (CSS/JS), `images/` (media), the CV PDF.
- ❌ Not in `docs/`: drafts, scratch files, design source, internal notes, local settings.

### 2. Source and history live *outside* `docs/`
- **`design-source/`** — the design system's source of truth: `tokens.json`, style/usage guides, original `.pages`/`.docx` docs. Versioned, but never served.
- **`archive/`** — superseded/old work kept for reference (see `archive/README.md`). To retire something: move it here, never delete-in-place, and note it in the README.

### 3. Instructions to Claude — three distinct things, don't mix them
| Mechanism | When it loads | What goes in it |
|---|---|---|
| **`CLAUDE.md`** (repo root) | **Always**, at session start | Short, stable facts every session needs: structure, conventions, git rules, preview/deploy. The "README for AI." |
| **Skills** (`.claude/skills/<name>/SKILL.md`) | **On demand**, when a task matches | Detailed, task-specific playbooks (e.g. `portfolio-design` = how to build a page on-system). |
| **Claude's memory** (outside the repo) | Per Claude session | Claude's own working notes: decisions, preferences, incidents. Not shared with other tools. |

Rule of thumb: *stable + every-session → `CLAUDE.md`; detailed + task-triggered → a skill; Claude's working notes → memory.*

---

## What was done in this pass

**Removed dead files from the public folder** (archived, not deleted):
- `docs/portfolio-home.html`, `docs/portfolio-case-study.html`, `docs/icon-preview.html` → `archive/docs-drafts/`.

**Consolidated media** into one folder: everything now under `docs/images/occypicks/` (was split across `docs/assets/occypicks/` and `docs/images/occypicks/`). Now `docs/assets/` = code, `docs/images/` = media.

**Organised internal source** into `design-source/` (renamed from spaced folders `Portfolio design system/` and `Portfolio case studies/`); versioned `tokens.json` and the guides for the first time.

**Archived** the old draft site (`Superceded /` → `archive/superseded-site/`).

**Config hygiene:**
- Added `CLAUDE.md` (project context) and this file.
- `.gitignore` now also ignores `**/.claude/settings.local.json` (per-machine local settings that had leaked into `docs/` and the source folders).
- Removed the stray `settings.local.json` files and `docs/.claude/`.

**Naming:** removed spaces/typos — kebab-case folders (`design-source`, `superseded-site`), `rest-super-case-study.pages`, `figma-auto-layout-naming-guide.docx`.

---

## Conventions going forward

1. **New live page?** It goes in `docs/`, links `assets/design-system.css`, follows the `portfolio-design` skill. Nothing else goes in `docs/`.
2. **Retiring a page?** Move it to `archive/` (never leave dead files in `docs/`); note it in `archive/README.md`.
3. **Source/tokens/design files?** `design-source/`.
4. **Names:** kebab-case, no spaces, no typos.
5. **Git:** `git fetch` before starting; push after milestones; ask before pushing; never force-push; merge on divergence. (See `CLAUDE.md`.)
6. **Never commit** `settings.local.json` or `.DS_Store` (both gitignored).
