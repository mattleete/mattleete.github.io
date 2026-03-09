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

const NUM_RINGS       = 12;
const BASE_SPEED      = 0.25;
const SPEED_VARIATION = 0.18;
const BASE_TILT       = 15;
const MOUSE_TILT      = 12;
const LERP_SPEED      = 0.04;
const DRIFT_AMOUNT    = 8;

const shape = document.querySelector('.shape-3d');

// Generate rings with randomised properties
const rings = [];

for (let i = 0; i < NUM_RINGS; i++) {
  const el = document.createElement('div');
  el.classList.add('ring');

  // Random initial angles
  const rotX = Math.random() * 180;
  const rotZ = Math.random() * 180;

  // Random size: 50% to 110% of the container
  const size = 0.5 + Math.random() * 0.6;
  const offset = ((1 - size) / 2) * 100;

  // Random visual properties
  const opacity   = 0.15 + Math.random() * 0.85;
  const thickness = 0.4  + Math.random() * 1.8;

  // Random individual drift speed and direction
  const driftSpeed = (Math.random() - 0.5) * 0.025;
  const driftPhase = Math.random() * Math.PI * 2;

  el.style.cssText = `
    width: ${size * 100}%;
    height: ${size * 100}%;
    top: ${offset}%;
    left: ${offset}%;
    opacity: ${opacity};
    border-width: ${thickness}px;
  `;

  shape.appendChild(el);
  rings.push({ el, rotX, rotZ, driftSpeed, driftPhase });
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

  // Each ring drifts individually on its own axis
  rings.forEach((r, i) => {
    r.rotZ += r.driftSpeed + Math.sin(frame * 0.01 + r.driftPhase) * 0.01;
    r.el.style.transform = `rotateX(${r.rotX}deg) rotateZ(${r.rotZ}deg)`;
  });

  requestAnimationFrame(animateShape);
}

animateShape();


// =====================
// PARALLAX
// Elements with data-parallax="0.2" move at 20% of scroll speed.
// Higher number = more movement. Set to 0 to disable for an element.
// =====================

const parallaxEls = document.querySelectorAll('[data-parallax]');

function handleParallax() {
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
