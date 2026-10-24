import { invitationMessages } from './messages';
import { CALENDAR_EVENT_DATES, CALENDAR_TIME_ZONE } from './wedding-details';

const GOOGLE_CALENDAR_TEMPLATE_URL =
  'https://calendar.google.com/calendar/render';

export function buildCeremonyCalendarUrl(): string {
  const { eventTitle, details, location } = invitationMessages.calendar;
  const query = [
    'action=TEMPLATE',
    `text=${encodeURIComponent(eventTitle)}`,
    `dates=${CALENDAR_EVENT_DATES}`,
    `details=${encodeURIComponent(details)}`,
    `location=${encodeURIComponent(location)}`,
    `ctz=${encodeURIComponent(CALENDAR_TIME_ZONE)}`
  ].join('&');

  return `${GOOGLE_CALENDAR_TEMPLATE_URL}?${query}`;
}
