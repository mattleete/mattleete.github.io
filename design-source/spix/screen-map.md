# Spix App — key screens and features (screen map)

Transcribed 23 Nov 2026 from Matt's sticky-note screen map (screenshot dated 23 Nov 2026,
notes authored by Matt). Internal reference: not served on the site. Wording is verbatim;
a trailing `?` was an open question on the original note.

The original uses two header colours: purple for **Log in** and **Current spix audio wheel**,
blue for the other eight screens. What the colours meant is not recorded here — ask Matt
before describing it publicly.

| # | Screen (header note) | Features / elements (in order) |
|---|---|---|
| 1 | Log in *(purple)* | Input username · Input password · Recover password · Sign in · Sign up · View website? |
| 2 | Persistent menu | Visual of active loadout · Change loadout · Edit loadout · Home · Library · Marketplace · Settings |
| 3 | Home dashboard | Currently active voice wheel · Navigation menu · What's new / tips · Sign out |
| 4 | Current spix audio wheel *(purple)* | Buttons to click with audio files attached · Update keybindings · Update audio files · Equalise audio levels · Customise visuals · Swap wheel |
| 5 | Alternative audiowheels loadouts and game setups | List of already created loadouts · Create new loadout · Duplicate loadout · Favourite loadout · Loadouts for specific games / genres? |
| 6 | Recording studio | Record new clip · Edit length · Edit sound · Save clip · Name clip · Apply sound effects |
| 7 | Library | Review saved clips · Search saved clips · Tag saved clip · Filter saved clips · View marketplace · Upload clips · Delete clips |
| 8 | Marketplace | Search clips · Buy etc · Sample / listen · Purchase |
| 9 | Games setup | Set up game profile · Add wheels to game profile · Customise specific wheel · Add setup for Zoom / Teams |
| 10 | Settings | Audio · Light / dark · Keyboard shortcuts · XXXX *(placeholder)* |

## Structure, in short

- **The wheel is the core object.** Screen 4 holds the wheel itself; the persistent menu (2)
  and home dashboard (3) both surface the currently active wheel or loadout.
- **Loadouts** (5) are sets of alternative wheels, with an open question about tying them to
  specific games or genres. **Games setup** (9) attaches wheels to a game profile, and extends
  the same setup to Zoom / Teams calls.
- **Content pipeline:** clips are made in the **Recording studio** (6), kept in the
  **Library** (7), and could be found or bought in the **Marketplace** (8); the library links
  to the marketplace and supports uploads.
- **Account and app:** Log in (1) and Settings (10: audio, light/dark, keyboard shortcuts).

## Open questions on the original

- "View website?" on the log-in screen
- "Loadouts for specific games / genres?" on the loadouts screen
- Settings has an unnamed fourth item ("XXXX")
- Whether this map was the MVP scope or the fuller product plan is not recorded

## How it is used on the site

The Spix case study (`src/case-studies/spix.md`) shows a cleaned-up version of this map as a
theme-aware HTML block, without the question-marked items or the placeholder, captioned as
redrawn from the original.
