export default function BrandSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Top row: Heading on left, Free badge on right */}
        <div className="flex items-start justify-between">
          {/* Left: Brand name heading */}
          <h2 className="text-5xl font-bold leading-tight text-gray-900 sm:text-6xl">
            Nutri
            <br />
            Panda
          </h2>

          {/* Right: Free badge placeholder */}
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-200">
            <span className="text-sm font-semibold text-gray-500 select-none">
              Free
            </span>
          </div>
        </div>

        {/* Description text */}
        <div className="mt-8 max-w-md space-y-3">
          <p className="text-base leading-relaxed text-gray-500">
            We believe nutrition should be simple, fun, and accessible.
            NutriPanda crafts premium gummies packed with real ingredients
            to support your daily wellness journey.
          </p>
          <p className="text-base leading-relaxed text-gray-500">
            Made in India with clean science and zero compromises.
          </p>
        </div>

        {/* Learn More button */}
        <div className="mt-8">
          <a
            href="/about"
            className="inline-block rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
