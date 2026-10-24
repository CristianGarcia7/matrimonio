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
  // Where cropped cards should focus; defaults to the centre.
  cropFocus?: GalleryCropFocus;
}
