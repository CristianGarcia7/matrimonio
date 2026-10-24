import { SectionHeading } from '@/components/molecules/section-heading';

import { invitationMessages } from '../../messages';
import { ParentsGroup } from '../molecules/parents-group';

export function BlessingSection() {
  const { blessing } = invitationMessages;

  return (
    <section className="blessing-section" aria-labelledby="blessing-title">
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
    </section>
  );
}
