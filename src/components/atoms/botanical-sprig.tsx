import { cn } from '@/lib/utils';

import { HydrangeaFloret } from './hydrangea-floret';

interface BotanicalSprigProps {
  className?: string;
}

// Hydrangea cluster with two eucalyptus branches, drawn for a top-left
// corner; mirror or rotate it with CSS for the other corners.
const FLORETS = [
  { x: 20, y: 19, rotation: 10, scale: 1.15 },
  { x: 31, y: 15, rotation: 35 },
  { x: 15, y: 30, rotation: 60 },
  { x: 28, y: 27, rotation: 5, scale: 1.1 },
  { x: 40, y: 23, rotation: 50, scale: 0.9 },
  { x: 23, y: 38, rotation: 25, scale: 0.95 },
  { x: 36, y: 35, rotation: 70, scale: 0.85 },
  { x: 10, y: 20, rotation: 40, scale: 0.8 },
  { x: 20, y: 9, rotation: 15, scale: 0.8 },
  { x: 46, y: 13, rotation: 20, scale: 0.7 },
  { x: 12, y: 44, rotation: 45, scale: 0.7 }
] as const;

const LEAVES = [
  { cx: 60, cy: 13, rotation: -20 },
  { cx: 66, cy: 25, rotation: 30 },
  { cx: 82, cy: 15, rotation: -10 },
  { cx: 90, cy: 28, rotation: 35 },
  { cx: 106, cy: 22, rotation: 0 },
  { cx: 114, cy: 35, rotation: 45 },
  { cx: 128, cy: 33, rotation: 15 },
  { cx: 13, cy: 60, rotation: -70 },
  { cx: 25, cy: 66, rotation: -20 },
  { cx: 15, cy: 82, rotation: -80 },
  { cx: 28, cy: 90, rotation: -35 },
  { cx: 21, cy: 106, rotation: -90 },
  { cx: 34, cy: 113, rotation: -45 },
  { cx: 32, cy: 128, rotation: -75 }
] as const;

export function BotanicalSprig({ className }: BotanicalSprigProps) {
  return (
    <svg
      className={cn('botanical-sprig', className)}
      viewBox="0 0 150 150"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="botanical-sprig__stem"
        d="M24 24C56 14 96 16 140 40M24 24C14 56 16 96 40 140M30 26C52 36 66 52 76 70"
      />
      {LEAVES.map(leaf => (
        <ellipse
          key={`${leaf.cx}-${leaf.cy}`}
          className="botanical-sprig__leaf"
          cx={leaf.cx}
          cy={leaf.cy}
          rx="6"
          ry="4.2"
          transform={`rotate(${leaf.rotation} ${leaf.cx} ${leaf.cy})`}
        />
      ))}
      <circle className="botanical-sprig__berry" cx="76" cy="70" r="1.8" />
      <circle className="botanical-sprig__berry" cx="70" cy="58" r="1.3" />
      {FLORETS.map(floret => (
        <HydrangeaFloret key={`${floret.x}-${floret.y}`} {...floret} />
      ))}
    </svg>
  );
}
