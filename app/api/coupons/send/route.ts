import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { validatePhone } from '@/lib/utils/validators'
import { COUPON_DISCOUNT_PERCENT } from '@/lib/utils/constants'
import type { Twilio } from 'twilio'

let _twilioClient: Twilio | null = null

function getTwilioClient(): Twilio {
  if (!_twilioClient) {
    const sid = process.env.TWILIO_ACCOUNT_SID
    const token = process.env.TWILIO_AUTH_TOKEN
    if (!sid || !token) {
      throw new Error('Missing Twilio credentials')
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const twilio = require('twilio')
    _twilioClient = twilio(sid, token) as Twilio
  }
  return _twilioClient
}

function generateCouponCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'PANDA10-'
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const phone = (body.phone ?? '').trim()

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian phone number' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Check if this phone already has a coupon
    const { data: existing } = await supabase
      .from('coupon_leads')
      .select('coupon_code')
      .eq('phone', phone)
      .limit(1)
      .single()

    let couponCode: string

    if (existing) {
      // Resend existing code
      couponCode = existing.coupon_code
    } else {
      // Generate new coupon
      couponCode = generateCouponCode()

      const { error: insertError } = await supabase
        .from('coupon_leads')
        .insert({
          phone,
          coupon_code: couponCode,
          discount_percent: COUPON_DISCOUNT_PERCENT,
        })

      if (insertError) {
        // Handle unique constraint violation — regenerate once
        if (insertError.code === '23505') {
          couponCode = generateCouponCode()
          const { error: retryError } = await supabase
            .from('coupon_leads')
            .insert({
              phone,
              coupon_code: couponCode,
              discount_percent: COUPON_DISCOUNT_PERCENT,
            })
          if (retryError) {
            console.error('Coupon insert retry failed:', retryError)
            return NextResponse.json(
              { error: 'Failed to generate coupon. Please try again.' },
              { status: 500 }
            )
          }
        } else {
          console.error('Coupon insert failed:', insertError)
          return NextResponse.json(
            { error: 'Failed to generate coupon. Please try again.' },
            { status: 500 }
          )
        }
      }
    }

    // Send via Twilio WhatsApp
    try {
      const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER
      if (!twilioFrom) {
        throw new Error('Missing TWILIO_WHATSAPP_NUMBER')
      }

      const client = getTwilioClient()
      await client.messages.create({
        from: twilioFrom,
        to: `whatsapp:+91${phone}`,
        body: `Hey there! Here's your NutriPanda coupon for 10% off your first order:\n\n${couponCode}\n\nUse it at checkout on nutripanda.com. Happy shopping!`,
      })

      // Mark as sent
      await supabase
        .from('coupon_leads')
        .update({ whatsapp_sent: true })
        .eq('coupon_code', couponCode)
    } catch (twilioErr) {
      // Log but don't fail — the coupon is still valid
      console.error('Twilio WhatsApp send failed:', twilioErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Coupon send error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
