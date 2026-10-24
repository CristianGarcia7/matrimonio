import { OrnamentDivider } from '@/components/atoms/ornament-divider';

import { invitationMessages } from '../../messages';
import { CEREMONY_START_ISO } from '../../wedding-details';

export function HeroSection() {
  const { hero } = invitationMessages;

  return (
    <section className="hero-section" aria-labelledby="hero-title">
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
      <OrnamentDivider className="hero-section__ornament" />
      <p className="hero-section__date">
        <time dateTime={CEREMONY_START_ISO}>{hero.date}</time>
      </p>
      <p className="hero-section__invitation">{hero.invitation}</p>
    </section>
  );
}
