'use client';

import { cn } from '@/lib/utils';

import { useClampedText } from '../../hooks/use-clamped-text';
import { guestbookMessages } from '../../messages';

import type { GuestbookBookEntry as BookEntry } from '../../types/guestbook-entry.types';

interface GuestbookBookEntryProps {
  entry: BookEntry;
  isDropped: boolean;
  onReadMore: (entry: BookEntry) => void;
}

// One signature written on a book page. Long messages are clamped and can be
// read in full through the message dialog.
export function GuestbookBookEntry({
  entry,
  isDropped,
  onReadMore
}: GuestbookBookEntryProps) {
  const { textRef, isClamped } = useClampedText<HTMLQuoteElement>();
  const { signatures } = guestbookMessages;

  return (
    <article
      className={cn(
        'guestbook-book-entry',
        isDropped && 'guestbook-book-entry--dropped'
      )}
    >
      <blockquote ref={textRef} className="guestbook-book-entry__message">
        {entry.message}
      </blockquote>
      <footer className="guestbook-book-entry__footer">
        <p className="guestbook-book-entry__name">{entry.name}</p>
        <time className="guestbook-book-entry__date" dateTime={entry.createdAt}>
          {entry.formattedDate}
        </time>
        {isClamped && (
          <button
            type="button"
            className="guestbook-book-entry__more"
            aria-label={signatures.readMoreAriaLabel(entry.name)}
            onClick={() => onReadMore(entry)}
          >
            {signatures.readMore}
          </button>
        )}
      </footer>
    </article>
  );
}
