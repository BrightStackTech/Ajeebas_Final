'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PRODUCTS_DATA } from '@/data/products';
import ProductModal from '@/components/ProductModal';
import { ArrowLeft, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Find product matching slug or fallback to first product
  const product = PRODUCTS_DATA.find(
    (p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === params.slug
  ) || PRODUCTS_DATA[0];

  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-28 transition-colors duration-500 font-serif">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back To Collection</span>
          </Link>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Large Editorial Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative aspect-square sm:aspect-4/3 w-full rounded-sm overflow-hidden border border-[var(--border)] brand-card"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-semibold">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Details Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-3">
              MAISON SELECTION • {product.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[var(--foreground)] mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-serif font-bold text-[var(--accent)]">
                {product.price}
              </span>
              <span className="text-xs px-3 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] uppercase font-serif tracking-widest font-semibold">
                {product.weight}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--muted)] font-serif leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-bold mb-3">
                  Artisan Sourced Ingredients
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                      <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--border)]">
              <button
                onClick={() => useCartStore.getState().addItem(product)}
                className="px-8 py-4 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] font-serif font-bold text-xs uppercase tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all cursor-pointer rounded-sm shadow-sm flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Collection</span>
              </button>

              <Link
                href="/contact"
                className="px-8 py-4 border border-[var(--border)] text-[var(--foreground)] font-serif text-xs uppercase tracking-[0.2em] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                Inquire For Hampers
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[var(--border)]">
            <div className="mb-10">
              <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-1">
                COMPLEMENTARY CREATIONS
              </span>
              <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
                You May Also Admire
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="brand-card p-5 rounded-sm flex flex-col justify-between">
                  <div className="relative aspect-square bg-[var(--surface)] overflow-hidden rounded-sm mb-4">
                    <Image src={rel.image} alt={rel.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold block mb-1">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--foreground)] leading-snug mb-2">
                      {rel.name}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--accent)]">{rel.price}</span>
                    <button
                      onClick={() => useCartStore.getState().addItem(rel)}
                      className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold hover:underline cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
