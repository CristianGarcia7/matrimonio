import { SectionHeading } from '@/components/molecules/section-heading';

import { GALLERY_PHOTOS, GALLERY_TRACK_ID } from '../../gallery-photos';
import { invitationMessages } from '../../messages';
import { GalleryDots } from '../molecules/gallery-dots';
import { GalleryFrame } from '../molecules/gallery-frame';
import { GalleryLightbox } from './gallery-lightbox';

export function GallerySection() {
  const { gallery } = invitationMessages;
  const total = GALLERY_PHOTOS.length;

  if (total === 0) return null;

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
      <ul id={GALLERY_TRACK_ID} className="gallery-section__track">
        {GALLERY_PHOTOS.map((photo, index) => (
          <GalleryFrame
            key={photo.src}
            photo={photo}
            index={index}
            isFeatured={index === 0}
            openLabel={gallery.openPhotoLabel(index + 1, total)}
          />
        ))}
      </ul>
      <GalleryDots total={total} />
      <GalleryLightbox photos={GALLERY_PHOTOS} />
    </section>
  );
}
