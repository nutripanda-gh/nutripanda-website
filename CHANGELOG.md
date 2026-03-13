# Changelog

All notable changes to the NutriPanda project will be documented in this file.

---

## [0.1.0] - 2026-03-13

### Added
- **Razorpay payment integration** — full end-to-end flow working: create order → Razorpay modal → verify signature → update Supabase → decrement inventory → fire notifications
- **Admin API routes** — complete CRUD for products, orders, inventory with cookie-based auth and CORS
  - `app/api/admin/auth/route.ts` — login (POST), session check (GET), logout (DELETE), CORS preflight (OPTIONS)
  - `app/api/admin/products/route.ts` + `[id]/route.ts` — list, create, get, update, soft-delete
  - `app/api/admin/orders/route.ts` + `[id]/route.ts` — paginated list with filters/search, detail, status update
  - `app/api/admin/inventory/route.ts` — stock overview, adjustment with logging
- **Razorpay API routes** — create-order, verify-payment (HMAC SHA256), webhook (idempotent)
- **Notification API routes** — email (Resend with branded HTML templates), WhatsApp (Twilio)
- **Public order endpoint** — `app/api/orders/[id]/route.ts` for order confirmation page (strips sensitive fields)
- **Order confirmation page** — `app/order-confirmation/page.tsx` with Suspense boundary, order summary, shipping info
- **About page** — `app/about/page.tsx` with founder story, vision/mission, "what we stand for" grid
- **Home page sections** — IngredientsSection (Spirulina, Giloy, Zinc, Pectin cards), TestimonialsSection (dark bg, star ratings)
- **Admin auth security** — rate limiting (5 failed attempts / 15min → 30min lockout) in `lib/utils/rate-limit.ts`
- **CORS helpers** — `lib/utils/api-helpers.ts` with origin whitelist for cross-origin admin dashboard
- **Razorpay utils** — `lib/razorpay/utils.ts` with signature verification, webhook verification, SDK instance singleton
- **Admin auth utils** — `lib/utils/admin-auth.ts` with SHA256 session cookies
- **DB trigger** — `generate_order_number()` auto-generates `NP-YYYYMMDD-XXXX` order numbers on insert
- **Admin dashboard** — built as separate project (`nutri-panda-dashboard`) with login, sidebar, orders, products, inventory, order detail pages

### Fixed
- **Checkout → API payload mismatch** — checkout sends `{ customer: {}, shippingAddress: {} }` (camelCase nested), API now accepts this format and maps internally
- **Order number generation** — added Postgres trigger since `order_number` column had no default

### Changed
- **Deployment target** — switched from Vercel to Hostinger (nutripanda.in) for free commercial hosting
- **Architecture** — admin dashboard is now a separate Next.js project consuming API routes via CORS, not embedded in main app

### Status
- Phase 4 (API Routes) — **complete**
- Phase 7 (Home Page) — **complete**
- Phase 8 (About Page) — **complete**
- Phase 11 (Checkout) — **complete** (Razorpay tested end-to-end)
- Phase 12 (Order Confirmation) — **complete**
- Phase 13 (Admin Dashboard) — **complete** (separate project)
- Remaining: PostHog analytics, email templates polish, WhatsApp templates, SEO, mobile polish, deployment

---

## [0.0.6] - 2026-03-07

### Added
- **`lib/cart/store.ts`** — Zustand cart store with add/remove/update, localStorage persistence via `persist` middleware, SSR hydration handling, stock validation, max quantity cap
- **`components/CartDrawer.tsx`** — slide-in drawer with item list, quantity controls, remove button, subtotal, checkout link, empty state, body scroll lock
- **`components/AddToCartButton.tsx`** — reusable Add to Cart button with out-of-stock disabled state and toast notification
- **`app/products/page.tsx`** — products listing page with color-coded ProductCard grid, ComingSoonCard with badge, server-side Supabase fetching, responsive 2-col/1-col layout
- **`app/products/[slug]/page.tsx`** — full product detail page with NutritionFacts panel, Ingredients cards, Trust Badges (SVG icons), Related Products, JSON-LD structured data, `generateMetadata` for SEO, out-of-stock state
- **`components/product-detail/ProductHero.tsx`** — product hero with image gallery, color-themed background, quantity selector, Add to Cart, low stock warning
- **`app/checkout/page.tsx`** — checkout page with full Razorpay payment flow (create order → modal → verify), coupon code support, empty cart redirect, loading states
- **`components/checkout/CheckoutForm.tsx`** — customer details + shipping address form with client-side validation (email, 10-digit phone, 6-digit pincode), Indian states dropdown, WhatsApp opt-in, Pay with Razorpay button with spinner
- **`components/checkout/OrderSummary.tsx`** — order summary with item list, subtotal, shipping, discount, total
- **`components/CouponPopup.tsx`** — timed popup (5s delay) for 10% off coupon via WhatsApp, phone validation, localStorage dismiss persistence
- **`app/api/coupons/send/route.ts`** — coupon generation + Twilio WhatsApp delivery, Supabase coupon_leads upsert
- **`app/api/coupons/validate/route.ts`** — coupon code validation against Supabase, percentage discount calculation
- **`components/ClientProviders.tsx`** — layout wrapper with CartDrawer, CouponPopup, and react-hot-toast Toaster
- **`lib/utils/format.ts`** — `formatPrice()` paise-to-INR formatter
- **`lib/utils/validators.ts`** — email, phone (Indian 10-digit), pincode (6-digit) validators
- **`lib/utils/constants.ts`** — SHIPPING_COST, COUPON_DISCOUNT_PERCENT, INDIAN_STATES list

