import path from 'node:path';

import { createJsonFileGuestbookRepository } from './json-file-guestbook.repository';

import type { GuestbookRepository } from '../types/guestbook-repository.types';

const DEFAULT_GUESTBOOK_FILE = path.join(
  process.cwd(),
  'data',
  'guestbook.json'
);

// Composition point: the only place that knows which adapter backs the
// guestbook. Swapping persistence providers is a change to this file only.
export const guestbookRepository: GuestbookRepository =
  createJsonFileGuestbookRepository(
    process.env.GUESTBOOK_DATA_FILE ?? DEFAULT_GUESTBOOK_FILE
  );
