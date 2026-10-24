import { cn } from '@/lib/utils';

import { WatercolorFloral } from './watercolor-floral';

interface NightSkyProps {
  isContained?: boolean;
  isBackdropVivid?: boolean;
  className?: string;
}

// Decorative starry backdrop, painted back to front: a faint pencil-sketch
// castle rising from the bottom, oversized watercolor florals, a stationery
// grain and the gold star dust. Static CSS layers only, no canvas or animation.
export function NightSky({
  isContained = false,
  isBackdropVivid = false,
  className
}: NightSkyProps) {
  return (
    <div
      className={cn(
        'night-sky',
        isContained && 'night-sky--contained',
        isBackdropVivid && 'night-sky--vivid',
        className
      )}
      aria-hidden="true"
    >
      <span className="night-sky__castle" />
      <span className="night-sky__botanicals">
        <WatercolorFloral
          variant="rose"
          sizes="(min-width: 48rem) 40rem, 26rem"
          className="night-sky__floral night-sky__floral--start"
        />
        <WatercolorFloral
          variant="hydrangea"
          sizes="(min-width: 48rem) 40rem, 26rem"
          className="night-sky__floral night-sky__floral--end"
        />
      </span>
      <span className="night-sky__grain" />
      <span className="night-sky__dust night-sky__dust--near" />
      <span className="night-sky__dust night-sky__dust--far" />
    </div>
  );
}
