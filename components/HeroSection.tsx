import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-56px)] w-full overflow-hidden">
      {/* Bamboo left */}
      <Image
        src="/assets/bamboo.png"
        alt=""
        width={300}
        height={800}
        className="pointer-events-none absolute bottom-0 left-0 z-[1] h-full w-auto object-contain object-bottom -translate-x-[40%] rotate-[10deg] blur-[3px]"
      />

      {/* Bamboo right (mirrored) */}
      <Image
        src="/assets/bamboo.png"
        alt=""
        width={300}
        height={800}
        className="pointer-events-none absolute bottom-0 right-0 z-[1] h-full w-auto -scale-x-100 object-contain object-bottom translate-x-[40%] -rotate-[10deg] blur-[3px]"
      />

      {/* Panda hero image */}
      <Image
        src="/assets/hero.png"
        alt="NutriPanda - Nutrition Gummies"
        fill
        priority
        className="z-[2] object-cover object-bottom"
      />

      {/* Centered text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center -translate-y-[15%]">
        <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl">
          NutriPanda
        </h1>
        <p className="mt-3 text-lg text-gray-700 sm:text-xl md:text-2xl">
          If it&apos;s not natural, it&apos;s not NutriPanda
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-[#12BC00] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0fa600] active:bg-[#0d9200] sm:px-10 sm:py-3.5 sm:text-base"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
