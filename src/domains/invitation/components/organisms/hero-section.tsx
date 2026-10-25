import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { WaxSeal } from '@/components/atoms/wax-seal';
import { PaperCard } from '@/components/molecules/paper-card';

import { ScriptFlourish } from '../atoms/script-flourish';
import { HeroDate } from '../molecules/hero-date';
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
          <p className="hero-section__headline">
            <ScriptFlourish isMirrored className="hero-section__flourish" />
            {/* Foil sits on the text span only so the gradient clip never
                reaches the decorative flourishes. */}
            <span className="hero-section__headline-text">{hero.eyebrow}</span>
            <ScriptFlourish className="hero-section__flourish" />
          </p>
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
            <HeroDate
              dateTime={CEREMONY_START_ISO}
              label={hero.date}
              {...hero.dateParts}
            />
          </p>
          <p className="hero-section__invitation">{hero.invitation}</p>
        </div>
      </PaperCard>
    </section>
  );
}
