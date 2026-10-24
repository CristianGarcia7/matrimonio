import { OrnamentDivider } from '@/components/atoms/ornament-divider';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  id: string;
  title: string;
  subtitle?: string;
  isOnSky?: boolean;
}

export function SectionHeading({
  id,
  title,
  subtitle,
  isOnSky = false
}: SectionHeadingProps) {
  return (
    <header
      className={cn('section-heading', isOnSky && 'section-heading--sky')}
    >
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      <OrnamentDivider className="section-heading__ornament" />
    </header>
  );
}
