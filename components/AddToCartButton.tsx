"use client";

import { useCartStore } from "@/lib/cart/store";
import type { Product } from "@/types/supabase";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem, openCart } = useCartStore();
  const outOfStock = product.inventory_count <= 0;

  function handleClick() {
    if (outOfStock) return;
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      }
    >
      {outOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}
