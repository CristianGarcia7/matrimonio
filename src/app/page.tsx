import { GuestbookSection } from '@/domains/guestbook/components/organisms/guestbook-section';
import { BlessingSection } from '@/domains/invitation/components/organisms/blessing-section';
import { CountdownSection } from '@/domains/invitation/components/organisms/countdown-section';
import { EventsSection } from '@/domains/invitation/components/organisms/events-section';
import { HeroSection } from '@/domains/invitation/components/organisms/hero-section';
import { InvitationClosing } from '@/domains/invitation/components/organisms/invitation-closing';

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <CountdownSection />
        <EventsSection />
        <BlessingSection />
        <GuestbookSection />
      </main>
      <InvitationClosing />
    </>
  );
}
