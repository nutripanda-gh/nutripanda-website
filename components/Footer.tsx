import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Big brand name — fills available space */}
        <div className="flex items-center justify-center border-b border-white/10 py-14 sm:py-20">
          <h2 className="text-center text-[clamp(3rem,14vw,12rem)] font-bold leading-none tracking-tight">
            <span className="text-[#12BC00]">Nutri</span>Panda
          </h2>
        </div>

        {/* Middle section: links + socials */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 py-12 sm:grid-cols-3 sm:gap-8 sm:py-14">
          {/* Col 1: Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Shop", href: "/products" },
                { label: "About", href: "/about" },
                { label: "Products", href: "/products" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 2: Support */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Support
            </h3>
            <nav className="flex flex-col gap-3">
              <a
                href="mailto:hello@nutripanda.in"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                hello@nutripanda.in
              </a>
              <span className="text-sm text-white/60">
                Free shipping on orders above ₹499
              </span>
              <span className="text-sm text-white/60">
                30-day satisfaction guarantee
              </span>
            </nav>
          </div>

          {/* Col 3: Socials */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/og_nutripanda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-white/30 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-white/30 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                  <path d="M4 20l6.768-6.768" />
                  <path d="M20 4l-6.768 6.768" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-white/30 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-sm text-white/60">
              @og_nutripanda
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} NutriPanda. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>Made in India</span>
            <span>&middot;</span>
            <span>FSSAI Compliant</span>
          </div>
        </div>
      </div>
    </footer>

  );
}
