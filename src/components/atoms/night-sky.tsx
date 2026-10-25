import { cn } from '@/lib/utils';

import { GoldBouquet } from './gold-bouquet';
import { GoldBranch } from './gold-branch';

interface NightSkyProps {
  isContained?: boolean;
  hasFrame?: boolean;
  className?: string;
}

const FRAME_CORNER_CLASSES = [
  'night-sky__frame-corner--top-start',
  'night-sky__frame-corner--top-end',
  'night-sky__frame-corner--bottom-start',
  'night-sky__frame-corner--bottom-end'
];

// Decorative starry backdrop, painted back to front: faint gold olive
// branches, a stationery grain and the gold star dust; optionally a gold
// botanical frame (used by the envelope cover). Static layers only.
export function NightSky({
  isContained = false,
  hasFrame = false,
  className
}: NightSkyProps) {
  return (
    <div
      className={cn(
        'night-sky',
        isContained && 'night-sky--contained',
        className
      )}
      aria-hidden="true"
    >
      <span className="night-sky__botanicals">
        <GoldBranch className="night-sky__branch night-sky__branch--start" />
        <GoldBranch className="night-sky__branch night-sky__branch--end" />
        <GoldBranch className="night-sky__branch night-sky__branch--low" />
      </span>
      <span className="night-sky__grain" />
      <span className="night-sky__dust night-sky__dust--near" />
      <span className="night-sky__dust night-sky__dust--far" />
      {hasFrame && (
        <span className="night-sky__frame">
          {FRAME_CORNER_CLASSES.map(cornerClass => (
            <GoldBouquet
              key={cornerClass}
              className={cn('night-sky__frame-corner', cornerClass)}
            />
          ))}
        </span>
      )}
    </div>
  );
}
