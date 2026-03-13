import { cookies } from 'next/headers'

const ADMIN_COOKIE_NAME = 'nutripanda_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 // 24 hours

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE_NAME)
  if (!session) return false

  // Simple token check — the cookie value is a hash of the admin password
  const expected = hashPassword(process.env.ADMIN_PASSWORD ?? '')
  return session.value === expected
}

export function hashPassword(password: string): string {
  // Simple hash for cookie session — not for storing passwords
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(password).digest('hex')
}

export function getSessionCookieOptions() {
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_MAX_AGE,
    path: '/',
  }
}

export { ADMIN_COOKIE_NAME }
