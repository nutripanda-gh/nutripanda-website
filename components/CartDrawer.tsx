"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/utils/format";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, isHydrated, closeCart, removeItem, updateQuantity, getItemCount, getSubtotal } =
    useCartStore();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const hydratedItems = isHydrated ? items : [];
  const itemCount = isHydrated ? getItemCount() : 0;
  const subtotal = isHydrated ? getSubtotal() : 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            Cart {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {hydratedItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
            <ShoppingBag size={48} className="text-gray-300" />
            <p className="text-base font-medium text-gray-500">Your cart is empty</p>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-4">
                {hydratedItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 rounded-lg border border-gray-100 p-3"
                  >
                    {/* Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-50">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No img
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-gray-900 hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="ml-2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-5 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-full bg-brand-green py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
