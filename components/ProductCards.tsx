import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types/supabase";

export default function ProductCards({ products }: { products: Product[] }) {
  return (
    <section className="w-full bg-white py-10 sm:py-14 md:py-16">
      {products.map((product, index) => {
        const image =
          product.images?.[0] ??
          "https://placehold.co/600x600/f5f5f5/999?text=No+Image";
        const isEven = index % 2 === 0;

        return isEven ? (
          /* Image (40%) | Text (60%) */
          <div
            key={product.id}
            className="grid grid-cols-1 sm:grid-cols-[40%_60%]"
          >
            <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[480px] bg-[#f5f5f5]">
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-white p-8 sm:p-10 md:p-16 lg:p-20">
              <h3 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                {product.name}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
                {product.short_description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <AddToCartButton product={product} />
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:bg-gray-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Text (60%) | Image (40%) */
          <div
            key={product.id}
            className="grid grid-cols-1 sm:grid-cols-[60%_40%]"
          >
            <div className="flex flex-col items-end justify-center bg-white p-8 sm:p-10 md:p-16 lg:p-20 text-right order-2 sm:order-1">
              <h3 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                {product.name}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
                {product.short_description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <AddToCartButton product={product} />
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:bg-gray-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[480px] bg-[#f5f5f5] order-1 sm:order-2">
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
