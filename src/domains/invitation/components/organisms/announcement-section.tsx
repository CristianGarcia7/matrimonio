import { PaperCard } from '@/components/molecules/paper-card';

import { invitationMessages } from '../../messages';
import { CEREMONY_START_ISO } from '../../wedding-details';
import { DateBlock } from '../molecules/date-block';

export function AnnouncementSection() {
  const { announcement } = invitationMessages;
  const { dateBlock } = announcement;

  return (
    <section
      className="invitation-section"
      aria-labelledby="announcement-title"
    >
      <PaperCard>
        <div className="announcement-section__content">
          <h2 id="announcement-title" className="announcement-section__title">
            {announcement.title}
          </h2>
          <p className="announcement-section__lead">{announcement.lead}</p>
          <DateBlock
            dateTime={CEREMONY_START_ISO}
            weekday={dateBlock.weekday}
            day={dateBlock.day}
            month={dateBlock.month}
            year={dateBlock.year}
          />
        </div>
      </PaperCard>
    </section>
  );
}
