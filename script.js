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
