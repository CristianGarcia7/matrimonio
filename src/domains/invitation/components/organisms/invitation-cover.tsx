'use client';

import { NightSky } from '@/components/atoms/night-sky';
import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { WaxSeal } from '@/components/atoms/wax-seal';
import { Envelope } from '@/components/molecules/envelope';

import { useInvitationCover } from '../../hooks/use-invitation-cover';
import { invitationMessages } from '../../messages';
import { CEREMONY_START_ISO } from '../../wedding-details';

const PETAL_KEYS = Array.from({ length: 8 }, (_, index) => index);

interface InvitationCoverProps {
  onOpen?: () => void;
}

// Overlay only: the invitation itself is always server-rendered underneath,
// and the cover is hidden by CSS when scripting is unavailable.
export function InvitationCover({ onOpen }: InvitationCoverProps) {
  const {
    coverState,
    isOpened,
    isEnvelopeOpen,
    openButtonRef,
    handleOpenClick
  } = useInvitationCover({ onOpen });
  const { cover, monogram, hero } = invitationMessages;

  if (isOpened) return null;

  return (
    <div
      className="invitation-cover"
      data-state={coverState}
      role="dialog"
      aria-modal="true"
      aria-label={cover.dialogAriaLabel}
    >
      <NightSky isContained hasFrame />
      <span className="invitation-cover__petals" aria-hidden="true">
        {PETAL_KEYS.map(key => (
          <span key={key} className="invitation-cover__petal" />
        ))}
      </span>
      <div className="invitation-cover__stage">
        <Envelope
          isOpen={isEnvelopeOpen}
          className="invitation-cover__envelope"
          seal={
            <WaxSeal
              firstInitial={monogram.firstInitial}
              secondInitial={monogram.secondInitial}
              ampersand={monogram.ampersand}
              ariaLabel={monogram.ariaLabel}
              className="invitation-cover__seal"
            />
          }
        >
          <span className="invitation-cover__card-eyebrow">{hero.eyebrow}</span>
          <span className="invitation-cover__card-monogram" aria-hidden="true">
            {monogram.firstInitial}
            <span className="invitation-cover__card-ampersand">
              {monogram.ampersand}
            </span>
            {monogram.secondInitial}
          </span>
          <span className="invitation-cover__card-names" aria-hidden="true">
            {cover.names}
          </span>
        </Envelope>
        <div className="invitation-cover__text">
          <p className="invitation-cover__names">{cover.names}</p>
          <p className="invitation-cover__date">
            <time dateTime={CEREMONY_START_ISO}>{cover.date}</time>
          </p>
          <OrnamentDivider className="invitation-cover__ornament" />
          <p className="invitation-cover__greeting">{cover.greeting}</p>
        </div>
        <button
          ref={openButtonRef}
          type="button"
          className="invitation-cover__button"
          onClick={handleOpenClick}
        >
          {cover.openButton}
        </button>
      </div>
    </div>
  );
}
