import { SEASON_YEAR, getCurrentDateParts } from './calendar-utils.js';

const calendarMonths = [
  {
    month: 'May',
    range: 'Base Start',
    events: [
      {
        date: 'May 1',
        title: '500 Mile Club Opens',
        details: 'Start tracking season mileage and consistency.',
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
    events: [
      {
        date: 'Jun 6',
        title: 'Borah Epic Bike Fest',
        details: 'Optional endurance event with long-distance options.',
        type: 'endurance',
      },
      {
        date: 'Jun 10',
        title: 'Wirth on Wednesday',
        details: 'Short-course intensity and race repetition.',
        type: 'optional',
      },
      {
        date: 'Jun 27',
        title: 'Lutsen 99er',
        details: 'Big endurance test and confidence day.',
        type: 'endurance',
      },
    ],
  },
  {
    month: 'July',
    range: 'Team Phase',
    events: [
      {
        date: 'Jul 7',
        title: 'Official Practice Start',
        details: 'Team training officially begins.',
        type: 'required',
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
        details: 'Short-course race for intensity and skills.',
        type: 'optional',
      },
    ],
  },
  {
    month: 'August',
    range: 'Sharpen',
    events: [
      {
        date: 'Aug 16',
        title: 'Grand Rapids XC',
        details: 'Optional final prep race before A-races start.',
        type: 'optional',
      },
      {
        date: 'Aug 22-23',
        title: 'Race 1 • Austin',
        details: "Schindler's Way marks the first required weekend.",
        type: 'required',
      },
      {
        date: 'Aug 29-30',
        title: 'Race 2 • Shakopee',
        details: 'Second required MCA race weekend.',
        type: 'required',
      },
    ],
  },
  {
    month: 'September',
    range: 'Race Rhythm',
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
        details: 'Required MCA race at Lake Rebecca.',
        type: 'required',
      },
      {
        date: 'Sep 26-27',
        title: 'Race 4 • Minneapolis',
        details: 'Required weekend at Theodore Wirth Park.',
        type: 'required',
      },
    ],
  },
  {
    month: 'October',
    range: 'Peak',
    events: [
      {
        date: 'Oct 11-12',
        title: 'State Championship',
        details: 'Redhead Mountain Bike Park in Chisholm.',
        type: 'peak',
      },
    ],
  },
];

const tagLabel = {
  required: 'Required',
  optional: 'Optional',
  endurance: 'Endurance',
  peak: 'Peak',
};

function getCurrentSeasonPhase() {
  const { year, monthIndex } = getCurrentDateParts();

  console.log(`Current date: ${year}-${monthIndex + 1}`);
  
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
        <h3>${month.month}</h3>
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
