import { cn } from '@/lib/utils';

import { HydrangeaFloret } from './hydrangea-floret';

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
      <path className="ornament-divider__line" d="M6 12h88M146 12h88" />
      <path
        className="ornament-divider__line"
        d="M94 12c4-5 8-6 12-5M94 12c4 5 8 6 12 5M146 12c-4-5-8-6-12-5M146 12c-4 5-8 6-12 5"
      />
      <circle className="ornament-divider__dot" cx="6" cy="12" r="1.4" />
      <circle className="ornament-divider__dot" cx="234" cy="12" r="1.4" />
      <HydrangeaFloret x={120} y={12} rotation={45} scale={1.5} />
      <HydrangeaFloret x={110} y={12} scale={0.7} />
      <HydrangeaFloret x={130} y={12} scale={0.7} />
    </svg>
  );
}
