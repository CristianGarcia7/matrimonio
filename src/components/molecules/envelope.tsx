import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface EnvelopeProps {
  isOpen: boolean;
  seal: ReactNode;
  children: ReactNode;
  className?: string;
}

const SPARK_COUNT = 10;
const SPARK_KEYS = Array.from({ length: SPARK_COUNT }, (_, index) => index);

// Decorative envelope. On load the wax seal drops and stamps itself onto the
// flap; when `isOpen` becomes true the seal glows, lifts off whole and fades,
// the flap folds back in 3D and the inner card rises out (keyframes live in
// envelope.css; reduced motion keeps everything still).
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
      <div className="envelope__flap">
        <svg
          className="envelope__flap-face envelope__flap-face--front"
          viewBox="0 0 140 62"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path className="envelope__flap-shape" d="M0 0H140L70 62Z" />
        </svg>
        <svg
          className="envelope__flap-face envelope__flap-face--back"
          viewBox="0 0 140 62"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* Drawn upside down: the face's own 180deg flip plus the flap's
              hinge rotation put the base back on the hinge. */}
          <path className="envelope__flap-lining" d="M0 62H140L70 0Z" />
        </svg>
      </div>
      <div className="envelope__seal">
        <span className="envelope__seal-shadow" aria-hidden="true" />
        <span className="envelope__seal-body">
          <span className="envelope__seal-glow" aria-hidden="true" />
          {seal}
        </span>
        <span className="envelope__sparks" aria-hidden="true">
          {SPARK_KEYS.map(key => (
            <span key={key} className="envelope__spark" />
          ))}
        </span>
      </div>
    </div>
  );
}
