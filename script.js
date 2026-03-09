// =====================
// 3D SHAPE ANIMATION
//
// PARAMETERS YOU CAN CHANGE:
//   NUM_RINGS       — how many rings to generate
//   BASE_SPEED      — average Y rotation speed per frame
//   SPEED_VARIATION — how much speed pulses (0 = constant)
//   BASE_TILT       — default X tilt angle in degrees
//   MOUSE_TILT      — how much mouse moves the tilt (0 = off)
//   LERP_SPEED      — how smoothly tilt follows mouse (0.01 slow → 0.1 snappy)
//   DRIFT_AMOUNT    — how much the shape slowly wanders organically
// =====================

const BASE_SPEED      = 0.25;
const SPEED_VARIATION = 0.18;
const BASE_TILT       = 15;
const MOUSE_TILT      = 12;
const LERP_SPEED      = 0.04;
const DRIFT_AMOUNT    = 8;

// ---- TIER SETTINGS ----
// Each tier defines a size class of rings.
// perAxis  — how many rings of this size orbit each axis (more = denser cluster)
// size     — fraction of the container (0.1 = tiny, 1.0 = full width)
// variance — random size variation within the tier
// speed    — individual orbit speed (small = fast, large = slow)
// thickness — border width in px
// opacity  — base opacity

const TIERS = [
  { perAxis: 5, size: 0.18, variance: 0.06, speed: 0.07,  thickness: 0.5, opacity: 0.4 },  // small, fast, many
  { perAxis: 3, size: 0.45, variance: 0.07, speed: 0.028, thickness: 1.0, opacity: 0.6 },  // medium
  { perAxis: 1, size: 0.80, variance: 0.08, speed: 0.008, thickness: 1.8, opacity: 0.85 }, // large, slow, few
];

// Number of axes to distribute rings around (evenly spaced from 0–180°)
const NUM_AXES = 5;

const shape = document.querySelector('.shape-3d');
const rings  = [];

for (let a = 0; a < NUM_AXES; a++) {
  // Spread axes evenly, with a small random wobble per axis
  const baseRotX = (a / NUM_AXES) * 180 + (Math.random() - 0.5) * 12;

  TIERS.forEach(tier => {
    for (let r = 0; r < tier.perAxis; r++) {
      const el = document.createElement('div');
      el.classList.add('ring');

      // Size varies slightly within the tier
      const size      = tier.size + (Math.random() - 0.5) * tier.variance * 2;
      const offset    = ((1 - size) / 2) * 100;

      // Each ring on the same axis has a slightly different rotX and evenly spread rotZ
      const rotX      = baseRotX + (Math.random() - 0.5) * 8;
      const rotZ      = (r / tier.perAxis) * 360 + (Math.random() - 0.5) * 20;

      // Speed varies ±30% within the tier; direction randomised per ring
      const direction = Math.random() > 0.5 ? 1 : -1;
      const speed     = tier.speed * (0.7 + Math.random() * 0.6) * direction;

      // Opacity varies slightly within the tier
      const opacity   = tier.opacity * (0.7 + Math.random() * 0.5);

      el.style.cssText = `
        width: ${size * 100}%;
        height: ${size * 100}%;
        top: ${offset}%;
        left: ${offset}%;
        opacity: ${Math.min(opacity, 1)};
        border-width: ${tier.thickness}px;
      `;

      shape.appendChild(el);
      rings.push({ el, rotX, rotZ, speed });
    }
  });
}

// Animation state
let angle        = 0;
let targetTiltX  = BASE_TILT;
let targetTiltZ  = 0;
let currentTiltX = BASE_TILT;
let currentTiltZ = 0;
let frame        = 0;

// Mouse tracking
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  targetTiltX = BASE_TILT + ((e.clientY - cy) / cy) * MOUSE_TILT;
  targetTiltZ =              ((e.clientX - cx) / cx) * (MOUSE_TILT * 0.5);
});

function animateShape() {
  frame++;

  // Y rotation with sine-wave speed variation
  angle += BASE_SPEED + Math.sin(angle * 0.015) * SPEED_VARIATION;

  // Organic drift: layered slow sine waves on tilt
  const drift  = Math.sin(frame * 0.007) * DRIFT_AMOUNT
               + Math.sin(frame * 0.013) * (DRIFT_AMOUNT * 0.4);
  const driftZ = Math.cos(frame * 0.009) * (DRIFT_AMOUNT * 0.5);

  // Lerp tilt toward mouse + drift target
  currentTiltX += (targetTiltX + drift  - currentTiltX) * LERP_SPEED;
  currentTiltZ += (targetTiltZ + driftZ - currentTiltZ) * LERP_SPEED;

  // Subtle scale breath
  const scale = 1 + Math.sin(frame * 0.018) * 0.03;

  shape.style.transform =
    `scale(${scale}) rotateY(${angle}deg) rotateX(${currentTiltX}deg) rotateZ(${currentTiltZ}deg)`;

  // Each ring orbits its own axis at its own speed
  rings.forEach(r => {
    r.rotZ += r.speed;
    r.el.style.transform = `rotateX(${r.rotX}deg) rotateZ(${r.rotZ}deg)`;
  });

  requestAnimationFrame(animateShape);
}

animateShape();


// =====================
// HAMBURGER MENU
// =====================

const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('open');
  mobileMenu.style.display = 'flex';
  // Small delay so display:flex kicks in before opacity transition
  requestAnimationFrame(() => mobileMenu.classList.toggle('open', isOpen));
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
  });
});


// =====================
// PARALLAX
// Disabled on touch devices to avoid scroll conflicts.
// Elements with data-parallax="0.2" move at 20% of scroll speed.
// =====================

const isTouchDevice = window.matchMedia('(hover: none)').matches;
const parallaxEls   = document.querySelectorAll('[data-parallax]');

function handleParallax() {
  if (isTouchDevice) return;
  const scrollY = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

window.addEventListener('scroll', handleParallax, { passive: true });


// =====================
// NAV — hides when scrolling down, reappears when scrolling up
// Remove this block if you want the nav always visible.
// =====================

const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 80) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
}, { passive: true });


// =====================
// REVEAL ON SCROLL
// Any element with class "reveal" fades in when it enters the viewport.
// Add class="reveal" to any element in HTML to use this.
// =====================

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // only animate once
    }
  });
}, {
  threshold: 0.15
});

revealEls.forEach(el => revealObserver.observe(el));
