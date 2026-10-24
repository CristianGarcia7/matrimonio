import Image from 'next/image';

import { cn } from '@/lib/utils';

import { GALLERY_CROP_FOCUS } from '../../types/gallery-photo.types';
import type {
  GalleryCropFocus,
  GalleryPhoto
} from '../../types/gallery-photo.types';

const CROP_FOCUS_CLASSES: Record<GalleryCropFocus, string> = {
  [GALLERY_CROP_FOCUS.CENTER]: 'gallery-frame__image--center',
  [GALLERY_CROP_FOCUS.UPPER_LEFT]: 'gallery-frame__image--upper-left'
};

interface GalleryFrameProps {
  photo: GalleryPhoto;
  index: number;
  openLabel: string;
  isFeatured?: boolean;
}

// Polaroid-like frame. Without JavaScript the link simply opens the photo;
// the lightbox intercepts clicks through `data-gallery-index`.
export function GalleryFrame({
  photo,
  index,
  openLabel,
  isFeatured = false
}: GalleryFrameProps) {
  return (
    <li
      id={`gallery-photo-${index + 1}`}
      className={cn(
        'gallery-frame',
        isFeatured && 'gallery-frame--featured',
        photo.isTall && 'gallery-frame--tall'
      )}
    >
      <a
        href={photo.src}
        className="gallery-frame__link"
        data-gallery-index={index}
      >
        <span className="sr-only">{openLabel}</span>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={
            isFeatured
              ? '(min-width: 48rem) 32rem, 78vw'
              : '(min-width: 48rem) 16rem, 78vw'
          }
          loading={index === 0 ? 'eager' : 'lazy'}
          className={cn(
            'gallery-frame__image',
            CROP_FOCUS_CLASSES[photo.cropFocus ?? GALLERY_CROP_FOCUS.CENTER]
          )}
        />
      </a>
    </li>
  );
}
