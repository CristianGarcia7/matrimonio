interface CountdownUnitProps {
  value: string;
  label: string;
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="countdown-unit">
      <span className="countdown-unit__value">{value}</span>
      <span className="countdown-unit__label">{label}</span>
    </div>
  );
}
