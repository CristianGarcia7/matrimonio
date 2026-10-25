import path from 'node:path';

import { createLibsqlGuestbookRepository } from './libsql-guestbook.repository';

import type { LibsqlGuestbookConfig } from './libsql-guestbook.repository';
import type { GuestbookRepository } from '../types/guestbook-repository.types';

const DEFAULT_LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'guestbook.db');

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

// Hosted Turso database when TURSO_DATABASE_URL is set (Vercel); otherwise a
// local SQLite file, overridable with GUESTBOOK_DB_PATH (dev and PM2).
function resolveLibsqlConfig(): LibsqlGuestbookConfig {
  const remoteUrl = readEnv('TURSO_DATABASE_URL');
  if (remoteUrl) {
    return { url: remoteUrl, authToken: readEnv('TURSO_AUTH_TOKEN') };
  }
  // Runtime data path, not a source file: keep it out of output tracing.
  const localPath = path.resolve(
    /* turbopackIgnore: true */ readEnv('GUESTBOOK_DB_PATH') ??
      DEFAULT_LOCAL_DB_PATH
  );
  return {
    url: `file:${localPath}`,
    localDirectory: path.dirname(localPath)
  };
}

// Composition point: the only place that knows which adapter backs the
// guestbook. Swapping persistence providers is a change to this file only.
export const guestbookRepository: GuestbookRepository =
  createLibsqlGuestbookRepository(resolveLibsqlConfig());
