import { cn } from '@/lib/utils';

import {
  BotanicalBud,
  BotanicalLeaf,
  BotanicalRose,
  BotanicalRoundLeaf
} from './botanical-shapes';

interface GoldBouquetProps {
  className?: string;
}

// Leaves along the two stems: [x, y, rotation, scale].
const LEAVES = [
  [58, 20, 64, 1],
  [80, 30, 112, 0.9],
  [102, 33, 60, 0.85],
  [124, 44, 116, 0.75],
  [20, 58, 206, 1],
  [30, 80, 158, 0.9],
  [33, 102, 210, 0.85],
  [44, 124, 154, 0.75]
] as const;

const ROUND_LEAVES = [
  [66, 58, 135, 0.9],
  [80, 66, 105, 0.75],
  [58, 76, 165, 0.75]
] as const;

// Gold line-art corner bouquet (roses, olive and eucalyptus leaves) drawn
// for the top-left corner; rotate or mirror it in CSS for other corners.
export function GoldBouquet({ className }: GoldBouquetProps) {
  return (
    <svg
      className={cn('botanical', className)}
      viewBox="0 0 160 160"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="botanical__stroke"
        d="M14 14C50 22 100 30 150 52M14 14C22 50 30 100 52 150M24 24C44 40 58 52 86 76"
      />
      {LEAVES.map(([x, y, rotation, scale]) => (
        <BotanicalLeaf
          key={`${x}-${y}`}
          x={x}
          y={y}
          rotation={rotation}
          scale={scale}
        />
      ))}
      {ROUND_LEAVES.map(([x, y, rotation, scale]) => (
        <BotanicalRoundLeaf
          key={`${x}-${y}`}
          x={x}
          y={y}
          rotation={rotation}
          scale={scale}
        />
      ))}
      <BotanicalBud x={150} y={52} rotation={105} scale={0.85} />
      <BotanicalBud x={52} y={150} rotation={165} scale={0.85} />
      <BotanicalRose x={30} y={30} scale={1.35} />
      <BotanicalRose x={52} y={40} rotation={40} scale={0.8} />
      <BotanicalRose x={40} y={54} rotation={-30} scale={0.75} />
    </svg>
  );
}
