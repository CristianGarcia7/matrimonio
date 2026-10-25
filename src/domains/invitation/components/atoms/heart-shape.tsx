import { cn } from '@/lib/utils';

interface HeartShapeProps {
  className?: string;
}

// Decorative filled heart used to mark the wedding day.
export function HeartShape({ className }: HeartShapeProps) {
  return (
    <svg
      className={cn('heart-shape', className)}
      viewBox="0 0 24 22"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 21.2 10.4 19.8C4.7 14.7 1 11.3 1 7.1 1 3.7 3.6 1 7 1c1.9 0 3.8.9 5 2.4C13.2 1.9 15.1 1 17 1c3.4 0 6 2.7 6 6.1 0 4.2-3.7 7.6-9.4 12.7L12 21.2z" />
    </svg>
  );
}
