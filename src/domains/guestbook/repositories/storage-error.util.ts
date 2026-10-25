const URL_PATTERN = /\b[a-z][a-z0-9+.-]*:\/\/\S+/gi;
const MAX_MESSAGE_LENGTH = 200;

// Concise, secret-free description of a storage failure for server logs:
// error name, driver code and a truncated message with URLs redacted.
export function describeStorageError(error: unknown): string {
  if (!(error instanceof Error)) return 'Unknown storage error';
  const code =
    'code' in error && typeof error.code === 'string' ? ` [${error.code}]` : '';
  const message = error.message
    .replace(URL_PATTERN, '<url>')
    .slice(0, MAX_MESSAGE_LENGTH);
  return `${error.name}${code}: ${message}`;
}
