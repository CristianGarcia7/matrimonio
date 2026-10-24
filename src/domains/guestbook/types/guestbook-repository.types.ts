import type {
  GuestbookEntry,
  NewGuestbookEntry
} from './guestbook-entry.types';

// Port: any persistence provider (JSON file, database, SaaS) implements this.
export interface GuestbookRepository {
  list(): Promise<GuestbookEntry[]>;
  add(input: NewGuestbookEntry): Promise<GuestbookEntry>;
}
