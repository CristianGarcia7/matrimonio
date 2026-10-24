import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { WaxSeal } from '@/components/atoms/wax-seal';
import { PaperCard } from '@/components/molecules/paper-card';

import { invitationMessages } from '../../messages';
import { CEREMONY_START_ISO } from '../../wedding-details';

export function HeroSection() {
  const { hero, monogram } = invitationMessages;

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <PaperCard className="hero-section__card">
        <div className="hero-section__content">
          <WaxSeal
            firstInitial={monogram.firstInitial}
            secondInitial={monogram.secondInitial}
            ampersand={monogram.ampersand}
            ariaLabel={monogram.ariaLabel}
          />
          <p className="hero-section__eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero-section__names">
            <span className="hero-section__name">{hero.groomName}</span>
            <span className="hero-section__ampersand" aria-hidden="true">
              {hero.ampersand}
            </span>
            <span className="sr-only">{` ${hero.ampersand} `}</span>
            <span className="hero-section__name">{hero.brideName}</span>
          </h1>
          <p className="hero-section__full-names">{hero.fullNames}</p>
          <OrnamentDivider />
          <p className="hero-section__date">
            <time dateTime={CEREMONY_START_ISO}>{hero.date}</time>
          </p>
          <p className="hero-section__invitation">{hero.invitation}</p>
        </div>
      </PaperCard>
    </section>
  );
}
