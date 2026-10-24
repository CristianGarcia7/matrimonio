import { ExternalLink } from '@/components/atoms/external-link';
import { SectionHeading } from '@/components/molecules/section-heading';

import { buildCeremonyCalendarUrl } from '../../calendar-link.util';
import { invitationMessages } from '../../messages';
import { CEREMONY_MAPS_URL, RECEPTION_MAPS_URL } from '../../wedding-details';
import { EventCard } from '../molecules/event-card';

export function EventsSection() {
  const { events } = invitationMessages;
  const { ceremony, reception } = events;

  return (
    <section className="events-section" aria-labelledby="events-title">
      <SectionHeading
        id="events-title"
        title={events.title}
        subtitle={events.subtitle}
      />
      <div className="events-section__grid">
        <EventCard
          title={ceremony.title}
          venue={ceremony.venue}
          place={ceremony.place}
          time={ceremony.time}
          timeLabel={events.timeLabel}
          mapsUrl={CEREMONY_MAPS_URL}
          mapsLinkLabel={events.mapsLinkLabel}
          mapsLinkAriaLabel={events.mapsLinkAriaLabel(ceremony.venue)}
        >
          <ExternalLink
            href={buildCeremonyCalendarUrl()}
            ariaLabel={events.calendarLinkAriaLabel}
            isSubtle
          >
            {events.calendarLinkLabel}
          </ExternalLink>
        </EventCard>
        <EventCard
          title={reception.title}
          venue={reception.venue}
          time={reception.time}
          timeLabel={events.timeLabel}
          mapsUrl={RECEPTION_MAPS_URL}
          mapsLinkLabel={events.mapsLinkLabel}
          mapsLinkAriaLabel={events.mapsLinkAriaLabel(reception.venue)}
        />
      </div>
    </section>
  );
}
