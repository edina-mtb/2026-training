import { getCurrentDateParts, scrollToCurrentDayIfNeeded } from './calendar-utils.js';

const STRENGTH_GUIDE_URL = 'https://www.edinacyclingteam.com/strength-training-guide-mtb-focus.html';
const SKILLS_GUIDE_URL = 'https://www.edinacyclingteam.com/riding-skills--technique.html';

const julyTrainingDays = [
  {
    day: 1,
    focus: 'Easy trail ride',
    detail: 'Keep the holiday week simple with an easy trail spin and one light skills cue.',
    tone: 'skills',
  },
  {
    day: 2,
    focus: 'Aerobic support',
    detail: 'Stay mostly aerobic and avoid forcing extra intensity during the holiday week.',
    tone: 'endurance',
  },
  {
    day: 3,
    focus: 'Recovery day',
    detail: 'Keep the day light or fully off so the weekend can stay endurance-focused.',
    tone: 'recovery',
  },
  {
    day: 4,
    focus: 'Endurance ride',
    detail: 'Use the holiday weekend for a steady aerobic ride rather than extra race-like intensity.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 5,
    focus: 'Total rest',
    detail: 'Recover and finish the independent pre-practice block cleanly.',
    tone: 'recovery',
  },
  {
    day: 6,
    focus: 'Strength maintenance',
    detail: 'Mobility, core, and durability work. Keep it maintenance-oriented, not fatiguing.',
    tone: 'strength',
  },
  {
    day: 7,
    focus: 'Team practice opener',
    detail: 'Official practice begins. Let team structure become the main weekday quality source.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 8,
    focus: 'Easy ride + skills',
    detail: 'Keep the ride easy and choose one skill to focus on. This is not a formal team practice day.',
    race: 'Wirth on Wednesday. Use it only if it replaces the day’s easy ride and skills focus.',
    tone: 'skills',
    tag: 'Skills day',
  },
  {
    day: 9,
    focus: 'Team practice or controlled hard day',
    detail: 'If practice is already the hard stimulus, keep this contained. Do not stack unnecessary quality.',
    race: 'Buck Hill Thursday Night Race Series. Use it only in place of the weekday hard effort.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 10,
    focus: 'Recovery day',
    detail: 'Easy spin or full rest before the weekend.',
    tone: 'recovery',
  },
  {
    day: 11,
    focus: 'Aerobic support',
    detail: 'If racing Sunday, keep Saturday endurance-oriented and not too heavy.',
    tone: 'endurance',
  },
  {
    day: 12,
    focus: 'Endurance ride or race-simulation workout',
    detail: 'If not racing, weekend defaults to endurance unless this was meant to be the hard simulation slot.',
    race: 'St. Croix Falls XC. Use it as the weekend race-simulation effort if attending.',
    tone: 'hard',
    tag: 'XC choice',
  },
  {
    day: 13,
    focus: 'Recovery + strength',
    detail: 'Flush the legs and keep any strength work short and maintenance-focused.',
    tone: 'strength',
  },
  {
    day: 14,
    focus: 'Team practice quality',
    detail: 'Let practice provide the main hard stimulus instead of adding a separate interval block.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 15,
    focus: 'Easy ride + skills',
    detail: 'Ride easy and spend the day on one handling or trail skill. This is not a formal team practice day.',
    tone: 'skills',
    tag: 'Skills day',
  },
  {
    day: 16,
    focus: 'Team practice or controlled hard day',
    detail: 'If practice load is already high, keep this under control and reduce added intensity.',
    race: 'Buck Hill Thursday Night Race Series. Use it only if it replaces the weekday hard effort.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 17,
    focus: 'Recovery day',
    detail: 'Short easy spin or complete rest before the weekend.',
    tone: 'recovery',
  },
  {
    day: 18,
    focus: 'Aerobic support',
    detail: 'Keep the weekend aerobic if Sunday becomes the race-simulation slot.',
    tone: 'endurance',
  },
  {
    day: 19,
    focus: 'Endurance ride or race-simulation workout',
    detail: 'If not racing, default back to endurance. If racing, let that become the main hard effort of the weekend.',
    race: 'Monticello XC. Use it only if recovery is under control and it is replacing the hard slot.',
    tone: 'hard',
    tag: 'XC choice',
  },
  {
    day: 20,
    focus: 'Recovery + strength',
    detail: 'Keep Monday light so the next practice block starts with decent legs.',
    tone: 'strength',
  },
  {
    day: 21,
    focus: 'Team practice quality',
    detail: 'Practice should again cover the main weekday hard stimulus.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 22,
    focus: 'Easy ride + skills',
    detail: 'Keep the ride easy and stay focused on one skill cue rather than adding extra work. This is not a formal team practice day.',
    race: 'Wirth on Wednesday. Use it only if it replaces the day’s easy ride and skills focus.',
    tone: 'skills',
    tag: 'Skills day',
  },
  {
    day: 23,
    focus: 'Team practice or controlled hard day',
    detail: 'Choose one hard focus for the week and keep the rest of the practice load honest.',
    race: 'Buck Hill Thursday Night Race Series. Do not combine it recklessly with a heavy practice week.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 24,
    focus: 'Recovery day',
    detail: 'Back off and let the week settle before the weekend.',
    tone: 'recovery',
  },
  {
    day: 25,
    focus: 'Endurance ride',
    detail: 'Lean the weekend back toward aerobic time if there is no race on deck.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 26,
    focus: 'Total rest',
    detail: 'Absorb the week and keep the transition into late July controlled.',
    tone: 'recovery',
  },
  {
    day: 27,
    focus: 'Strength maintenance',
    detail: 'Mobility, core, and durability. Keep the work light enough to support practice quality.',
    tone: 'strength',
  },
  {
    day: 28,
    focus: 'Team practice quality',
    detail: 'Let the team session be the week’s main quality signal.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 29,
    focus: 'Easy ride + skills',
    detail: 'Short easy ride with a skills emphasis. Do not chase extra volume, and do not treat this as team practice.',
    tone: 'skills',
    tag: 'Skills day',
  },
  {
    day: 30,
    focus: 'Team practice or controlled hard day',
    detail: 'If using this as a quality day, keep the rest of the week steady rather than excessive.',
    race: 'Buck Hill Thursday Night Race Series. Use it in place of interval work if selected.',
    tone: 'hard',
    tag: 'Practice day',
  },
  {
    day: 31,
    focus: 'Recovery day',
    detail: 'Absorb the month and arrive at August ready to sharpen.',
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
};

function renderFocus(entry) {
  if (entry.tone === 'strength') {
    return entry.focus.replace(
      /strength/i,
      `<a class="calendar-day__focus-link" href="${STRENGTH_GUIDE_URL}" target="_blank" rel="noreferrer">Strength</a>`
    );
  }

  if (entry.tone === 'skills') {
    return entry.focus.replace(
      /skills?/i,
      `<a class="calendar-day__focus-link" href="${SKILLS_GUIDE_URL}" target="_blank" rel="noreferrer">Skills</a>`
    );
  }

  return entry.focus;
}

function buildLeadingEmptyDays(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const normalized = (firstDay + 6) % 7;
  return normalized;
}

function renderJulyCalendar() {
  const root = document.querySelector('#july-month-grid');

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

  const leadingDays = buildLeadingEmptyDays(2026, 6);
  const isCurrentMonth = currentDate.year === 2026 && currentDate.monthIndex === 6;
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

  julyTrainingDays.forEach((entry, index) => {
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
              <span>Optional race</span>
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

renderJulyCalendar();
