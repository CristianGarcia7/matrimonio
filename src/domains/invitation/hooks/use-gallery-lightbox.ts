'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import type {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent
} from 'react';

import { GALLERY_TRACK_ID } from '../gallery-photos';

const SWIPE_THRESHOLD_PX = 50;

export function useGalleryLightbox(photoCount: number) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const swipeStartXRef = useRef<number | null>(null);

  const showPrevious = () =>
    setActiveIndex(index =>
      index === null ? null : (index - 1 + photoCount) % photoCount
    );
  const showNext = () =>
    setActiveIndex(index => (index === null ? null : (index + 1) % photoCount));

  // Plain clicks on a frame open the lightbox; modified clicks keep the
  // native link behaviour (new tab, download...).
  const handleTrackClick = useEffectEvent((event: MouseEvent) => {
    const isModified =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;
    if (isModified || !(event.target instanceof Element)) return;
    const trigger = event.target.closest<HTMLElement>('[data-gallery-index]');
    if (!trigger) return;
    event.preventDefault();
    triggerRef.current = trigger;
    setActiveIndex(Number(trigger.dataset.galleryIndex));
  });

  useEffect(() => {
    const track = document.getElementById(GALLERY_TRACK_ID);
    if (!track) return;
    const listener = (event: MouseEvent) => handleTrackClick(event);
    track.addEventListener('click', listener);
    return () => track.removeEventListener('click', listener);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeIndex === null || !dialog || dialog.open) return;
    dialog.showModal();
  }, [activeIndex]);

  const close = () => dialogRef.current?.close();

  // Fired for the close button, Escape and backdrop clicks alike.
  const handleDialogClose = () => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  };

  const handleDialogClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  };

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

  return {
    activeIndex,
    dialogRef,
    close,
    showPrevious,
    showNext,
    handleDialogClose,
    handleDialogClick,
    handleKeyDown,
    handlePointerDown,
    handlePointerUp
  };
}
