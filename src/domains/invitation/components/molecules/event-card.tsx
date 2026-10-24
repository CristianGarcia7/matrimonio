import type { ReactNode } from 'react';

import { ExternalLink } from '@/components/atoms/external-link';

interface EventCardProps {
  title: string;
  venue: string;
  place?: string;
  time: string;
  timeLabel: string;
  mapsUrl: string;
  mapsLinkLabel: string;
  mapsLinkAriaLabel: string;
  children?: ReactNode;
}

export function EventCard({
  title,
  venue,
  place,
  time,
  timeLabel,
  mapsUrl,
  mapsLinkLabel,
  mapsLinkAriaLabel,
  children
}: EventCardProps) {
  return (
    <article className="event-card">
      <h3 className="event-card__title">{title}</h3>
      <p className="event-card__time">
        <span className="sr-only">{timeLabel}: </span>
        {time}
      </p>
      <p className="event-card__venue">{venue}</p>
      {place && <p className="event-card__place">{place}</p>}
      <div className="event-card__actions">
        <ExternalLink href={mapsUrl} ariaLabel={mapsLinkAriaLabel}>
          {mapsLinkLabel}
        </ExternalLink>
        {children}
      </div>
    </article>
  );
}
