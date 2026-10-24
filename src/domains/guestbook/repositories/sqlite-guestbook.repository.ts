import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

import type {
  GuestbookEntry,
  NewGuestbookEntry
} from '../types/guestbook-entry.types';
import type { GuestbookRepository } from '../types/guestbook-repository.types';

const SCHEMA_STATEMENTS = `
  CREATE TABLE IF NOT EXISTS guestbook_entries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS guestbook_entries_created_at_index
    ON guestbook_entries (created_at);
`;

const LIST_ENTRIES_QUERY = `
  SELECT id, name, message, created_at
  FROM guestbook_entries
  ORDER BY created_at DESC
`;

const INSERT_ENTRY_STATEMENT = `
  INSERT INTO guestbook_entries (id, name, message, created_at)
  VALUES (?, ?, ?, ?)
`;

function toGuestbookEntry(row: Record<string, unknown>): GuestbookEntry {
  return {
    id: String(row.id),
    name: String(row.name),
    message: String(row.message),
    createdAt: String(row.created_at)
  };
}

function openDatabase(databasePath: string): DatabaseSync {
  try {
    mkdirSync(path.dirname(databasePath), { recursive: true });
  } catch (error) {
    throw new Error(
      `Cannot create the guestbook database directory for "${databasePath}". ` +
        'Create it with write access for the app user or point GUESTBOOK_DB_PATH elsewhere.',
      { cause: error }
    );
  }
  const database = new DatabaseSync(databasePath);
  // WAL lets reads proceed while a signature is being written.
  database.exec('PRAGMA journal_mode = WAL;');
  database.exec(SCHEMA_STATEMENTS);
  return database;
}

// Adapter: stores the guestbook in a local SQLite file through Node's built-in
// `node:sqlite` driver (no native build step). Suitable for a single server
// instance with a persistent volume; swap the adapter for multi-instance or
// serverless deployments.
export function createSqliteGuestbookRepository(
  databasePath: string
): GuestbookRepository {
  // One connection per process, opened lazily so builds never touch the disk.
  let database: DatabaseSync | null = null;

  function getDatabase(): DatabaseSync {
    database ??= openDatabase(databasePath);
    return database;
  }

  return {
    async list() {
      return getDatabase()
        .prepare(LIST_ENTRIES_QUERY)
        .all()
        .map(toGuestbookEntry);
    },
    async add(input: NewGuestbookEntry) {
      const entry: GuestbookEntry = {
        id: randomUUID(),
        name: input.name,
        message: input.message,
        createdAt: new Date().toISOString()
      };
      getDatabase()
        .prepare(INSERT_ENTRY_STATEMENT)
        .run(entry.id, entry.name, entry.message, entry.createdAt);
      return entry;
    }
  };
}
