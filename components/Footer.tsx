import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-white pt-16 pb-10 md:pt-24 md:pb-14">
      {/* Paw bottom-left */}
      <Image
        src="/assets/paw.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute bottom-0 left-0 w-[120px] sm:w-[160px] md:w-[200px]"
      />

      {/* Paw bottom-right (mirrored) */}
      <Image
        src="/assets/paw.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute bottom-0 right-0 w-[120px] -scale-x-100 sm:w-[160px] md:w-[200px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Wide brand name */}
        <h2 className="text-center text-6xl font-bold uppercase tracking-[0.25em] text-gray-900 sm:text-7xl md:text-8xl lg:text-9xl">
          NUTRIPANDA
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-10 mb-10 h-px w-full max-w-2xl bg-gray-200" />

        {/* Navigation links */}
        <nav className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <Link
            href="/shop"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Contact
          </Link>
        </nav>

        {/* Social icons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#12BC00] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#12BC00] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.47v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#12BC00] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-10 text-center text-xs text-gray-400">
          &copy; 2026 NutriPanda. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
