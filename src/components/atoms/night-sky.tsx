import { cn } from '@/lib/utils';

interface NightSkyProps {
  isContained?: boolean;
  className?: string;
}

// Decorative starry backdrop: layered CSS gradients only, no images or canvas.
export function NightSky({ isContained = false, className }: NightSkyProps) {
  return (
    <div
      className={cn(
        'night-sky',
        isContained && 'night-sky--contained',
        className
      )}
      aria-hidden="true"
    >
      <span className="night-sky__dust night-sky__dust--near" />
      <span className="night-sky__dust night-sky__dust--far" />
    </div>
  );
}
