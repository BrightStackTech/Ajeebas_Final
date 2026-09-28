'use client';

import Image from 'next/image';
import { Product } from '@/data/products';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <div
      onClick={() => onQuickView(product)}
      className="brand-card group cursor-pointer flex flex-col h-full rounded-sm overflow-hidden"
    >
      {/* Product Photography */}
      <div className="relative w-full aspect-square bg-[var(--surface)] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <div className="absolute top-3 left-3 bg-[var(--accent)] text-[#FAF7F2] dark:text-[#120B08] px-2.5 py-0.5 text-[9px] uppercase tracking-[0.15em] font-serif font-bold">
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] tracking-[0.15em] text-[var(--accent)] uppercase font-serif block mb-1 font-bold">
            {product.category}
          </span>
          <h3 className="text-sm font-serif font-bold tracking-wide text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>
          <p className="text-xs text-[var(--muted)] font-sans line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--muted)] font-sans uppercase">{product.chocolateType}</span>
            <span className="text-sm font-serif font-bold text-[var(--accent)]">{product.price}</span>
          </div>

          <span className="text-xs font-serif uppercase tracking-wider text-[var(--foreground)] group-hover:text-[var(--accent)] flex items-center gap-1 font-semibold">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
