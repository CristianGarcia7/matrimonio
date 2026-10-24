import { connection } from 'next/server';

import { guestbookRepository } from './repositories/guestbook-repository';

import type { GuestbookEntry } from './types/guestbook-entry.types';

// Server-only read for Server Components. Kept out of actions.ts so it is not
// exposed as a callable Server Action endpoint. Returns null when the store
// cannot be read so the UI can degrade gracefully.
export async function getGuestbookEntries(): Promise<GuestbookEntry[] | null> {
  // Signatures change at runtime: always read fresh instead of baking the
  // list into the build output.
  await connection();

  try {
    return await guestbookRepository.list();
  } catch {
    return null;
  }
}
