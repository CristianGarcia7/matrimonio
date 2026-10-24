import { guestbookMessages } from '../../messages';
import { getGuestbookEntries } from '../../queries';
import { SignatureCard } from '../molecules/signature-card';

import { APP_LOCALE, APP_TIME_ZONE } from '@/config/locale';
import { formatDateTime } from '@/utils/format-date.util';

export async function GuestbookSignatures() {
  const entries = await getGuestbookEntries();
  const { signatures } = guestbookMessages;

  if (entries === null) {
    return (
      <p className="guestbook-signatures__notice">{signatures.loadFailed}</p>
    );
  }

  if (entries.length === 0) {
    return <p className="guestbook-signatures__notice">{signatures.empty}</p>;
  }

  return (
    <ol className="guestbook-signatures" aria-label={signatures.listAriaLabel}>
      {entries.map(entry => (
        <li key={entry.id} className="guestbook-signatures__item">
          <SignatureCard
            name={entry.name}
            message={entry.message}
            createdAt={entry.createdAt}
            formattedDate={formatDateTime(
              entry.createdAt,
              APP_LOCALE,
              APP_TIME_ZONE
            )}
          />
        </li>
      ))}
    </ol>
  );
}
