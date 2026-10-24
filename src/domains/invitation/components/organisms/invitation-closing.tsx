import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { WaxSeal } from '@/components/atoms/wax-seal';

import { invitationMessages } from '../../messages';
import { MUSIC_AUTHOR_URL, MUSIC_LICENSE_URL } from '../../wedding-details';

export function InvitationClosing() {
  const { closing, monogram, music } = invitationMessages;
  const { credit } = music;

  return (
    <footer className="invitation-closing">
      <p className="invitation-closing__thanks">{closing.thanks}</p>
      <OrnamentDivider className="invitation-closing__ornament" />
      <p className="invitation-closing__message">{closing.message}</p>
      <WaxSeal
        firstInitial={monogram.firstInitial}
        secondInitial={monogram.secondInitial}
        ampersand={monogram.ampersand}
        ariaLabel={monogram.ariaLabel}
        isLarge
      />
      <p className="invitation-closing__signature">{closing.signature}</p>
      <p className="invitation-closing__credit">
        {credit.prefix}
        <a
          href={MUSIC_AUTHOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="invitation-closing__credit-link"
        >
          {credit.authorSite}
        </a>
        {credit.licensePrefix}
        <a
          href={MUSIC_LICENSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="invitation-closing__credit-link"
        >
          {credit.licenseUrl}
        </a>
      </p>
      <p className="invitation-closing__credit invitation-closing__credit--backdrop">
        {closing.backdropCredit}
      </p>
    </footer>
  );
}
