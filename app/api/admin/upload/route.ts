import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/utils/admin-auth'
import { handleCors, withCors } from '@/lib/utils/api-helpers'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { randomUUID } from 'crypto'

const BUCKET = 'product-images'
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export async function OPTIONS(request: Request) {
  return handleCors(request)
}

// POST — upload images, optionally link to a product
// FormData fields: files (required), productId (optional)
export async function POST(request: Request) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const productId = formData.get('productId') as string | null

    if (!files.length) {
      return withCors(
        NextResponse.json({ error: 'No files provided' }, { status: 400 }),
        request
      )
    }

    // Validate all files before uploading
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return withCors(
          NextResponse.json(
            { error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, AVIF` },
            { status: 400 }
          ),
          request
        )
      }
      if (file.size > MAX_SIZE) {
        return withCors(
          NextResponse.json(
            { error: `File "${file.name}" exceeds 5MB limit` },
            { status: 400 }
          ),
          request
        )
      }
    }

    const supabase = getSupabaseAdmin()
    const urls: string[] = []

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const path = `${randomUUID()}.${ext}`
      const buffer = Buffer.from(await file.arrayBuffer())

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        console.error('Storage upload error:', error)
        return withCors(
          NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 }),
          request
        )
      }

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path)

      urls.push(urlData.publicUrl)
    }

    // If productId provided, append new URLs to the product's images array
    if (productId) {
      const { data: product, error: fetchErr } = await supabase
        .from('products')
        .select('images')
        .eq('id', productId)
        .single()

      if (fetchErr) {
        return withCors(
          NextResponse.json({ error: 'Product not found' }, { status: 404 }),
          request
        )
      }

      const existingImages: string[] = product.images ?? []
      const updatedImages = [...existingImages, ...urls]

      const { error: updateErr } = await supabase
        .from('products')
        .update({ images: updatedImages })
        .eq('id', productId)

      if (updateErr) {
        console.error('Product image update error:', updateErr)
        return withCors(
          NextResponse.json({ error: 'Images uploaded but failed to update product' }, { status: 500 }),
          request
        )
      }
    }

    return withCors(NextResponse.json({ urls }), request)
  } catch (err) {
    console.error('Upload error:', err)
    return withCors(
      NextResponse.json({ error: 'Upload failed' }, { status: 500 }),
      request
    )
  }
}

// DELETE — remove an image from storage and optionally from a product
// Body: { url: string, productId?: string }
export async function DELETE(request: Request) {
  if (!(await verifyAdminSession())) {
    return withCors(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      request
    )
  }

  try {
    const { url, productId } = await request.json()

    if (!url || typeof url !== 'string') {
      return withCors(
        NextResponse.json({ error: 'Image URL is required' }, { status: 400 }),
        request
      )
    }

    // Extract file path from the public URL
    const match = url.match(/\/product-images\/(.+)$/)
    if (!match) {
      return withCors(
        NextResponse.json({ error: 'Invalid image URL' }, { status: 400 }),
        request
      )
    }

    const filePath = match[1]
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([filePath])

    if (error) {
      console.error('Storage delete error:', error)
      return withCors(
        NextResponse.json({ error: `Delete failed: ${error.message}` }, { status: 500 }),
        request
      )
    }

    // If productId provided, remove the URL from the product's images array
    if (productId) {
      const { data: product, error: fetchErr } = await supabase
        .from('products')
        .select('images')
        .eq('id', productId)
        .single()

      if (!fetchErr && product) {
        const updatedImages = (product.images ?? []).filter(
          (img: string) => img !== url
        )
        await supabase
          .from('products')
          .update({ images: updatedImages.length ? updatedImages : null })
          .eq('id', productId)
      }
    }

    return withCors(NextResponse.json({ success: true }), request)
  } catch (err) {
    console.error('Delete error:', err)
    return withCors(
      NextResponse.json({ error: 'Delete failed' }, { status: 500 }),
      request
    )
  }
}
