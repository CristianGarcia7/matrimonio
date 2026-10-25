import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { WaxSeal } from '@/components/atoms/wax-seal';

import { invitationMessages } from '../../messages';

export function InvitationClosing() {
  const { closing, monogram, music } = invitationMessages;

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
      <p className="invitation-closing__credit">{music.credit}</p>
    </footer>
  );
}
