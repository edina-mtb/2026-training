import { getCurrentDateParts, scrollToCurrentDayIfNeeded } from './calendar-utils.js';

const STRENGTH_GUIDE_URL = './strength-guide.html';
const SKILLS_GUIDE_URL = './skills-guide.html';

const augustTrainingDays = [
  {
    day: 1,
    focus: 'Aerobic support',
    detail: 'Keep the weekend mostly aerobic unless Mankato is being used as the race-simulation slot.',
    tone: 'endurance',
  },
  {
    day: 2,
    focus: 'Endurance ride or race-simulation workout',
    detail: 'If not racing, default to endurance. If racing, let that become the main hard signal of the weekend.',
    race: 'Mankato XC. Use it to replace the race-simulation slot if it supports sharpening.',
    tone: 'hard',
    tag: 'XC choice',
  },
  {
    day: 3,
    focus: 'Recovery + strength',
    detail: 'Flush the legs and keep any strength work minimal and maintenance-oriented. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'strength',
  },
  {
    day: 4,
    focus: 'Team practice quality',
    detail: 'Practice remains the main weekday hard stimulus.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 5,
    focus: 'Easy ride + skills',
    detail: 'Keep the ride easy and use the day for skills and handling work. This is not a formal team practice day.',
    race: 'Wirth on Wednesday. Use it only if it replaces the day’s easy ride and skills focus.',
    tone: 'skills',
    tag: 'Skills day',
  },
  {
    day: 6,
    focus: 'Team practice or controlled hard day',
    detail: 'Keep the load selective and avoid stacking multiple midweek hard touches.',
    race: 'Buck Hill Thursday Night Race Series. Use it only in place of hard work.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 7,
    focus: 'Cuyuna',
    detail: 'Team event in Cuyuna.',
    tone: 'team',
    tag: 'Mandatory Fun',
  },
  {
    day: 8,
    focus: 'Cuyuna',
    detail: 'Team event in Cuyuna.',
    tone: 'team',
    tag: 'Mandatory Fun',
  },
  {
    day: 9,
    focus: 'Cuyuna',
    detail: 'Team event in Cuyuna.',
    tone: 'team',
    tag: 'Mandatory Fun',
  },
  {
    day: 10,
    focus: 'Strength maintenance',
    detail: 'Mobility, activation, and durability work only. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'strength',
  },
  {
    day: 11,
    focus: 'Team practice quality',
    detail: 'Short, race-relevant intensity and handling under pressure.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 12,
    focus: 'Easy ride + skills',
    detail: 'Ride easy and work on repeatable trail skills without adding unnecessary volume. This is not a formal team practice day.',
    tone: 'skills',
    tag: 'Skills day',
  },
  {
    day: 13,
    focus: 'Team practice or Buck Hill Race',
    detail: 'A great opportunity to get a race in ahead of the first MCA in Austin.',
    race: 'Buck Hill Thursday Night Race Series.',
    tone: 'team',
    tag: 'Practice day',
  },
  {
    day: 14,
    focus: 'Recovery day',
    detail: 'Back off before the final optional XC opportunity.',
    tone: 'recovery',
  },
  {
    day: 15,
    focus: 'Aerobic support',
    detail: 'Keep Saturday controlled if Grand Rapids is being used Sunday.',
    tone: 'endurance',
  },
  {
    day: 16,
    focus: 'Endurance ride or race-simulation workout',
    detail: 'If not racing, keep the weekend aerobic unless the athlete explicitly needed race simulation.',
    race: 'Grand Rapids XC. Use it to replace the race-simulation slot if selected.',
    tone: 'hard',
    tag: 'XC choice',
  },
  {
    day: 17,
    focus: 'Recovery + strength',
    detail: 'Start A-race week by reducing fatigue rather than adding to it. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'strength',
  },
  {
    day: 18,
    focus: 'Team practice quality',
    detail: 'Keep intensity sharp but measured as Race 1 approaches.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 19,
    focus: 'Easy ride + skills',
    detail: 'Keep the ride light and race-supportive during A-race week. This is not a formal team practice day.',
    race: 'Wirth on Wednesday. Usually skip it or ride very conservatively during Race 1 week.',
    tone: 'skills',
    tag: 'Race week',
  },
  {
    day: 20,
    focus: 'Team practice / controlled easy day',
    detail: 'Protect freshness for Austin and keep the load clearly below normal.',
    race: 'Buck Hill Thursday Night Race Series. Use only if it does not interfere with Race 1.',
    tone: 'hard',
    tag: 'Race week',
  },
  {
    day: 21,
    focus: 'Recovery day',
    detail: 'Freshen up and travel into the weekend with good legs.',
    tone: 'recovery',
  },
  {
    day: 22,
    focus: 'Openers',
    detail: 'Use Saturday as a bike shakeout, confirm there are no mechanical issues, and keep the legs fresh rather than tired.',
    race: 'Optional course inspection at Austin.',
    tone: 'skills',
    tag: 'Race prep',
  },
  {
    day: 23,
    focus: 'Race 1',
    detail: 'Sunday is race day! Fuel accordingly.',
    race: 'Race 1: Austin at Schindler’s Way.',
    tone: 'race',
    tag: 'A-race',
  },
  {
    day: 24,
    focus: 'Recovery + reset',
    detail: 'Recover from Race 1 before thinking about the next sharpening step.',
    tone: 'recovery',
  },
  {
    day: 25,
    focus: 'Team practice quality',
    detail: 'Bring back short, race-relevant quality without burying the legs after Austin.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 26,
    focus: 'Easy ride + skills',
    detail: 'Skills and support work only. Keep the ride easy as the week moves toward Shakopee. This is not a formal team practice day.',
    tone: 'skills',
    tag: 'Skills day',
  },
  {
    day: 27,
    focus: 'Team practice / controlled easy day',
    detail: 'Use caution here. The goal is to arrive at Race 2 ready, not squeezed dry.',
    race: 'Buck Hill Thursday Night Race Series. Use cautiously, Shakopee Race is approaching.',
    tone: 'hard',
    tag: 'Race week',
  },
  {
    day: 28,
    focus: 'Recovery day',
    detail: 'Back off before the second required weekend.',
    tone: 'recovery',
  },
  {
    day: 29,
    focus: 'Openers',
    detail: 'Use Saturday as a bike shakeout, confirm the bike is race-ready, and keep the effort short and crisp.',
    race: 'Optional course inspection at Shakopee if the rider is willing to travel. Keep it easy and use it to build familiarity, not fatigue.',
    tone: 'skills',
    tag: 'Race prep',
  },
  {
    day: 30,
    focus: 'Race 2',
    detail: 'Sunday is race day! Fuel accordingly.',
    race: 'Race 2: Shakopee at Xcel Energy Mountain Bike Park.',
    tone: 'race',
    tag: 'A-race',
  },
  {
    day: 31,
    focus: 'Recovery + absorb',
    detail: 'Recover from the opening race block and get ready for the next stretch of the season.',
    tone: 'recovery',
  },
];

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentDate = getCurrentDateParts();
const toneLabel = {
  recovery: 'Recovery',
  strength: 'Strength',
  hard: 'Hard',
  skills: 'Skills',
  endurance: 'Endurance',
  team: 'Team',
  race: 'Race',
};

