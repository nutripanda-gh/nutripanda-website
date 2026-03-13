import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/utils/admin-auth'
import { handleCors, withCors } from '@/lib/utils/api-helpers'
import { getOrderById, updateOrderStatus } from '@/lib/supabase/queries'
import type { Order } from '@/types/supabase'

export async function OPTIONS(request: Request) {
  return handleCors(request)
}

// GET — single order detail
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const { id } = await params
    const order = await getOrderById(id)

    if (!order) {
      return withCors(
        NextResponse.json({ error: 'Order not found' }, { status: 404 }),
        request
      )
    }

    return withCors(NextResponse.json({ order }), request)
  } catch (err) {
    console.error('Admin get order error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 }),
      request
    )
  }
}

// PUT — update order status + optionally trigger notification
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { order_status, notes, send_notification } = body as {
      order_status?: Order['order_status']
      notes?: string
      send_notification?: boolean
    }

    if (!order_status) {
      return withCors(
        NextResponse.json({ error: 'order_status is required' }, { status: 400 }),
        request
      )
    }

    const validStatuses: Order['order_status'][] = [
      'confirmed', 'processing', 'shipped', 'delivered', 'cancelled',
    ]
    if (!validStatuses.includes(order_status)) {
      return withCors(
        NextResponse.json({ error: 'Invalid order status' }, { status: 400 }),
        request
      )
    }

    const order = await updateOrderStatus(id, order_status)

    // Update notes if provided
    if (notes !== undefined) {
      const { getSupabaseAdmin } = await import('@/lib/supabase/admin')
      await getSupabaseAdmin()
        .from('orders')
        .update({ notes })
        .eq('id', id)
    }

    // Trigger notification if requested
    if (send_notification && order.customer_whatsapp_opted_in) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
      fetch(`${baseUrl}/api/notifications/whatsapp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: 'shipping_update',
          order_id: order.id,
          status: order_status,
        }),
      }).catch((err) => console.error('Notification trigger failed:', err))
    }

    return withCors(NextResponse.json({ order }), request)
  } catch (err) {
    console.error('Admin update order error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to update order' }, { status: 500 }),
      request
    )
  }
}
