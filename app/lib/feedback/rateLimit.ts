/**
 * Best-effort in-memory rate limit. On serverless this only sees a single warm
 * instance, so it's a speed bump against bursts — the honeypot is the real
 * spam guard (add Cloudflare Turnstile later if abuse becomes a problem)
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}
