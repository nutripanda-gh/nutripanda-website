"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types/supabase";

function formatPrice(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default function ProductCards({ products }: { products: Product[] }) {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest uppercase text-[#12BC00]">
            Our Products
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shop Best Sellers
          </h2>
        </div>

        {/* Product grid */}
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5 sm:gap-8">
          {products.map((product) => {
            const image =
              product.images?.[0] ??
              "https://placehold.co/400x400/f5f5f5/999?text=No+Image";
            const hasDiscount =
              product.compare_at_price &&
              product.compare_at_price > product.price;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#f3f3f3] pb-5"
              >
                {/* Image card */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {hasDiscount && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-gray-900 px-3 py-1 text-[10px] font-semibold tracking-wide text-white sm:text-xs">
                      {Math.round(
                        ((product.compare_at_price! - product.price) /
                          product.compare_at_price!) *
                          100,
                      )}
                      % OFF
                    </span>
                  )}
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, 320px"
                  />
                  {/* Quick-add overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div
                      className="mx-3 mb-3"
                      onClick={(e) => e.preventDefault()}
                    >
                      <AddToCartButton
                        product={product}
                        className="flex w-full items-center justify-center rounded-xl bg-gray-900 py-2.5 text-xs font-semibold tracking-wide uppercase text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 sm:py-3 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="mt-3 px-4 sm:mt-4 sm:px-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 sm:text-sm">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm font-medium text-gray-900 sm:text-base">
                      {formatPrice(product.price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.compare_at_price!)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
