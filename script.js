// =====================
// 3D SHAPE ANIMATION
//
// PARAMETERS YOU CAN CHANGE:
//   BASE_SPEED      — average rotation speed in degrees per frame (higher = faster)
//   SPEED_VARIATION — how much the speed varies (0 = constant, higher = more pulsing)
//   BASE_TILT       — default X tilt in degrees (how much you see the top of the shape)
//   MOUSE_TILT      — how much the mouse moves the tilt (0 to disable mouse tracking)
//   LERP_SPEED      — how smoothly the tilt follows the mouse (0.01 = slow, 0.1 = snappy)
// =====================

const BASE_SPEED      = 0.3;
const SPEED_VARIATION = 0.15;
const BASE_TILT       = 15;
const MOUSE_TILT      = 10;
const LERP_SPEED      = 0.04;

const shape = document.querySelector('.shape-3d');
let angle        = 0;
let targetTiltX  = BASE_TILT;
let targetTiltZ  = 0;
let currentTiltX = BASE_TILT;
let currentTiltZ = 0;

// Mouse tracking — shape tilts subtly toward cursor
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  targetTiltX = BASE_TILT + ((e.clientY - cy) / cy) * MOUSE_TILT;
  targetTiltZ =              ((e.clientX - cx) / cx) * (MOUSE_TILT * 0.5);
});

function animateShape() {
  // Vary speed with a sine wave for subtle acceleration/deceleration
  angle += BASE_SPEED + Math.sin(angle * 0.015) * SPEED_VARIATION;

  // Smoothly interpolate tilt toward mouse target (lerp)
  currentTiltX += (targetTiltX - currentTiltX) * LERP_SPEED;
  currentTiltZ += (targetTiltZ - currentTiltZ) * LERP_SPEED;

  shape.style.transform =
    `rotateY(${angle}deg) rotateX(${currentTiltX}deg) rotateZ(${currentTiltZ}deg)`;

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
