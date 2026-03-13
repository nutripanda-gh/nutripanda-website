import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductHero from '@/components/product-detail/ProductHero'
import { getProductBySlug, getAllProducts } from '@/lib/supabase/queries'
import { formatPrice } from '@/lib/utils/format'
import type { Product, Ingredient, NutritionFacts } from '@/types/supabase'

// ── Color maps ──

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

const TEXT_MAP: Record<string, string> = {
  orange: 'text-product-orange',
  green: 'text-product-green',
  purple: 'text-product-purple',
  yellow: 'text-product-yellow',
  pink: 'text-product-pink',
  blue: 'text-product-blue',
}

// ── Trust badge icons (inline SVG) ──

const BADGE_ICONS: Record<string, { label: string; icon: React.ReactNode }> = {
  FSSAI: {
    label: 'FSSAI Certified',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  NoSugar: {
    label: 'No Added Sugar',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  TransFatFree: {
    label: 'Trans Fat Free',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  AntioxidantRich: {
    label: 'Antioxidant Rich',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  Vegetarian: {
    label: '100% Vegetarian',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8c.7-1 1-2.2 1-3.5C18 2 16 0 16 0s-2 2-2 4.5c0 1.3.3 2.5 1 3.5" />
        <path d="M12 19c-4.4 0-8-1.8-8-4V9c0 2.2 3.6 4 8 4s8-1.8 8-4v6c0 2.2-3.6 4-8 4z" />
        <path d="M12 13c4.4 0 8-1.8 8-4s-3.6-4-8-4-8 1.8-8 4 3.6 4 8 4z" />
      </svg>
    ),
  },
}

// ── SEO Metadata ──

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.seo_title ?? `${product.name} — NutriPanda`,
    description: product.seo_description ?? product.short_description ?? product.description ?? undefined,
    openGraph: {
      title: product.seo_title ?? product.name,
      description: product.seo_description ?? product.short_description ?? undefined,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  }
}

// ── Sub-sections ──

function NutritionFactsPanel({ facts }: { facts: NutritionFacts }) {
  return (
    <div className="w-full max-w-sm rounded-2xl border-2 border-gray-900 bg-white p-5 sm:p-6">
      <h3 className="border-b-8 border-gray-900 pb-1 text-2xl font-bold text-gray-900">
        Nutrition Facts
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Serving Size: {facts.servingSize}
      </p>
      <div className="mt-2 border-t-4 border-gray-900 pt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-bold text-gray-900">Calories</span>
          <span className="text-2xl font-bold text-gray-900">{facts.calories}</span>
        </div>
      </div>
      <div className="mt-1 border-t-2 border-gray-900 pt-1 text-right text-xs font-bold text-gray-600">
        % Daily Value*
      </div>
      {facts.fields.map((field, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-t border-gray-300 py-1.5 text-sm"
        >
          <span className="font-medium text-gray-900">{field.label}</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{field.value}</span>
            {field.dailyPercent && (
              <span className="font-bold text-gray-900">{field.dailyPercent}</span>
            )}
          </div>
        </div>
      ))}
      <p className="mt-3 border-t border-gray-300 pt-2 text-xs text-gray-500">
        *Percent Daily Values are based on a 2,000 calorie diet.
      </p>
    </div>
  )
}

function IngredientsSection({
  ingredients,
  colorTheme,
}: {
  ingredients: Ingredient[]
  colorTheme: string | null
}) {
  const textColor = TEXT_MAP[colorTheme ?? ''] ?? 'text-brand-green'

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ingredients.map((ing, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-baseline gap-2">
            <h4 className="text-base font-bold text-gray-900">{ing.name}</h4>
            {ing.amount && (
              <span className={`text-sm font-semibold ${textColor}`}>
                {ing.amount}
                {ing.unit}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{ing.description}</p>
        </div>
      ))}
    </div>
  )
}

function TrustBadgesRow({
  badges,
  colorTheme,
}: {
  badges: string[]
  colorTheme: string | null
}) {
  const textColor = TEXT_MAP[colorTheme ?? ''] ?? 'text-brand-green'

  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
      {badges.map((badge) => {
        const config = BADGE_ICONS[badge]
        if (!config) return null
        return (
          <div key={badge} className="flex flex-col items-center gap-2">
            <div className={`${textColor}`}>{config.icon}</div>
            <span className="text-xs font-medium text-gray-600 text-center">
              {config.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function RelatedProductCard({ product }: { product: Product }) {
  const borderClass = COLOR_MAP[product.color_theme ?? ''] ?? 'border-gray-200'
  const bgClass = BG_MAP[product.color_theme ?? ''] ?? 'bg-brand-green'
  const image =
    product.images?.[0] ?? 'https://placehold.co/600x600/f5f5f5/999?text=No+Image'

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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.short_description}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
        <div
          className={`mt-4 w-full rounded-full ${bgClass} px-6 py-2.5 text-center text-sm font-semibold text-white transition-opacity group-hover:opacity-90`}
        >
          View Product
        </div>
      </div>
    </Link>
  )
}

// ── JSON-LD Structured Data ──

function ProductJsonLd({ product }: { product: Product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description ?? product.description ?? '',
    image: product.images?.[0] ?? undefined,
    brand: {
      '@type': 'Brand',
      name: 'NutriPanda',
    },
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'INR',
      availability:
        product.inventory_count > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'NutriPanda',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ── Main Page ──

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const allProducts = await getAllProducts()
  const relatedProducts = allProducts.filter((p) => p.id !== product.id)

  return (
    <div className="min-h-screen bg-white">
      <ProductJsonLd product={product} />
      <Navbar />

      {/* Hero: image + info + add to cart */}
      <ProductHero product={product} />

      {/* Nutrition Facts */}
      {product.nutrition_facts && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Nutrition Facts
            </h2>
            <NutritionFactsPanel facts={product.nutrition_facts} />
          </div>
        </section>
      )}

      {/* Ingredients */}
      {product.ingredients && product.ingredients.length > 0 && (
        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              Key Ingredients
            </h2>
            <IngredientsSection
              ingredients={product.ingredients}
              colorTheme={product.color_theme}
            />
          </div>
        </section>
      )}

      {/* Trust Badges */}
      {product.trust_badges && product.trust_badges.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              Quality You Can Trust
            </h2>
            <TrustBadgesRow
              badges={product.trust_badges}
              colorTheme={product.color_theme}
            />
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((p) => (
                <RelatedProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
