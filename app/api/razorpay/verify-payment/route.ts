import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { verifyRazorpaySignature } from '@/lib/razorpay/utils'
import { updateOrderPayment, logInventoryChange } from '@/lib/supabase/queries'
import type { OrderItem } from '@/types/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
    } = body as {
      razorpay_order_id: string
      razorpay_payment_id: string
      razorpay_signature: string
      order_id: string
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    // ── Verify signature ──
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // ── Update order as paid ──
    const order = await updateOrderPayment(order_id, {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    })

    // ── Decrement inventory ──
    const supabase = getSupabaseAdmin()
    const items = order.items as OrderItem[]

    for (const item of items) {
      // Get current stock
      const { data: product } = await supabase
        .from('products')
        .select('inventory_count')
        .eq('id', item.productId)
        .single()

      if (product) {
        const previousStock = product.inventory_count
        const newStock = Math.max(0, previousStock - item.quantity)

        // Update stock
        await supabase
          .from('products')
          .update({ inventory_count: newStock })
          .eq('id', item.productId)

        // Log inventory change
        await logInventoryChange({
          product_id: item.productId,
          product_name: item.name,
          change_type: 'sale',
          quantity_change: -item.quantity,
          previous_stock: previousStock,
          new_stock: newStock,
          order_id: order.id,
        })
      }
    }

    // ── Trigger notifications (fire-and-forget) ──
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.headers.get('origin') ?? ''

    // Email to customer
    fetch(`${baseUrl}/api/notifications/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template: 'order_confirmation',
        order_id: order.id,
      }),
    }).catch((err) => console.error('Email notification failed:', err))

    // Email to admin
    fetch(`${baseUrl}/api/notifications/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template: 'admin_new_order',
        order_id: order.id,
      }),
    }).catch((err) => console.error('Admin email notification failed:', err))

    // WhatsApp to customer (if opted in)
    if (order.customer_whatsapp_opted_in) {
      fetch(`${baseUrl}/api/notifications/whatsapp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: 'order_confirmation',
          order_id: order.id,
        }),
      }).catch((err) => console.error('WhatsApp notification failed:', err))
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      order_number: order.order_number,
    })
  } catch (err) {
    console.error('Verify payment error:', err)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
