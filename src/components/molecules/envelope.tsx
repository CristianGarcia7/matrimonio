import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface EnvelopeProps {
  isOpen: boolean;
  seal: ReactNode;
  children: ReactNode;
  className?: string;
}

// Decorative envelope: the flap folds back and the inner card slides out
// when `isOpen` becomes true (transitions live in envelope.css).
export function Envelope({ isOpen, seal, children, className }: EnvelopeProps) {
  return (
    <div className={cn('envelope', isOpen && 'envelope--open', className)}>
      <div className="envelope__back" />
      <div className="envelope__card">{children}</div>
      <svg
        className="envelope__pocket"
        viewBox="0 0 140 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="envelope__side" d="M0 0 62 55 0 100Z" />
        <path className="envelope__side" d="M140 0 78 55 140 100Z" />
        <path className="envelope__bottom" d="M0 100 70 47 140 100Z" />
      </svg>
      <svg
        className="envelope__flap"
        viewBox="0 0 140 62"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="envelope__flap-shape" d="M0 0H140L70 62Z" />
      </svg>
      <div className="envelope__seal">{seal}</div>
    </div>
  );
}