### Status
- Phase 5 (Reusable UI) — **partial** (CartDrawer, Toast done; Button, Input, Badge, Card, etc. still pending)
- Phase 6 (Cart System) — **complete**
- Phase 9 (Products Page) — **mostly complete** (Ingredient Banners not done)
- Phase 10 (Product Detail Page) — **complete**
- Phase 11 (Checkout Page) — **complete**
- Next up: Phase 4 (Next.js API Routes — Razorpay, admin, notifications) and remaining Phase 5 UI primitives

---

## [0.0.5] - 2026-03-07

### Verified
- **`lib/supabase/queries.ts`** — confirmed all 17 helper functions from Phase 3 spec are implemented:
  - Public queries: `getAllProducts`, `getProductBySlug`, `getFeaturedProducts`, `getComingSoonProducts`, `getAllFAQs`, `getAllTestimonials`
  - Admin product CRUD: `createProduct`, `updateProduct`, `deleteProduct`, `getAllProductsAdmin`, `getProductById`
  - Orders: `createOrder` (with customer upsert), `updateOrderPayment`, `updateOrderStatus`, `getOrders` (paginated + filtered), `getOrderById`
  - Inventory: `logInventoryChange`, `getInventoryLog`
  - Notifications: `logNotification`
  - Customers: `getCustomers` (paginated + search)
- **Supabase project restored** — NutriPanda project (`bmdujfnpjzjdklsqsbom`) confirmed ACTIVE_HEALTHY on ap-south-1, all 8 tables verified (products, faqs, testimonials, orders, customers, inventory_log, notifications_log, coupon_leads)

### Status
- Phase 3 (Supabase Database) — **complete**
- Next up: Phase 5 (Reusable UI Components)

---

## [0.0.4] - 2026-02-26

### Changed
- **Architecture simplification** — removed Sanity CMS and Render backend from project plan. All data now lives in Supabase, all server-side logic handled by Next.js API routes (`app/api/`). Single Vercel deployment.
- **Updated `CLAUDE.md`** — rewritten tech stack, architecture decisions, folder structure, external services, and env vars to reflect Supabase + Next.js API routes architecture
- **Updated `COMPLETE_PLAN.md`** — Phase 2 rewritten as "Supabase Content Tables" (products, FAQs, testimonials), Phase 4 rewritten as "Next.js API Routes", all Sanity/Render references removed across all 20 phases
- **Custom fonts** — added Uneko Bold (heading) and Avenir (body) via `@font-face` in `globals.css`, removed Geist fonts from `layout.tsx`
- **`app/globals.css`** — added `--font-heading` and `--font-body` CSS variables, removed dark mode styles, set body and heading font families
- **`components/HeroSection.tsx`** — redesigned as full-viewport hero with panda mascot image, bamboo decorations, centered text overlay, and Shop Now CTA
- **`components/ProductCards.tsx`** — redesigned from 2x2 grid to alternating image/text rows (40%/60% split) with Shop Now + Learn More buttons
- **`components/ContactSection.tsx`** — redesigned with contact image (left) and form with bottom-border styled inputs (right)
- **`components/Footer.tsx`** — updated with large NUTRIPANDA branding, paw print decorations, nav links, social icons, and copyright

### Added
- Brand assets in `public/assets/`: `logo-main.png`, `hero.png`, `bamboo.png`, `paw.png`, `product-demo.png`, `contact.png`
- Custom font files in `public/fonts/`: `Uneko Bold Demo Regular.otf`, `Avenir Font.ttc`

---

## [0.0.3] - 2026-02-22

### Added
- **Supabase database schema** — created all 4 tables via migration:
  - `orders` — core order tracking with payment/shipping status, Razorpay fields, CHECK constraints
  - `customers` — guest customer records with unique email constraint
  - `inventory_log` — stock change tracking with FK to orders
  - `notifications_log` — email/WhatsApp/SMS send log with FK to orders
- `update_updated_at_column()` trigger function — auto-updates `updated_at` on orders
- `generate_order_number()` function — generates `NP-YYYYMMDD-XXXX` format order numbers
- Row Level Security policies on all 4 tables (anon INSERT-only on orders, service_role full access everywhere)
- 8 performance indexes on frequently queried columns

### Changed
- Added "Workflow Rules" section to `claude.md` — must ask user before ticking off COMPLETE_PLAN.md TODOs

---

## [0.0.2] - 2026-02-22

### Added
- Created `components/Navbar.tsx` — sticky top navbar with logo, Shop/About links, search/cart/user icons, and mobile hamburger menu
- Created `components/HeroSection.tsx` — full-width dark gradient hero banner with product image placeholder
- Created `components/ProductCards.tsx` — 2x2 product grid with Immunity Support Gummies, Lip Balm, Daal Baati & Churma, and Jar Image cards
- Created `components/BrandSection.tsx` — brand story section with "Nutri Panda" heading, description, and "Learn More" CTA
- Created `components/FAQSection.tsx` — interactive accordion with 5 FAQ items and expand/collapse animation
- Created `components/ContactSection.tsx` — contact section with image placeholder and contact details
- Created `components/Footer.tsx` — dark footer with "NUTRIPANDA" branding, nav links, and social icon placeholders

### Changed
- Replaced default Next.js template in `app/page.tsx` with full homepage composing all new sections
- Updated `app/layout.tsx` metadata to NutriPanda branding (title and description)

---

## [0.0.1] - 2026-02-22

### Added
- Initialized Next.js 16 project with App Router, TypeScript, and Tailwind CSS v4
- Created `COMPLETE_PLAN.md` with full project specification (20 phases)
- Created `claude.md` with project context, tech stack, architecture decisions, design tokens, and conventions
- Created `CHANGELOG.md` for tracking project changes
