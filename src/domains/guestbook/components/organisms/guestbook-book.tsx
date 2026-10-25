'use client';

import { cn } from '@/lib/utils';

import { useGuestbookBook } from '../../hooks/use-guestbook-book';
import { guestbookMessages } from '../../messages';
import { GuestbookBookPage } from '../molecules/guestbook-book-page';
import { GuestbookMessageDialog } from '../molecules/guestbook-message-dialog';

import type { LeafVariant, PageSide } from '../../guestbook-book.util';
import type { GuestbookBookEntry } from '../../types/guestbook-entry.types';

interface GuestbookBookProps {
  entries: GuestbookBookEntry[];
}

const LEAF_CLASS_NAMES: Record<LeafVariant, string> = {
  forward: 'guestbook-book__leaf--forward',
  backward: 'guestbook-book__leaf--backward',
  'single-forward': 'guestbook-book__leaf--single-forward',
  'single-backward': 'guestbook-book__leaf--single-backward'
};

// Open guestbook: signatures paginated newest first, one page on mobile and
// a two-page spread from `md` up, with animated page turns.
export function GuestbookBook({ entries }: GuestbookBookProps) {
  const {
    bookRef,
    layout,
    pages,
    pageCount,
    isSpread,
    visibleIndex,
    droppedEntryId,
    hasNavigated,
    hasPrevious,
    hasNext,
    readingEntry,
    openEntry,
    closeEntry,
    showPrevious,
    showNext,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleKeyDown
  } = useGuestbookBook(entries);
  const { signatures } = guestbookMessages;
  const isEmpty = entries.length === 0;

  const renderPage = (index: number | null, side: PageSide) => {
    const isInBook = index !== null && index < pageCount;
    return (
      <GuestbookBookPage
        side={side}
        pageNumber={isInBook ? index + 1 : undefined}
        entries={isInBook ? (pages[index] ?? []) : []}
        isEmptyBook={isEmpty && index === 0}
        droppedEntryId={droppedEntryId}
        onReadMore={openEntry}
      />
    );
  };

  const hasRightPage = isSpread && visibleIndex + 1 < pageCount;
  const indicator = hasRightPage
    ? signatures.spreadIndicator(visibleIndex + 1, visibleIndex + 2, pageCount)
    : signatures.pageIndicator(visibleIndex + 1, pageCount);
  const { leaf } = layout;

  return (
    <div
      ref={bookRef}
      className="guestbook-book"
      role="region"
      aria-roledescription={signatures.bookRoleDescription}
      aria-label={signatures.bookAriaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cn(
          'guestbook-book__cover',
          isSpread && 'guestbook-book__cover--spread'
        )}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className="guestbook-book__pages">
          <div
            key={`flat-${layout.leftIndex}`}
            className="guestbook-book__sheet"
          >
            {renderPage(layout.leftIndex, isSpread ? 'left' : 'single')}
          </div>
          {layout.rightIndex !== null && (
            <div
              key={`flat-${layout.rightIndex}`}
              className="guestbook-book__sheet"
            >
              {renderPage(layout.rightIndex, 'right')}
            </div>
          )}
          {leaf && (
            <div
              className={cn(
                'guestbook-book__leaf',
                LEAF_CLASS_NAMES[leaf.variant]
              )}
              aria-hidden="true"
              inert
            >
              <div className="guestbook-book__face">
                {renderPage(leaf.frontIndex, leaf.frontSide)}
              </div>
              <div className="guestbook-book__face guestbook-book__face--back">
                {renderPage(leaf.backIndex, leaf.backSide)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="guestbook-book__nav">
        <button
          type="button"
          className="guestbook-book__arrow"
          aria-label={signatures.previousPage}
          aria-disabled={!hasPrevious}
          onClick={showPrevious}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <p
          className="guestbook-book__indicator"
          aria-live={hasNavigated ? 'polite' : 'off'}
          aria-atomic="true"
        >
          {indicator}
        </p>
        <button
          type="button"
          className="guestbook-book__arrow"
          aria-label={signatures.nextPage}
          aria-disabled={!hasNext}
          onClick={showNext}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <GuestbookMessageDialog entry={readingEntry} onClose={closeEntry} />
    </div>
  );
}
