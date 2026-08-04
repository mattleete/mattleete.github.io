/* Shared behaviour for every portfolio page:
   - theme toggle (light/dark) with persistence + first-visit system preference
   - mobile hamburger nav
   Include once per page: <script src="assets/theme.js"></script>
   Safe to load on pages that lack the toggle or hamburger (null-guarded). */

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
  const burger = document.querySelector('.nav-hamburger');
  const links  = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    links.addEventListener('click', e => {
      if (e.target.classList.contains('nav-link')) {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
      }
    });
  }
})();
