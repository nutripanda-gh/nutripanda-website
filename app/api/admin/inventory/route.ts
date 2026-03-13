import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/utils/admin-auth'
import { handleCors, withCors } from '@/lib/utils/api-helpers'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { logInventoryChange, getInventoryLog } from '@/lib/supabase/queries'

export async function OPTIONS(request: Request) {
  return handleCors(request)
}

// GET — inventory overview (all products with stock) + recent log
export async function GET(request: Request) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const supabase = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id') ?? undefined

    // Get all products with stock levels
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, slug, inventory_count, color_theme, is_active, is_coming_soon')
      .order('name')

    if (productsError) throw productsError

    // Get recent inventory log
    const log = await getInventoryLog(productId)

    return withCors(
      NextResponse.json({ products, log }),
      request
    )
  } catch (err) {
    console.error('Admin inventory error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 }),
      request
    )
  }
}

// POST — stock adjustment
export async function POST(request: Request) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const body = await request.json()
    const { product_id, quantity_change, change_type, notes } = body as {
      product_id: string
      quantity_change: number
      change_type: 'restock' | 'adjustment' | 'return'
      notes?: string
    }

    if (!product_id || quantity_change === undefined || !change_type) {
      return withCors(
        NextResponse.json({ error: 'product_id, quantity_change, and change_type are required' }, { status: 400 }),
        request
      )
    }

    const validTypes = ['restock', 'adjustment', 'return']
    if (!validTypes.includes(change_type)) {
      return withCors(
        NextResponse.json({ error: 'Invalid change_type. Must be: restock, adjustment, or return' }, { status: 400 }),
        request
      )
    }

    const supabase = getSupabaseAdmin()

    // Get current product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, inventory_count')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return withCors(
        NextResponse.json({ error: 'Product not found' }, { status: 404 }),
        request
      )
    }

    const previousStock = product.inventory_count
    const newStock = Math.max(0, previousStock + quantity_change)

    // Update stock
    await supabase
      .from('products')
      .update({ inventory_count: newStock })
      .eq('id', product_id)

    // Log change
    await logInventoryChange({
      product_id,
      product_name: product.name,
      change_type,
      quantity_change,
      previous_stock: previousStock,
      new_stock: newStock,
      notes,
    })

    return withCors(
      NextResponse.json({
        product_id,
        previous_stock: previousStock,
        new_stock: newStock,
        change: quantity_change,
      }),
      request
    )
  } catch (err) {
    console.error('Admin inventory adjustment error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to adjust inventory' }, { status: 500 }),
      request
    )
  }
}
