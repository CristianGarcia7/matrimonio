import { ExternalLink } from '@/components/atoms/external-link';
import { cn } from '@/lib/utils';

interface EventDetailProps {
  title: string;
  time: string;
  timeLabel: string;
  venue: string;
  place?: string;
  isPlaceHighlighted?: boolean;
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
  isPlaceHighlighted = false,
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
      {place && (
        <p
          className={cn('event-detail__place', {
            'event-detail__place--highlighted': isPlaceHighlighted
          })}
        >
          {place}
        </p>
      )}
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
