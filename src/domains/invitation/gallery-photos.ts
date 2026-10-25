import { GALLERY_CROP_FOCUS } from './types/gallery-photo.types';
import type { GalleryPhoto } from './types/gallery-photo.types';

// DOM id of the deck's card list; the lightbox delegates clicks from it.
export const GALLERY_TRACK_ID = 'gallery-track';

// Order chosen by the couple: the first photo leads the deck. `alt` describes
// the image for screen readers; `caption` is the visible romantic line. Files live in
// public/images/gallery (WebP, metadata stripped, max 1600px long edge).
export const GALLERY_PHOTOS: readonly GalleryPhoto[] = [
  {
    src: '/images/gallery/couple-01.webp',
    alt: 'Los novios sonriendo juntos en una selfie, ella con sombrero',
    caption: 'Contigo, cada día sabe a domingo',
    width: 870,
    height: 1160
  },
  {
    src: '/images/gallery/couple-02.webp',
    alt: 'Los novios abrazados bajo un arco de luces navideñas',
    caption: 'Bajo mil luces, tú sigues brillando más',
    width: 1200,
    height: 1600
  },
  {
    src: '/images/gallery/couple-03.webp',
    alt: 'Los novios sentados en un carruaje iluminado',
    caption: 'Nuestro carruaje hacia el para siempre',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-04.webp',
    alt: 'Los novios dentro de una gran esfera de luces frente a una iglesia',
    caption: 'En tu abrazo cabe el mundo entero',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-05.webp',
    alt: 'La novia abraza al novio frente a un túnel de luces',
    caption: 'Caminar juntos es mi lugar favorito',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-06.webp',
    alt: 'Los novios celebrando un cumpleaños con flores y pastel',
    caption: 'Celebrar la vida, siempre a tu lado',
    width: 1600,
    height: 1204
  },
  {
    src: '/images/gallery/couple-07.webp',
    alt: 'Los novios en una celebración de cumpleaños con globos',
    caption: 'Cada año contigo es un regalo',
    width: 1200,
    height: 1600
  },
  {
    src: '/images/gallery/couple-08.webp',
    alt: 'Los novios bajo un arco de luces con forma de estrella',
    caption: 'Tú eres mi estrella más bonita',
    width: 1600,
    height: 1200
  },
  {
    src: '/images/gallery/couple-09.webp',
    alt: 'Ella con vestido azul y él de traje, elegantes para una celebración',
    caption: 'Elegantes por fuera, enamorados por dentro',
    width: 900,
    height: 1599
  },
  {
    src: '/images/gallery/couple-10.webp',
    alt: 'El novio abraza a la novia junto a un pastel de cumpleaños',
    caption: 'La dulzura de compartirlo todo',
    width: 1200,
    height: 1600
  },
  {
    src: '/images/gallery/couple-11.webp',
    alt: 'El novio abraza a la novia junto a un arreglo de girasoles',
    caption: 'Flores, risas y nosotros dos',
    width: 1204,
    height: 1599
  },
  {
    src: '/images/gallery/couple-12.webp',
    alt: 'Los novios abrazados y sonrientes',
    caption: 'Abrazados, como debe ser',
    width: 570,
    height: 1600,
    cropFocus: GALLERY_CROP_FOCUS.UPPER_LEFT
  }
];
