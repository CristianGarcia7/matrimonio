import type { ReactNode } from 'react';

import { BotanicalSprig } from '@/components/atoms/botanical-sprig';
import { cn } from '@/lib/utils';

interface PaperCardProps {
  children: ReactNode;
  hasFlorals?: boolean;
  className?: string;
}

// Ivory stationery card with a fine gold inner border and botanical corners.
export function PaperCard({
  children,
  hasFlorals = true,
  className
}: PaperCardProps) {
  return (
    <div className={cn('paper-card', className)}>
      {hasFlorals && (
        <>
          <BotanicalSprig className="paper-card__corner paper-card__corner--start" />
          <BotanicalSprig className="paper-card__corner paper-card__corner--end" />
        </>
      )}
      <div className="paper-card__content">{children}</div>
    </div>
  );
}
