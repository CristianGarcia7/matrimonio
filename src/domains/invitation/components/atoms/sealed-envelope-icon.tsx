import { cn } from '@/lib/utils';

interface SealedEnvelopeIconProps {
  className?: string;
}

// Small ivory envelope closed with a gold wax seal (decorative only).
export function SealedEnvelopeIcon({ className }: SealedEnvelopeIconProps) {
  return (
    <svg
      className={cn('sealed-envelope-icon', className)}
      viewBox="0 0 70 50"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        className="sealed-envelope-icon__paper"
        x="0.5"
        y="0.5"
        width="69"
        height="49"
        rx="2.5"
      />
      <path
        className="sealed-envelope-icon__fold"
        d="M1 49 28 25M69 49 42 25"
      />
      <path className="sealed-envelope-icon__flap" d="M1 1 35 30 69 1Z" />
      <circle className="sealed-envelope-icon__seal" cx="35" cy="30" r="7.5" />
      <circle
        className="sealed-envelope-icon__seal-ring"
        cx="35"
        cy="30"
        r="5"
      />
      <circle
        className="sealed-envelope-icon__seal-shine"
        cx="32.5"
        cy="27.5"
        r="2"
      />
    </svg>
  );
}
