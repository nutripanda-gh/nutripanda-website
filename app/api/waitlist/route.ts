import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, phone } = body

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Please provide an email or phone number' },
        { status: 400 }
      )
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian phone number' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('waitlist_signups')
      .insert({ email: email || null, phone: phone || null })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: "You're already on the list! We'll notify you when we launch." },
          { status: 200 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { message: "You're in! We'll notify you when we launch." },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
