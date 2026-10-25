import { PaperCard } from '@/components/molecules/paper-card';
import { cn } from '@/lib/utils';

import { invitationMessages } from '../../messages';

type AvoidedColor = keyof typeof invitationMessages.dressCode.colors;
type AvoidedColorGroup = keyof typeof invitationMessages.dressCode.groups;

// Colors reserved for the couple, the wedding party and the family.
const AVOIDED_COLOR_GROUPS: ReadonlyArray<{
  group: AvoidedColorGroup;
  colors: readonly AvoidedColor[];
}> = [
  {
    group: 'women',
    colors: [
      'white',
      'champagne',
      'darkGreen',
      'emeraldGreen',
      'dustyRose',
      'oldRose'
    ]
  },
  {
    group: 'men',
    colors: ['lightGray', 'beige', 'darkGray', 'charcoal', 'darkGreen']
  }
];

const AVOIDED_SWATCH_CLASSES: Record<AvoidedColor, string> = {
  white: 'dress-code__avoided-swatch--white',
  champagne: 'dress-code__avoided-swatch--champagne',
  darkGreen: 'dress-code__avoided-swatch--dark-green',
  emeraldGreen: 'dress-code__avoided-swatch--emerald-green',
  dustyRose: 'dress-code__avoided-swatch--dusty-rose',
  oldRose: 'dress-code__avoided-swatch--old-rose',
  lightGray: 'dress-code__avoided-swatch--light-gray',
  beige: 'dress-code__avoided-swatch--beige',
  darkGray: 'dress-code__avoided-swatch--dark-gray',
  charcoal: 'dress-code__avoided-swatch--charcoal'
};

export function DressCodeSection() {
  const { dressCode } = invitationMessages;
  const { guests } = dressCode;

  return (
    <section className="invitation-section" aria-labelledby="dress-code-title">
      <PaperCard className="dress-code">
        <div className="dress-code__content">
          <h2 id="dress-code-title" className="dress-code__title">
            {dressCode.title}
          </h2>

          <div className="dress-code__guests">
            <h3 className="dress-code__subtitle">
              {guests.title}
              <span className="dress-code__style">{guests.style}</span>
            </h3>
            <p className="dress-code__body">{guests.body}</p>

            <div className="dress-code__groups">
              {AVOIDED_COLOR_GROUPS.map(({ group, colors }) => (
                <div key={group} className="dress-code__group">
                  <h4
                    id={`dress-code-${group}`}
                    className="dress-code__group-title"
                  >
                    {dressCode.groups[group]}
                  </h4>
                  <ul
                    className="dress-code__avoided"
                    aria-labelledby={`dress-code-${group}`}
                  >
                    {colors.map(color => (
                      <li key={color} className="dress-code__avoided-item">
                        <span
                          className={cn(
                            'dress-code__avoided-swatch',
                            AVOIDED_SWATCH_CLASSES[color]
                          )}
                          aria-hidden="true"
                        />
                        <span className="dress-code__avoided-label">
                          <span className="sr-only">
                            {dressCode.avoidLabel}:{' '}
                          </span>
                          {dressCode.colors[color]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PaperCard>
    </section>
  );
}
