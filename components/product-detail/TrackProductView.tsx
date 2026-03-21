'use client'

import { useEffect } from 'react'
import { trackProductViewed } from '@/lib/posthog/events'

interface TrackProductViewProps {
  productId: string
  productName: string
  price: number
  colorTheme: string | null
  slug: string
}

export default function TrackProductView({
  productId,
  productName,
  price,
  colorTheme,
  slug,
}: TrackProductViewProps) {
  useEffect(() => {
    trackProductViewed({
      product_id: productId,
      product_name: productName,
      price,
      color_theme: colorTheme,
      slug,
    })
  }, [productId, productName, price, colorTheme, slug])

  return null
}
