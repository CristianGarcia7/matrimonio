import Image from 'next/image';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

import { ExpandIcon } from '../atoms/expand-icon';
import { GALLERY_CROP_FOCUS } from '../../types/gallery-photo.types';
import type {
  GalleryCropFocus,
  GalleryPhoto
} from '../../types/gallery-photo.types';

// Neighbours rendered on each side of the active card; the rest fade out.
const VISIBLE_NEIGHBOURS = 3;

const CROP_FOCUS_CLASSES: Record<GalleryCropFocus, string> = {
  [GALLERY_CROP_FOCUS.CENTER]: 'gallery-deck-card__image--center',
  [GALLERY_CROP_FOCUS.UPPER_LEFT]: 'gallery-deck-card__image--upper-left'
};

interface GalleryDeckCardProps {
  photo: GalleryPhoto;
  index: number;
  // Signed position relative to the active card (0 = front).
  offset: number;
  total: number;
  slideLabel: string;
  openLabel: string;
  teaserCta: string;
}

// One card of the coverflow deck. Its 3D placement comes from CSS custom
// properties; without JavaScript the link simply opens the photo.
export function GalleryDeckCard({
  photo,
  index,
  offset,
  total,
  slideLabel,
  openLabel,
  teaserCta
}: GalleryDeckCardProps) {
  const distance = Math.abs(offset);
  const isActive = offset === 0;
  const placement = {
    '--deck-offset': offset,
    '--deck-distance': distance,
    '--deck-side': Math.sign(offset),
    zIndex: total - distance
  } as CSSProperties;

  return (
    <li
      className={cn(
        'gallery-deck-card',
        isActive && 'gallery-deck-card--active',
        distance > VISIBLE_NEIGHBOURS && 'gallery-deck-card--hidden'
      )}
      style={placement}
      role="group"
      aria-roledescription="diapositiva"
      aria-label={slideLabel}
      aria-hidden={!isActive}
      data-deck-index={index}
    >
      <a
        href={photo.src}
        className="gallery-deck-card__link"
        data-gallery-index={index}
        tabIndex={isActive ? 0 : -1}
        draggable={false}
      >
        <span className="sr-only">{openLabel}</span>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 48rem) 22rem, 72vw"
          loading={index === 0 ? 'eager' : 'lazy'}
          draggable={false}
          className={cn(
            'gallery-deck-card__image',
            CROP_FOCUS_CLASSES[photo.cropFocus ?? GALLERY_CROP_FOCUS.CENTER]
          )}
        />
        {/* Visual affordances only: the link name already says it opens. */}
        <span className="gallery-deck-card__badge" aria-hidden="true">
          <ExpandIcon className="gallery-deck-card__badge-icon" />
        </span>
        {photo.caption && (
          <span className="gallery-deck-card__teaser" aria-hidden="true">
            <span className="gallery-deck-card__teaser-caption">
              {photo.caption}
            </span>
            <span className="gallery-deck-card__teaser-cta">{teaserCta}</span>
          </span>
        )}
      </a>
    </li>
  );
}
