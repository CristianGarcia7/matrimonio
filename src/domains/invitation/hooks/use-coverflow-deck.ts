'use client';

import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore
} from 'react';
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';

const AUTOPLAY_INTERVAL_MS = 3500;
const RESUME_AFTER_MS = 6000;
const SWIPE_THRESHOLD_PX = 40;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const OPEN_LIGHTBOX_SELECTOR = '.gallery-lightbox[open]';

const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

// Signed distance from the active card, wrapped so the deck loops:
// negative = left of the active card, positive = right.
export const getDeckOffset = (index: number, active: number, total: number) => {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  else if (offset < -total / 2) offset += total;
  return offset;
};

// Auto-advancing coverflow deck. Autoplay pauses while hovered, for a while
// after any interaction, offscreen, in a hidden tab and while the lightbox is
// open; it never runs under reduced motion.
export function useCoverflowDeck(total: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Manual navigation is announced; autoplay steps stay silent.
  const [isAnnouncing, setIsAnnouncing] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );
  const deckRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const swipeStartXRef = useRef<number | null>(null);
  const didSwipeRef = useRef(false);

  const pauseForInactivity = () => {
    pausedUntilRef.current = Date.now() + RESUME_AFTER_MS;
  };

  const goTo = (index: number) => {
    pauseForInactivity();
    setIsAnnouncing(true);
    setActiveIndex(((index % total) + total) % total);
  };
  const showPrevious = () => goTo(activeIndex - 1);
  const showNext = () => goTo(activeIndex + 1);

  const advance = useEffectEvent(() => {
    const isPaused =
      isHoveredRef.current ||
      !isVisibleRef.current ||
      document.hidden ||
      Date.now() < pausedUntilRef.current ||
      document.querySelector(OPEN_LIGHTBOX_SELECTOR) !== null;
    if (isPaused) return;
    setIsAnnouncing(false);
    setActiveIndex(index => (index + 1) % total);
  });

  useEffect(() => {
    if (prefersReducedMotion || total < 2) return;
    const timer = window.setInterval(() => advance(), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, total]);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.35 }
    );
    observer.observe(deck);
    return () => observer.disconnect();
  }, []);

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') isHoveredRef.current = true;
  };

  const handlePointerLeave = () => {
    if (isHoveredRef.current) pauseForInactivity();
    isHoveredRef.current = false;
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    pauseForInactivity();
    didSwipeRef.current = false;
    // Only touch and pen drags count as swipes; a mouse drag is just a click.
    swipeStartXRef.current =
      event.pointerType === 'mouse' ? null : event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const startX = swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    didSwipeRef.current = true;
    if (deltaX > 0) showPrevious();
    else showNext();
  };

  const handlePointerCancel = () => {
    swipeStartXRef.current = null;
  };

  // Runs in the capture phase, before the lightbox's delegated listener:
  // a swipe never opens the lightbox and a side card is brought to the front
  // instead. Clicks on the active card fall through to the lightbox.
  const handleClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!(event.target instanceof Element)) return;
    const card = event.target.closest<HTMLElement>('[data-deck-index]');
    const index = Number(card?.dataset.deckIndex);
    if (!card || index === activeIndex) return;
    event.preventDefault();
    event.stopPropagation();
    goTo(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  };

  return {
    activeIndex,
    deckRef,
    isAnnouncing,
    goTo,
    showPrevious,
    showNext,
    handleFocus: pauseForInactivity,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleClickCapture,
    handleKeyDown
  };
}
