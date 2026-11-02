import { ExternalLink } from '@/components/atoms/external-link';
import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { PaperCard } from '@/components/molecules/paper-card';

import { invitationMessages } from '../../messages';
import { RSVP_WHATSAPP_NUMBER } from '../../wedding-details';

export function RsvpSection() {
  const { rsvp } = invitationMessages;
  const whatsappUrl = `https://wa.me/${RSVP_WHATSAPP_NUMBER}?text=${encodeURIComponent(rsvp.whatsappMessage)}`;

  return (
    <section className="invitation-section" aria-labelledby="rsvp-title">
      <PaperCard>
        <div className="rsvp-section__content">
          <h2 id="rsvp-title" className="rsvp-section__title">
            {rsvp.title}
          </h2>
          <OrnamentDivider />
          <p className="rsvp-section__body">{rsvp.body}</p>
          <ExternalLink
            href={whatsappUrl}
            ariaLabel={rsvp.linkAriaLabel}
            className="rsvp-section__link"
          >
            {rsvp.linkLabel}
          </ExternalLink>
        </div>
      </PaperCard>
    </section>
  );
}
