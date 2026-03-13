import crypto from 'crypto'

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) throw new Error('Missing RAZORPAY_KEY_SECRET')

  const body = `${orderId}|${paymentId}`
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  return expectedSignature === signature
}

export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET ?? process.env.RAZORPAY_KEY_SECRET
  if (!secret) throw new Error('Missing webhook secret')

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  return expectedSignature === signature
}

let _razorpayInstance: unknown = null

export function getRazorpayInstance() {
  if (!_razorpayInstance) {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) {
      throw new Error('Missing Razorpay credentials')
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Razorpay = require('razorpay')
    _razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret })
  }
  return _razorpayInstance as {
    orders: {
      create: (options: {
        amount: number
        currency: string
        receipt: string
        notes?: Record<string, string>
      }) => Promise<{ id: string; amount: number; currency: string; status: string }>
    }
  }
}
