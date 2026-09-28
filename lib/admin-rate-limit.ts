type AttemptBucket = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, AttemptBucket>();

function clientKey(request: Request) {
  const ip = request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  const agent = request.headers.get("user-agent")?.slice(0, 96) || "unknown-agent";
  return ip + "|" + agent;
}

function prune(now: number) {
  if (attempts.size < 500) return;
  for (const [key, bucket] of attempts) {
    if (bucket.resetAt <= now) attempts.delete(key);
  }
}

export function checkAdminLoginRateLimit(request: Request) {
  const now = Date.now();
  prune(now);
  const bucket = attempts.get(clientKey(request));
  if (!bucket || bucket.resetAt <= now || bucket.count < MAX_ATTEMPTS) {
    return { allowed: true, retryAfterSeconds: 0 };
  }
  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

export function recordAdminLoginFailure(request: Request) {
  const now = Date.now();
  const key = clientKey(request);
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  current.count += 1;
}

export function clearAdminLoginFailures(request: Request) {
  attempts.delete(clientKey(request));
}
