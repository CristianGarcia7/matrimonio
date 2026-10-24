import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
  isSubtle?: boolean;
  className?: string;
}

export function ExternalLink({
  href,
  children,
  ariaLabel,
  isSubtle = false,
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
        isSubtle && 'external-link--subtle',
        className
      )}
    >
      {children}
    </a>
  );
}
