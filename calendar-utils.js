export const SEASON_YEAR = 2026;

const monthPageByIndex = {
  4: '/may-calendar.html',
  5: '/june-calendar.html',
  6: '/july-calendar.html',
  7: '/august-calendar.html',
  8: '/september-calendar.html',
  9: '/october-calendar.html',
};

export function getCurrentDateParts() {
  const now = new Date();

  return {
    year: now.getFullYear(),
    monthIndex: now.getMonth(),
    day: now.getDate(),
  };
}

export function getTodayTarget() {
  const { year, monthIndex } = getCurrentDateParts();

  if (year < SEASON_YEAR || (year === SEASON_YEAR && monthIndex < 4)) {
    return '/may-calendar.html#may-month-grid';
  }

  if (year > SEASON_YEAR || (year === SEASON_YEAR && monthIndex > 9)) {
    return '/october-calendar.html#october-month-grid';
  }

  const page = monthPageByIndex[monthIndex];
  return page ? `${page}#current-day` : '/may-calendar.html#may-month-grid';
}

export function updateTodayLinks() {
  const target = getTodayTarget();
  document.querySelectorAll('[data-today-link]').forEach((link) => {
    link.setAttribute('href', target);
  });
}

export function scrollToCurrentDayIfNeeded() {
  if (window.location.hash !== '#current-day') {
    return;
  }

  requestAnimationFrame(() => {
    document.getElementById('current-day')?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  });
}
