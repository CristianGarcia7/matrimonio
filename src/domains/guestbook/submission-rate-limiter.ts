// Guestbook submission rate limiter.
//
// - Clients are keyed by `x-real-ip` (nginx sets it from `$remote_addr`, so
//   the client cannot forge it; see README "Deploy (PM2)"), else by the LAST
//   `x-forwarded-for` entry: proxies append the peer they saw, so leading
//   entries are client-controlled and could be rotated to dodge the limit.
// - A known client may sign 3 times per 10 minutes.
// - Without either header every visitor shares the "unknown" key, so that key
//   gets a generous shared budget (30 per 10 minutes) instead of locking the
//   whole guestbook after 3 signatures.
// - The store lives in memory, per process (PM2 runs a single instance): it
//   resets on restart. Expired entries are pruned once the map reaches its
//   cap; only if every entry is still active are the clients with the oldest
//   last submission evicted (never the shared unknown key), so it cannot grow
//   forever and busy budgets are not reset.
// - Headers can be spoofed unless a trusted proxy overwrites them; this is a
//   soft guard against casual abuse, not a security boundary.

export type SubmissionStore = Map<string, number[]>;

export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const UNKNOWN_CLIENT_KEY = 'unknown';

const MAX_SUBMISSIONS_PER_CLIENT = 3;
const MAX_SUBMISSIONS_FOR_UNKNOWN_CLIENTS = 30;
const MAX_TRACKED_CLIENTS = 10_000;

const submissionStore: SubmissionStore = new Map();

export function resolveClientKey(requestHeaders: Headers): string {
  const realIp = requestHeaders.get('x-real-ip')?.trim();
  const lastForwardedIp = requestHeaders
    .get('x-forwarded-for')
    ?.split(',')
    .at(-1)
    ?.trim();
  return realIp || lastForwardedIp || UNKNOWN_CLIENT_KEY;
}

function getSubmissionLimit(clientKey: string): number {
  return clientKey === UNKNOWN_CLIENT_KEY
    ? MAX_SUBMISSIONS_FOR_UNKNOWN_CLIENTS
    : MAX_SUBMISSIONS_PER_CLIENT;
}

function getRecentSubmissions(
  store: SubmissionStore,
  clientKey: string,
  nowMs: number
): number[] {
  return (store.get(clientKey) ?? []).filter(
    timestamp => nowMs - timestamp < RATE_LIMIT_WINDOW_MS
  );
}

// Read-only: true when the client already used its budget in the window.
export function isRateLimited(
  store: SubmissionStore,
  clientKey: string,
  nowMs: number
): boolean {
  return (
    getRecentSubmissions(store, clientKey, nowMs).length >=
    getSubmissionLimit(clientKey)
  );
}

// Drops clients without recent submissions. If the map is still over the
// cap, evicts the known clients whose last submission is oldest; the shared
// unknown key is never evicted.
export function pruneSubmissionStore(
  store: SubmissionStore,
  nowMs: number,
  maxTrackedClients: number = MAX_TRACKED_CLIENTS
): void {
  for (const [clientKey, timestamps] of store) {
    const recent = timestamps.filter(
      timestamp => nowMs - timestamp < RATE_LIMIT_WINDOW_MS
    );
    if (recent.length === 0) store.delete(clientKey);
    else store.set(clientKey, recent);
  }

  const excess = store.size - maxTrackedClients;
  if (excess <= 0) return;

  const evictionOrder = [...store]
    .filter(([clientKey]) => clientKey !== UNKNOWN_CLIENT_KEY)
    .sort(([, a], [, b]) => (a.at(-1) ?? 0) - (b.at(-1) ?? 0));
  for (const [clientKey] of evictionOrder.slice(0, excess)) {
    store.delete(clientKey);
  }
}

// Records a submission attempt and reports whether it is allowed.
export function consumeSubmissionSlot(
  clientKey: string,
  nowMs: number = Date.now()
): boolean {
  if (submissionStore.size >= MAX_TRACKED_CLIENTS) {
    pruneSubmissionStore(submissionStore, nowMs, MAX_TRACKED_CLIENTS - 1);
  }

  if (isRateLimited(submissionStore, clientKey, nowMs)) return false;

  submissionStore.set(clientKey, [
    ...getRecentSubmissions(submissionStore, clientKey, nowMs),
    nowMs
  ]);
  return true;
}
