import { NightSky } from '@/components/atoms/night-sky';
import { GuestbookSection } from '@/domains/guestbook/components/organisms/guestbook-section';
import {
  INVITATION_CONTENT_ID,
  INVITATION_MAIN_ID
} from '@/domains/invitation/invitation-cover.constants';
import { AnnouncementSection } from '@/domains/invitation/components/organisms/announcement-section';
import { BlessingSection } from '@/domains/invitation/components/organisms/blessing-section';
import { CountdownSection } from '@/domains/invitation/components/organisms/countdown-section';
import { DressCodeSection } from '@/domains/invitation/components/organisms/dress-code-section';
import { EventsSection } from '@/domains/invitation/components/organisms/events-section';
import { GallerySection } from '@/domains/invitation/components/organisms/gallery-section';
import { GiftSection } from '@/domains/invitation/components/organisms/gift-section';
import { HeroSection } from '@/domains/invitation/components/organisms/hero-section';
import { InvitationClosing } from '@/domains/invitation/components/organisms/invitation-closing';
import { InvitationCover } from '@/domains/invitation/components/organisms/invitation-cover';
import { MusicPlayer } from '@/domains/invitation/components/organisms/music-player';

export default function HomePage() {
  return (
    <>
      <NightSky />
      <InvitationCover />
      <div id={INVITATION_CONTENT_ID} className="invitation-page">
        <main
          id={INVITATION_MAIN_ID}
          tabIndex={-1}
          className="invitation-page__main"
        >
          <HeroSection />
          <BlessingSection />
          <AnnouncementSection />
          <GallerySection />
          <EventsSection />
          <CountdownSection />
          <GiftSection />
          <DressCodeSection />
          <GuestbookSection />
        </main>
        <InvitationClosing />
      </div>
      <MusicPlayer />
    </>
  );
}
