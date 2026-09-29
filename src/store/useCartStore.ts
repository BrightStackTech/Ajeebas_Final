'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      toastMessage: null,

      setToastMessage: (msg: string | null) => set({ toastMessage: msg }),

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.product.id === product.id);
          let updatedItems: CartItem[];

          if (existingIndex > -1) {
            updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
          } else {
            updatedItems = [...state.items, { product, quantity }];
          }

          return {
            items: updatedItems,
            toastMessage: `Added "${product.name}" to your collection`,
          };
        });

        // Auto hide toast
        setTimeout(() => {
          set({ toastMessage: null });
        }, 3000);
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const numericPrice = parseFloat(item.product.price.replace('$', '')) || 0;
          return total + numericPrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'ajeebas-cart-storage',
    }
  )
);
