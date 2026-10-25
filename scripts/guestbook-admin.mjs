// Guestbook moderation CLI (soft delete only; nothing is ever hard-deleted).
//
//   pnpm guestbook:list          list every entry, hidden ones marked
//   pnpm guestbook:hide <id>     hide an entry from the page
//   pnpm guestbook:show <id>     make a hidden entry visible again
//
// <id> is a full id or a unique prefix of at least 6 characters.
// Connection: TURSO_DATABASE_URL (+ TURSO_AUTH_TOKEN) for the hosted database,
// or GUESTBOOK_DB_PATH for a local SQLite file. The package.json scripts load
// `.env.local` when it exists. Credentials are never printed.
import path from 'node:path';

import { createClient } from '@libsql/client';

const MIN_PREFIX_LENGTH = 6;
const SHORT_ID_LENGTH = 8;
const MESSAGE_PREVIEW_LENGTH = 60;
const ID_PREFIX_PATTERN = /^[0-9a-f-]+$/i;
const URL_PATTERN = /\b[a-z][a-z0-9+.-]*:\/\/\S+/gi;

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota',
  dateStyle: 'short',
  timeStyle: 'short'
});

class UsageError extends Error {}

function readEnv(name) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function resolveConnection() {
  const remoteUrl = readEnv('TURSO_DATABASE_URL');
  if (remoteUrl) {
    const authToken = readEnv('TURSO_AUTH_TOKEN');
    if (!authToken && !remoteUrl.startsWith('file:')) {
      throw new UsageError(
        'TURSO_AUTH_TOKEN is not set. Add it to .env.local or the environment.'
      );
    }
    return { url: remoteUrl, authToken };
  }
  const localPath = readEnv('GUESTBOOK_DB_PATH');
  if (localPath) {
    return { url: `file:${path.resolve(localPath)}` };
  }
  throw new UsageError(
    'TURSO_DATABASE_URL is not set. Add it to .env.local or the environment ' +
      '(or set GUESTBOOK_DB_PATH to moderate a local SQLite file).'
  );
}

async function hasHiddenAtColumn(client) {
  const tableInfo = await client.execute(
    'PRAGMA table_info(guestbook_entries)'
  );
  return tableInfo.rows.some(column => column.name === 'hidden_at');
}

// Same idempotent schema and migration as the app adapter.
async function ensureSchema(client) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS guestbook_entries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      hidden_at TEXT NULL
    )
  `);
  if (!(await hasHiddenAtColumn(client))) {
    await client.execute(
      'ALTER TABLE guestbook_entries ADD COLUMN hidden_at TEXT'
    );
  }
}

function formatDate(isoDate) {
  const date = new Date(String(isoDate));
  return Number.isNaN(date.getTime())
    ? String(isoDate)
    : dateFormatter.format(date);
}

function previewMessage(message) {
  const singleLine = String(message).replace(/\s+/g, ' ').trim();
  return singleLine.length > MESSAGE_PREVIEW_LENGTH
    ? `${singleLine.slice(0, MESSAGE_PREVIEW_LENGTH)}…`
    : singleLine;
}

const TABLE_COLUMNS = ['id', 'created', 'name', 'message', 'status'];

function printEntries(rows) {
  if (rows.length === 0) {
    console.log('No guestbook entries.');
    return;
  }
  const table = rows.map(row => [
    String(row.id).slice(0, SHORT_ID_LENGTH),
    formatDate(row.created_at),
    String(row.name),
    previewMessage(row.message),
    row.hidden_at ? 'HIDDEN' : 'visible'
  ]);
  const widths = TABLE_COLUMNS.map((header, index) =>
    Math.max(header.length, ...table.map(cells => cells[index].length))
  );
  const formatLine = cells =>
    cells
      .map((cell, index) => cell.padEnd(widths[index]))
      .join('  ')
      .trimEnd();
  console.log(formatLine(TABLE_COLUMNS));
  console.log(formatLine(widths.map(width => '-'.repeat(width))));
  table.forEach(cells => console.log(formatLine(cells)));
}

async function listEntries(client) {
  const result = await client.execute(`
    SELECT id, name, message, created_at, hidden_at
    FROM guestbook_entries
    ORDER BY created_at DESC
  `);
  printEntries(result.rows);
  const hiddenCount = result.rows.filter(row => row.hidden_at).length;
  console.log(`${result.rows.length} entries, ${hiddenCount} hidden.`);
}

async function findEntry(client, idOrPrefix) {
  if (!idOrPrefix) {
    throw new UsageError('Missing entry id. Usage: <command> <id-or-prefix>');
  }
  if (
    idOrPrefix.length < MIN_PREFIX_LENGTH ||
    !ID_PREFIX_PATTERN.test(idOrPrefix)
  ) {
    throw new UsageError(
      `Invalid id "${idOrPrefix}": use the full id or a prefix of at least ` +
        `${MIN_PREFIX_LENGTH} hex characters.`
    );
  }
  const result = await client.execute({
    sql: `
      SELECT id, name, message, created_at, hidden_at
      FROM guestbook_entries
      WHERE id = ? OR id LIKE ?
    `,
    args: [idOrPrefix, `${idOrPrefix.toLowerCase()}%`]
  });
  if (result.rows.length === 0) {
    throw new UsageError(`No entry matches "${idOrPrefix}".`);
  }
  if (result.rows.length > 1) {
    printEntries(result.rows);
    throw new UsageError(
      `"${idOrPrefix}" matches ${result.rows.length} entries; use a longer prefix.`
    );
  }
  return result.rows[0];
}

async function setHiddenAt(client, idOrPrefix, hiddenAt) {
  const entry = await findEntry(client, idOrPrefix);
  await client.execute({
    sql: 'UPDATE guestbook_entries SET hidden_at = ? WHERE id = ?',
    args: [hiddenAt, entry.id]
  });
  const updated = await findEntry(client, String(entry.id));
  printEntries([updated]);
  console.log(
    hiddenAt
      ? `Entry ${entry.id} is now hidden.`
      : `Entry ${entry.id} is now visible.`
  );
}

const COMMANDS = {
  list: client => listEntries(client),
  hide: (client, id) => setHiddenAt(client, id, new Date().toISOString()),
  show: (client, id) => setHiddenAt(client, id, null)
};

function describeError(error) {
  if (!(error instanceof Error)) return 'Unknown error';
  const code = typeof error.code === 'string' ? ` [${error.code}]` : '';
  return `${error.name}${code}: ${error.message.replace(URL_PATTERN, '<url>')}`;
}

async function main() {
  const [commandName, idOrPrefix] = process.argv.slice(2);
  const command = COMMANDS[commandName];
  if (!command) {
    throw new UsageError(
      `Unknown command "${commandName ?? ''}". Use one of: list, hide <id>, show <id>.`
    );
  }
  const client = createClient(resolveConnection());
  try {
    await ensureSchema(client);
    await command(client, idOrPrefix);
  } finally {
    client.close();
  }
}

main().catch(error => {
  console.error(
    error instanceof UsageError
      ? error.message
      : `Failed: ${describeError(error)}`
  );
  process.exitCode = 1;
});
