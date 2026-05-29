import { getCurrentDateParts, scrollToCurrentDayIfNeeded } from './calendar-utils.js';

const STRENGTH_GUIDE_URL = './strength-guide.html';
const SKILLS_GUIDE_URL = 'https://www.edinacyclingteam.com/riding-skills--technique.html';

const septemberTrainingDays = [
  { day: 1, focus: 'Recovery + reset', detail: 'Absorb late August racing and keep the opening of the month light.', tone: 'recovery' },
  { day: 2, focus: 'Easy ride + skills', detail: 'Short easy ride with one skills cue. Do not force extra work.', tone: 'skills', tag: 'Skills day' },
  { day: 3, focus: 'Team practice quality', detail: 'One measured hard signal is enough this week.', tone: 'hard', tag: 'Practice day' },
  { day: 4, focus: 'Recovery day', detail: 'Easy spin or full rest before the weekend.', tone: 'recovery' },
  { day: 5, focus: 'Endurance ride', detail: 'Keep the weekend aerobic if Callaway is not being used.', tone: 'endurance', tag: 'Planned long ride' },
  { day: 6, focus: 'Endurance ride or race-simulation workout', detail: 'If not racing, default to endurance and avoid residual fatigue going into Race 3 week.', race: 'Callaway XC. Optional only if it fits very cleanly.', tone: 'hard', tag: 'XC choice' },
  { day: 7, focus: 'Recovery + strength', detail: 'Start Race 3 week with less fatigue, not more. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.', tone: 'strength' },
  { day: 8, focus: 'Team practice quality', detail: 'Keep intensity short and supportive of the weekend.', tone: 'hard', tag: 'Practice day' },
  { day: 9, focus: 'Easy ride + skills', detail: 'Easy ride with a few handling cues. No extra load.', tone: 'skills', tag: 'Skills day' },
  { day: 10, focus: 'Team practice or easy support day', detail: 'Trim extra fatigue and keep the week moving toward Rockford.', tone: 'hard', tag: 'Race week' },
  { day: 11, focus: 'Recovery day', detail: 'Freshen up before the race weekend.', tone: 'recovery' },
  { day: 12, focus: 'Openers', detail: 'Use Saturday for a bike shakeout, confirm no mechanical issues, and keep the legs crisp but fresh.', race: 'Optional course inspection at Rockford if the rider is willing to travel.', tone: 'skills', tag: 'Race prep' },
  { day: 13, focus: 'Race 3', detail: 'Sunday is the actual race day. Let the whole weekend stay centered on Rockford.', race: 'Race 3: Rockford at Lake Rebecca Park Reserve.', tone: 'race', tag: 'A-race' },
  { day: 14, focus: 'Recovery + absorb', detail: 'Recover physically and mentally from the required weekend.', tone: 'recovery' },
  { day: 15, focus: 'Team practice quality', detail: 'Bring back enough intensity to stay sharp, not enough to bury the legs.', tone: 'hard', tag: 'Practice day' },
  { day: 16, focus: 'Easy ride + skills', detail: 'Short easy ride, smooth handling, and no pressure to add volume.', tone: 'skills', tag: 'Skills day' },
  { day: 17, focus: 'Team practice support', detail: 'Keep the work purposeful but not draining.', tone: 'hard', tag: 'Practice day' },
  { day: 18, focus: 'Recovery day', detail: 'Let the week settle before the weekend.', tone: 'recovery' },
  { day: 19, focus: 'Endurance ride', detail: 'Maintain aerobic support without making the day bigger than it needs to be.', tone: 'endurance', tag: 'Planned long ride' },
  { day: 20, focus: 'Total rest', detail: 'Stay patient between race weekends.', tone: 'recovery' },
  { day: 21, focus: 'Recovery + strength', detail: 'Mobility and light durability work only. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.', tone: 'strength' },
  { day: 22, focus: 'Team practice quality', detail: 'Use one measured quality signal, then begin trimming fatigue.', tone: 'hard', tag: 'Practice day' },
  { day: 23, focus: 'Easy ride + skills', detail: 'Easy ride and skills only. No extra midweek load.', tone: 'skills', tag: 'Skills day' },
  { day: 24, focus: 'Team practice or easy support day', detail: 'Keep the load clearly below normal as the race weekend approaches.', tone: 'hard', tag: 'Race week' },
  { day: 25, focus: 'Recovery day', detail: 'Freshen up before Theodore Wirth weekend.', tone: 'recovery' },
  { day: 26, focus: 'Openers', detail: 'Use Saturday for a bike shakeout, confirm no mechanical issues, and keep the effort short and crisp.', race: 'Optional course inspection at Theodore Wirth if the rider is willing to travel.', tone: 'skills', tag: 'Race prep' },
  { day: 27, focus: 'Race 5', detail: 'Sunday is race day. Keep the weekend focused on Theodore Wirth.', race: 'Race 5: Minneapolis at Theodore Wirth Park.', tone: 'race', tag: 'A-race' },
  { day: 28, focus: 'Recovery + reset', detail: 'Absorb the weekend and begin orienting toward October peak.', tone: 'recovery' },
  { day: 29, focus: 'Easy ride + skills', detail: 'Easy aerobic ride with one small technique reminder.', tone: 'skills', tag: 'Skills day' },
  { day: 30, focus: 'Team practice support', detail: 'Keep practices purposeful but not draining as the season heads toward October.', tone: 'hard', tag: 'Practice day' },
];

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentDate = getCurrentDateParts();
const toneLabel = { recovery: 'Recovery', strength: 'Strength', hard: 'Hard', skills: 'Skills', endurance: 'Endurance', team: 'Team', race: 'Race' };

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
      `<a class="calendar-day__focus-link" href="${SKILLS_GUIDE_URL}" target="_blank" rel="noreferrer">Skills</a>`
    );
  }

  return entry.focus;
}

function buildLeadingEmptyDays(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  return (firstDay + 6) % 7;
}

function renderSeptemberCalendar() {
  const root = document.querySelector('#september-month-grid');
  if (!root) return;

  const calendar = document.createElement('div');
  calendar.className = 'month-grid-card';
  const weekdayRow = document.createElement('div');
  weekdayRow.className = 'month-grid-weekdays';
  weekdayRow.innerHTML = weekdayLabels.map((label) => `<span>${label}</span>`).join('');
  const daysGrid = document.createElement('div');
  daysGrid.className = 'month-grid';

  const leadingDays = buildLeadingEmptyDays(2026, 8);
  const isCurrentMonth = currentDate.year === 2026 && currentDate.monthIndex === 8;
  const currentWeekIndex = isCurrentMonth ? Math.floor((leadingDays + currentDate.day - 1) / 7) : -1;

  for (let index = 0; index < leadingDays; index += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day calendar-day--empty';
    if (Math.floor(index / 7) === currentWeekIndex) emptyCell.classList.add('calendar-day--current-week');
    daysGrid.appendChild(emptyCell);
  }

  septemberTrainingDays.forEach((entry, index) => {
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

renderSeptemberCalendar();
