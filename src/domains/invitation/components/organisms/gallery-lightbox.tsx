'use client';

import Image from 'next/image';

import { useGalleryLightbox } from '../../hooks/use-gallery-lightbox';
import { invitationMessages } from '../../messages';
import type { GalleryPhoto } from '../../types/gallery-photo.types';

interface GalleryLightboxProps {
  photos: readonly GalleryPhoto[];
}

const LIGHTBOX_SIZES = '(min-width: 64rem) 64rem, 100vw';

export function GalleryLightbox({ photos }: GalleryLightboxProps) {
  const {
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
  } = useGalleryLightbox(photos.length);
  const { gallery } = invitationMessages;
  const total = photos.length;
  const photo = activeIndex === null ? null : photos[activeIndex];
  const neighbours =
    activeIndex === null
      ? []
      : [
          ...new Set([
            photos[(activeIndex - 1 + total) % total],
            photos[(activeIndex + 1) % total]
          ])
        ].filter(neighbour => neighbour !== photo);

  return (
    <dialog
      ref={dialogRef}
      className="gallery-lightbox"
      aria-label={gallery.dialogAriaLabel}
      onClose={handleDialogClose}
      onClick={handleDialogClick}
      onKeyDown={handleKeyDown}
    >
      {photo && activeIndex !== null && (
        <>
          <p className="gallery-lightbox__counter" aria-live="polite">
            {gallery.counter(activeIndex + 1, total)}
          </p>
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={close}
            autoFocus
          >
            {gallery.closeLabel}
          </button>
          <figure
            className="gallery-lightbox__figure"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={LIGHTBOX_SIZES}
              loading="eager"
              draggable={false}
              className="gallery-lightbox__image"
            />
            {photo.caption && (
              <figcaption className="gallery-lightbox__caption">
                {photo.caption}
              </figcaption>
            )}
          </figure>
          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--previous"
            aria-label={gallery.previousLabel}
            onClick={showPrevious}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            aria-label={gallery.nextLabel}
            onClick={showNext}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
          {/* Warm the neighbours' optimised sources for instant navigation. */}
          <div className="gallery-lightbox__preload" aria-hidden="true">
            {neighbours.map(neighbour => (
              <Image
                key={neighbour.src}
                src={neighbour.src}
                alt=""
                width={neighbour.width}
                height={neighbour.height}
                sizes={LIGHTBOX_SIZES}
                loading="eager"
              />
            ))}
          </div>
        </>
      )}
    </dialog>
  );
}
