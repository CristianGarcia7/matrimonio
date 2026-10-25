import { ExternalLink } from '@/components/atoms/external-link';

interface EventDetailProps {
  title: string;
  time: string;
  timeLabel: string;
  venue: string;
  place?: string;
  mapsUrl: string;
  mapsLinkLabel: string;
  mapsLinkAriaLabel: string;
}

export function EventDetail({
  title,
  time,
  timeLabel,
  venue,
  place,
  mapsUrl,
  mapsLinkLabel,
  mapsLinkAriaLabel
}: EventDetailProps) {
  return (
    <article className="event-detail">
      <h3 className="event-detail__title">{title}</h3>
      <p className="event-detail__time">
        <span className="sr-only">{timeLabel}: </span>
        {time}
      </p>
      <p className="event-detail__venue">{venue}</p>
      {place && <p className="event-detail__place">{place}</p>}
      <ExternalLink
        href={mapsUrl}
        ariaLabel={mapsLinkAriaLabel}
        variant="outline"
        className="event-detail__link"
      >
        {mapsLinkLabel}
      </ExternalLink>
    </article>
  );
}
