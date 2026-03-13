// In-memory rate limiter for serverless (resets on cold start, but that's fine)
// Tracks failed attempts per IP

interface RateLimitEntry {
  count: number
  firstAttempt: number
  blockedUntil: number
}

const store = new Map<string, RateLimitEntry>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const BLOCK_DURATION_MS = 30 * 60 * 1000 // 30 minute lockout after max attempts

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  const entry = store.get(ip)

  // Clean up old entries periodically
  if (store.size > 1000) {
    for (const [key, val] of store) {
      if (now > val.blockedUntil && now - val.firstAttempt > WINDOW_MS) {
        store.delete(key)
      }
    }
  }

  if (!entry) return { allowed: true }

  // Currently blocked
  if (now < entry.blockedUntil) {
    const retryAfterSeconds = Math.ceil((entry.blockedUntil - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  // Window expired — reset
  if (now - entry.firstAttempt > WINDOW_MS) {
    store.delete(ip)
    return { allowed: true }
  }

  // Still within window, check count
  if (entry.count >= MAX_ATTEMPTS) {
    // Block them
    entry.blockedUntil = now + BLOCK_DURATION_MS
    return { allowed: false, retryAfterSeconds: Math.ceil(BLOCK_DURATION_MS / 1000) }
  }

  return { allowed: true }
}

export function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    store.set(ip, { count: 1, firstAttempt: now, blockedUntil: 0 })
  } else {
    entry.count++
    if (entry.count >= MAX_ATTEMPTS) {
      entry.blockedUntil = now + BLOCK_DURATION_MS
    }
  }
}

export function clearFailedAttempts(ip: string) {
  store.delete(ip)
}
