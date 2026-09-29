'use client';

import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal > 150 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-28 transition-colors duration-500 font-serif">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="border-b border-[var(--border)] pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
              MAISON SELECTIONS
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[var(--foreground)]">
              Your Gourmet Collection
            </h1>
          </div>
          <span className="text-xs text-[var(--muted)] uppercase tracking-widest font-semibold">
            {getTotalItems()} Items Selected
          </span>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-24 brand-card p-12 text-center flex flex-col items-center rounded-sm max-w-2xl mx-auto"
          >
            <div className="p-5 bg-[var(--surface)] text-[var(--accent)] rounded-full mb-6 border border-[var(--border)]">
              <ShoppingBag className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-3">
              Your collection is waiting.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mb-8 leading-relaxed">
              Discover handcrafted chocolate Medjool dates, crispy pistachio kunafa bars, and gourmet luxury gifts from Dubai.
            </p>

            <Link
              href="/products"
              className="px-8 py-3.5 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] font-serif text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 shadow-sm"
            >
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Items List */}
            <div className="lg:col-span-8 space-y-6">
              {items.map(({ product, quantity }) => {
                const numericPrice = parseFloat(product.price.replace('$', '')) || 0;
                const itemTotal = (numericPrice * quantity).toFixed(2);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="brand-card p-6 rounded-sm flex flex-col sm:flex-row gap-6 items-center justify-between"
                  >
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="relative w-24 h-24 bg-[var(--surface)] shrink-0 rounded-sm overflow-hidden border border-[var(--border)]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold block mb-1">
                          {product.category}
                        </span>
                        <h3 className="text-base font-serif font-bold text-[var(--foreground)] leading-snug mb-1">
                          {product.name}
                        </h3>
                        <span className="text-xs text-[var(--muted)] font-sans">{product.weight}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[var(--border)]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[var(--border)] rounded-sm bg-[var(--surface)]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[var(--foreground)] font-sans">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Price & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="text-base font-serif font-bold text-[var(--foreground)]">
                          ${itemTotal}
                        </span>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-[var(--muted)] hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="pt-4 flex items-center justify-between">
                <Link
                  href="/products"
                  className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] hover:underline font-semibold flex items-center gap-2"
                >
                  <span>&larr; Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 brand-card p-8 rounded-sm space-y-6">
              <h2 className="text-xl font-serif font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[var(--foreground)]">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[var(--muted)]">
                  <span>Dubai Express Delivery</span>
                  <span className="font-bold text-[var(--foreground)]">
                    {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex justify-between text-base font-bold text-[var(--foreground)]">
                  <span>Estimated Total</span>
                  <span className="text-[var(--accent)]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled
                className="w-full py-4 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] font-serif font-bold text-xs uppercase tracking-[0.2em] opacity-80 cursor-not-allowed text-center"
              >
                Proceed to Checkout (UI Demo)
              </button>

              <p className="text-[10px] text-[var(--muted)] text-center italic">
                Complimentary luxury keepsake box & ribbon on orders over $150.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
