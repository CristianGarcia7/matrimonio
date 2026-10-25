interface EventDateBlockProps {
  dateTime: string;
  weekday: string;
  day: string;
  month: string;
  year: string;
}

export function EventDateBlock({
  dateTime,
  weekday,
  day,
  month,
  year
}: EventDateBlockProps) {
  return (
    <time className="event-date-block" dateTime={dateTime}>
      <span className="event-date-block__weekday">{weekday}</span>
      <span className="event-date-block__row">
        <span className="event-date-block__day">{day}</span>
        <span className="event-date-block__month-year">
          <span>{month}</span>
          <span>{year}</span>
        </span>
      </span>
    </time>
  );
}
