import path from 'node:path';

import { createSqliteGuestbookRepository } from './sqlite-guestbook.repository';

import type { GuestbookRepository } from '../types/guestbook-repository.types';

const DEFAULT_GUESTBOOK_DB_PATH = path.join(
  process.cwd(),
  'data',
  'guestbook.db'
);

// Composition point: the only place that knows which adapter backs the
// guestbook. Swapping persistence providers is a change to this file only.
export const guestbookRepository: GuestbookRepository =
  createSqliteGuestbookRepository(
    process.env.GUESTBOOK_DB_PATH ?? DEFAULT_GUESTBOOK_DB_PATH
  );
