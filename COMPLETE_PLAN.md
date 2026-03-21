# CLAUDE CODE — NutriPanda Development TODOs

> This is your single source of truth. Work through this file top-to-bottom. Each section is a phase. Each checkbox is a deliverable. Do not skip ahead — later phases depend on earlier ones being complete.

---

## Project Context

You are building a custom e-commerce website for NutriPanda, an Indian nutrition gummies startup. 2 products are live now (Immunity Support, Daily Vitality), 6 more coming later. The site must support guest checkout (no user accounts), Razorpay payments, inventory tracking, an admin dashboard, and WhatsApp/email notifications.

**Stack:** Next.js 16 (App Router, TypeScript, Tailwind CSS v4) · Supabase (Postgres — all data) · Razorpay (via Next.js API routes) · PostHog · Hostinger

**No user signup/login.** Guest checkout only. Customers provide name, email, phone, address at checkout.

---

## 1. PROJECT SCAFFOLDING

- [x] Initialize Next.js project with App Router and TypeScript (scaffolded without --src-dir, files at root level)
- [x] Configure Tailwind with NutriPanda design tokens:
  ```
  colors: {
    brand: { green: '#12BC00', black: '#000000', white: '#FFFFFF' },
    product: {
      orange: '#FF7731',    // Immunity Support
      green: '#12BC00',     // Daily Vitality
      purple: '#9231FF',    // Upcoming
      yellow: '#FFC731',    // Upcoming
      pink: '#F995FF',      // Upcoming
      blue: '#70A9FF',      // Upcoming
    },
    accent: { lightGreen: '#DCFDCC' }
  }
  fonts: { heading: 'Uneko Bold', body: 'Avenir' }
  ```
- [x] Configure custom fonts (Uneko Bold + Avenir) via @font-face in globals.css (fonts at /public/fonts/)
- [x] Create base layout (`app/layout.tsx`) with font variables, metadata defaults, and global styles
- [x] Setup folder structure:
  ```
  app/
    page.tsx                    # Home
    about/page.tsx              # About
    products/page.tsx           # Products listing
    products/[slug]/page.tsx    # Product detail
    checkout/page.tsx           # Checkout
    order-confirmation/page.tsx # Post-payment confirmation
    api/                        # Next.js Route Handlers
      razorpay/
        create-order/route.ts
        verify-payment/route.ts
        webhook/route.ts
      notifications/
        email/route.ts
        whatsapp/route.ts
      admin/
        auth/route.ts
        products/route.ts       # GET (list), POST (create)
        products/[id]/route.ts  # GET, PUT, DELETE
        orders/route.ts
        orders/[id]/route.ts
        inventory/route.ts
    admin/                      # Admin dashboard (protected)
      page.tsx                  # Orders overview
      orders/[id]/page.tsx      # Single order detail
      inventory/page.tsx        # Inventory overview
      products/page.tsx         # Product management
      products/[id]/page.tsx    # Product edit
  components/
    layout/                     # Navbar, Footer, CartDrawer
    home/                       # Hero, ProductShowcase, Ingredients, FAQ, Testimonials, Contact
    products/                   # ProductCard, ProductGrid, ComingSoonBadge
    product-detail/             # ProductHero, NutritionFacts, IngredientsDeepDive, TrustBadges
    checkout/                   # CheckoutForm, OrderSummary, PaymentButton
    admin/                      # OrdersTable, OrderDetail, InventoryPanel, ProductForm
    ui/                         # Button, Input, Badge, Accordion, Card (reusable primitives)
  lib/
    supabase/                   # Supabase client, admin client, queries
    razorpay/                   # Razorpay utils (signature verification)
    cart/                       # Cart store (Zustand)
    utils/                      # Formatters, validators, constants
  types/                        # Shared TypeScript types
  ```
- [x] Install core dependencies:
  - `@supabase/supabase-js` (Supabase)
  - `razorpay` (Razorpay Node SDK for API routes)
  - `resend` (email notifications from API routes)
  - `zustand` (cart state)
  - `posthog-js` (analytics)
  - `react-hot-toast` (notifications UI)
  - `lucide-react` (icons)
  - `framer-motion` (animations)
