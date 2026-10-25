import { ExternalLink } from '@/components/atoms/external-link';
import { SectionHeading } from '@/components/molecules/section-heading';

import { buildCeremonyCalendarUrl } from '../../calendar-link.util';
import { invitationMessages } from '../../messages';
import { CountdownTimer } from './countdown-timer';

export function CountdownSection() {
  const { countdown } = invitationMessages;

  return (
    <section className="invitation-section" aria-labelledby="countdown-title">
      <SectionHeading
        id="countdown-title"
        title={countdown.title}
        subtitle={countdown.subtitle}
        isOnSky
      />
      <CountdownTimer />
      <div className="countdown-section__actions">
        <ExternalLink
          href={buildCeremonyCalendarUrl()}
          ariaLabel={countdown.calendarLinkAriaLabel}
          variant="gold"
          className="countdown-section__calendar-link"
        >
          <svg
            className="countdown-section__calendar-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
          </svg>
          {countdown.calendarLinkLabel}
        </ExternalLink>
      </div>
    </section>
  );
}
