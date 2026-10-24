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
        >
          {countdown.calendarLinkLabel}
        </ExternalLink>
      </div>
    </section>
  );
}
