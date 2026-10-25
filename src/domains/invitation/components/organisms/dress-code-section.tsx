import { PaperCard } from '@/components/molecules/paper-card';
import { cn } from '@/lib/utils';

import { invitationMessages } from '../../messages';

// Reserved for the bride (white, ivory) and the wedding party (bottle green,
// blush); black is avoided as well.
const AVOIDED_COLORS = [
  'white',
  'ivory',
  'black',
  'bottleGreen',
  'blush'
] as const;

const AVOIDED_SWATCH_CLASSES: Record<(typeof AVOIDED_COLORS)[number], string> =
  {
    white: 'dress-code__avoided-swatch--white',
    ivory: 'dress-code__avoided-swatch--ivory',
    black: 'dress-code__avoided-swatch--black',
    bottleGreen: 'dress-code__avoided-swatch--bottle-green',
    blush: 'dress-code__avoided-swatch--blush'
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
            <ul className="dress-code__avoided">
              {AVOIDED_COLORS.map(color => (
                <li key={color} className="dress-code__avoided-item">
                  <span
                    className={cn(
                      'dress-code__avoided-swatch',
                      AVOIDED_SWATCH_CLASSES[color]
                    )}
                    aria-hidden="true"
                  />
                  <span className="dress-code__avoided-label">
                    <span className="sr-only">{dressCode.avoidLabel}: </span>
                    {dressCode.colors[color]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PaperCard>
    </section>
  );
}
