import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/utils/admin-auth'
import { handleCors, withCors } from '@/lib/utils/api-helpers'
import { getOrders } from '@/lib/supabase/queries'

export async function OPTIONS(request: Request) {
  return handleCors(request)
}

// GET — list orders with pagination, filters, search
export async function GET(request: Request) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const payment_status = searchParams.get('payment_status') ?? undefined
    const order_status = searchParams.get('order_status') ?? undefined
    const search = searchParams.get('search') ?? undefined
    const limit = Number(searchParams.get('limit') ?? '20')
    const offset = Number(searchParams.get('offset') ?? '0')

    const { orders, count } = await getOrders({
      payment_status,
      order_status,
      search,
      limit,
      offset,
    })

    return withCors(
      NextResponse.json({ orders, count, limit, offset }),
      request
    )
  } catch (err) {
    console.error('Admin get orders error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 }),
      request
    )
  }
}
