import type { GuestbookBookEntry } from './types/guestbook-entry.types';

export const ENTRIES_PER_PAGE = 4;

export type TurnDirection = 'forward' | 'backward';

export type PageSide = 'left' | 'right' | 'single';

export interface PageTurn {
  direction: TurnDirection;
  fromIndex: number;
  toIndex: number;
}

export type LeafVariant =
  | 'forward'
  | 'backward'
  | 'single-forward'
  | 'single-backward';

export interface BookLeaf {
  variant: LeafVariant;
  frontIndex: number;
  frontSide: PageSide;
  // null = plain paper (the back of a single page).
  backIndex: number | null;
  backSide: PageSide;
}

export interface BookLayout {
  // Page indices resting flat on the book; `rightIndex` is null on mobile.
  leftIndex: number;
  rightIndex: number | null;
  leaf: BookLeaf | null;
}

export const paginateEntries = (entries: GuestbookBookEntry[]) => {
  const pages: GuestbookBookEntry[][] = [];
  for (let start = 0; start < entries.length; start += ENTRIES_PER_PAGE) {
    pages.push(entries.slice(start, start + ENTRIES_PER_PAGE));
  }
  return pages;
};

// Which pages lie flat and which one is mid-turn. While a leaf turns, the
// flat pages already show what the leaf uncovers, so committing the new page
// at the end of the animation causes no visual jump.
export const getBookLayout = (
  visibleIndex: number,
  turn: PageTurn | null,
  isSpread: boolean
): BookLayout => {
  if (isSpread) {
    if (!turn) {
      return {
        leftIndex: visibleIndex,
        rightIndex: visibleIndex + 1,
        leaf: null
      };
    }
    const { fromIndex, toIndex } = turn;
    if (turn.direction === 'forward') {
      return {
        leftIndex: fromIndex,
        rightIndex: toIndex + 1,
        leaf: {
          variant: 'forward',
          frontIndex: fromIndex + 1,
          frontSide: 'right',
          backIndex: toIndex,
          backSide: 'left'
        }
      };
    }
    return {
      leftIndex: toIndex,
      rightIndex: fromIndex + 1,
      leaf: {
        variant: 'backward',
        frontIndex: fromIndex,
        frontSide: 'left',
        backIndex: toIndex + 1,
        backSide: 'right'
      }
    };
  }

  if (!turn) return { leftIndex: visibleIndex, rightIndex: null, leaf: null };
  const isForward = turn.direction === 'forward';
  return {
    leftIndex: isForward ? turn.toIndex : turn.fromIndex,
    rightIndex: null,
    leaf: {
      variant: isForward ? 'single-forward' : 'single-backward',
      frontIndex: isForward ? turn.fromIndex : turn.toIndex,
      frontSide: 'single',
      backIndex: null,
      backSide: 'single'
    }
  };
};
