import type { Parent } from '../../types/parent.types';

interface ParentsGroupProps {
  label: string;
  parents: readonly Parent[];
  conjunction: string;
  heavenNote: string;
}

const HEAVEN_STAR = '✦';

// When every parent of the group is in heaven the note is shown once under
// the pair; otherwise it follows each remembered name.
export function ParentsGroup({
  label,
  parents,
  conjunction,
  heavenNote
}: ParentsGroupProps) {
  const lastIndex = parents.length - 1;
  const isGroupInHeaven = parents.every(parent => parent.isInHeaven);

  return (
    <div className="parents-group">
      <h3 className="parents-group__label">{label}</h3>
      <p className="parents-group__names">
        {parents.map((parent, index) => (
          <span key={parent.name} className="parents-group__name">
            {parent.name}
            {parent.isInHeaven && (
              <>
                <span className="parents-group__star" aria-hidden="true">
                  {HEAVEN_STAR}
                </span>
                {parent.remembranceLabel && (
                  <span className="sr-only">{` ${parent.remembranceLabel}`}</span>
                )}
                {!isGroupInHeaven && (
                  <span className="parents-group__heaven-note">
                    {` ${heavenNote}`}
                  </span>
                )}
              </>
            )}
            {index < lastIndex && (
              <span className="parents-group__conjunction">
                {` ${conjunction} `}
              </span>
            )}
          </span>
        ))}
      </p>
      {isGroupInHeaven && (
        <p className="parents-group__heaven-note">{heavenNote}</p>
      )}
    </div>
  );
}
