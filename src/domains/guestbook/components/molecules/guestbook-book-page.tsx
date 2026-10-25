import { GoldBouquet } from '@/components/atoms/gold-bouquet';
import { cn } from '@/lib/utils';

import { guestbookMessages } from '../../messages';
import { GuestbookBookEntry } from './guestbook-book-entry';

import type { PageSide } from '../../guestbook-book.util';
import type { GuestbookBookEntry as BookEntry } from '../../types/guestbook-entry.types';

interface GuestbookBookPageProps {
  side: PageSide;
  // Undefined = a blank sheet (past the last page or the back of a leaf).
  pageNumber?: number;
  entries?: BookEntry[];
  isEmptyBook?: boolean;
  droppedEntryId?: string | null;
  onReadMore?: (entry: BookEntry) => void;
}

const SIDE_CLASS_NAMES: Record<PageSide, string> = {
  left: 'guestbook-book-page--left',
  right: 'guestbook-book-page--right',
  single: 'guestbook-book-page--single'
};

const ignoreReadMore = () => undefined;

// One ivory sheet of the guestbook: its signatures, the empty-book
// invitation, or blank paper with a faint ornament.
export function GuestbookBookPage({
  side,
  pageNumber,
  entries = [],
  isEmptyBook = false,
  droppedEntryId = null,
  onReadMore = ignoreReadMore
}: GuestbookBookPageProps) {
  const { signatures } = guestbookMessages;
  const hasEntries = pageNumber !== undefined && entries.length > 0;

  return (
    <div
      className={cn('guestbook-book-page', SIDE_CLASS_NAMES[side])}
      role={pageNumber === undefined ? undefined : 'group'}
      aria-label={
        pageNumber === undefined
          ? undefined
          : signatures.pageAriaLabel(pageNumber)
      }
    >
      {isEmptyBook && (
        <div className="guestbook-book-page__empty">
          <GoldBouquet className="guestbook-book-page__empty-ornament" />
          <p className="guestbook-book-page__empty-title">
            {signatures.emptyTitle}
          </p>
          <p className="guestbook-book-page__empty-body">
            {signatures.emptyBody}
          </p>
        </div>
      )}

      {hasEntries && (
        <ol
          className="guestbook-book-page__list"
          aria-label={signatures.pageListAriaLabel(pageNumber)}
        >
          {entries.map(entry => (
            <li key={entry.id} className="guestbook-book-page__item">
              <GuestbookBookEntry
                entry={entry}
                isDropped={entry.id === droppedEntryId}
                onReadMore={onReadMore}
              />
            </li>
          ))}
        </ol>
      )}

      {!isEmptyBook && !hasEntries && (
        <GoldBouquet className="guestbook-book-page__blank-ornament" />
      )}

      {pageNumber !== undefined && (
        <span className="guestbook-book-page__number" aria-hidden="true">
          {pageNumber}
        </span>
      )}
    </div>
  );
}
