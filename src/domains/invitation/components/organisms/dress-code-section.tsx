import { PaperCard } from '@/components/molecules/paper-card';
import { cn } from '@/lib/utils';

import { invitationMessages } from '../../messages';
import { WEDDING_PARTY } from '../../wedding-party';
import { WeddingPartyCard } from '../molecules/wedding-party-card';

const AVOIDED_COLORS = ['white', 'black'] as const;

const AVOIDED_SWATCH_CLASSES: Record<(typeof AVOIDED_COLORS)[number], string> =
  {
    white: 'dress-code__avoided-swatch--white',
    black: 'dress-code__avoided-swatch--black'
  };

export function DressCodeSection() {
  const { dressCode } = invitationMessages;
  const { guests, party } = dressCode;

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

          <div className="dress-code__party">
            <h3 className="dress-code__party-title">{party.title}</h3>
            <ul className="dress-code__party-grid">
              {WEDDING_PARTY.map(member => {
                const role = party.roles[member.role];
                return (
                  <WeddingPartyCard
                    key={member.role}
                    role={member.role}
                    name={role.name}
                    description={role.description}
                    garment={member.garment}
                    hasBoutonniere={member.hasBoutonniere}
                    swatches={member.colors.map(color => ({
                      color,
                      name: party.colorNames[color]
                    }))}
                    swatchesLabel={party.swatchesLabel(role.name)}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </PaperCard>
    </section>
  );
}
