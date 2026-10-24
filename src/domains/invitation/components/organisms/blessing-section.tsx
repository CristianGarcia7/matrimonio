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
            names={blessing.groomParents.names}
            conjunction={blessing.conjunction}
          />
          <ParentsGroup
            label={blessing.brideParents.label}
            names={blessing.brideParents.names}
            conjunction={blessing.conjunction}
          />
        </div>
      </PaperCard>
    </section>
  );
}
