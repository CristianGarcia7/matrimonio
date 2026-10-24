import { PaperCard } from '@/components/molecules/paper-card';
import { cn } from '@/lib/utils';

import { invitationMessages } from '../../messages';

const AVOIDED_COLORS = ['white', 'black'] as const;

const SWATCH_MODIFIERS: Record<(typeof AVOIDED_COLORS)[number], string> = {
  white: 'dress-code-section__swatch--white',
  black: 'dress-code-section__swatch--black'
};

export function DressCodeSection() {
  const { dressCode } = invitationMessages;

  return (
    <section className="invitation-section" aria-labelledby="dress-code-title">
      <PaperCard hasFlorals={false}>
        <div className="dress-code-section__content">
          <h2 id="dress-code-title" className="dress-code-section__title">
            {dressCode.title}
          </h2>
          <p className="dress-code-section__body">{dressCode.body}</p>
          <ul className="dress-code-section__swatches">
            {AVOIDED_COLORS.map(color => (
              <li key={color} className="dress-code-section__swatch-item">
                <span
                  className={cn(
                    'dress-code-section__swatch',
                    SWATCH_MODIFIERS[color]
                  )}
                  aria-hidden="true"
                />
                <span className="dress-code-section__swatch-label">
                  <span className="sr-only">{dressCode.avoidLabel}: </span>
                  {dressCode.colors[color]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PaperCard>
    </section>
  );
}