- [x] Create `.env.local` template with all required vars:
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  NEXT_PUBLIC_RAZORPAY_KEY_ID=
  RAZORPAY_KEY_SECRET=
  NEXT_PUBLIC_POSTHOG_KEY=
  NEXT_PUBLIC_POSTHOG_HOST=
  RESEND_API_KEY=
  ADMIN_PASSWORD=
  ```

---

## 2. SUPABASE CONTENT TABLES

These tables hold product and content data. They live alongside the existing transactional tables in Supabase.

- [x] Create `products` table:
  ```sql
  CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price INTEGER NOT NULL,              -- paise
    compare_at_price INTEGER,            -- paise, optional strikethrough price
    images TEXT[],                        -- array of image URLs
    color_theme TEXT,                     -- orange/green/purple/yellow/pink/blue
    ingredients JSONB,                    -- array of { name, description, amount, unit, icon }
    nutrition_facts JSONB,               -- { servingSize, calories, fields: [{ label, value, dailyPercent }] }
    trust_badges TEXT[],                 -- e.g. ['FSSAI', 'NoSugar', 'Vegetarian']
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_coming_soon BOOLEAN DEFAULT false,
    inventory_count INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );
  ```
- [x] Create `updated_at` trigger for `products` table (reuse existing trigger function)
- [x] Create `faqs` table:
  ```sql
  CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );
  ```
- [x] Create `testimonials` table:
  ```sql
  CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_location TEXT,
    text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
  );
  ```
- [x] Set up Row Level Security for new tables:
  - `products`: anon can SELECT (where is_active = true), service_role can do everything
  - `faqs`: anon can SELECT (where is_active = true), service_role can do everything
  - `testimonials`: anon can SELECT (where is_active = true), service_role can do everything
- [x] Create indexes:
  - `products`: index on `slug`, index on `is_active`, index on `is_featured`
  - `faqs`: index on `display_order`
  - `testimonials`: index on `is_active`
- [x] Seed products data: Immunity Support + Daily Vitality with real nutrition info, ingredients, placeholder image URLs, and correct pricing in paise
- [x] Seed FAQs: 5 default questions (daily dosage, vegetarian status, sugar content, kids safety, manufacturing)
- [x] Seed testimonials: 3 sample testimonials with ratings

---

## 3. SUPABASE DATABASE

- [x] Create `orders` table:
  ```sql
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_whatsapp_opted_in BOOLEAN DEFAULT false,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal INTEGER NOT NULL,
  shipping_cost INTEGER DEFAULT 0,
  discount INTEGER DEFAULT 0,
  total_amount INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed','refunded')),
  order_status TEXT DEFAULT 'confirmed' CHECK (order_status IN ('confirmed','processing','shipped','delivered','cancelled')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
  ```
- [x] Create `customers` table:
  ```sql
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_opted_in BOOLEAN DEFAULT false,
  order_count INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(email)
  ```
- [x] Create `inventory_log` table:
  ```sql
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  change_type TEXT NOT NULL CHECK (change_type IN ('sale','restock','adjustment','return')),
  quantity_change INTEGER NOT NULL,
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  order_id UUID REFERENCES orders(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
  ```
- [x] Create `notifications_log` table:
  ```sql
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  channel TEXT NOT NULL CHECK (channel IN ('email','whatsapp','sms')),
  recipient TEXT NOT NULL,
  template TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent','delivered','failed')),
  error_message TEXT,
  sent_at TIMESTAMPTZ DEFAULT now()
  ```
- [x] Create `updated_at` trigger function for orders table
- [x] Create `generate_order_number()` function (format: NP-YYYYMMDD-XXXX)
- [x] Set up Row Level Security:
  - `orders`: service_role can do everything, anon can INSERT only (for creating orders from checkout)
  - `customers`: service_role only
  - `inventory_log`: service_role only
  - `notifications_log`: service_role only
- [x] Verify `inventory_log` table has `product_id UUID NOT NULL REFERENCES products(id)` column (migrate if needed)
- [x] Create Supabase client in `lib/supabase/client.ts` (browser client with anon key)
- [x] Create Supabase admin client in `lib/supabase/admin.ts` (server-only with service role key)
- [x] Create TypeScript types in `types/supabase.ts` (generate from Supabase or write manually)
- [x] Create helper functions in `lib/supabase/queries.ts`:
  - `getAllProducts()` — all active products ordered by name
  - `getProductBySlug(slug)` — single product with full details
  - `getFeaturedProducts()` — featured + active products only
  - `getComingSoonProducts()` — coming soon products
  - `getAllFAQs()` — active FAQs ordered by display_order
  - `getAllTestimonials()` — active testimonials
  - `createProduct(data)` — admin: insert new product
  - `updateProduct(id, data)` — admin: update product
  - `deleteProduct(id)` — admin: soft delete (set is_active = false)
  - `createOrder(orderData)` — insert order + upsert customer
  - `updateOrderPayment(orderId, razorpayData)` — update payment fields
  - `updateOrderStatus(orderId, status)` — update order status
  - `getOrders(filters?)` — get orders with pagination + filters
  - `getOrderById(id)` — single order with all details
  - `logInventoryChange(data)` — insert inventory log entry
  - `getInventoryLog(productId?)` — get inventory changes
  - `logNotification(data)` — insert notification log
  - `getCustomers(filters?)` — get customers with pagination

---

## 4. NEXT.JS API ROUTES

All server-side logic lives in Next.js Route Handlers (`app/api/`), deployed alongside the frontend. No separate backend server.

- [x] Create `app/api/razorpay/create-order/route.ts`:
  - POST handler
  - Validate cart items (check prices against Supabase products table, check stock via inventory_count)
  - Create Razorpay order via SDK (amount in paise, currency INR)
  - Create pending order in Supabase
  - Upsert customer record
  - Return razorpay_order_id + order_id to frontend
- [x] Create `app/api/razorpay/verify-payment/route.ts`:
  - POST handler
  - Verify Razorpay signature using HMAC SHA256
  - Update order payment_status to 'paid' in Supabase
  - Decrement inventory_count on products table in Supabase
  - Log inventory change in Supabase inventory_log
  - Trigger email notification (order confirmation to customer)
  - Trigger WhatsApp notification (if customer opted in)
  - Trigger admin notification (email/WhatsApp to admin)
  - Return success + order details
- [x] Create `app/api/razorpay/webhook/route.ts`:
  - POST handler
  - Verify webhook signature from Razorpay
  - Handle `payment.captured` — same as verify but idempotent (check if already processed)
  - Handle `payment.failed` — update order to failed, do NOT decrement inventory
  - Return 200 immediately
- [x] Create `app/api/notifications/email/route.ts`:
  - POST handler (called internally by verify-payment and webhook)
  - Use Resend SDK
  - Templates: order_confirmation, admin_new_order
  - Include: order number, items, total, shipping address
  - Branded HTML template with NutriPanda colors/logo
  - Log to notifications_log in Supabase
- [x] Create `app/api/notifications/whatsapp/route.ts`:
  - POST handler (called internally)
  - Use WhatsApp Business API (Meta/Twilio/Wati — depends on provider chosen)
  - Templates: order_confirmation, shipping_update
  - Include: order number, total, expected delivery
  - Log to notifications_log in Supabase
- [x] Create `app/api/admin/auth/route.ts`:
  - POST handler for admin login (validate password against ADMIN_PASSWORD env var)
  - Set httpOnly cookie for session
  - GET handler to check auth status
  - DELETE handler for logout
  - CORS headers for separate dashboard app
- [x] Create `app/api/admin/products/route.ts`:
  - GET: list all products (including inactive) for admin
  - POST: create new product (requires admin auth)
- [x] Create `app/api/admin/products/[id]/route.ts`:
  - GET: single product details for admin
  - PUT: update product (requires admin auth)
  - DELETE: soft-delete product (set is_active = false, requires admin auth)
- [x] Create `app/api/admin/orders/route.ts`:
  - GET: list orders with pagination, filters, search (requires admin auth)
- [x] Create `app/api/admin/orders/[id]/route.ts`:
  - GET: single order detail (requires admin auth)
  - PUT: update order status + optionally trigger notification (requires admin auth)
- [x] Create `app/api/admin/inventory/route.ts`:
  - GET: inventory overview — all products with stock levels (requires admin auth)
  - POST: stock adjustment — update inventory_count + log to inventory_log (requires admin auth)
- [x] Create shared middleware helper for admin auth verification (check cookie in route handlers)
- [x] Request validation: validate body schema in each handler before processing
- [x] Error handling: consistent error response format across all routes

---

## 5. REUSABLE UI COMPONENTS

Build these first. Every page will use them.

- [x] `Button` — used inline across pages (checkout CTA, Add to Cart, etc.) with loading states. Not extracted as standalone component.
- [x] `Input` — used inline in checkout form and contact form with error states.
- [x] `Badge` — used inline for product status, trust badges, coming soon. Admin dashboard has standalone Badge components.
- [x] `Card` — used inline for products, testimonials, ingredients sections.
- [x] `Accordion` — built into FAQSection with expand/collapse and chevron animation.
- [x] `Container` — max-width wrappers used inline across pages.
- [x] `SectionHeading` — section headers used inline across home page sections.
- [x] `ProductCard` — built into products page and product detail (related products) with color accents and Add to Cart.
- [x] `CartDrawer` — slide-in drawer from right. Shows cart items, quantities (editable), remove button, subtotal, "Checkout" CTA. Uses Zustand cart store.
- [x] `Navbar` — fixed top. NutriPanda logo (left), nav links + search bar (center), cart icon with badge count (right). Mobile: hamburger → dropdown menu.
- [x] `Footer` — brand name, nav links, social icons, paw print decorations, copyright.
- [x] `LoadingSpinner` — used inline (checkout button spinner, cart drawer loading, page loading states).
- [x] `EmptyState` — handled inline in cart drawer and admin dashboard.
- [x] `Toast` — success/error/info notifications using react-hot-toast. Configure globally in layout.

---

## 6. CART SYSTEM

- [x] Create Zustand store in `lib/cart/store.ts`:
  ```typescript
  interface CartItem {
    productId: string       // Supabase product UUID
    name: string
    slug: string
    price: number
    image: string
    colorTheme: string
    quantity: number
  }

  interface CartStore {
    items: CartItem[]
    isOpen: boolean
    addItem: (product: Product, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void
    getItemCount: () => number
    getSubtotal: () => number
  }
  ```
- [x] Persist cart to localStorage via Zustand middleware
- [x] Handle hydration mismatch (SSR vs localStorage) — use `useEffect` to hydrate on mount
- [x] Validate stock before adding to cart (check Supabase products.inventory_count)
- [x] Max quantity per item = available stock
- [x] Show toast on add/remove

---

## 7. HOME PAGE (`app/page.tsx`)

Fetch all data server-side from Supabase. This page should feel premium, playful, and on-brand.

- [x] **Hero Section** — full-viewport hero with panda mascot image, bamboo decorations, "NutriPanda" heading, tagline, "Shop Now" CTA button.
- [x] **Product Showcase** — alternating image/text layout (40%/60% grid) with product info and Shop Now / Learn More buttons.
- [x] **About Section** — brief brand story with "Learn More" CTA → /about.
- [x] **Ingredients Section** — 4 highlight cards: Spirulina (200mg), Giloy Extract, Elemental Zinc (10mg), Pectin-based (Vegetarian). Each card: icon/illustration, name, brief benefit description. Light background.
- [x] **Testimonials Section** — dark background. 3 testimonial cards with star rating, quote, customer name + location. Data from Supabase testimonials table.
- [x] **FAQ Section** — Accordion component. 5 FAQ items with expand/collapse animation. First item open by default. Data from Supabase faqs table.
- [x] **Contact Section** — contact image (left) + contact form with bottom-border inputs (right). "CONTACT US" heading above form.
- [x] **Footer** — large NUTRIPANDA branding, nav links, social icons, paw print decorations, copyright.
- [x] Scroll-reveal animations on each section (framer-motion `whileInView`)
- [x] Full mobile responsive

---

## 8. ABOUT PAGE (`app/about/page.tsx`)

- [x] **Founder Story** — headline + rich text content. Personal narrative. Panda illustration element.
- [x] **History** — timeline or narrative block. How NutriPanda started, the journey to launch.
- [x] **Vision & Mission** — clear mission statement. What NutriPanda stands for (clean nutrition, fun format).
- [x] **Room for More** — flexible section for additional content (press, awards, partnerships as the brand grows).
- [x] Consistent page layout with shared Navbar + Footer
- [x] Content can be hardcoded initially; can be made dynamic via Supabase content table later

---

## 9. PRODUCTS PAGE (`app/products/page.tsx`)

- [x] **Product Grid** — display all active products from Supabase. Use ProductCard component. Color-coded borders/accents per product.
- [x] **Coming Soon Cards** — products with `is_coming_soon: true` shown as greyed/teaser cards with their assigned color and "Coming Soon" badge. No Add to Cart.
- [ ] **Ingredient Banners** — optional expandable section per product showing key ingredients. "Know More" toggle.
- [x] Server-side data fetching from Supabase
- [x] Responsive grid: 2 columns on desktop, 1 on mobile

---

## 10. PRODUCT DETAIL PAGE (`app/products/[slug]/page.tsx`)

- [x] **Product Hero** — large product image on left, product info on right. Background tinted with product's colorTheme. Image gallery if multiple images.
- [x] **Product Info** — name, price (with compare_at_price strikethrough if set), short description, quantity selector, "Add to Cart" button (disabled if out of stock). Color-themed CTA button.
- [x] **Nutrition Facts Panel** — styled like a real nutrition label. Serving size, calories, vitamin/mineral breakdown with % daily values. Data from Supabase products.nutrition_facts JSONB field.
- [x] **Ingredients Deep-Dive** — each ingredient as a card: name, amount, description of benefit. Visual layout.
- [x] **Trust Badges** — row of badges: FSSAI Certified, No Added Sugar, Trans Fat Free, Antioxidant Rich, 100% Vegetarian. Visual badges with icons.
- [x] **Related Products** — cross-sell section showing the other product(s). "You might also like" heading. Uses ProductCard.
- [x] Dynamic metadata generation for SEO (`generateMetadata`)
- [x] Structured data (JSON-LD Product schema)
- [x] Out-of-stock state: grey out Add to Cart, show "Out of Stock" badge, optionally show "Notify Me" (stretch goal)

---

## 11. CHECKOUT PAGE (`app/checkout/page.tsx`)

- [x] **Order Summary** (right sidebar / top on mobile) — list of cart items with image, name, quantity, line total. Subtotal, shipping, discount, total.
- [x] **Checkout Form** (left / main) — fields:
  - Full Name (required)
  - Email (required, validated)
  - Phone (required, Indian format validation)
  - WhatsApp notification opt-in checkbox (default checked, pre-fills phone)
  - Shipping Address: Line 1, Line 2, City, State (dropdown), Pincode (6-digit validation)
- [x] **Form validation** — client-side with clear error messages. Validate all before proceeding.
- [x] **"Pay with Razorpay" button** — on click:
  1. Validate form
  2. POST to `/api/razorpay/create-order` with cart items + customer info
  3. Receive razorpay_order_id
  4. Open Razorpay checkout modal with prefilled customer info
  5. On success: POST to `/api/razorpay/verify-payment` with payment details
  6. On success: redirect to `/order-confirmation?order_id=xxx`
  7. On failure: show error toast, allow retry
- [x] **Loading states** — disable button and show spinner during payment processing
- [x] **Empty cart redirect** — if cart is empty, redirect to /products with toast
- [x] Include Razorpay script tag (`<Script src="https://checkout.razorpay.com/v1/checkout.js" />`)

---

## 12. ORDER CONFIRMATION PAGE (`app/order-confirmation/page.tsx`)

- [x] Fetch order details from Supabase by order_id (URL param)
- [x] Display: green checkmark animation, "Order Confirmed!" heading, order number (NP-XXXXXXXX-XXXX)
- [x] Order summary: items, quantities, total paid
- [x] Customer info: name, email, phone, shipping address
- [x] "You'll receive a confirmation email shortly" message
- [x] If WhatsApp opted in: "You'll also receive updates on WhatsApp"
- [x] "Continue Shopping" CTA → /products
- [x] Clear cart on this page load
- [x] Fire PostHog `payment_completed` event (implemented in `app/order-confirmation/page.tsx` via `trackPaymentCompleted`)

---

## 13. ADMIN DASHBOARD (separate project: `nutri-panda-dashboard`)

> **Note:** The admin dashboard is a separate Next.js project that consumes API routes from this project via CORS. See `nutri-panda-dashboard/` for the dashboard codebase.

- [x] **Admin Auth** — password protection against `ADMIN_PASSWORD` env var. Cookie-based session. Login page with NutriPanda branding. Rate limiting (5 attempts / 15min → 30min lockout).
- [x] **Admin Layout** — sidebar nav: Orders, Products, Inventory. "NutriPanda Admin" branding. Mobile hamburger. Logout button.
- [x] **Orders Page** (`/dashboard`):
  - Table: order number, customer name, date, total, payment status (badge), order status (badge)
  - Sortable by date, amount
  - Filterable by payment_status, order_status
  - Search by order number or customer name/email
  - Pagination (20 per page)
  - Click row → order detail
- [x] **Order Detail** (`/dashboard/orders/[id]`):
  - Full order info: customer details, items with images, payment info (Razorpay IDs), shipping address
  - Order timeline (created → paid → processing → shipped → delivered)
  - **Update Status dropdown** → calls API route → updates Supabase
  - Notes field (admin can add internal notes)
- [x] **Products Page** (`/dashboard/products`):
  - Table: product name, slug, price, stock, status (active/coming soon/inactive), color indicator
  - "Add Product" button → opens product form
  - Click row → product edit page
- [x] **Product Edit** (`/dashboard/products/[id]`):
  - Form with all product fields: name, slug, description, short_description, price, compare_at_price, images (URL input), color_theme (dropdown), ingredients (JSONB editor), nutrition_facts (JSONB editor), trust_badges (multi-select), category, is_active, is_featured, is_coming_soon, inventory_count, seo_title, seo_description
  - Save → PUT to `/api/admin/products/[id]`
  - Delete (soft) → DELETE to `/api/admin/products/[id]`
  - Image preview for entered URLs
- [x] **Inventory Page** (`/dashboard/inventory`):
  - Table: product name, current stock, color indicator
  - Quick stock adjustment: +/- buttons → calls admin API → updates products.inventory_count + logs to inventory_log
  - Inventory change log: table showing recent changes (sale, restock, adjustment) with timestamps
  - Low stock warning (highlight if stock < 10)
- [x] All admin pages fetch via API routes with credentials: 'include' for cookie auth
- [x] CORS configured in main project for cross-origin dashboard access

---

## 14. POSTHOG ANALYTICS

- [x] Install `posthog-js` and create provider in `lib/posthog/provider.tsx` (wrapped in `components/ClientProviders.tsx`)
- [x] Initialize PostHog with project key via `instrumentation-client.ts` (autocapture, pageview, pageleave enabled)
- [x] Track these events automatically:
  - `$pageview` — automatic via PostHog
  - `product_viewed` — on product detail page load (include: product_name, product_id, price, color_theme)
  - `add_to_cart` — on add to cart action (include: product_name, product_id, price, quantity)
  - `remove_from_cart` — on remove action
  - `cart_opened` — on cart drawer open
  - `checkout_started` — on checkout page load (include: cart_total, item_count)
  - `payment_initiated` — when Razorpay modal opens
  - `payment_completed` — on order confirmation page (include: order_id, total, item_count)
  - `payment_failed` — on Razorpay failure callback
- [x] Identify users by email after checkout (PostHog `identify` in `trackPaymentCompleted`)
- [ ] Set up person properties: first_order_date, total_orders, total_spent (set in API route after payment)

---

## 15. EMAIL TEMPLATES

Build as HTML strings in the Next.js API routes (`app/api/notifications/email/`). Inline CSS for email compatibility. Use Resend SDK for delivery.

- [x] **Order Confirmation** (to customer):
  - NutriPanda logo header (green bar)
  - "Order Confirmed!" heading
  - Order number, items table, subtotal, shipping, total, shipping address
  - Footer with NutriPanda branding
  - Built in `app/api/notifications/email/route.ts` (requires RESEND_API_KEY to send)
- [x] **Admin New Order** (to admin):
  - Order number, customer name, total, items list, shipping city
  - Built in `app/api/notifications/email/route.ts` (requires RESEND_API_KEY to send)
- [ ] **Welcome / First Order** (to customer, optional):
  - Thanks for choosing NutriPanda
  - Brief brand pitch
  - Social links (follow us @og_nutripanda)

---

## 16. WHATSAPP NOTIFICATIONS

- [x] Setup WhatsApp Business API client (Twilio) — route built in `app/api/notifications/whatsapp/route.ts`
- [x] Create message templates:
  - **Order Confirmation**: built (requires Twilio credentials to send)
  - **Shipping Update**: built (requires Twilio credentials to send)
- [x] Only send to customers who opted in (`customer_whatsapp_opted_in = true`)
- [x] Log all sends to `notifications_log` table
- [x] Handle API errors gracefully — don't fail the order if WhatsApp fails
- [ ] Configure Twilio credentials (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM) in production env
- [ ] Get Meta-approved WhatsApp templates for production

---

## 17. SEO + PERFORMANCE

- [x] Configure `metadata` in root layout (site title, description)
- [x] `generateMetadata` on product detail pages (dynamic title, description, OG image)
- [x] Structured data (JSON-LD): `Product` schema on product detail pages
- [ ] Structured data: `Organization` schema on all pages, `BreadcrumbList` on product pages
- [ ] Open Graph images and social meta tags
- [ ] Generate `sitemap.xml` via `app/sitemap.ts` (dynamic from Supabase products table)
- [ ] Generate `robots.txt` via `app/robots.ts`
- [x] Image optimization: `next/image` used, remote patterns configured
- [x] Font optimization: custom fonts via @font-face
- [x] Lazy load below-fold sections (framer-motion `whileInView`)
- [ ] Target: Lighthouse 90+ on all pages

---

## 18. MOBILE RESPONSIVENESS

Every page and component must work on these breakpoints:

- [x] Mobile: 320px – 640px (primary target — 70%+ of Indian e-commerce traffic)
- [x] Tablet: 641px – 1024px
- [x] Desktop: 1025px+

Specific mobile concerns:

- [x] Navbar collapses to hamburger menu
- [x] Cart drawer is full-width on mobile
- [x] Product grid → single column on mobile, 2 columns on desktop
- [x] Checkout form is single column, order summary moves above form (flex-col-reverse)
- [x] Admin dashboard — separate project with mobile hamburger, responsive tables
- [ ] Touch targets: audit minimum 44px height on all interactive elements
- [ ] No horizontal scroll anywhere — final audit needed

---

## 19. DEPLOYMENT (Netlify + Hostinger domain)

- [x] Install `@netlify/plugin-nextjs` and add `netlify.toml` config
- [x] Fix `next/image` remote patterns
- [x] Push to GitHub (`nutripanda-gh/nutripanda-website`)
- [x] Connect Netlify to GitHub repo, configure build settings
- [x] Import environment variables to Netlify
- [ ] **Netlify**: configure custom domain `nutripanda.in`, verify SSL
- [ ] **Razorpay**: switch to live keys, configure webhook URL to `https://nutripanda.in/api/razorpay/webhook`
- [ ] **Supabase**: ensure production project, RLS on all tables, connection pooling if needed
- [ ] **PostHog**: production project with correct API host
- [ ] **Resend**: configure sending domain, verify DNS records
- [ ] **Admin Dashboard**: deploy separately on Netlify, set `ADMIN_DASHBOARD_URL` env var on main site for CORS
- [ ] Create deployment documentation for Varun

---

## 20. FINAL CHECKS

Before calling it done, verify every single item:

- [x] Home page loads with real Supabase data, all sections work
- [x] About page loads with real content
- [x] Products page shows 2 active products + coming soon placeholders
- [x] Product detail page shows full product info, nutrition facts, ingredients, badges
- [x] Add to Cart works → cart drawer shows item → quantity updates
- [x] Checkout form validates → Razorpay modal opens → test payment succeeds
- [x] Order appears in Supabase with correct data (verified: 3 test orders created)
- [x] Order confirmation page shows correct order details
- [ ] Customer receives order confirmation email (requires RESEND_API_KEY in production)
- [ ] Customer receives WhatsApp message (requires Twilio credentials in production)
- [ ] Admin receives new order notification (requires RESEND_API_KEY in production)
- [x] Admin dashboard: orders list loads, filterable, clickable
- [x] Admin dashboard: order detail shows full info, status updatable
- [x] Admin dashboard: products list loads, can create/edit/delete products
- [x] Admin dashboard: inventory page shows stock, adjustable, log visible
- [x] Stock decrements after successful payment (verified: 500 → 499)
- [x] Out-of-stock products show disabled Add to Cart
- [x] API routes: /api/razorpay/* endpoints respond correctly
- [x] API routes: /api/admin/* endpoints enforce auth (cookie + rate limiting)
- [x] Supabase RLS: anon can read products/FAQs/testimonials, cannot modify
- [x] PostHog events firing correctly across the funnel (verified: all events wired, session recordings working)
- [ ] All pages mobile responsive (test on real device)
- [ ] Lighthouse 90+ on all public pages
- [ ] No console errors in production
- [ ] All env vars set correctly in Netlify production environment

---

*This file is the contract between Varun and Claude Code. If it's not in this file, it's not in scope. If it IS in this file, it ships.*
