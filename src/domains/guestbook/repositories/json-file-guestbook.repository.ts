import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type {
  GuestbookEntry,
  NewGuestbookEntry
} from '../types/guestbook-entry.types';
import type { GuestbookRepository } from '../types/guestbook-repository.types';

function isFileMissingError(error: unknown): boolean {
  return (
    error instanceof Error &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'ENOENT'
  );
}

function isGuestbookEntry(value: unknown): value is GuestbookEntry {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.message === 'string' &&
    typeof candidate.createdAt === 'string'
  );
}

function sortNewestFirst(entries: GuestbookEntry[]): GuestbookEntry[] {
  return [...entries].sort((first, second) =>
    second.createdAt.localeCompare(first.createdAt)
  );
}

// Adapter: stores the guestbook as a JSON array on the local filesystem.
// Suitable for a single server instance; swap the adapter for multi-instance
// or serverless deployments where the filesystem is ephemeral.
export function createJsonFileGuestbookRepository(
  filePath: string
): GuestbookRepository {
  // Serializes writes so concurrent signatures never overwrite each other.
  let pendingWrite: Promise<unknown> = Promise.resolve();

  // A corrupt file throws instead of returning [] so a later write never
  // silently replaces existing signatures.
  async function readEntries(): Promise<GuestbookEntry[]> {
    try {
      const rawContent = await readFile(filePath, 'utf8');
      const parsedContent: unknown = JSON.parse(rawContent);
      return Array.isArray(parsedContent)
        ? parsedContent.filter(isGuestbookEntry)
        : [];
    } catch (error) {
      if (isFileMissingError(error)) return [];
      throw error;
    }
  }

  async function writeEntries(entries: GuestbookEntry[]): Promise<void> {
    await mkdir(path.dirname(filePath), { recursive: true });
    const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
    await writeFile(temporaryPath, JSON.stringify(entries, null, 2), 'utf8');
    await rename(temporaryPath, filePath);
  }

  return {
    async list() {
      return sortNewestFirst(await readEntries());
    },
    add(input: NewGuestbookEntry) {
      const writeTask = pendingWrite.then(async () => {
        const entries = await readEntries();
        const entry: GuestbookEntry = {
          id: randomUUID(),
          name: input.name,
          message: input.message,
          createdAt: new Date().toISOString()
        };
        await writeEntries([...entries, entry]);
        return entry;
      });
      pendingWrite = writeTask.catch(() => undefined);
      return writeTask;
    }
  };
}
