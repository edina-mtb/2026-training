import { SEASON_YEAR, getCurrentDateParts } from './calendar-utils.js';

const calendarMonths = [
  {
    month: 'May',
    range: 'Base Start',
    href: './may-calendar.html',
    events: [
      {
        date: 'May 1',
        title: '500 Mile Club',
        details: 'Start tracking season mileage. <br/> Join the <a href="https://www.strava.com/clubs/2098370" target="_blank" rel="noreferrer">Strava Team</a>',
        type: 'optional',
      },
      {
        date: 'May 17',
        title: 'River Falls XC',
        details: 'Minnesota MTB Race Series opener in Wisconsin.',
        type: 'optional',
      },
      {
        date: 'May 31',
        title: 'Chisholm XC',
        details: 'Optional XC race and early fitness check.',
        type: 'optional',
      },
    ],
  },
  {
    month: 'June',
    range: 'Build Begins',
    href: './june-calendar.html',
    events: [
      {
        date: 'Jun 6',
        title: 'Borah Epic Bike Fest',
        details: 'Optional endurance event with 18mi and 40mi options. <a href="https://www.birkie.com/bike/events/epic-bike-fest/" target="_blank" rel="noreferrer">More info here</a>.',
        type: 'endurance',
      },
      {
        date: 'Jun 13',
        title: 'Welch/Redwing Endurance Ride',
        details: 'Optional endurance event for high school riders.',
        type: 'team',
      },
      {
        date: 'Weekdays',
        title: 'WoW & Buck Races',
        details: 'Wirth on Wednesdays and Buck Thursdays kick off',
        type: 'optional',
      },
      {
        date: 'Jun 27',
        title: 'Lutsen 99er',
        details: 'Optional endurance event with 29mi, 45mi, 59mi, and 99mi options. <a href="https://www.lutsen99er.com/info-2/" target="_blank" rel="noreferrer">More info here</a>.',
        type: 'endurance',
      },
    ],
  },
  {
    month: 'July',
    range: 'Team Phase',
    href: './july-calendar.html',
    events: [
      {
        date: 'Jul 7',
        title: 'Official Practice Start',
        details: 'Team training officially begins.',
        type: 'team',
      },
      {
        date: 'July 8',
        title: 'Wirth on Wednesday',
        details: 'Event sponsored by Edina MTB!',
        type: 'team',
      },
      {
        date: 'Weekdays',
        title: 'WoW & Buck Races',
        details: 'Wirth on Wednesdays and Buck Thursdays continue',
        type: 'optional',
      },
      {
        date: 'Jul 12',
        title: 'St. Croix Falls XC',
        details: 'Optional XC simulation race.',
        type: 'optional',
      },
      {
        date: 'Jul 22',
        title: 'Wirth on Wednesday',
        details: 'Women & Non-Binary racen event -- come race or cheer.',
        type: 'team',
      },
    ],
  },
  {
    month: 'August',
    range: 'Sharpen',
    href: './august-calendar.html',
    events: [
      {
        date: 'Aug 7-9',
        title: 'Cuyuuna',
        details: 'Edina Team camping event hosted in Cuyuna.',
        type: 'team',
      },
      {
        date: 'Aug 16',
        title: 'Grand Rapids XC',
        details: 'Optional final prep race before A-races start.',
        type: 'optional',
      },
      {
        date: 'Aug 22-23',
        title: 'Race 1 • Austin',
        details: "Schindler's Way kicks off the season.",
        type: 'mca',
      },
      {
        date: 'Aug 29-30',
        title: 'Race 2 • Shakopee',
        details: 'Second MCA race and a course we know and love?',
        type: 'mca',
      },
    ],
  },
  {
    month: 'September',
    range: 'Race Rhythm',
    href: './september-calendar.html',
    events: [
      {
        date: 'Sep 6',
        title: 'Callaway XC',
        details: 'Optional race with care around A-race recovery.',
        type: 'optional',
      },
      {
        date: 'Sep 12-13',
        title: 'Race 3 • Rockford',
        details: 'Third MCA race at Lake Rebecca.',
        type: 'mca',
      },
      {
        date: 'Sep 26-27',
        title: 'Race 4 • Minneapolis',
        details: 'Fourth MCA race at Theodore Wirth Park.',
        type: 'mca',
      },
    ],
  },
  {
    month: 'October',
    range: 'Peak',
    href: './october-calendar.html',
    events: [
      {
        date: 'Oct 11-12',
        title: 'State Championship',
        details: 'Redhead Mountain Bike Park in Chisholm.',
        type: 'mca',
      },
    ],
  },
];

const tagLabel = {
  required: 'Required',
  optional: 'Optional',
  endurance: 'Endurance',
  team: 'Team',
  mca: 'MCA Race',
};

function getCurrentSeasonPhase() {
  const { year, monthIndex } = getCurrentDateParts();

  if (year < SEASON_YEAR || (year === SEASON_YEAR && monthIndex <= 5)) {
    return 'base';
  }

  if (year === SEASON_YEAR && monthIndex === 6) {
    return 'build';
  }

  if (year === SEASON_YEAR && monthIndex === 7) {
    return 'sharpen';
  }

  return 'peak';
}

function updateSeasonArc() {
  const activePhase = getCurrentSeasonPhase();
  const seasonItems = document.querySelectorAll('[data-season-phase]');

  seasonItems.forEach((item) => {
    item.classList.toggle('is-active', item.dataset.seasonPhase === activePhase);
  });
}

const calendarRoot = document.querySelector('#calendar-grid');

if (calendarRoot) {
  const grid = document.createElement('div');
  grid.className = 'calendar-grid';

  calendarMonths.forEach((month) => {
    const monthCard = document.createElement('section');
    monthCard.className = 'calendar-month';

    monthCard.innerHTML = `
      <div class="calendar-month__header">
        <h3><a class="calendar-month__link" href="${month.href}">${month.month}</a></h3>
        <span class="calendar-month__range">${month.range}</span>
      </div>
      <div class="calendar-events">
        ${month.events
          .map(
            (event) => `
              <article class="calendar-event">
                <div class="calendar-event__meta">
                  <span class="calendar-event__date">${event.date}</span>
                  <span class="calendar-event__tag calendar-event__tag--${event.type}">
                    ${tagLabel[event.type]}
                  </span>
                </div>
                <strong>${event.title}</strong>
                <p>${event.details}</p>
              </article>
            `
          )
          .join('')}
      </div>
    `;

    grid.appendChild(monthCard);
  });

  calendarRoot.appendChild(grid);
}

updateSeasonArc();
