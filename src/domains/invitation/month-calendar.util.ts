import type { CalendarWeek } from './types/calendar-week.types';

const DAYS_PER_WEEK = 7;

// Builds Monday-first weeks for a month. UTC avoids time-zone drift, so the
// grid is identical on the server and in every visitor's browser.
export function buildMonthWeeks(year: number, monthIndex: number) {
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const leadingBlanks =
    (new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() + 6) % DAYS_PER_WEEK;
  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
  ];
  const trailingBlanks =
    (DAYS_PER_WEEK - (cells.length % DAYS_PER_WEEK)) % DAYS_PER_WEEK;
  cells.push(...Array.from({ length: trailingBlanks }, () => null));

  const weeks: CalendarWeek[] = [];
  for (let start = 0; start < cells.length; start += DAYS_PER_WEEK) {
    weeks.push(cells.slice(start, start + DAYS_PER_WEEK));
  }
  return weeks;
}
