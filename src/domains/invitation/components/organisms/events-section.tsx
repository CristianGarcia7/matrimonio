import { ExternalLink } from '@/components/atoms/external-link';
import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { PaperCard } from '@/components/molecules/paper-card';

import { buildCeremonyCalendarUrl } from '../../calendar-link.util';
import { invitationMessages } from '../../messages';
import { buildMonthWeeks } from '../../month-calendar.util';
import {
  CEREMONY_MAPS_URL,
  CEREMONY_START_ISO,
  RECEPTION_MAPS_URL,
  WEDDING_DAY,
  WEDDING_MONTH_INDEX,
  WEDDING_YEAR
} from '../../wedding-details';
import { CalendarIcon } from '../atoms/calendar-icon';
import { EventDateBlock } from '../molecules/event-date-block';
import { EventDetail } from '../molecules/event-detail';
import { MonthCalendar } from '../molecules/month-calendar';

export function EventsSection() {
  const { events } = invitationMessages;
  const { ceremony, reception, dateBlock, monthCalendar } = events;

  return (
    <section className="invitation-section" aria-labelledby="events-title">
      <PaperCard className="event-info">
        <div className="event-info__body">
          <h2 id="events-title" className="event-info__title">
            {events.title}
          </h2>
          <EventDateBlock
            dateTime={CEREMONY_START_ISO.slice(0, 10)}
            weekday={dateBlock.weekday}
            day={dateBlock.day}
            month={dateBlock.month}
            year={dateBlock.year}
          />
          <div className="event-info__events">
            <EventDetail
              title={ceremony.title}
              time={ceremony.time}
              timeLabel={events.timeLabel}
              venue={ceremony.venue}
              place={ceremony.place}
              mapsUrl={CEREMONY_MAPS_URL}
              mapsLinkLabel={events.mapsLinkLabel}
              mapsLinkAriaLabel={events.mapsLinkAriaLabel(ceremony.venue)}
            />
            <EventDetail
              title={reception.title}
              time={reception.time}
              timeLabel={events.timeLabel}
              venue={reception.venue}
              mapsUrl={RECEPTION_MAPS_URL}
              mapsLinkLabel={events.mapsLinkLabel}
              mapsLinkAriaLabel={events.mapsLinkAriaLabel(reception.venue)}
            />
          </div>
          <OrnamentDivider />
          <MonthCalendar
            title={monthCalendar.title}
            ariaLabel={monthCalendar.ariaLabel}
            weekdays={monthCalendar.weekdays}
            weeks={buildMonthWeeks(WEDDING_YEAR, WEDDING_MONTH_INDEX)}
            highlightedDay={WEDDING_DAY}
            highlightedDayLabel={monthCalendar.weddingDayLabel(WEDDING_DAY)}
          />
          <ExternalLink
            href={buildCeremonyCalendarUrl()}
            ariaLabel={events.calendarLinkAriaLabel}
            className="event-info__calendar-link"
          >
            <CalendarIcon className="event-info__calendar-icon" />
            {events.calendarLinkLabel}
          </ExternalLink>
        </div>
      </PaperCard>
    </section>
  );
}
