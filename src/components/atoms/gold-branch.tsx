import { cn } from '@/lib/utils';

import { BotanicalBud, BotanicalLeaf } from './botanical-shapes';

interface GoldBranchProps {
  className?: string;
}

const LEAF_COUNT = 14;
const BRANCH_TOP = 24;
const BRANCH_BOTTOM = 392;

// Alternating olive leaves up a gently swaying stem, generated from the
// stem's own curve (x sways with y) instead of hand-placed paths.
const LEAVES = Array.from({ length: LEAF_COUNT }, (_, index) => {
  const progress = index / (LEAF_COUNT - 1);
  const y = BRANCH_BOTTOM - 20 - progress * (BRANCH_BOTTOM - BRANCH_TOP - 40);
  const x = 60 + Math.sin(progress * Math.PI * 1.6) * 9;
  const side = index % 2 === 0 ? -1 : 1;
  return {
    x,
    y,
    rotation: side * (52 - progress * 18),
    scale: 1.25 - progress * 0.45
  };
});

// Long, slender gold olive branch for faint page backdrops.
export function GoldBranch({ className }: GoldBranchProps) {
  return (
    <svg
      className={cn('botanical', className)}
      viewBox="0 0 120 400"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="botanical__stroke"
        d="M58 396C56 330 70 290 66 230S50 120 58 70C60 52 62 36 61 22"
      />
      {LEAVES.map(leaf => (
        <BotanicalLeaf
          key={leaf.y}
          x={leaf.x}
          y={leaf.y}
          rotation={leaf.rotation}
          scale={leaf.scale}
        />
      ))}
      <BotanicalBud x={61} y={22} scale={1.1} />
    </svg>
  );
}
