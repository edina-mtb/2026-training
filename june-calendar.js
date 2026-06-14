import { getCurrentDateParts, scrollToCurrentDayIfNeeded } from './calendar-utils.js';
const juneTrainingDays = [
  {
    day: 1,
    focus: 'Aerobic reset',
    detail: 'Easy spin or rest plus light mobility to start the month controlled.',
    tone: 'recovery',
  },
  {
    day: 2,
    focus: 'Interval day',
    detail: '5 x 3 min moderate-hard efforts with full recovery. Keep it measured.',
    tone: 'hard',
  },
  {
    day: 3,
    focus: 'Easy ride + skills',
    detail: 'Cornering, braking, and body position at low stress.',
    tone: 'skills',
  },
  {
    day: 4,
    focus: 'Interval workout',
    detail: 'Short hill repeats or sprint efforts. This is the planned hard session for the week.',
    race: 'Buck Hill Thursday Night Race Series. Use it in place of the interval slot if attending.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 5,
    focus: 'Recovery day',
    detail: 'Rest or short recovery spin before the weekend.',
    tone: 'recovery',
  },
  {
    day: 6,
    focus: 'Endurance ride',
    detail: 'Complete a steady long aerobic ride at conversational pace.',
    race: 'Borah Epic Bike Fest. Use it in place of the endurance ride if attending.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 7,
    focus: 'Endurance support',
    detail: 'Keep the weekend mostly aerobic and avoid adding extra intensity after Borah.',
    tone: 'endurance',
  },
  {
    day: 8,
    focus: 'Recovery + strength',
    detail: 'Mobility, core, and easy spinning only if legs feel good. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'recovery',
  },
  {
    day: 9,
    focus: 'Interval day',
    detail: 'Race-prep efforts or short hill repeats. Stop before form falls apart. <br/><br/>  Limit these to openers if doing Wow or Buck.',
    tone: 'hard',
  },
  {
    day: 10,
    focus: 'Interval workout',
    detail: 'Complete the planned hard session if this is your chosen quality day for the week.',
    race: 'Wirth on Wednesday. Use it instead of the interval day if attending.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 11,
    focus: 'Aerobic support or interval replacement',
    detail: 'If Wednesday was the hard event, keep this day easy with skills. <br/></br> If this is the chosen hard day, perform nterval session or race Buck.',
    race: 'Buck Hill Thursday Night Race Series. Choose one primary hard event this week, not both.',
    tone: 'skills',
    tag: 'Choice week',
  },
  {
    day: 12,
    focus: 'Recovery day',
    detail: 'Short easy spin or full rest before the weekend.',
    tone: 'recovery',
  },
  {
    day: 13,
    focus: 'Endurance',
    detail: 'Redwing/Welch team endurance ride or pre-race spin if doing Detroit Lakes XC.',
    tone: 'team',
    tag: 'endurance',
  },
  {
    day: 14,
    focus: 'Endurance or Race',
    detail: 'If this weekend is not a race weekend for the rider, default to endurance -- otherwise rip Detroit Lakes!',
    race: 'Detroit Lakes XC. If attending, it becomes the week’s hard race-simulation effort.',
    tone: 'hard',
    tag: 'XC choice',
  },
  {
    day: 15,
    focus: 'Recovery + strength',
    detail: 'Light strength and mobility. Keep fatigue low. <a class="calendar-day__focus-link" href="./strength-guide.html">Strength guide</a>.',
    tone: 'recovery',
  },
  {
    day: 16,
    focus: 'Controlled interval day',
    detail: '3 to 4 race-pace hill efforts with full recovery. Limit effort to just openers if racing WOW.',
    tone: 'hard',
  },
  {
    day: 17,
    focus: 'Race or Easy ride + skills',
    detail: 'Cornering and trail flow under low fatigue.',
    race: 'Wirth on Wednesday. Use it instead of the interval day if attending.',
    tone: 'hard',
    tag: 'Optional Race',
  },
  {
    day: 18,
    focus: 'Interval workout',
    detail: 'Use the normal interval or hill session here if this is your chosen hard touch for the week.',
    race: 'Buck Hill Thursday Night Race Series. Use it in place of the interval slot if attending.',
    tone: 'hard',
    tag: 'Planned hard day',
  },
  {
    day: 19,
    focus: 'Recovery day',
    detail: 'Easy spin or rest before the weekend.',
    tone: 'recovery',
  },
  {
    day: 20,
    focus: 'Endurance support',
    detail: 'Steady aerobic riding if skipping Rochester. Keep the effort controlled.',
    tone: 'endurance',
  },
  {
    day: 21,
    focus: 'Race-simulation workout or endurance',
    detail: 'If not using Rochester as the quality stimulus, keep the weekend endurance-based unless it was specifically planned as the hard effort.',
    race: 'Rochester XC. Use it only if recovery supports quality and it is replacing the hard workout.',
    tone: 'hard',
    tag: 'XC choice',
  },
  {
    day: 22,
    focus: 'Recovery + mobility',
    detail: 'Flush the legs and keep volume low after the weekend.',
    tone: 'recovery',
  },
  {
    day: 23,
    focus: 'Interval day',
    detail: 'One short sharpening session only if Lutsen is not the week’s main focus.',
    tone: 'hard',
  },
  {
    day: 24,
    focus: 'Compact interval workout or easy day',
    detail: 'A short quality session works here only if Lutsen is not the main load for the week.',
    race: 'Wirth on Wednesday. Use it instead of the interval workout if attending.',
    tone: 'hard',
    tag: 'Choice week',
  },
  {
    day: 25,
    focus: 'Easy aerobic support or interval replacement',
    detail: 'If Lutsen is the weekend focus, keep this day light w/ a few openers. <br/><br/>If this is the chosen hard event, follow interval plan or race Buck.',
    race: 'Buck Hill Thursday Night Race Series. Do not stack it aggressively with Lutsen.',
    tone: 'hard',
    tag: 'Choice week',
  },
  {
    day: 26,
    focus: 'Recovery day',
    detail: 'Rest, hydration, and prep for the weekend. <br/><br/>Dial your bike if racing Saturday',
    tone: 'recovery',
  },
  {
    day: 27,
    focus: 'Long endurance ride',
    detail: 'Complete the planned long steady endurance ride and let it drive the week.',
    race: 'Lutsen 99er. Optional endurance event with 29mi, 45mi, 59mi, and 99mi options. <a href="https://www.lutsen99er.com/info-2/" target="_blank" rel="noreferrer">More info here</a>.',
    tone: 'endurance',
    tag: 'Planned long ride',
  },
  {
    day: 28,
    focus: 'Aerobic recovery',
    detail: 'Easy spin, skills touch, or full rest depending on Saturday load.',
    tone: 'recovery',
  },
  {
    day: 29,
    focus: 'Transition day',
    detail: 'Easy aerobic work only. Start the move toward July with freshness.',
    tone: 'recovery',
  },
  {
    day: 30,
    focus: 'Skills touch',
    detail: 'Short ride with technique work if riders are fresh. No forced load.',
    tone: 'skills',
  },
];

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentDate = getCurrentDateParts();
const toneLabel = {
  recovery: 'Recovery',
  hard: 'Hard',
  skills: 'Skills',
  endurance: 'Endurance',
  team: 'Team',
};

function buildLeadingEmptyDays(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const normalized = (firstDay + 6) % 7;
  return normalized;
}

function renderJuneCalendar() {
  const root = document.querySelector('#june-month-grid');

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

  const leadingDays = buildLeadingEmptyDays(2026, 5);
  const isCurrentMonth = currentDate.year === 2026 && currentDate.monthIndex === 5;
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

  juneTrainingDays.forEach((entry, index) => {
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
      <h3>${entry.focus}</h3>
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

renderJuneCalendar();
