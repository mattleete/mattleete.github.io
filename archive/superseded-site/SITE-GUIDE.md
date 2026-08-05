# Matt Leete Portfolio — Site Guide

**Live URL:** https://mattleete.github.io
**Repo:** https://github.com/mattleete/mattleete.github.io
**Files:** `index.html`, `style.css`, `script.js`

---

## Style Guide

### Colours
Defined as CSS variables in `:root`:

| Variable  | Value     | Usage                        |
|-----------|-----------|------------------------------|
| `--black` | `#0a0a0a` | Body text, nav, ring borders |
| `--white` | `#f4f4f0` | Page background, footer text |
| `--grey`  | `#888`    | Subtitles, labels, tags      |

### Typography
- **Font:** Space Grotesk (Google Fonts) — weights 300, 400, 500, 600, 700
- **Variable:** `--font: 'Space Grotesk', sans-serif`

### Fluid type scale (clamp)
| Element          | Min   | Preferred | Max   |
|------------------|-------|-----------|-------|
| Hero name        | 80px  | 14vw      | 220px |
| Hero role        | 16px  | 1.8vw     | 22px  |
| About desc       | 20px  | 2.5vw     | 34px  |
| Project title    | 20px  | 2vw       | 28px  |
| Contact heading  | 60px  | 10vw      | 160px |
| Mobile nav links | 36px  | 10vw      | 56px  |

### Spacing
- Desktop section padding: `120px 48px`
- Mobile section padding: `80px 24px`
- Section header bottom margin: `80px`

---

## Page Sections (HTML structure)

```
#nav          — Fixed top nav, hides on scroll down
  .mobile-menu — Full-screen overlay on mobile

#hero         — Full viewport height
  .hero-text  — Name + role title (no parallax)
  .shape-wrapper > .shape-3d — 3D ring animation (has data-parallax="0.1")
  .marquee-wrapper — Scrolling text banner

#about        — Bio text + 4-column skills grid

#projects     — 2-column project card grid

#contact      — Dark footer with large heading + links
```

---

## 3D Ring Animation

All logic is in `script.js`. Rings are generated dynamically — the HTML only contains an empty `<div class="shape-3d">`.

### Global animation parameters
```js
BASE_SPEED      = 0.25   // Y rotation speed per frame (degrees)
SPEED_VARIATION = 0.18   // How much speed pulses via sine wave (0 = constant)
BASE_TILT       = 15     // Default X tilt angle in degrees
MOUSE_TILT      = 12     // Max additional tilt from mouse position (0 = off)
LERP_SPEED      = 0.04   // How smoothly tilt follows mouse (0.01 slow → 0.1 snappy)
DRIFT_AMOUNT    = 8      // Degrees of slow organic wandering
```

### Tier system
Three size classes of rings. Each tier's rings are distributed across all axes.

```js
TIERS = [
  { perAxis: 2, size: 0.18, variance: 0.06, speed: 0.07,  thickness: 0.5, opacity: 0.4  },  // small, fast
  { perAxis: 1, size: 0.45, variance: 0.07, speed: 0.028, thickness: 1.0, opacity: 0.6  },  // medium
  { perAxis: 1, size: 0.80, variance: 0.08, speed: 0.008, thickness: 1.8, opacity: 0.85 },  // large, slow
]
NUM_AXES = 3   // Axes evenly spread from 0–180°
// Total rings = 3 axes × (2+1+1) = 12 rings
```

- `size` — fraction of the container (0.0–1.0)
- `variance` — random size variation within the tier (±)
- `speed` — base rotation speed in degrees/frame
- `thickness` — ring border width in px
- `opacity` — base opacity (varies ±30% per ring)

### Per-ring rotation
Each ring has independent velocities on all three axes, set at generation time:
```js
velX, velY, velZ  // Each = tier.speed × random(0.7–1.3) × random direction (±1)
                  // Each axis also gets an independent random magnitude (0.4–1.0× base)
```
Animation loop: `rotX += velX`, `rotY += velY`, `rotZ += velZ` every frame.

### Shape container (CSS)
```css
.shape-wrapper  — position: absolute; top: 28%; right: 15%; perspective: 700px
.shape-3d       — width: 450px; height: 450px  (330px at ≤1024px; hidden at ≤768px)
```
To move the shape: change `top` / `right` on `.shape-wrapper`.
To resize: change `width` / `height` on `.shape-3d`.
For more dramatic 3D depth: lower the `perspective` value (e.g. 400px).

---

## Marquee Banner

Two identical spans of text placed end-to-end; CSS animates `translateX(-50%)` so it loops seamlessly.

```css
/* Desktop */
animation: marqueeScroll 22s linear infinite;

/* Mobile (≤768px) */
animation: marqueeScroll 4s linear infinite;
```

To change speed: lower duration = faster. To change text: edit both `<span class="marquee-content">` elements in `index.html` (they must stay identical for seamless looping).

---

## JavaScript Features

### Nav — hide on scroll down
Hides when scrolling down past 80px, reappears when scrolling up.
Remove the scroll listener block (lines ~187–197) to keep nav always visible.

### Parallax
Only active on non-touch devices (detected via `window.matchMedia('(hover: none)')`).
Add `data-parallax="0.X"` to any element — it moves at X × scroll speed.
Currently only the `.shape-wrapper` uses this (`data-parallax="0.1"`).

### Reveal on scroll
Add `class="reveal"` to any element to make it fade up into view when it enters the viewport. Uses IntersectionObserver with `threshold: 0.15`. Fires once only.

### Mobile hamburger menu
- Button `#hamburger` toggles class `.open` on itself and `#mobileMenu`
- Menu fades in via CSS opacity transition (display:flex set first, then class toggled on next frame)
- Body scroll locked while menu is open
- Closes when any `.mobile-link` is clicked

---

## Responsive Breakpoints

| Breakpoint | Changes                                                                 |
|------------|-------------------------------------------------------------------------|
| ≤1024px    | 3D shape shrinks to 330px                                               |
| ≤768px     | Nav links hidden → hamburger shown; 3D shape hidden; skills grid 2-col; projects grid 1-col; marquee 4s; contact links stack vertically |
| ≤480px     | Skills grid 1-col; tighter letter-spacing on headings                   |

---

## Deployment

The site is hosted on **GitHub Pages** from the `main` branch.
**Changes only go live after committing and pushing.**

```bash
git add index.html style.css script.js
git commit -m "Your message"
git push origin main
```

GitHub Pages rebuilds automatically — allow ~60 seconds for changes to appear.

---

## Things still to do
- Add real project images to `.project-image-inner` (currently placeholder grey boxes)
- Replace placeholder project titles and tags with real case study content
- Add a second real case study card when ready
- Update contact email / LinkedIn URL if needed
- Consider adding a CV/resume download link
