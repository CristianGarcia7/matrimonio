interface CountdownUnitProps {
  value: string;
  label: string;
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="countdown-unit">
      <span className="countdown-unit__ring">
        {/* Keyed so each new value re-mounts and plays the tick animation. */}
        <span key={value} className="countdown-unit__value">
          {value}
        </span>
      </span>
      <span className="countdown-unit__label">{label}</span>
    </div>
  );
}
