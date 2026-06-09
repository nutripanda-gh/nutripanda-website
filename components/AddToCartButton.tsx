"use client";

import { useCartStore } from "@/lib/cart/store";
import type { Product } from "@/types/supabase";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import { trackAddToCart } from "@/lib/posthog/events";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
}

export default function AddToCartButton({ product, className, children, ariaLabel }: AddToCartButtonProps) {
  const { addItem, openCart } = useCartStore();
  const outOfStock = product.inventory_count <= 0;

  function handleClick() {
    if (outOfStock) return;
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart`);
    trackAddToCart({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: 1,
      color_theme: product.color_theme,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      aria-label={ariaLabel}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      }
    >
      {children ?? (outOfStock ? "Out of Stock" : "Add to Cart")}
    </button>
  );
}
