import { OrnamentDivider } from '@/components/atoms/ornament-divider';

import { invitationMessages } from '../../messages';

export function InvitationClosing() {
  const { closing } = invitationMessages;

  return (
    <footer className="invitation-closing">
      <OrnamentDivider className="invitation-closing__ornament" />
      <p className="invitation-closing__message">{closing.message}</p>
      <p className="invitation-closing__signature">{closing.signature}</p>
    </footer>
  );
}
