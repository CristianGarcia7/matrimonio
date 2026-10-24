import { Suspense } from 'react';

import { SectionHeading } from '@/components/molecules/section-heading';

import { guestbookMessages } from '../../messages';
import { GuestbookForm } from './guestbook-form';
import { GuestbookSignatures } from './guestbook-signatures';

export function GuestbookSection() {
  const { section, signatures } = guestbookMessages;

  return (
    <section className="guestbook-section" aria-labelledby="guestbook-title">
      <SectionHeading
        id="guestbook-title"
        title={section.title}
        subtitle={section.subtitle}
        isOnSky
      />
      <div className="guestbook-section__layout">
        <GuestbookForm />
        <div className="guestbook-section__signatures">
          <h3 className="guestbook-section__subtitle">{signatures.title}</h3>
          <Suspense
            fallback={
              <p className="guestbook-signatures__notice" aria-busy="true">
                {signatures.loading}
              </p>
            }
          >
            <GuestbookSignatures />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
