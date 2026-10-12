const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX = 40;

export function rateLimitKey(ip: string | null): string {
  return ip?.split(",")[0]?.trim() || "unknown";
}

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.reset) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (row.count >= MAX) return false;
  row.count += 1;
  return true;
}
