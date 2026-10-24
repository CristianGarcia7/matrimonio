export const GALLERY_CROP_FOCUS = {
  CENTER: 'center',
  UPPER_LEFT: 'upper-left'
} as const;

export type GalleryCropFocus =
  (typeof GALLERY_CROP_FOCUS)[keyof typeof GALLERY_CROP_FOCUS];

export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  // Where cropped frames should focus; defaults to the centre.
  cropFocus?: GalleryCropFocus;
  // Very tall photos take two rows in the desktop collage.
  isTall?: boolean;
}
