import { updateTodayLinks } from './calendar-utils.js';

updateTodayLinks();

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.top-nav');

  if (!toggle || !nav) {
    return;
  }

  const mobileQuery = window.matchMedia('(max-width: 720px)');

  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function syncNavForViewport() {
    if (!mobileQuery.matches) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  mobileQuery.addEventListener('change', syncNavForViewport);
  syncNavForViewport();
}

initMobileNav();
