import posthog from 'posthog-js'

// ── E-commerce funnel events ──

export function trackProductViewed(product: {
  product_id: string
  product_name: string
  price: number
  color_theme: string | null
  slug: string
}) {
  posthog.capture('product_viewed', {
    product_id: product.product_id,
    product_name: product.product_name,
    price_paise: product.price,
    price_inr: product.price / 100,
    color_theme: product.color_theme,
    slug: product.slug,
  })
}

export function trackAddToCart(product: {
  product_id: string
  product_name: string
  price: number
  quantity: number
  color_theme: string | null
}) {
  posthog.capture('add_to_cart', {
    product_id: product.product_id,
    product_name: product.product_name,
    price_paise: product.price,
    price_inr: product.price / 100,
    quantity: product.quantity,
    color_theme: product.color_theme,
  })
}

export function trackRemoveFromCart(product: {
  product_id: string
  product_name: string
}) {
  posthog.capture('remove_from_cart', {
    product_id: product.product_id,
    product_name: product.product_name,
  })
}

export function trackCartOpened(itemCount: number, cartTotal: number) {
  posthog.capture('cart_opened', {
    item_count: itemCount,
    cart_total_paise: cartTotal,
    cart_total_inr: cartTotal / 100,
  })
}

export function trackCheckoutStarted(itemCount: number, cartTotal: number) {
  posthog.capture('checkout_started', {
    item_count: itemCount,
    cart_total_paise: cartTotal,
    cart_total_inr: cartTotal / 100,
  })
}

export function trackPaymentInitiated(orderId: string, amount: number) {
  posthog.capture('payment_initiated', {
    order_id: orderId,
    amount_paise: amount,
    amount_inr: amount / 100,
  })
}

export function trackPaymentCompleted(order: {
  order_id: string
  order_number: string
  total_amount: number
  item_count: number
  customer_email: string
}) {
  // Identify user by email
  posthog.identify(order.customer_email, {
    email: order.customer_email,
  })

  posthog.capture('payment_completed', {
    order_id: order.order_id,
    order_number: order.order_number,
    total_paise: order.total_amount,
    total_inr: order.total_amount / 100,
    item_count: order.item_count,
  })
}

export function trackPaymentFailed(orderId: string, reason?: string) {
  posthog.capture('payment_failed', {
    order_id: orderId,
    reason: reason || 'unknown',
  })
}

export function trackCouponApplied(code: string, discountPercent: number) {
  posthog.capture('coupon_applied', {
    coupon_code: code,
    discount_percent: discountPercent,
  })
}
