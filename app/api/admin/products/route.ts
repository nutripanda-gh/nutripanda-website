import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/utils/admin-auth'
import { handleCors, withCors } from '@/lib/utils/api-helpers'
import { getAllProductsAdmin, createProduct } from '@/lib/supabase/queries'

export async function OPTIONS(request: Request) {
  return handleCors(request)
}

// GET — list all products (including inactive)
export async function GET(request: Request) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const products = await getAllProductsAdmin()
    return withCors(NextResponse.json({ products }), request)
  } catch (err) {
    console.error('Admin get products error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 }),
      request
    )
  }
}

// POST — create product
export async function POST(request: Request) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const body = await request.json()

    // Basic validation
    if (!body.name?.trim() || !body.slug?.trim() || !body.price) {
      return withCors(
        NextResponse.json({ error: 'Name, slug, and price are required' }, { status: 400 }),
        request
      )
    }

    const product = await createProduct({
      name: body.name.trim(),
      slug: body.slug.trim().toLowerCase(),
      description: body.description ?? null,
      short_description: body.short_description ?? null,
      price: Number(body.price),
      compare_at_price: body.compare_at_price ? Number(body.compare_at_price) : null,
      images: body.images ?? null,
      color_theme: body.color_theme ?? null,
      ingredients: body.ingredients ?? null,
      nutrition_facts: body.nutrition_facts ?? null,
      trust_badges: body.trust_badges ?? null,
      category: body.category ?? null,
      is_active: body.is_active ?? true,
      is_featured: body.is_featured ?? false,
      is_coming_soon: body.is_coming_soon ?? false,
      inventory_count: body.inventory_count ?? 0,
      seo_title: body.seo_title ?? null,
      seo_description: body.seo_description ?? null,
    })

    return withCors(NextResponse.json({ product }, { status: 201 }), request)
  } catch (err) {
    console.error('Admin create product error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to create product' }, { status: 500 }),
      request
    )
  }
}
