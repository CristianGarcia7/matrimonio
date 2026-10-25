import { SectionHeading } from '@/components/molecules/section-heading';
import { PaperCard } from '@/components/molecules/paper-card';

import { invitationMessages } from '../../messages';
import { ParentsGroup } from '../molecules/parents-group';

export function BlessingSection() {
  const { blessing } = invitationMessages;

  return (
    <section className="invitation-section" aria-labelledby="blessing-title">
      <PaperCard>
        <SectionHeading id="blessing-title" title={blessing.title} />
        <div className="blessing-section__grid">
          <ParentsGroup
            label={blessing.groomParents.label}
            parents={blessing.groomParents.parents}
            conjunction={blessing.conjunction}
            heavenNote={blessing.groomParents.heavenNote}
          />
          <ParentsGroup
            label={blessing.brideParents.label}
            parents={blessing.brideParents.parents}
            conjunction={blessing.conjunction}
            heavenNote={blessing.brideParents.heavenNote}
          />
        </div>
        <p className="blessing-section__remembrance">
          <span className="blessing-section__star" aria-hidden="true">
            ✦
          </span>
          {blessing.remembrance}
        </p>
      </PaperCard>
    </section>
  );
}
