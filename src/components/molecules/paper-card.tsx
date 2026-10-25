import type { ReactNode } from 'react';

import { GoldBouquet } from '@/components/atoms/gold-bouquet';
import { cn } from '@/lib/utils';

interface PaperCardProps {
  children: ReactNode;
  hasFlorals?: boolean;
  className?: string;
}

// Ivory stationery card with a fine gold inner border and gold line-art
// bouquets in two opposite corners.
export function PaperCard({
  children,
  hasFlorals = true,
  className
}: PaperCardProps) {
  return (
    <div className={cn('paper-card', className)}>
      {hasFlorals && (
        <>
          <GoldBouquet className="paper-card__corner paper-card__corner--start" />
          <GoldBouquet className="paper-card__corner paper-card__corner--end" />
        </>
      )}
      <div className="paper-card__content">{children}</div>
    </div>
  );
}
