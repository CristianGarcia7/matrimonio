'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';

import { getBookLayout, paginateEntries } from '../guestbook-book.util';

import type { PageTurn, TurnDirection } from '../guestbook-book.util';
import type { GuestbookBookEntry } from '../types/guestbook-entry.types';

// Must match the `guestbook-book-turn-*` keyframe duration in
// src/styles/domains/guestbook/guestbook-book.css.
const TURN_DURATION_MS = 700;
const DROP_DURATION_MS = 2200;
const SWIPE_THRESHOLD_PX = 40;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SPREAD_QUERY = '(min-width: 768px)';

const createMediaStore = (query: string) => ({
  subscribe: (onChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  },
  getSnapshot: () => window.matchMedia(query).matches,
  getServerSnapshot: () => false
});

const reducedMotionStore = createMediaStore(REDUCED_MOTION_QUERY);
const spreadStore = createMediaStore(SPREAD_QUERY);

const isNewerEntry = (
  candidate: GuestbookBookEntry | undefined,
  previous: GuestbookBookEntry | undefined
) =>
  candidate !== undefined &&
  candidate.id !== previous?.id &&
  (previous === undefined || candidate.createdAt > previous.createdAt);

// Paginated open book: one page at a time on mobile, a two-page spread from
// `md` up. Page turns are CSS animations driven by `turn`; the visible page
// is committed once the turning leaf has landed. A newer first entry (after
// this guest signs and the list revalidates) jumps back to page 1 and is
// flagged so it can drop onto the page.
export function useGuestbookBook(entries: GuestbookBookEntry[]) {
  const pages = paginateEntries(entries);
  const pageCount = Math.max(1, pages.length);
  const isSpread = useSyncExternalStore(
    spreadStore.subscribe,
    spreadStore.getSnapshot,
    spreadStore.getServerSnapshot
  );
  const prefersReducedMotion = useSyncExternalStore(
    reducedMotionStore.subscribe,
    reducedMotionStore.getSnapshot,
    reducedMotionStore.getServerSnapshot
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [turn, setTurn] = useState<PageTurn | null>(null);
  const [droppedEntryId, setDroppedEntryId] = useState<string | null>(null);
  const [firstEntry, setFirstEntry] = useState(entries[0]);
  // Page changes are announced only after the guest navigates.
  const [hasNavigated, setHasNavigated] = useState(false);
  const [readingEntry, setReadingEntry] = useState<GuestbookBookEntry | null>(
    null
  );
  const bookRef = useRef<HTMLDivElement>(null);
  const swipeStartXRef = useRef<number | null>(null);

  // Adjust state while rendering when the list gains a newer first entry.
  if (entries[0]?.id !== firstEntry?.id) {
    setFirstEntry(entries[0]);
    if (isNewerEntry(entries[0], firstEntry)) {
      setDroppedEntryId(entries[0]?.id ?? null);
      setPageIndex(0);
      setTurn(null);
    }
  }

  const step = isSpread ? 2 : 1;
  // On a spread the left page is always odd-numbered (even index).
  const visibleIndex = Math.min(
    isSpread ? pageIndex - (pageIndex % 2) : pageIndex,
    pageCount - 1
  );
  const hasPrevious = visibleIndex > 0;
  const hasNext = visibleIndex + step < pageCount;

  const goTo = (direction: TurnDirection) => {
    if (turn) return;
    const toIndex =
      direction === 'forward' ? visibleIndex + step : visibleIndex - step;
    if (toIndex < 0 || toIndex >= pageCount) return;
    setHasNavigated(true);
    if (prefersReducedMotion) {
      setPageIndex(toIndex);
      return;
    }
    setTurn({ direction, fromIndex: visibleIndex, toIndex });
  };
  const showPrevious = () => goTo('backward');
  const showNext = () => goTo('forward');

  useEffect(() => {
    if (!turn) return;
    const timer = window.setTimeout(() => {
      setPageIndex(turn.toIndex);
      setTurn(null);
    }, TURN_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [turn]);

  useEffect(() => {
    if (!droppedEntryId) return;
    bookRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest'
    });
    const timer = window.setTimeout(
      () => setDroppedEntryId(null),
      DROP_DURATION_MS
    );
    return () => window.clearTimeout(timer);
  }, [droppedEntryId, prefersReducedMotion]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    swipeStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const startX = swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX > 0) showPrevious();
    else showNext();
  };

  const handlePointerCancel = () => {
    swipeStartXRef.current = null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  };

  const openEntry = (entry: GuestbookBookEntry) => setReadingEntry(entry);
  const closeEntry = () => setReadingEntry(null);

  return {
    bookRef,
    layout: getBookLayout(visibleIndex, turn, isSpread),
    readingEntry,
    openEntry,
    closeEntry,
    pages,
    pageCount,
    isSpread,
    visibleIndex,
    droppedEntryId,
    hasNavigated,
    hasPrevious,
    hasNext,
    showPrevious,
    showNext,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleKeyDown
  };
}
