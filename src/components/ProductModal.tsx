'use client';

import Image from 'next/image';
import { Product } from '@/data/products';
import { X, Check, Package, ShieldCheck } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-4xl bg-[var(--card-bg)] border border-[var(--border)] rounded-sm overflow-hidden z-10 my-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-[var(--surface)] text-[var(--foreground)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[#FAF7F2] dark:hover:text-[#120B08] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Large Product Photography */}
          <div className="relative aspect-square md:aspect-auto w-full bg-[var(--surface)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Product Details Content */}
          <div className="p-8 md:p-10 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-serif block mb-2 font-bold">
                {product.category} • {product.chocolateType}
              </span>

              <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-3">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-serif font-bold text-[var(--accent)]">
                  {product.price}
                </span>
                <span className="text-xs px-3 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] font-serif font-medium">
                  {product.weight}
                </span>
              </div>

              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Handcrafted Composition */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-[0.15em] font-serif text-[var(--accent)] mb-3 font-bold">
                  Handcrafted Ingredients
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[var(--foreground)] font-sans">
                      <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Packaging Information */}
              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-sm flex items-start gap-3 mb-6">
                <Package className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <div className="text-xs text-[var(--foreground)] font-sans">
                  <p className="font-bold text-[var(--accent)] mb-0.5">Signature Dubai Packaging</p>
                  <p className="text-[var(--muted)] leading-relaxed">Encased in an insulated luxury box with gold foil embossing, engineered for temperature-controlled global delivery.</p>
                </div>
              </div>
            </div>

            <a
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              className="w-full py-3.5 bg-[var(--accent)] text-[#FAF7F2] dark:text-[#120B08] font-serif font-bold text-xs uppercase tracking-[0.2em] text-center hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
            >
              Inquire For Gifting Box
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
