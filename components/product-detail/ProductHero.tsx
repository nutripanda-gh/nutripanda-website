'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart/store'
import { formatPrice } from '@/lib/utils/format'
import type { Product } from '@/types/supabase'
import toast from 'react-hot-toast'
import { Minus, Plus } from 'lucide-react'

const BG_MAP: Record<string, string> = {
  orange: 'bg-product-orange',
  green: 'bg-product-green',
  purple: 'bg-product-purple',
  yellow: 'bg-product-yellow',
  pink: 'bg-product-pink',
  blue: 'bg-product-blue',
}

const LIGHT_BG_MAP: Record<string, string> = {
  orange: 'bg-orange-50',
  green: 'bg-green-50',
  purple: 'bg-purple-50',
  yellow: 'bg-yellow-50',
  pink: 'bg-pink-50',
  blue: 'bg-blue-50',
}

export default function ProductHero({ product }: { product: Product }) {
  const images = product.images?.length ? product.images : []
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem, openCart } = useCartStore()

  const outOfStock = product.inventory_count <= 0
  const bgClass = BG_MAP[product.color_theme ?? ''] ?? 'bg-brand-green'
  const lightBg = LIGHT_BG_MAP[product.color_theme ?? ''] ?? 'bg-gray-50'
  const mainImage = images[selectedImage] ?? 'https://placehold.co/600x600/f5f5f5/999?text=No+Image'

  function handleAddToCart() {
    if (outOfStock) return
    addItem(product, quantity)
    openCart()
    toast.success(`${product.name} added to cart`)
  }

  return (
    <section className={`${lightBg}`}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Image gallery */}
          <div className="flex-1">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {outOfStock && (
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      i === selectedImage ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            {product.short_description && (
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {product.short_description}
              </p>
            )}

            {product.description && (
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {product.description}
              </p>
            )}

            {/* Quantity selector + Add to Cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={outOfStock || quantity <= 1}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-base font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(q + 1, product.inventory_count))
                  }
                  disabled={outOfStock || quantity >= product.inventory_count}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={`flex-1 rounded-full ${bgClass} px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed sm:flex-initial`}
              >
                {outOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {!outOfStock && product.inventory_count <= 10 && (
              <p className="mt-3 text-sm text-orange-600">
                Only {product.inventory_count} left in stock
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
