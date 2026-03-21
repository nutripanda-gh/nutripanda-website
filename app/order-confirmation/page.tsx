'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { useCartStore } from '@/lib/cart/store'
import { formatPrice } from '@/lib/utils/format'
import { trackPaymentCompleted } from '@/lib/posthog/events'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Order, OrderItem } from '@/types/supabase'

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-brand-green" />
              <p className="text-gray-500">Loading your order...</p>
            </div>
          </main>
          <Footer />
        </>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  )
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { clearCart } = useCartStore()

  // Clear cart on mount (in case it wasn't cleared during redirect)
  useEffect(() => {
    clearCart()
  }, [clearCart])

  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided')
      setLoading(false)
      return
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`)
        if (!res.ok) throw new Error('Order not found')
        const data = await res.json()
        setOrder(data.order)

        // Track payment completion + identify user
        if (data.order) {
          const o = data.order
          trackPaymentCompleted({
            order_id: o.id,
            order_number: o.order_number,
            total_amount: o.total_amount,
            item_count: (o.items as { quantity: number }[]).reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0),
            customer_email: o.customer_email,
          })
        }
      } catch {
        setError('Could not load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-brand-green" />
            <p className="text-gray-500">Loading your order...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-lg text-gray-600">{error || 'Order not found'}</p>
            <Link
              href="/products"
              className="inline-block rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const items = order.items as OrderItem[]
  const address = order.shipping_address

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Success header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-brand-green" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-gray-500">
            Thank you for your order, {order.customer_name}
          </p>
        </div>

        {/* Order number */}
        <div className="mb-8 rounded-2xl bg-green-50 border border-green-200 p-5 text-center">
          <p className="text-sm text-green-700">Order Number</p>
          <p className="mt-1 text-xl font-bold text-green-900">{order.order_number}</p>
        </div>

        {/* Order items */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
            <h2 className="text-sm font-semibold text-gray-900">Order Summary</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-4 space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>{order.shipping_cost === 0 ? 'Free' : formatPrice(order.shipping_cost)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
              <span>Total Paid</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>

        {/* Shipping details */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Shipping To</h2>
          <p className="text-gray-700">{order.customer_name}</p>
          <p className="text-sm text-gray-500">
            {[address.line1, address.line2, address.city, address.state, address.pincode]
              .filter(Boolean)
              .join(', ')}
          </p>
          <p className="mt-2 text-sm text-gray-500">{order.customer_email}</p>
          <p className="text-sm text-gray-500">{order.customer_phone}</p>
        </div>

        {/* Notification info */}
        <div className="mb-10 text-center text-sm text-gray-500 space-y-1">
          <p>You&apos;ll receive a confirmation email shortly.</p>
          {order.customer_whatsapp_opted_in && (
            <p>You&apos;ll also receive updates on WhatsApp.</p>
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block rounded-full bg-brand-green px-10 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
