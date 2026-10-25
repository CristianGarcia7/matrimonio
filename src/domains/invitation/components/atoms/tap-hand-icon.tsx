import { cn } from '@/lib/utils';

interface TapHandIconProps {
  className?: string;
}

// A pointing hand with a small ripple above the fingertip.
export function TapHandIcon({ className }: TapHandIconProps) {
  return (
    <svg
      className={cn('tap-hand-icon', className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.5 4.5a3.5 3.5 0 0 1 5 0" />
      <path d="M9 12V7.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M12 11.5v-1a1.5 1.5 0 0 1 3 0v1.5" />
      <path d="M15 11.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a5 5 0 0 1-3.8-1.8l-2.6-3.1a1.5 1.5 0 0 1 2.3-1.9L9 15.5" />
    </svg>
  );
}
