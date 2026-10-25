import Image from 'next/image';

import { cn } from '@/lib/utils';

type WatercolorFloralVariant = 'rose' | 'hydrangea';

interface WatercolorFloralProps {
  variant: WatercolorFloralVariant;
  // Rendered CSS width hint so next/image picks a fitting srcset candidate.
  sizes: string;
  className?: string;
}

// Pierre-Joseph Redouté plates (public domain, see README), keyed to alpha
// and recoloured to ivory and blush cream with sage leaves.
const FLORAL_SOURCES = {
  rose: { src: '/images/watercolor-rose.webp', width: 720, height: 397 },
  hydrangea: {
    src: '/images/watercolor-hydrangea.webp',
    width: 450,
    height: 250
  }
} as const satisfies Record<
  WatercolorFloralVariant,
  { src: string; width: number; height: number }
>;

// Purely decorative: empty alt keeps it out of the accessibility tree.
export function WatercolorFloral({
  variant,
  sizes,
  className
}: WatercolorFloralProps) {
  const { src, width, height } = FLORAL_SOURCES[variant];

  return (
    <Image
      className={cn('watercolor-floral', className)}
      src={src}
      width={width}
      height={height}
      sizes={sizes}
      alt=""
      draggable={false}
    />
  );
}
