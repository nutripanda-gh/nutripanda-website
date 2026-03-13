import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllProducts, getComingSoonProducts } from '@/lib/supabase/queries'
import { formatPrice } from '@/lib/utils/format'
import type { Product } from '@/types/supabase'

const COLOR_MAP: Record<string, string> = {
  orange: 'border-product-orange',
  green: 'border-product-green',
  purple: 'border-product-purple',
  yellow: 'border-product-yellow',
  pink: 'border-product-pink',
  blue: 'border-product-blue',
}

const BG_MAP: Record<string, string> = {
  orange: 'bg-product-orange',
  green: 'bg-product-green',
  purple: 'bg-product-purple',
  yellow: 'bg-product-yellow',
  pink: 'bg-product-pink',
  blue: 'bg-product-blue',
}

function ProductCard({ product }: { product: Product }) {
  const borderClass = COLOR_MAP[product.color_theme ?? ''] ?? 'border-gray-200'
  const bgClass = BG_MAP[product.color_theme ?? ''] ?? 'bg-brand-green'
  const image = product.images?.[0] ?? 'https://placehold.co/600x600/f5f5f5/999?text=No+Image'

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group block overflow-hidden rounded-2xl border-2 ${borderClass} bg-white transition-shadow hover:shadow-lg`}
    >
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.short_description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
        <button
          type="button"
          className={`mt-4 w-full rounded-full ${bgClass} px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90`}
        >
          {product.inventory_count > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </Link>
  )
}

function ComingSoonCard({ product }: { product: Product }) {
  const borderClass = COLOR_MAP[product.color_theme ?? ''] ?? 'border-gray-200'

  return (
    <div className={`overflow-hidden rounded-2xl border-2 ${borderClass} bg-white opacity-70`}>
      <div className="relative aspect-square bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white">
            Coming Soon
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        {product.short_description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.short_description}</p>
        )}
      </div>
    </div>
  )
}

export default async function ProductsPage() {
  const [products, comingSoon] = await Promise.all([
    getAllProducts(),
    getComingSoonProducts(),
  ])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Products</h1>
        <p className="mt-3 max-w-xl text-base text-gray-500">
          Premium gummies crafted with real ingredients for your daily wellness journey.
        </p>

        {/* Active products */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Coming soon */}
        {comingSoon.length > 0 && (
          <>
            <h2 className="mt-16 text-2xl font-bold text-gray-900 sm:text-3xl">Coming Soon</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {comingSoon.map((product) => (
                <ComingSoonCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
