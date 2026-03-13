import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/utils/admin-auth'
import { handleCors, withCors } from '@/lib/utils/api-helpers'
import { getProductById, updateProduct, deleteProduct } from '@/lib/supabase/queries'

export async function OPTIONS(request: Request) {
  return handleCors(request)
}

// GET — single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const { id } = await params
    const product = await getProductById(id)

    if (!product) {
      return withCors(
        NextResponse.json({ error: 'Product not found' }, { status: 404 }),
        request
      )
    }

    return withCors(NextResponse.json({ product }), request)
  } catch (err) {
    console.error('Admin get product error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 }),
      request
    )
  }
}

// PUT — update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const { id } = await params
    const body = await request.json()

    const product = await updateProduct(id, body)
    return withCors(NextResponse.json({ product }), request)
  } catch (err) {
    console.error('Admin update product error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to update product' }, { status: 500 }),
      request
    )
  }
}

// DELETE — soft delete
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const { id } = await params
    await deleteProduct(id)
    return withCors(NextResponse.json({ success: true }), request)
  } catch (err) {
    console.error('Admin delete product error:', err)
    return withCors(
      NextResponse.json({ error: 'Failed to delete product' }, { status: 500 }),
      request
    )
  }
}
