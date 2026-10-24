import { SectionHeading } from '@/components/molecules/section-heading';

import { buildMapEmbedUrl } from '../../map-embed.util';
import { invitationMessages } from '../../messages';
import {
  CEREMONY_COORDINATES,
  CEREMONY_MAPS_URL,
  RECEPTION_COORDINATES,
  RECEPTION_MAPS_URL
} from '../../wedding-details';
import { EventCard } from '../molecules/event-card';

export function EventsSection() {
  const { events } = invitationMessages;
  const { ceremony, reception } = events;

  return (
    <section className="invitation-section" aria-labelledby="events-title">
      <SectionHeading
        id="events-title"
        title={events.title}
        subtitle={events.subtitle}
        isOnSky
      />
      <div className="events-section__list">
        <EventCard
          title={ceremony.title}
          venue={ceremony.venue}
          place={ceremony.place}
          time={ceremony.time}
          timeLabel={events.timeLabel}
          mapsUrl={CEREMONY_MAPS_URL}
          mapsLinkLabel={events.mapsLinkLabel}
          mapsLinkAriaLabel={events.mapsLinkAriaLabel(ceremony.venue)}
          mapEmbedUrl={buildMapEmbedUrl(CEREMONY_COORDINATES)}
          mapTitle={events.mapTitle(ceremony.venue)}
        />
        <EventCard
          title={reception.title}
          venue={reception.venue}
          time={reception.time}
          timeLabel={events.timeLabel}
          mapsUrl={RECEPTION_MAPS_URL}
          mapsLinkLabel={events.mapsLinkLabel}
          mapsLinkAriaLabel={events.mapsLinkAriaLabel(reception.venue)}
          mapEmbedUrl={buildMapEmbedUrl(RECEPTION_COORDINATES)}
          mapTitle={events.mapTitle(reception.venue)}
        />
      </div>
    </section>
  );
}
