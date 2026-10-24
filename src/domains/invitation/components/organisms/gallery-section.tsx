import { SectionHeading } from '@/components/molecules/section-heading';

import { GALLERY_PHOTOS } from '../../gallery-photos';
import { invitationMessages } from '../../messages';
import { GalleryDeck } from './gallery-deck';
import { GalleryLightbox } from './gallery-lightbox';

export function GallerySection() {
  const { gallery } = invitationMessages;

  if (GALLERY_PHOTOS.length === 0) return null;

  return (
    <section
      className="invitation-section gallery-section"
      aria-labelledby="gallery-title"
    >
      <SectionHeading
        id="gallery-title"
        title={gallery.title}
        subtitle={gallery.subtitle}
        isOnSky
      />
      <GalleryDeck photos={GALLERY_PHOTOS} />
      <GalleryLightbox photos={GALLERY_PHOTOS} />
    </section>
  );
}
