import { cn } from '@/lib/utils';

import type { GarmentKind } from '../../types/wedding-party-member.types';

interface GarmentIllustrationProps {
  garment: GarmentKind;
  hasBoutonniere?: boolean;
  className?: string;
}

// Flat-colour fills come from CSS variables set by the role's class
// (--garment-main, --garment-accent, --garment-detail, --garment-trim).
function Gown() {
  return (
    <>
      <path
        className="garment__main"
        d="M31 9l4-3c2 5 8 5 10 0l4 3-1.5 25C58 52 64 72 70 93c-20 4-40 4-60 0 6-21 12-41 22.5-59z"
      />
      <path
        className="garment__line"
        d="M32.5 34c5 2.5 10 2.5 15 0M14 87c3 3 6 3 8 0 2 3 6 3 8 0 2 3 6 3 8 0 2 3 6 3 8 0 2 3 6 3 8 0 2 3 6 3 8 0M27 52c4 1.5 8 1.5 12 0 4 1.5 8 1.5 14 0"
      />
    </>
  );
}

function Suit({ hasBoutonniere }: { hasBoutonniere: boolean }) {
  return (
    <>
      <path
        className="garment__main"
        d="M20 14l12-7 8 13 8-13 12 7 6 79H44l-4-42-4 42H14z"
      />
      <path className="garment__detail" d="M32 7l8 13 8-13z" />
      <path
        className="garment__accent"
        d="M38.5 18h3l1 4-1.5 18-1 2-1-2-1.5-18z"
      />
      <path
        className="garment__line"
        d="M32 7l4 23 4 21M48 7l-4 23-4 21M40 58v2M40 68v2"
      />
      {hasBoutonniere && (
        <circle className="garment__trim" cx="52" cy="28" r="3" />
      )}
    </>
  );
}

function SlipDress() {
  return (
    <>
      <path
        className="garment__main"
        d="M33 18c5 3 9 3 14 0l3 32c1 15 4 30 8 44H22c4-14 7-29 8-44z"
      />
      <path
        className="garment__line"
        d="M33 18l-1-12M47 18l1-12M36 30c-1 20-3 40-6 60M45 40c1 16 3 34 6 50"
      />
    </>
  );
}

function TulleDress() {
  return (
    <>
      <path
        className="garment__main"
        d="M33 16h14l-1 20c11 9 19 24 22 44-18 6-38 6-56 0 3-20 11-35 22-44z"
      />
      <circle className="garment__main" cx="30" cy="18" r="4" />
      <circle className="garment__main" cx="50" cy="18" r="4" />
      <path
        className="garment__line"
        d="M26 46c-3 10-5 20-6 32M34 42c-2 12-3 24-3 38M46 42c2 12 3 24 3 38M54 46c3 10 5 20 6 32"
      />
      <path className="garment__accent" d="M40 36l-8-5v10zM40 36l8-5v10z" />
    </>
  );
}

function BoyOutfit() {
  return (
    <>
      <path className="garment__main" d="M26 46h28l2 48H42l-2-30-2 30H24z" />
      <path className="garment__detail" d="M25 10h30l-1 36H26z" />
      <path className="garment__suspenders" d="M31 10l2 36M49 10l-2 36" />
      <path className="garment__trim" d="M40 13l-6-3v6zM40 13l6-3v6z" />
    </>
  );
}

// Small flat illustration of a wedding-party outfit with a gold outline.
export function GarmentIllustration({
  garment,
  hasBoutonniere = false,
  className
}: GarmentIllustrationProps) {
  return (
    <svg
      className={cn('garment', className)}
      viewBox="0 0 80 100"
      aria-hidden="true"
      focusable="false"
    >
      {garment === 'gown' && <Gown />}
      {garment === 'suit' && <Suit hasBoutonniere={hasBoutonniere} />}
      {garment === 'slipDress' && <SlipDress />}
      {garment === 'tulleDress' && <TulleDress />}
      {garment === 'boyOutfit' && <BoyOutfit />}
    </svg>
  );
}
