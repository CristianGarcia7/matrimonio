interface HeroDateProps {
  dateTime: string;
  // Full date read by screen readers; the visual parts are decorative.
  label: string;
  weekday: string;
  day: string;
  month: string;
  year: string;
}

// Weekday in spaced caps above a large foil day flanked by month and year,
// separated by fine gold rules.
export function HeroDate({
  dateTime,
  label,
  weekday,
  day,
  month,
  year
}: HeroDateProps) {
  return (
    <time className="hero-date" dateTime={dateTime}>
      <span className="sr-only">{label}</span>
      <span className="hero-date__visual" aria-hidden="true">
        <span className="hero-date__weekday">{weekday}</span>
        <span className="hero-date__row">
          <span className="hero-date__side">{month}</span>
          <span className="hero-date__day">{day}</span>
          <span className="hero-date__side">{year}</span>
        </span>
      </span>
    </time>
  );
}