function renderFocus(entry) {
  if (entry.tone === 'strength') {
    return entry.focus.replace(
      /strength/i,
      `<a class="calendar-day__focus-link" href="${STRENGTH_GUIDE_URL}">Strength</a>`
    );
  }

  if (entry.tone === 'skills') {
    return entry.focus.replace(
      /skills?/i,
      `<a class="calendar-day__focus-link" href="${SKILLS_GUIDE_URL}">Skills</a>`
    );
  }

  return entry.focus;
}

function buildLeadingEmptyDays(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const normalized = (firstDay + 6) % 7;
  return normalized;
}

function renderAugustCalendar() {
  const root = document.querySelector('#august-month-grid');

  if (!root) {
    return;
  }

  const calendar = document.createElement('div');
  calendar.className = 'month-grid-card';

  const weekdayRow = document.createElement('div');
  weekdayRow.className = 'month-grid-weekdays';
  weekdayRow.innerHTML = weekdayLabels.map((label) => `<span>${label}</span>`).join('');

  const daysGrid = document.createElement('div');
  daysGrid.className = 'month-grid';

  const leadingDays = buildLeadingEmptyDays(2026, 7);
  const isCurrentMonth = currentDate.year === 2026 && currentDate.monthIndex === 7;
  const currentWeekIndex = isCurrentMonth
    ? Math.floor((leadingDays + currentDate.day - 1) / 7)
    : -1;

  for (let index = 0; index < leadingDays; index += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day calendar-day--empty';
    if (Math.floor(index / 7) === currentWeekIndex) {
      emptyCell.classList.add('calendar-day--current-week');
    }
    daysGrid.appendChild(emptyCell);
  }

  augustTrainingDays.forEach((entry, index) => {
    const cell = document.createElement('article');
    cell.className = `calendar-day calendar-day--${entry.tone}`;
    const gridIndex = leadingDays + index;

    if (Math.floor(gridIndex / 7) === currentWeekIndex) {
      cell.classList.add('calendar-day--current-week');
    }

    if (isCurrentMonth && entry.day === currentDate.day) {
      cell.classList.add('calendar-day--current-day');
      cell.id = 'current-day';
    }

    cell.innerHTML = `
      <div class="calendar-day__header">
        <span class="calendar-day__date">${entry.day}</span>
        <span class="calendar-day__tone calendar-day__tone--${entry.tone}">${toneLabel[entry.tone]}</span>
      </div>
      <h3>${renderFocus(entry)}</h3>
      <p>${entry.detail}</p>
      ${
        entry.tag
          ? `<span class="calendar-day__tag calendar-day__tag--${entry.tone}">${entry.tag}</span>`
          : ''
      }
      ${
        entry.race
          ? `
            <div class="calendar-day__alternate calendar-day__alternate--race">
              <span>${entry.tone === 'race' ? 'Race focus' : 'Optional race'}</span>
              <p>${entry.race}</p>
            </div>
          `
          : ''
      }
    `;

    daysGrid.appendChild(cell);
  });

  calendar.appendChild(weekdayRow);
  calendar.appendChild(daysGrid);
  root.appendChild(calendar);
  scrollToCurrentDayIfNeeded();
}

renderAugustCalendar();
