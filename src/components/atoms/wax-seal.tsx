import { cn } from '@/lib/utils';

interface WaxSealProps {
  firstInitial: string;
  secondInitial: string;
  ampersand: string;
  ariaLabel: string;
  isLarge?: boolean;
  className?: string;
}

export function WaxSeal({
  firstInitial,
  secondInitial,
  ampersand,
  ariaLabel,
  isLarge = false,
  className
}: WaxSealProps) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn('wax-seal', isLarge && 'wax-seal--large', className)}
    >
      <span className="wax-seal__monogram" aria-hidden="true">
        {firstInitial}
        <span className="wax-seal__ampersand">{ampersand}</span>
        {secondInitial}
      </span>
    </span>
  );
}
