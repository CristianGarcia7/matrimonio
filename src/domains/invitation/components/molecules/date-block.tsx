interface DateBlockProps {
  dateTime: string;
  weekday: string;
  day: string;
  month: string;
  year: string;
}

export function DateBlock({
  dateTime,
  weekday,
  day,
  month,
  year
}: DateBlockProps) {
  return (
    <time className="date-block" dateTime={dateTime}>
      <span className="date-block__side">{weekday}</span>
      <span className="date-block__day">{day}</span>
      <span className="date-block__side">{month}</span>
      <span className="date-block__year">{year}</span>
    </time>
  );
}
