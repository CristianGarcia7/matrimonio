import { cn } from '@/lib/utils';

interface FlipCardProps {
  value: string;
  previousValue: string;
  flipKey: number;
}

const WIDE_VALUE_LENGTH = 3;

// Split-flap tile. Static halves show the new top and the old bottom; the keyed
// flaps re-mount on every change so the top flap falls (old digits) and the
// bottom flap lands (new digits). Without motion the flaps stay put, so the
// tile simply shows the new value. Decorative: the value is announced by the
// parent unit.
export function FlipCard({ value, previousValue, flipKey }: FlipCardProps) {
  const isWide = value.length >= WIDE_VALUE_LENGTH;

  return (
    <span
      className={cn('flip-card', isWide && 'flip-card--wide')}
      aria-hidden="true"
    >
      <span className="flip-card__half flip-card__half--top">
        <span className="flip-card__digits">{value}</span>
      </span>
      <span className="flip-card__half flip-card__half--bottom">
        <span className="flip-card__digits">{previousValue}</span>
      </span>
      <span
        key={`top-${flipKey}`}
        className="flip-card__half flip-card__half--top flip-card__flap flip-card__flap--top"
      >
        <span className="flip-card__digits">{previousValue}</span>
      </span>
      <span
        key={`bottom-${flipKey}`}
        className="flip-card__half flip-card__half--bottom flip-card__flap flip-card__flap--bottom"
      >
        <span className="flip-card__digits">{value}</span>
      </span>
    </span>
  );
}
