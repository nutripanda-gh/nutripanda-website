# NutriPanda — Project Guide

## What Is This

E-commerce website for NutriPanda, an Indian nutrition gummies startup. 2 products live now (Immunity Support, Daily Vitality), 6 more coming later. Guest checkout only — no user accounts/signup/login.

## Tech Stack

- **Frontend + API:** Next.js 16 (App Router, TypeScript, Tailwind CSS v4, Route Handlers for server-side logic)
- **Database:** Supabase (Postgres — products, orders, customers, FAQs, testimonials, inventory logs, notification logs)
- **Payments:** Razorpay (INR, paise-based amounts) — integrated via Next.js API routes
- **Analytics:** PostHog
- **Hosting:** Hostinger (nutripanda.in)

## Architecture Decisions

- **No user auth.** Guest checkout only. Customers provide name/email/phone/address at checkout.
- **Admin auth** is a simple password check against `ADMIN_PASSWORD` env var with cookie session.
- **Supabase** owns all data — products, content (FAQs, testimonials), and transactional data (orders, customers, inventory logs). No external CMS.
- **Next.js API routes** (`app/api/`) handle all server-side logic: Razorpay payment creation/verification/webhooks, email/WhatsApp notifications. No separate backend server. Frontend never talks to Razorpay directly for sensitive operations.
- **Admin dashboard** is a **separate Next.js project** (`nutri-panda-dashboard`) that consumes admin API routes from this project via CORS. Hosted separately.
- **CORS** is configured in `lib/utils/api-helpers.ts` for cross-origin admin dashboard access. Allowed origins include localhost dev ports and `ADMIN_DASHBOARD_URL` env var.
- **Rate limiting** on admin auth (5 failed attempts in 15 min → 30 min lockout) via in-memory store in `lib/utils/rate-limit.ts`.
- Cart state managed with **Zustand** + localStorage persistence.
- All prices stored as integers (paise). Display as ₹ with 2 decimal places.

## Folder Structure (Target)

```
app/
  page.tsx                    # Home
  about/page.tsx
  products/page.tsx
  products/[slug]/page.tsx
  checkout/page.tsx
  order-confirmation/page.tsx
  api/                        # Next.js Route Handlers (server-side)
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
components/
  layout/       # Navbar, Footer, CartDrawer
  home/         # Hero, ProductShowcase, Ingredients, FAQ, Testimonials, Contact
  products/     # ProductCard, ProductGrid, ComingSoonBadge
  product-detail/
  checkout/
  ui/           # Button, Input, Badge, Accordion, Card, Container, SectionHeading
lib/
  supabase/     # Browser client, admin client, queries
  razorpay/     # Utils (signature verification)
  cart/         # Zustand store
  utils/        # Formatters, validators, constants
types/          # Shared TypeScript types
```

Note: Project was scaffolded without `--src-dir`. Files live at root level (app/, components/, lib/, types/) — no src/ directory.

## Design Tokens

```
Colors:
  brand:   green #12BC00, black #000000, white #FFFFFF
  product: orange #FF7731 (Immunity), green #12BC00 (Vitality),
           purple #9231FF, yellow #FFC731, pink #F995FF, blue #70A9FF (upcoming)
  accent:  lightGreen #DCFDCC

Fonts:
  heading: Uneko Bold (custom, via @font-face from /public/fonts/)
  body:    Avenir (custom, via @font-face from /public/fonts/)
```

## External Services

| Service   | Role                                                        | Config Location          |
|-----------|-------------------------------------------------------------|--------------------------|
| Supabase  | DB — products, orders, customers, FAQs, testimonials, logs  | `lib/supabase/`          |
| Razorpay  | Payments — order creation, verification, webhooks           | `app/api/razorpay/`      |
| PostHog   | Analytics — funnel events, user ID                          | Provider in layout       |
| Resend    | Email notifications                                        | `app/api/notifications/` |
| WhatsApp  | Order updates (opt-in only)                                 | `app/api/notifications/` |

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=          # Optional, falls back to RAZORPAY_KEY_SECRET

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Resend (email)
RESEND_API_KEY=

# Admin
ADMIN_PASSWORD=
ADMIN_DASHBOARD_URL=              # Production URL of admin dashboard (for CORS)

# Site
NEXT_PUBLIC_SITE_URL=             # Production URL (for notification callbacks)
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Workflow Rules

- **After completing a task from `COMPLETE_PLAN.md`, always ask the user for approval before ticking off the corresponding TODO checkboxes.** Do not auto-tick.

## Key Conventions

- **Mobile-first.** 70%+ of Indian e-commerce traffic is mobile. Breakpoints: 320-640px (mobile), 641-1024px (tablet), 1025px+ (desktop).
- **Server-side data fetching** from Supabase on all public pages.
- **Order numbers** follow format: `NP-YYYYMMDD-XXXX`.
- **Supabase RLS:** anon can SELECT products/FAQs/testimonials and INSERT orders. Everything else requires service_role.
- **PostHog events:** product_viewed, add_to_cart, remove_from_cart, cart_opened, checkout_started, payment_initiated, payment_completed, payment_failed.
- Use `next/image` for all images. Product images stored as URLs in Supabase.
- Use `generateMetadata` for dynamic SEO on product pages.
- Touch targets: minimum 44px on all interactive elements.

## Detailed Spec

See `COMPLETE_PLAN.md` for full implementation details including:
- Supabase table schemas (products, FAQs, testimonials, orders, customers) and RLS policies
- Next.js API route specifications (Razorpay, notifications, admin CRUD)
- Page-by-page UI specifications
- Admin dashboard product management
- Email/WhatsApp notification templates
- SEO and performance requirements
