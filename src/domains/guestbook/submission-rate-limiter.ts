const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const MAX_TRACKED_CLIENTS = 1000;

// In-memory and per server instance: resets on restart and is not shared
// across instances. Good enough to slow down casual abuse of a public form.
const submissionsByClient = new Map<string, number[]>();

function pruneExpiredClients(nowMs: number): void {
  for (const [clientKey, timestamps] of submissionsByClient) {
    const hasRecentSubmission = timestamps.some(
      timestamp => nowMs - timestamp < RATE_LIMIT_WINDOW_MS
    );
    if (!hasRecentSubmission) submissionsByClient.delete(clientKey);
  }
}

// Records a submission attempt and reports whether it is allowed.
export function consumeSubmissionSlot(
  clientKey: string,
  nowMs: number = Date.now()
): boolean {
  if (submissionsByClient.size > MAX_TRACKED_CLIENTS) {
    pruneExpiredClients(nowMs);
  }

  const recentSubmissions = (submissionsByClient.get(clientKey) ?? []).filter(
    timestamp => nowMs - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    submissionsByClient.set(clientKey, recentSubmissions);
    return false;
  }

  submissionsByClient.set(clientKey, [...recentSubmissions, nowMs]);
  return true;
}

// x-forwarded-for can be spoofed unless a trusted proxy overwrites it; the
// limiter is a soft guard, not a security boundary.
export function resolveClientKey(requestHeaders: Headers): string {
  const forwardedFor = requestHeaders.get('x-forwarded-for');
  const firstForwardedIp = forwardedFor?.split(',')[0]?.trim();
  return firstForwardedIp || requestHeaders.get('x-real-ip') || 'unknown';
}
