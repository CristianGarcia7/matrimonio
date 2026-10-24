import { ExternalLink } from '@/components/atoms/external-link';
import { MapEmbed } from '@/components/atoms/map-embed';
import { PaperCard } from '@/components/molecules/paper-card';

interface EventCardProps {
  title: string;
  venue: string;
  place?: string;
  time: string;
  timeLabel: string;
  mapsUrl: string;
  mapsLinkLabel: string;
  mapsLinkAriaLabel: string;
  mapEmbedUrl: string;
  mapTitle: string;
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
  mapEmbedUrl,
  mapTitle
}: EventCardProps) {
  return (
    <PaperCard hasFlorals={false} className="event-card">
      <article className="event-card__body">
        <h3 className="event-card__title">{title}</h3>
        <p className="event-card__time">
          <span className="sr-only">{timeLabel}: </span>
          {time}
        </p>
        <p className="event-card__venue">{venue}</p>
        {place && <p className="event-card__place">{place}</p>}
        <MapEmbed
          src={mapEmbedUrl}
          title={mapTitle}
          className="event-card__map"
        />
        <ExternalLink
          href={mapsUrl}
          ariaLabel={mapsLinkAriaLabel}
          variant="outline"
        >
          {mapsLinkLabel}
        </ExternalLink>
      </article>
    </PaperCard>
  );
}
