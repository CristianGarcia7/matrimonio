import { guestbookMessages } from '../../messages';
import { getGuestbookEntries } from '../../queries';
import { GuestbookBook } from './guestbook-book';

import type { GuestbookBookEntry } from '../../types/guestbook-entry.types';

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

  // Only public fields cross to the client book; dates are formatted here
  // so server and browser render the same text.
  const bookEntries: GuestbookBookEntry[] = entries.map(entry => ({
    id: entry.id,
    name: entry.name,
    message: entry.message,
    createdAt: entry.createdAt,
    formattedDate: formatDateTime(entry.createdAt, APP_LOCALE, APP_TIME_ZONE)
  }));

  return <GuestbookBook entries={bookEntries} />;
}
