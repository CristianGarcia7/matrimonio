import { SectionHeading } from '@/components/molecules/section-heading';

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
    </section>
  );
}
