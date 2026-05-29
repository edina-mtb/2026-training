import { getCurrentDateParts, scrollToCurrentDayIfNeeded } from './calendar-utils.js';

const STRENGTH_GUIDE_URL = './strength-guide.html';
const SKILLS_GUIDE_URL = 'https://www.edinacyclingteam.com/riding-skills--technique.html';

const octoberTrainingDays = [
  { day: 1, focus: 'Team practice support', detail: 'One purposeful session is enough as the taper begins.', tone: 'hard', tag: 'Support day' },
  { day: 2, focus: 'Recovery day', detail: 'Keep the load low and remove anything non-essential.', tone: 'recovery' },
  { day: 3, focus: 'Endurance ride', detail: 'Moderate endurance only. Finish feeling better than you started.', tone: 'endurance', tag: 'Planned long ride' },
  { day: 4, focus: 'Total rest', detail: 'Reset before State week.', tone: 'recovery' },
  { day: 5, focus: 'Strength maintenance', detail: 'Mobility and activation only. No heavy fatigue. <a class="calendar-day__focus-link" href="./strength-guide.html" target="_blank" rel="noreferrer">Strength guide</a>.', tone: 'strength' },
  { day: 6, focus: 'Short sharpening', detail: 'A few short race-pace efforts are enough.', tone: 'hard', tag: 'Sharpening' },
  { day: 7, focus: 'Easy ride + skills', detail: 'Short easy ride, smooth handling, and confidence-building skills.', tone: 'skills', tag: 'Skills day' },
  { day: 8, focus: 'Short sharpening', detail: 'One last crisp signal, then start backing off.', tone: 'hard', tag: 'Sharpening' },
  { day: 9, focus: 'Recovery day', detail: 'More recovery than work now.', tone: 'recovery' },
  { day: 10, focus: 'Openers', detail: 'Use Saturday as a bike shakeout, confirm no mechanical issues, and keep the legs crisp.', race: 'Optional course inspection at Redhead if the rider is willing to travel.', tone: 'skills', tag: 'Race prep' },
  { day: 11, focus: 'State Champs', detail: 'Sunday is the actual race day. Everything in the month serves this day.', race: 'State Championship: Redhead Mountain Bike Park.', tone: 'race', tag: 'A-race' },
  { day: 12, focus: 'Recovery + reset', detail: 'Recover physically and mentally after State.', tone: 'recovery' },
];

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentDate = getCurrentDateParts();
const toneLabel = { recovery: 'Recovery', strength: 'Strength', hard: 'Hard', skills: 'Skills', endurance: 'Endurance', team: 'Team', race: 'Race' };

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
  return (firstDay + 6) % 7;
}

function renderOctoberCalendar() {
  const root = document.querySelector('#october-month-grid');
  if (!root) return;

  const calendar = document.createElement('div');
  calendar.className = 'month-grid-card';
  const weekdayRow = document.createElement('div');
  weekdayRow.className = 'month-grid-weekdays';
  weekdayRow.innerHTML = weekdayLabels.map((label) => `<span>${label}</span>`).join('');
  const daysGrid = document.createElement('div');
  daysGrid.className = 'month-grid';

  const leadingDays = buildLeadingEmptyDays(2026, 9);
  const isCurrentMonth = currentDate.year === 2026 && currentDate.monthIndex === 9;
  const currentWeekIndex = isCurrentMonth ? Math.floor((leadingDays + currentDate.day - 1) / 7) : -1;

  for (let index = 0; index < leadingDays; index += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day calendar-day--empty';
    if (Math.floor(index / 7) === currentWeekIndex) emptyCell.classList.add('calendar-day--current-week');
    daysGrid.appendChild(emptyCell);
  }

  octoberTrainingDays.forEach((entry, index) => {
    const cell = document.createElement('article');
    cell.className = `calendar-day calendar-day--${entry.tone}`;
    const gridIndex = leadingDays + index;
    if (Math.floor(gridIndex / 7) === currentWeekIndex) cell.classList.add('calendar-day--current-week');
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
      ${entry.tag ? `<span class="calendar-day__tag calendar-day__tag--${entry.tone}">${entry.tag}</span>` : ''}
      ${entry.race ? `<div class="calendar-day__alternate calendar-day__alternate--race"><span>${entry.tone === 'race' ? 'Race focus' : 'Optional race'}</span><p>${entry.race}</p></div>` : ''}
    `;

    daysGrid.appendChild(cell);
  });

  calendar.appendChild(weekdayRow);
  calendar.appendChild(daysGrid);
  root.appendChild(calendar);
  scrollToCurrentDayIfNeeded();
}

renderOctoberCalendar();
