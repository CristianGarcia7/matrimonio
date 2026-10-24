import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { PaperCard } from '@/components/molecules/paper-card';

import { invitationMessages } from '../../messages';
import { EnvelopeRain } from '../molecules/envelope-rain';

export function GiftSection() {
  const { gift } = invitationMessages;

  return (
    <section className="invitation-section" aria-labelledby="gift-title">
      <PaperCard>
        <div className="gift-section__content">
          <EnvelopeRain />
          <h2 id="gift-title" className="gift-section__title">
            {gift.title}
          </h2>
          <OrnamentDivider />
          <p className="gift-section__body">{gift.body}</p>
        </div>
      </PaperCard>
    </section>
  );
}
