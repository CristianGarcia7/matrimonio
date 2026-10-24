interface ParentsGroupProps {
  label: string;
  names: readonly string[];
  conjunction: string;
}

export function ParentsGroup({ label, names, conjunction }: ParentsGroupProps) {
  const lastIndex = names.length - 1;

  return (
    <div className="parents-group">
      <h3 className="parents-group__label">{label}</h3>
      <p className="parents-group__names">
        {names.map((name, index) => (
          <span key={name} className="parents-group__name">
            {name}
            {index < lastIndex && (
              <span className="parents-group__conjunction">
                {` ${conjunction} `}
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}
