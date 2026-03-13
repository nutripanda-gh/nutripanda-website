import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/supabase'

export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  image: string
  colorTheme: string
  quantity: number
  maxStock: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  isHydrated: boolean

  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  setHydrated: () => void

  getItemCount: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isHydrated: false,

      addItem: (product, quantity = 1) => {
        const { items } = get()
        const existing = items.find((item) => item.productId === product.id)

        if (existing) {
          const newQty = Math.min(
            existing.quantity + quantity,
            product.inventory_count
          )
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: newQty, maxStock: product.inventory_count }
                : item
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.images?.[0] ?? '',
                colorTheme: product.color_theme ?? 'green',
                quantity: Math.min(quantity, product.inventory_count),
                maxStock: product.inventory_count,
              },
            ],
          })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(quantity, item.maxStock) }
              : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setHydrated: () => set({ isHydrated: true }),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'nutripanda-cart',
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)
