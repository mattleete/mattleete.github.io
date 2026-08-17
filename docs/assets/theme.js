/* Shared behaviour for every portfolio page:
   - theme toggle (light/dark) with persistence + first-visit system preference
   - mobile hamburger nav
   - wave divider: fills the area above it once it pins (home page only)
   Include once per page: <script src="assets/theme.js"></script>
   Safe to load on pages that lack the toggle, hamburger or wave (null-guarded). */

(function () {
  const html = document.documentElement;

  // ─── THEME ───
  // First visit: honour the OS preference; afterwards: honour the saved choice.
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', saved || (systemDark ? 'dark' : 'light'));

  const themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ─── MOBILE HAMBURGER NAV ───
  // Assigned by the wave section below; a no-op on pages with no wave. The
  // click handlers only ever run after this whole script has, so by the time
  // one fires the real implementation is in place.
  let syncWavePin = () => {};

  const burger = document.querySelector('.nav-hamburger');
  const links  = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      syncWavePin();
    });
    links.addEventListener('click', e => {
      if (e.target.classList.contains('nav-link')) {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        syncWavePin();
      }
    });
  }

  // ─── WAVE DIVIDER FILL ───
  // The wave is sticky, so once it reaches its pin point it stops moving.
  // From then on we grow a block above it at exactly the scroll rate, so its
  // top edge keeps travelling up as if it had never pinned — leaving the whole
  // area above the wave filled in the wave's own colour. Capped once that top
  // edge clears the viewport, since there is nothing left to fill.
  const wave = document.querySelector('.wave-divider');
  if (wave) {
    let flowTop = 0;   // where the wave sits in the document, ignoring sticky

    const measure = () => {
      // Sticky offsets are applied at paint, so read the layout position with
      // stickiness momentarily disabled rather than trusting the live rect.
      const prev = wave.style.position;
      wave.style.position = 'static';
      flowTop = wave.getBoundingClientRect().top + window.scrollY;
      wave.style.position = prev;
    };

    const update = () => {
      const pinTop = parseFloat(getComputedStyle(wave).top) || 0;
      const max    = pinTop + wave.offsetHeight / 2;   // until the top edge exits
      const past   = window.scrollY - (flowTop - pinTop);
      wave.style.setProperty('--wave-fill', Math.min(Math.max(past, 0), max) + 'px');
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };

    // When the mobile menu opens, the wave would otherwise stay pinned at the
    // nav's edge and be cut across by the dropdown. Push its resting point down
    // to the bottom of the open menu instead, so it reads as the menu's lower
    // edge — the same way it underlines the bar when the menu is closed.
    // Closing removes the override, handing the offset back to the stylesheet.
    syncWavePin = () => {
      const navEl = document.querySelector('nav:not(.nav-links)');
      const menu  = document.querySelector('.nav-links');
      if (navEl && menu && menu.classList.contains('open')) {
        wave.style.setProperty('--wave-pin-offset',
          (navEl.offsetHeight + menu.offsetHeight) + 'px');
      } else {
        wave.style.removeProperty('--wave-pin-offset');
      }
      update();   // the fill's extent depends on where the wave now rests
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measure(); update(); syncWavePin(); });
  }
})();
