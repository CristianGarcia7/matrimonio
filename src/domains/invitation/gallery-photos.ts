import { GALLERY_CROP_FOCUS } from './types/gallery-photo.types';
import type { GalleryPhoto } from './types/gallery-photo.types';

// DOM id of the photo track; the lightbox delegates clicks from it.
export const GALLERY_TRACK_ID = 'gallery-track';

// Order chosen by the couple: the first photo is featured. Files live in
// public/images/gallery (WebP, metadata stripped, max 1600px long edge).
export const GALLERY_PHOTOS: readonly GalleryPhoto[] = [
  {
    src: '/images/gallery/couple-01.webp',
    alt: 'Patricia, con sombrero, y Jose Ignacio sonriendo juntos en una selfie',
    width: 870,
    height: 1160
  },
  {
    src: '/images/gallery/couple-02.webp',
    alt: 'Jose Ignacio y Patricia abrazados bajo un arco de luces navideñas',
    width: 1200,
    height: 1600
  },
  {
    src: '/images/gallery/couple-03.webp',
    alt: 'Jose Ignacio y Patricia sentados en un carruaje iluminado',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-04.webp',
    alt: 'Jose Ignacio y Patricia dentro de una gran esfera de luces frente a la iglesia',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-05.webp',
    alt: 'Patricia abraza a Jose Ignacio frente a un túnel de luces',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-06.webp',
    alt: 'Jose Ignacio y Patricia celebrando un cumpleaños con flores y pastel',
    width: 1600,
    height: 1204
  },
  {
    src: '/images/gallery/couple-07.webp',
    alt: 'Jose Ignacio y Patricia en una celebración de cumpleaños con globos',
    width: 1200,
    height: 1600
  },
  {
    src: '/images/gallery/couple-08.webp',
    alt: 'Jose Ignacio y Patricia bajo un arco de luces con forma de estrella',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-09.webp',
    alt: 'Patricia con vestido azul y Jose Ignacio de traje, elegantes para una celebración',
    width: 900,
    height: 1599
  },
  {
    src: '/images/gallery/couple-10.webp',
    alt: 'Jose Ignacio abraza a Patricia junto a un pastel de cumpleaños',
    width: 1200,
    height: 1600
  },
  {
    src: '/images/gallery/couple-11.webp',
    alt: 'Jose Ignacio abraza a Patricia junto a un arreglo de girasoles',
    width: 1204,
    height: 1599
  },
  {
    src: '/images/gallery/couple-12.webp',
    alt: 'Jose Ignacio y Patricia abrazados y sonrientes',
    width: 570,
    height: 1600,
    cropFocus: GALLERY_CROP_FOCUS.UPPER_LEFT,
    isTall: true
  }
];
