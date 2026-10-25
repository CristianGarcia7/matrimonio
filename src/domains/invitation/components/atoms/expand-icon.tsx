import { cn } from '@/lib/utils';

interface ExpandIconProps {
  className?: string;
}

// Two diagonal arrows pointing outwards (⤢): "open larger".
export function ExpandIcon({ className }: ExpandIconProps) {
  return (
    <svg
      className={cn('expand-icon', className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
    </svg>
  );
}
