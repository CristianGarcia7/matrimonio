'use client';

import { useFlipValue } from '../../hooks/use-flip-value';
import { FlipCard } from '../atoms/flip-card';

interface CountdownUnitProps {
  value: string;
  label: string;
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const { previousValue, flipKey } = useFlipValue(value);

  return (
    <div className="countdown-unit">
      <FlipCard value={value} previousValue={previousValue} flipKey={flipKey} />
      <span className="sr-only">{value}</span>
      <span className="countdown-unit__label">{label}</span>
    </div>
  );
}
