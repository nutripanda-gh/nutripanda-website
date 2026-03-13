'use client'

import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { validatePhone } from '@/lib/utils/validators'

const STORAGE_KEY = 'nutripanda-coupon-dismissed'

export default function CouponPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setIsOpen(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = useCallback(() => {
    setIsOpen(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmed = phone.trim()
    if (!validatePhone(trimmed)) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/coupons/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: trimmed }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setIsSent(true)
      localStorage.setItem(STORAGE_KEY, '1')

      // Auto-dismiss after 3 seconds
      setTimeout(() => setIsOpen(false), 3000)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {isSent ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#12BC00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Coupon Sent!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Check your WhatsApp for the discount code.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <h3 className="text-xl font-bold text-gray-900">
                Get 10% Off Your First Order!
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                Enter your WhatsApp number and we&apos;ll send you a coupon code
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <div className="flex items-center rounded-xl border border-gray-300 focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green overflow-hidden">
                  <span className="pl-3.5 text-sm text-gray-500 select-none">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ''))
                      setError('')
                    }}
                    className="flex-1 border-0 bg-transparent px-2 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
                {error && (
                  <p className="mt-1.5 text-xs text-red-500">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-brand-green py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send My Coupon'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
