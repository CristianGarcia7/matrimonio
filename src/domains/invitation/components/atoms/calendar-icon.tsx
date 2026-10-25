import { cn } from '@/lib/utils';

interface CalendarIconProps {
  className?: string;
}

export function CalendarIcon({ className }: CalendarIconProps) {
  return (
    <svg
      className={cn('calendar-icon', className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}
