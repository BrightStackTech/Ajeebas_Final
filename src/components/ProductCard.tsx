'use client';

import Image from 'next/image';
import { Product } from '@/data/products';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onQuickView(product)}
      className="group brand-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer rounded-sm h-full select-none relative overflow-hidden"
    >
      <div>
        {/* Product Image with Subtle Scale 1.08 & Mask feel */}
        <div className="relative w-full aspect-square bg-[var(--surface)] overflow-hidden rounded-sm mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

          {/* Category Badge with Shimmer Effect */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[var(--background)]/90 backdrop-blur-md text-[var(--accent)] text-[9px] font-serif uppercase tracking-[0.2em] px-2.5 py-1 font-semibold border border-[var(--border)] relative overflow-hidden">
              <span className="relative z-10">{product.badge}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </span>
          )}
        </div>

        {/* Product Meta */}
        <div className="flex items-center justify-between text-[10px] uppercase font-serif tracking-[0.2em] text-[var(--accent)] font-semibold mb-1">
          <span>{product.category}</span>
          <span>{product.weight}</span>
        </div>

        {/* Product Title - Slide upward on hover */}
        <h3 className="text-sm sm:text-base font-serif font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 transition-all duration-300 line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--muted)] font-serif line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>
      </div>

      {/* Price & Action Buttons */}
      <div className="pt-3 border-t border-[var(--border)]/60 flex items-center justify-between gap-2">
        <span className="text-sm font-serif font-bold text-[var(--foreground)]">
          {product.price}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="text-[10px] uppercase font-serif tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-1 px-2"
          >
            Details
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              useCartStore.getState().addItem(product);
            }}
            className="gold-shimmer-btn px-3 py-1.5 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] text-[10px] uppercase font-serif tracking-[0.15em] font-semibold hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all rounded-sm flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>+ Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
