import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';

import { createClient } from '@libsql/client';

import type {
  GuestbookEntry,
  NewGuestbookEntry
} from '../types/guestbook-entry.types';
import type { GuestbookRepository } from '../types/guestbook-repository.types';
import type { Client, Row } from '@libsql/client';

export interface LibsqlGuestbookConfig {
  url: string;
  authToken?: string;
  // Directory to create before opening a local `file:` database.
  localDirectory?: string;
}

const CREATE_TABLE_STATEMENT = `
  CREATE TABLE IF NOT EXISTS guestbook_entries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL,
    hidden_at TEXT NULL
  )
`;

const CREATE_INDEX_STATEMENT = `
  CREATE INDEX IF NOT EXISTS guestbook_entries_created_at_index
    ON guestbook_entries (created_at)
`;

const TABLE_INFO_QUERY = 'PRAGMA table_info(guestbook_entries)';

const ADD_HIDDEN_AT_STATEMENT =
  'ALTER TABLE guestbook_entries ADD COLUMN hidden_at TEXT';

const LIST_VISIBLE_ENTRIES_QUERY = `
  SELECT id, name, message, created_at
  FROM guestbook_entries
  WHERE hidden_at IS NULL
  ORDER BY created_at DESC
`;

const INSERT_ENTRY_STATEMENT = `
  INSERT INTO guestbook_entries (id, name, message, created_at)
  VALUES (?, ?, ?, ?)
`;

function toGuestbookEntry(row: Row): GuestbookEntry {
  return {
    id: String(row.id),
    name: String(row.name),
    message: String(row.message),
    createdAt: String(row.created_at)
  };
}

async function hasHiddenAtColumn(client: Client): Promise<boolean> {
  const tableInfo = await client.execute(TABLE_INFO_QUERY);
  return tableInfo.rows.some(column => column.name === 'hidden_at');
}

// Databases created before soft delete existed lack `hidden_at`.
async function migrateHiddenAtColumn(client: Client): Promise<void> {
  if (await hasHiddenAtColumn(client)) return;
  try {
    await client.execute(ADD_HIDDEN_AT_STATEMENT);
  } catch (error) {
    // Another instance may have added the column concurrently.
    if (!(await hasHiddenAtColumn(client))) throw error;
  }
}

async function openClient(config: LibsqlGuestbookConfig): Promise<Client> {
  if (config.localDirectory) {
    await mkdir(config.localDirectory, { recursive: true });
  }
  const client = createClient({
    url: config.url,
    authToken: config.authToken
  });
  try {
    await client.execute(CREATE_TABLE_STATEMENT);
    await migrateHiddenAtColumn(client);
    await client.execute(CREATE_INDEX_STATEMENT);
    return client;
  } catch (error) {
    client.close();
    throw error;
  }
}

// Adapter: stores the guestbook in libSQL. In production it talks to a hosted
// Turso database over HTTP (works on serverless platforms such as Vercel);
// locally it uses a `file:` database so development needs no account.
export function createLibsqlGuestbookRepository(
  config: LibsqlGuestbookConfig
): GuestbookRepository {
  // One client per process, opened lazily so builds never touch the database.
  // The promise is shared so concurrent first requests initialize only once.
  let clientPromise: Promise<Client> | null = null;

  function getClient(): Promise<Client> {
    clientPromise ??= openClient(config).catch((error: unknown) => {
      // Let the next request retry instead of caching the failure forever.
      clientPromise = null;
      throw error;
    });
    return clientPromise;
  }

  return {
    async list() {
      const client = await getClient();
      const result = await client.execute(LIST_VISIBLE_ENTRIES_QUERY);
      return result.rows.map(toGuestbookEntry);
    },
    async add(input: NewGuestbookEntry) {
      const entry: GuestbookEntry = {
        id: randomUUID(),
        name: input.name,
        message: input.message,
        createdAt: new Date().toISOString()
      };
      const client = await getClient();
      await client.execute({
        sql: INSERT_ENTRY_STATEMENT,
        args: [entry.id, entry.name, entry.message, entry.createdAt]
      });
      return entry;
    }
  };
}
