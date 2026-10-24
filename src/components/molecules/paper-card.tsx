import type { ReactNode } from 'react';

import { WatercolorFloral } from '@/components/atoms/watercolor-floral';
import { cn } from '@/lib/utils';

interface PaperCardProps {
  children: ReactNode;
  hasFlorals?: boolean;
  className?: string;
}

// Ivory stationery card with a fine gold inner border and watercolor corners.
export function PaperCard({
  children,
  hasFlorals = true,
  className
}: PaperCardProps) {
  return (
    <div className={cn('paper-card', className)}>
      {hasFlorals && (
        <>
          <WatercolorFloral
            variant="rose"
            sizes="9rem"
            className="paper-card__corner paper-card__corner--start"
          />
          <WatercolorFloral
            variant="hydrangea"
            sizes="7rem"
            className="paper-card__corner paper-card__corner--end"
          />
        </>
      )}
      <div className="paper-card__content">{children}</div>
    </div>
  );
}
