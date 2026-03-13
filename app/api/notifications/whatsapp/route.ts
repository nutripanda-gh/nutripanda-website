import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { logNotification } from '@/lib/supabase/queries'
import { formatPrice } from '@/lib/utils/format'
import type { Order } from '@/types/supabase'

const TEMPLATES: Record<string, (order: Order, extra?: Record<string, string>) => string> = {
  order_confirmation: (order) =>
    `Hi ${order.customer_name}! 🐼\n\nYour NutriPanda order #${order.order_number} for ${formatPrice(order.total_amount)} has been confirmed.\n\nWe'll notify you when it ships. Thank you for choosing NutriPanda!`,

  shipping_update: (order, extra) =>
    `Great news, ${order.customer_name}! 🎉\n\nYour NutriPanda order #${order.order_number} has been shipped!${extra?.tracking_link ? `\n\nTrack it here: ${extra.tracking_link}` : ''}\n\nExpected delivery: 3-5 business days.`,

  delivered: (order) =>
    `Your NutriPanda order #${order.order_number} has been delivered! 🐼🎉\n\nEnjoy your gummies, ${order.customer_name}! We'd love to hear your feedback.`,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { template, order_id, ...extra } = body as {
      template: string
      order_id: string
      [key: string]: string
    }

    if (!template || !order_id) {
      return NextResponse.json({ error: 'template and order_id required' }, { status: 400 })
    }

    const templateFn = TEMPLATES[template]
    if (!templateFn) {
      return NextResponse.json({ error: 'Unknown template' }, { status: 400 })
    }

    // Fetch order
    const supabase = getSupabaseAdmin()
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Only send to opted-in customers
    if (!order.customer_whatsapp_opted_in) {
      return NextResponse.json({ status: 'skipped', reason: 'not_opted_in' })
    }

    const message = templateFn(order as Order, extra)
    const phone = order.customer_phone

    // Send via Twilio WhatsApp
    const twilioSid = process.env.TWILIO_ACCOUNT_SID
    const twilioToken = process.env.TWILIO_AUTH_TOKEN
    const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER

    if (!twilioSid || !twilioToken || !twilioFrom) {
      console.error('Twilio credentials not configured')
      await logNotification({
        order_id,
        channel: 'whatsapp',
        recipient: phone,
        template,
        status: 'failed',
        error_message: 'Twilio not configured',
      })
      return NextResponse.json({ error: 'WhatsApp service not configured' }, { status: 500 })
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const twilio = require('twilio')
      const client = twilio(twilioSid, twilioToken)

      await client.messages.create({
        from: twilioFrom,
        to: `whatsapp:+91${phone}`,
        body: message,
      })

      await logNotification({
        order_id,
        channel: 'whatsapp',
        recipient: phone,
        template,
        status: 'sent',
      })

      return NextResponse.json({ success: true })
    } catch (twilioErr) {
      console.error('Twilio send error:', twilioErr)
      await logNotification({
        order_id,
        channel: 'whatsapp',
        recipient: phone,
        template,
        status: 'failed',
        error_message: String(twilioErr),
      })
      // Don't fail the response — WhatsApp is best-effort
      return NextResponse.json({ success: false, error: 'WhatsApp send failed' })
    }
  } catch (err) {
    console.error('WhatsApp notification error:', err)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
