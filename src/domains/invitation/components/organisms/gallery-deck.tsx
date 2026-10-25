'use client';

import { cn } from '@/lib/utils';

import { GALLERY_TRACK_ID } from '../../gallery-photos';
import {
  getDeckOffset,
  useCoverflowDeck
} from '../../hooks/use-coverflow-deck';
import { useGalleryIntro } from '../../hooks/use-gallery-intro';
import { invitationMessages } from '../../messages';
import type { GalleryPhoto } from '../../types/gallery-photo.types';
import { TapHandIcon } from '../atoms/tap-hand-icon';
import { GalleryDeckCard } from '../molecules/gallery-deck-card';

interface GalleryDeckProps {
  photos: readonly GalleryPhoto[];
}

// Auto-advancing 3D coverflow. Clicking the front card opens the lightbox,
// which listens on the card list (`GALLERY_TRACK_ID`).
export function GalleryDeck({ photos }: GalleryDeckProps) {
  const total = photos.length;
  const {
    activeIndex,
    deckRef,
    isAnnouncing,
    goTo,
    showPrevious,
    showNext,
    handleFocus,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleClickCapture,
    handleKeyDown
  } = useCoverflowDeck(total);
  const { isIntroPlaying, handlePhotoClick } = useGalleryIntro(deckRef);
  const { gallery } = invitationMessages;

  return (
    <div
      ref={deckRef}
      className={cn('gallery-deck', isIntroPlaying && 'gallery-deck--intro')}
      role="region"
      aria-roledescription="carrusel"
      aria-label={gallery.deckLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="gallery-deck__stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={event => {
          handleClickCapture(event);
          handlePhotoClick(event);
        }}
      >
        <ul id={GALLERY_TRACK_ID} className="gallery-deck__cards">
          {photos.map((photo, index) => (
            <GalleryDeckCard
              key={photo.src}
              photo={photo}
              index={index}
              offset={getDeckOffset(index, activeIndex, total)}
              total={total}
              slideLabel={gallery.slideLabel(index + 1, total)}
              openLabel={gallery.openPhotoLabel(
                index + 1,
                total,
                photo.caption
              )}
              teaserCta={gallery.teaserCta}
            />
          ))}
        </ul>
      </div>

      <div className="gallery-deck__controls">
        <button
          type="button"
          className="gallery-deck__arrow"
          aria-label={gallery.previousLabel}
          onClick={showPrevious}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <div
          className="gallery-deck__dots"
          role="group"
          aria-label={gallery.dotsLabel}
        >
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className={cn(
                'gallery-deck__dot',
                index === activeIndex && 'gallery-deck__dot--active'
              )}
              aria-label={gallery.goToPhotoLabel(index + 1)}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="gallery-deck__arrow"
          aria-label={gallery.nextLabel}
          onClick={showNext}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="gallery-deck__hint">
        <TapHandIcon className="gallery-deck__hint-icon" />
        <span aria-hidden="true">{gallery.hintOrnament}</span>
        <span>{gallery.hint}</span>
        <span aria-hidden="true">{gallery.hintOrnament}</span>
      </p>

      <p
        className="sr-only"
        aria-live={isAnnouncing ? 'polite' : 'off'}
        aria-atomic="true"
      >
        {gallery.counter(activeIndex + 1, total)}
      </p>
    </div>
  );
}
