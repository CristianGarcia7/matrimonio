import type { CalendarWeek } from '../../types/calendar-week.types';
import { HeartShape } from '../atoms/heart-shape';

interface WeekdayName {
  short: string;
  full: string;
}

interface MonthCalendarProps {
  title: string;
  ariaLabel: string;
  weekdays: readonly WeekdayName[];
  weeks: CalendarWeek[];
  highlightedDay: number;
  highlightedDayLabel: string;
}

export function MonthCalendar({
  title,
  ariaLabel,
  weekdays,
  weeks,
  highlightedDay,
  highlightedDayLabel
}: MonthCalendarProps) {
  return (
    <table className="month-calendar" aria-label={ariaLabel}>
      <caption className="month-calendar__title">{title}</caption>
      <thead>
        <tr>
          {weekdays.map(weekday => (
            <th
              key={weekday.short}
              scope="col"
              className="month-calendar__weekday"
            >
              <abbr title={weekday.full}>{weekday.short}</abbr>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map(week => (
          <tr key={week.find(day => day !== null)}>
            {week.map((day, index) => (
              <td key={index} className="month-calendar__cell">
                {day === highlightedDay ? (
                  <span className="month-calendar__day month-calendar__day--highlighted">
                    <HeartShape className="month-calendar__heart" />
                    <span className="month-calendar__number" aria-hidden="true">
                      {day}
                    </span>
                    <span className="sr-only">{highlightedDayLabel}</span>
                  </span>
                ) : (
                  day !== null && (
                    <span className="month-calendar__day">{day}</span>
                  )
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
