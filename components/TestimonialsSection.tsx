'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Testimonial } from '@/types/supabase'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  if (!testimonials.length) return null

  return (
    <section className="w-full bg-gray-900 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          What Our Customers Say
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-base text-gray-400">
          Real people, real results. Here&apos;s what the panda fam thinks.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-800 bg-gray-800/50 p-6"
            >
              {testimonial.rating && <StarRating rating={testimonial.rating} />}
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-5 border-t border-gray-700 pt-4">
                <p className="text-sm font-semibold text-white">
                  {testimonial.customer_name}
                </p>
                {testimonial.customer_location && (
                  <p className="text-xs text-gray-500">{testimonial.customer_location}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
