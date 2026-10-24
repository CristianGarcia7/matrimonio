'use client';

import { cn } from '@/lib/utils';

import { useGalleryDots } from '../../hooks/use-gallery-dots';
import { invitationMessages } from '../../messages';

interface GalleryDotsProps {
  total: number;
}

// Carousel pagination (mobile only; hidden by CSS on wider screens).
export function GalleryDots({ total }: GalleryDotsProps) {
  const { activeIndex, goToPhoto } = useGalleryDots();
  const { gallery } = invitationMessages;

  return (
    <div className="gallery-dots" role="group" aria-label={gallery.dotsLabel}>
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            'gallery-dots__dot',
            index === activeIndex && 'gallery-dots__dot--active'
          )}
          aria-label={gallery.goToPhotoLabel(index + 1)}
          aria-current={index === activeIndex ? 'true' : undefined}
          onClick={() => goToPhoto(index)}
        />
      ))}
    </div>
  );
}
