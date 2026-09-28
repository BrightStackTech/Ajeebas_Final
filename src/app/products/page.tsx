'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { PRODUCTS_DATA, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Search, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { key: 'Dates', title: 'Chocolate Dates Collection', subtitle: 'Organic Medjool dates filled with almonds & pistachios', banner: '/images/assorted_dates.jpg' },
    { key: 'Kunafa Bars', title: 'Pistachio Kunafa Bars', subtitle: 'The iconic crispy toasted kunafa & pistachio cream bar', banner: '/images/pistachio_kunafa.jpg' },
    { key: 'Truffles', title: 'Artisanal Truffles', subtitle: 'Velvety cocoa ganache rolled in toasted coconut shavings', banner: '/images/truffles_rocher.jpg' },
    { key: 'Rocher', title: 'Almond Rocher Spheres', subtitle: 'Spherical crispy wafer pralines studded with roasted almonds', banner: '/images/truffles_rocher.jpg' },
    { key: 'Crunchy Sticks', title: 'Wafer Crunchy Sticks', subtitle: 'Multi-layered crispy wafer rolls coated in milk chocolate', banner: '/images/crunchy_sticks.jpg' },
    { key: 'Filled Compound Chocolates', title: 'Filled Compound Chocolates', subtitle: 'Wild blueberry, Oreo cream, Nutella swirl & royal kulfi', banner: '/images/filled_compound.jpg' },
  ];

  const bestSellers = PRODUCTS_DATA.filter((p) => p.isBestSeller);

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-24 transition-colors duration-300">
      {/* 1. HERO BANNER */}
      <section className="relative py-16 px-6 md:px-12 bg-[var(--surface)] border-b border-[var(--border)] mb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-2">
              AJEEBAS COLLECTION
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-3">
              Discover Dubai&apos;s Finest <br />
              <span className="italic font-normal text-[var(--accent)]">Chocolate Creations</span>
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-sans max-w-xl leading-relaxed">
              Explore our full catalogue of handcrafted chocolate dates, pistachio kunafa bars, coconut almond truffles, rocher spheres, and filled pralines.
            </p>
          </div>
          <div className="lg:col-span-5 relative aspect-16/9 rounded-sm overflow-hidden border border-[var(--border)] shadow-sm">
            <Image
              src="/images/light_hero_box.jpg"
              alt="AJEEBAS Dubai Chocolate Collection"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 2. CATEGORY NAVIGATION (VISUAL CARDS) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-[var(--foreground)]">
              Browse Categories
            </h2>
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-2 pl-9 text-xs font-sans text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] rounded-sm"
              />
              <Search className="w-3.5 h-3.5 text-[var(--accent)] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <a
                key={cat.key}
                href={`#cat-${cat.key}`}
                className="brand-card p-4 text-center rounded-sm flex flex-col items-center group cursor-pointer"
              >
                <div className="relative w-full aspect-square bg-[var(--surface)] overflow-hidden rounded-sm mb-2">
                  <Image
                    src={cat.banner}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xs font-serif font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                  {cat.key}
                </h3>
              </a>
            ))}
          </div>
        </div>

        {/* 3. FEATURED COLLECTION SHOWCASE */}
        <div className="mb-16 bg-[var(--surface)] p-8 border border-[var(--border)] rounded-sm">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-[0.2em] font-serif text-[var(--accent)] font-bold block mb-1">
              Curated Showcase
            </span>
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
              Featured Best Sellers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {bestSellers.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={(p) => setSelectedProduct(p)} />
            ))}
          </div>
        </div>

        {/* 4. PRODUCT GRID BY CATEGORIES (HORIZONTAL & GRID SHOWCASES) */}
        <div className="flex flex-col gap-16">
          {categories.map((cat) => {
            const catProducts = PRODUCTS_DATA.filter(
              (p) =>
                p.category === cat.key &&
                (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (catProducts.length === 0 && searchQuery !== '') return null;

            return (
              <div key={cat.key} id={`cat-${cat.key}`} className="scroll-mt-28">
                {/* Category Header */}
                <div className="border-b border-[var(--border)] pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-serif text-[var(--accent)] font-bold block mb-1">
                      {cat.key}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-[var(--muted)] font-sans mt-0.5">{cat.subtitle}</p>
                  </div>
                  <span className="text-xs text-[var(--muted)] font-sans">{catProducts.length} Products</span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {catProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. COLLECTION STORY SECTION */}
        <div className="mt-20 p-10 md:p-14 bg-[var(--surface)] border border-[var(--border)] rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] font-serif text-[var(--accent)] font-bold block mb-2">
              Confectionery Heritage
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--foreground)] mb-4">
              The Art of Chocolate Dates
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted)] font-sans leading-relaxed mb-6">
              Hand-selected premium organic Medjool dates coated in rich Belgian chocolate and crafted using traditional Dubai confectionery techniques. Each date is individually inspected, stuffed with slow-roasted nuts, and enrobed for perfection.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2.5 bg-[var(--accent)] text-[#FAF7F2] dark:text-[#120B08] font-serif font-bold text-xs uppercase tracking-[0.15em]"
            >
              Order Custom Hampers
            </a>
          </div>
          <div className="lg:col-span-5 relative aspect-4/3 rounded-sm overflow-hidden border border-[var(--border)]">
            <Image
              src="/images/assorted_dates.jpg"
              alt="The Art of Chocolate Dates"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
