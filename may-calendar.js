import { getCurrentDateParts, scrollToCurrentDayIfNeeded } from './calendar-utils.js';

const STRENGTH_GUIDE_URL = './strength-guide.html';
const SKILLS_GUIDE_URL = './skills-guide.html';

const mayTrainingDays = [
  {
    day: 1,
    focus: 'Skills / flow',
    detail: 'Easy spin, relaxed trail time, and cornering practice. Keep the opening day light.',
    tone: 'skills',
  },
  {
    day: 2,
    focus: 'Endurance ride',
    detail: 'Start the month with an aerobic ride at conversational pace.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 3,
    focus: 'Total rest',
    detail: 'Sleep in, stretch, and get the bike ready for the first full training week.',
    tone: 'recovery',
  },
  {
    day: 4,
    focus: 'Off-bike strength',
    detail: 'Bodyweight squats, planks, mobility, and stretching. No riding. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'strength',
  },
  {
    day: 5,
    focus: 'Hard workout 1',
    detail: 'Short, fast hills or sprint efforts for VO2 max. Keep the efforts sharp.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 6,
    focus: 'Easy trail ride',
    detail: 'Ride local trail easy and choose one skill to focus on.',
    tone: 'skills',
  },
  {
    day: 7,
    focus: 'Hard workout 2',
    detail: 'Longer steady-hard efforts that feel like race simulation.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 8,
    focus: 'Skills / flow',
    detail: 'Easy spin and smooth cornering. Keep the effort light.',
    tone: 'skills',
  },
  {
    day: 9,
    focus: 'Endurance ride',
    detail: 'The big ride: 1.0 to 2.0 hours in zone 2, easy enough to chat.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 10,
    focus: 'Total rest',
    detail: 'No riding. Recover fully before the next build week.',
    tone: 'recovery',
  },
  {
    day: 11,
    focus: 'Off-bike strength',
    detail: 'Bodyweight strength, planks, and stretching. No riding. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'strength',
  },
  {
    day: 12,
    focus: 'Hard workout 1',
    detail: 'VO2 hills or short sprint efforts with full recovery between repetitions.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 13,
    focus: 'Easy trail ride',
    detail: 'Local trail ride with one specific skill focus.',
    tone: 'skills',
  },
  {
    day: 14,
    focus: 'Hard workout 2',
    detail: 'Longer steady-hard race-simulation work. Keep it controlled, not reckless.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 15,
    focus: 'Skills / flow',
    detail: 'Easy trail spin and cornering practice.',
    tone: 'skills',
  },
  {
    day: 16,
    focus: 'Endurance ride',
    detail: 'Keep the ride aerobic and let it support the full week.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 17,
    focus: 'Total rest',
    detail: 'If you are not racing, keep Sunday as total rest and absorb the work.',
    race: 'River Falls XC. Use it as the week’s hard race-simulation effort if attending.',
    tone: 'recovery',
    tag: 'Rest day',
  },
  {
    day: 18,
    focus: 'Off-bike strength',
    detail: 'Return to mobility, core, and bodyweight work if fatigue is under control. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'strength',
  },
  {
    day: 19,
    focus: 'Hard workout 1',
    detail: 'Short fast efforts, but shorten the session if race fatigue is still hanging around.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 20,
    focus: 'Easy trail ride',
    detail: 'Keep the ride easy and focus on one technique cue.',
    tone: 'skills',
  },
  {
    day: 21,
    focus: 'Hard workout 2',
    detail: 'Resume the steady-hard race-simulation session if recovery is good.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 22,
    focus: 'Skills / flow',
    detail: 'Relaxed ride, smooth handling, and no forced effort.',
    tone: 'skills',
  },
  {
    day: 23,
    focus: 'Endurance ride',
    detail: 'Stay mostly aerobic and keep the ride repeatable.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 24,
    focus: 'Total rest',
    detail: 'Recover and set up the final week of the month.',
    tone: 'recovery',
  },
  {
    day: 25,
    focus: 'Off-bike strength',
    detail: 'Bodyweight squats, planks, stretching, and mobility. No riding. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'strength',
  },
  {
    day: 26,
    focus: 'Hard workout 1',
    detail: 'Short fast hills or sprint efforts, but do not force extra volume late in the month.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 27,
    focus: 'Easy trail ride',
    detail: 'Keep the ride calm and skill-focused.',
    tone: 'skills',
  },
  {
    day: 28,
    focus: 'Hard workout 2',
    detail: 'Steady-hard race-simulation work. Let this be the primary quality session if racing Sunday.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 29,
    focus: 'Skills / flow',
    detail: 'Easy spin and smooth cornering before the weekend.',
    tone: 'skills',
  },
  {
    day: 30,
    focus: 'Endurance ride',
    detail: 'Keep Saturday aerobic if Sunday may become a race day.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 31,
    focus: 'Total rest',
    detail: 'If you are not racing, stay off the bike and finish May fresh.',
    race: 'Chisholm XC. Use it as the week’s hard race-simulation effort if attending.',
    tone: 'recovery',
    tag: 'Rest day',
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

function renderMayCalendar() {
  const root = document.querySelector('#may-month-grid');

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

  const leadingDays = buildLeadingEmptyDays(2026, 4);
  const isCurrentMonth = currentDate.year === 2026 && currentDate.monthIndex === 4;
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

  mayTrainingDays.forEach((entry, index) => {
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

renderMayCalendar();
