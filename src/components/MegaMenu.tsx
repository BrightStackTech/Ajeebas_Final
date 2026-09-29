'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS_DATA, Product } from '@/data/products';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  {
    name: 'Chocolate Dates',
    slug: 'Dates',
    image: '/images/assorted_dates.jpg',
  },
  {
    name: 'Pistachio Kunafa Bars',
    slug: 'Kunafa Bars',
    image: '/images/pistachio_kunafa.jpg',
  },
  {
    name: 'Truffles',
    slug: 'Truffles',
    image: '/images/truffles_rocher.jpg',
  },
  {
    name: 'Rocher',
    slug: 'Rocher',
    image: '/images/truffles_rocher.jpg',
  },
  {
    name: 'Crunchy Sticks',
    slug: 'Crunchy Sticks',
    image: '/images/crunchy_sticks.jpg',
  },
  {
    name: 'Filled Compound Chocolates',
    slug: 'Filled Compound Chocolates',
    image: '/images/filled_compound.jpg',
  },
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const activeProducts = PRODUCTS_DATA.filter((p) => p.category === activeCategory.slug);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={onClose}
          className="absolute top-full left-0 right-0 z-40 bg-[var(--card-bg)] border-t border-[rgba(212,176,106,0.2)] border-b border-[var(--border)] shadow-[0_20px_60px_rgba(0,0,0,0.08)] font-serif"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 grid grid-cols-12 gap-8">
            
            {/* Left Column: Categories */}
            <div className="col-span-3 border-r border-[var(--border)]/60 pr-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] font-semibold block mb-4">
                Categories
              </span>
              <ul className="space-y-3">
                {CATEGORIES.map((cat, catIdx) => {
                  const isActive = activeCategory.slug === cat.slug;
                  return (
                    <motion.li
                      key={cat.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: catIdx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={onClose}
                        className={`w-full text-left text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-between py-1.5 px-2 rounded-sm cursor-pointer ${
                          isActive
                            ? 'text-[var(--accent)] font-bold bg-[var(--surface)]'
                            : 'text-[var(--foreground)]/80 hover:text-[var(--accent)] hover:translate-x-1'
                        }`}
                      >
                        <span>
                          <Link href={`/products?category=${encodeURIComponent(cat.slug)}`}>
                            {cat.name}
                          </Link>
                        </span>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-[var(--accent)]" />}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Middle Column: Products list (Staggered reveal) */}
            <div className="col-span-5 px-4 border-r border-[var(--border)]/60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
                  {activeCategory.name} Selection
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  {activeProducts.length} Items
                </span>
              </div>

              <motion.ul
                key={activeCategory.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto no-scrollbar pr-2"
              >
                {activeProducts.map((p, idx) => {
                  const slugId = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.04 }}
                    >
                      <Link
                        href={`/products/${slugId}`}
                        onClick={onClose}
                        className="group flex items-center justify-between p-2 rounded-sm hover:bg-[var(--surface)] transition-all"
                      >
                        <div>
                          <span className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors block line-clamp-1">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-[var(--muted)]">{p.weight}</span>
                        </div>
                        <span className="text-xs font-bold text-[var(--accent)] shrink-0 font-sans">
                          {p.price}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

            {/* Right Column: Featured Visual */}
            <div className="col-span-4 pl-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] font-semibold block mb-3">
                  Featured Presentation
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.slug}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-16/10 w-full rounded-sm overflow-hidden border border-[var(--border)] mb-4"
                  >
                    <Image
                      src={activeCategory.image}
                      alt={activeCategory.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <Link
                  href={`/products?category=${encodeURIComponent(activeCategory.slug)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Explore {activeCategory.name} Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
