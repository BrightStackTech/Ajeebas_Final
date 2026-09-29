'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS_DATA, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Search, Sparkles } from 'lucide-react';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterPills = [
    'All',
    'Dates',
    'Kunafa Bars',
    'Truffles',
    'Rocher',
    'Crunchy Sticks',
    'Filled Compound Chocolates',
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesFilter = selectedFilter === 'All' || product.category === selectedFilter;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.filling && product.filling.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-24 transition-colors duration-500">
      
      {/* 1. HERO - LARGE EDITORIAL BANNER */}
      <section className="relative py-20 lg:py-28 px-6 md:px-12 bg-[var(--surface)] border-b border-[var(--border)] mb-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-3">
              MAISON CATALOGUE
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-extrabold leading-tight mb-4">
              Our Collection
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] font-serif max-w-xl leading-relaxed">
              Explore our complete suite of handcrafted chocolate Medjool dates, crispy pistachio kunafa bars, coconut almond truffles, and filled compound pralines.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative aspect-16/10 rounded-sm overflow-hidden border border-[var(--border)] shadow-sm"
          >
            <Image
              src="/images/light_hero_box.jpg"
              alt="Maison AJEEBAS Collection"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* 2. FILTERS (LUXURY PILLS) & MINIMAL SEARCH */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 border-b border-[var(--border)] pb-8">
          {/* Pill Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {filterPills.map((pill) => {
              const active = selectedFilter === pill;
              return (
                <button
                  key={pill}
                  onClick={() => setSelectedFilter(pill)}
                  className={`px-5 py-2 text-[11px] font-serif uppercase tracking-[0.18em] rounded-full whitespace-nowrap transition-all duration-300 ${
                    active
                      ? 'bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] font-semibold shadow-sm'
                      : 'border border-[var(--border)] text-[var(--foreground)]/80 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Premium Search Bar */}
          <div className="relative w-full lg:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search by ingredient or flavor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-2.5 pl-10 text-xs font-serif text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] rounded-sm transition-colors"
            />
            <Search className="w-4 h-4 text-[var(--accent)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 3. PRODUCT CATALOG - MASONRY CATALOGUE LAYOUT WITH STAGGERED ENTRANCE */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[var(--accent)] mb-3" />
            <h3 className="text-lg font-serif font-bold text-[var(--foreground)] mb-1">No Creations Found</h3>
            <p className="text-xs text-[var(--muted)] font-serif">Try selecting a different category pill or clear your search term.</p>
          </div>
        ) : (
          <motion.div
            key={selectedFilter + searchQuery}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => {
                const isWide = index % 5 === 0 && filteredProducts.length > 2;
                const colSpanClass = isWide
                  ? 'lg:col-span-8'
                  : index % 3 === 0
                  ? 'lg:col-span-6'
                  : 'lg:col-span-4';

                const cardVariants = {
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
                  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
                };

                if (isWide) {
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      variants={cardVariants}
                      onClick={() => setSelectedProduct(product)}
                      className={`${colSpanClass} brand-card p-6 lg:p-8 cursor-pointer rounded-sm group flex flex-col md:flex-row gap-8 items-center h-full`}
                    >
                      <div className="relative w-full md:w-1/2 aspect-square bg-[var(--surface)] overflow-hidden rounded-sm shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] text-[9px] font-serif uppercase tracking-[0.2em] px-2.5 py-1 font-semibold">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[var(--accent)] font-semibold block mb-2">
                            {product.category} • {product.weight}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-3">
                            {product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-[var(--muted)] font-serif leading-relaxed mb-6">
                            {product.description}
                          </p>
                          {product.ingredients && (
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {product.ingredients.map((ing, idx) => (
                                <span key={idx} className="text-[10px] font-serif uppercase px-2 py-0.5 border border-[var(--border)] text-[var(--muted)]">
                                  {ing}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                          <span className="text-base font-serif font-bold text-[var(--foreground)]">
                            {product.price}
                          </span>
                          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[var(--accent)] font-semibold group-hover:underline">
                            View Creation &rarr;
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={product.id} layout variants={cardVariants} className={`${colSpanClass} h-full`}>
                    <ProductCard product={product} onQuickView={(p) => setSelectedProduct(p)} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
