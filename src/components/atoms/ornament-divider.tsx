import { cn } from '@/lib/utils';

interface OrnamentDividerProps {
  className?: string;
}

// Purely decorative flourish: hidden from assistive technologies.
export function OrnamentDivider({ className }: OrnamentDividerProps) {
  return (
    <svg
      className={cn('ornament-divider', className)}
      viewBox="0 0 240 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="ornament-divider__line"
        d="M4 12h86M150 12h86"
        fill="none"
      />
      <path
        className="ornament-divider__leaf"
        d="M96 12c6-7 14-9 22-5-6 1-11 3-14 5 3 2 8 4 14 5-8 4-16 2-22-5ZM144 12c-6-7-14-9-22-5 6 1 11 3 14 5-3 2-8 4-14 5 8 4 16 2 22-5Z"
      />
      <circle className="ornament-divider__dot" cx="120" cy="12" r="3" />
    </svg>
  );
}
