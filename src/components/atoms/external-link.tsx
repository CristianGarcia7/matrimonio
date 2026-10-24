import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ExternalLinkVariant = 'solid' | 'outline' | 'gold';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
  variant?: ExternalLinkVariant;
  className?: string;
}

export function ExternalLink({
  href,
  children,
  ariaLabel,
  variant = 'solid',
  className
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        'external-link',
        variant === 'outline' && 'external-link--outline',
        variant === 'gold' && 'external-link--gold',
        className
      )}
    >
      {children}
    </a>
  );
}
