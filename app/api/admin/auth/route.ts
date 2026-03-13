import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminSession, hashPassword, getSessionCookieOptions, ADMIN_COOKIE_NAME } from '@/lib/utils/admin-auth'
import { corsHeaders, handleCors, withCors } from '@/lib/utils/api-helpers'
import { checkRateLimit, recordFailedAttempt, clearFailedAttempts } from '@/lib/utils/rate-limit'

function getClientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'
}

export async function OPTIONS(request: Request) {
  return handleCors(request)
}

// POST — login
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)

    // Rate limit check
    const { allowed, retryAfterSeconds } = checkRateLimit(ip)
    if (!allowed) {
      return withCors(
        NextResponse.json(
          { error: `Too many failed attempts. Try again in ${Math.ceil((retryAfterSeconds || 1800) / 60)} minutes.` },
          { status: 429 }
        ),
        request
      )
    }

    const body = await request.json()
    const { password } = body as { password: string }

    if (!password) {
      return withCors(
        NextResponse.json({ error: 'Password required' }, { status: 400 }),
        request
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD env var not set')
      return withCors(
        NextResponse.json({ error: 'Server configuration error' }, { status: 500 }),
        request
      )
    }

    if (password !== adminPassword) {
      recordFailedAttempt(ip)
      return withCors(
        NextResponse.json({ error: 'Invalid password' }, { status: 401 }),
        request
      )
    }

    // Success — clear any failed attempts for this IP
    clearFailedAttempts(ip)

    // Set session cookie
    const cookieStore = await cookies()
    const cookieOptions = getSessionCookieOptions()
    cookieStore.set(cookieOptions.name, hashPassword(adminPassword), cookieOptions)

    return withCors(
      NextResponse.json({ success: true }),
      request
    )
  } catch (err) {
    console.error('Admin auth error:', err)
    return withCors(
      NextResponse.json({ error: 'Authentication failed' }, { status: 500 }),
      request
    )
  }
}

// GET — check session
export async function GET(request: Request) {
  const isAuthenticated = await verifyAdminSession()
  return withCors(
    NextResponse.json({ authenticated: isAuthenticated }),
    request
  )
}

// DELETE — logout
export async function DELETE(request: Request) {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  return withCors(
    NextResponse.json({ success: true }),
    request
  )
}
