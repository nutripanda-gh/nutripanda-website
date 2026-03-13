'use client'

import { Leaf, Shield, Zap, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const ingredients = [
  {
    name: 'Spirulina',
    amount: '200mg',
    description:
      'A nutrient-dense superfood packed with antioxidants, B-vitamins, and iron to support energy and immune health.',
    icon: Leaf,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Giloy Extract',
    amount: '150mg',
    description:
      'An ancient Ayurvedic herb known for its immunity-boosting, detoxifying, and anti-inflammatory properties.',
    icon: Shield,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Elemental Zinc',
    amount: '10mg',
    description:
      'Essential mineral that supports immune function, wound healing, and over 300 enzymatic processes in the body.',
    icon: Zap,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Pectin-Based',
    amount: '100% Vegetarian',
    description:
      'Made with plant-derived pectin instead of gelatin — suitable for vegetarians and vegans with a delicious chew.',
    icon: Heart,
    color: 'bg-pink-100 text-pink-600',
  },
]

export default function IngredientsSection() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          What Goes Inside
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-base text-gray-500">
          Clean, research-backed ingredients. No artificial colours, no junk — just what your body needs.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-green">{item.amount}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
