'use client';

import { useEffect, useState } from 'react';
import type { MouseEvent, RefObject } from 'react';

const INTRO_DURATION_MS = 1600;
const LIGHTBOX_OPENED_KEY = 'wedding-invitation:gallery-lightbox-opened';
const PHOTO_TRIGGER_SELECTOR = '[data-gallery-index]';

// Storage can be unavailable (private mode, blocked site data): the intro
// then simply plays once per visit.
const hasOpenedLightboxBefore = () => {
  try {
    return window.localStorage.getItem(LIGHTBOX_OPENED_KEY) !== null;
  } catch {
    return false;
  }
};

const rememberLightboxOpened = () => {
  try {
    window.localStorage.setItem(LIGHTBOX_OPENED_KEY, '1');
  } catch {
    // Ignored: the hint just shows again next time.
  }
};

// First time the deck scrolls into view, the active card glows and the tap
// hint animates once. Visitors who already opened the lightbox skip it.
export function useGalleryIntro(deckRef: RefObject<HTMLElement | null>) {
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || hasOpenedLightboxBefore()) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setIsIntroPlaying(true);
        timer = window.setTimeout(
          () => setIsIntroPlaying(false),
          INTRO_DURATION_MS
        );
      },
      { threshold: 0.5 }
    );
    observer.observe(deck);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [deckRef]);

  // Call after the deck's own capture handler: a plain click that was not
  // stopped (swipe / side card) reaches the lightbox and opens it.
  const handlePhotoClick = (event: MouseEvent<HTMLElement>) => {
    const isPlainClick =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey;
    if (!isPlainClick || event.isPropagationStopped()) return;
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest(PHOTO_TRIGGER_SELECTOR)) return;
    rememberLightboxOpened();
    setIsIntroPlaying(false);
  };

  return { isIntroPlaying, handlePhotoClick };
}
