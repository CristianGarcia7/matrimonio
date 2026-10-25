import { cn } from '@/lib/utils';

interface ScriptFlourishProps {
  isMirrored?: boolean;
  className?: string;
}

// Fine gold flourish drawn to sit to the right of a script headline; the
// mirrored variant sits on its left. Purely decorative.
export function ScriptFlourish({
  isMirrored = false,
  className
}: ScriptFlourishProps) {
  return (
    <svg
      className={cn(
        'script-flourish',
        isMirrored && 'script-flourish--mirrored',
        className
      )}
      viewBox="0 0 64 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="script-flourish__dot" cx="3" cy="12" r="1.5" />
      <path
        className="script-flourish__leaf"
        d="M8 12c3-4.5 7.5-5.5 11-4.2C16.6 11 12.4 12.6 8 12z"
      />
      <path
        className="script-flourish__leaf"
        d="M8 12c3 4.5 7.5 5.5 11 4.2C16.6 13 12.4 11.4 8 12z"
      />
      <path className="script-flourish__line" d="M19 12h42" />
      <path
        className="script-flourish__line"
        d="M40 12c3-4.5 7.5-5.4 10.5-3.4M40 12c3 4.5 7.5 5.4 10.5 3.4"
      />
      <circle className="script-flourish__dot" cx="62" cy="12" r="0.9" />
    </svg>
  );
}
