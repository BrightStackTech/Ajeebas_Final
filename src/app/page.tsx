'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { PRODUCTS_DATA, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { ArrowRight, Star } from 'lucide-react';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { title: 'Chocolate Dates', count: '10 Products', image: '/images/assorted_dates.jpg', category: 'Dates' },
    { title: 'Kunafa Bars', count: '2 Products', image: '/images/pistachio_kunafa.jpg', category: 'Kunafa Bars' },
    { title: 'Truffles', count: '2 Products', image: '/images/truffles_rocher.jpg', category: 'Truffles' },
    { title: 'Rocher', count: '1 Product', image: '/images/truffles_rocher.jpg', category: 'Rocher' },
    { title: 'Crunchy Sticks', count: '2 Products', image: '/images/crunchy_sticks.jpg', category: 'Crunchy Sticks' },
    { title: 'Filled Chocolates', count: '4 Products', image: '/images/filled_compound.jpg', category: 'Filled Compound Chocolates' },
  ];

  const bestSellers = PRODUCTS_DATA.filter((p) => p.isBestSeller);
  const dateProducts = PRODUCTS_DATA.filter((p) => p.category === 'Dates').slice(0, 4);
  const kunafaProducts = PRODUCTS_DATA.filter((p) => p.category === 'Kunafa Bars');

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* 1. HERO BANNER - COMPACT 50VH & NEUTRAL LOGO-FREE IMAGERY */}
      <section className="pt-28 pb-10 px-6 md:px-12 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[45vh]">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-[var(--accent)] font-bold mb-2">
              AJEEBAS CHOCOLATE
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-3">
              Premium Dubai <br />
              <span className="italic font-normal text-[var(--accent)]">Chocolate Collection</span>
            </h1>

            <p className="text-xs sm:text-sm text-[var(--muted)] font-serif mb-6 leading-relaxed">
              Chocolate Dates • Kunafa Bars • Truffles & Gourmet Chocolates
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-7 py-3 bg-[var(--foreground)] text-[var(--background)] font-serif text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[var(--accent)] transition-colors"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3 border border-[var(--accent)] text-[var(--foreground)] font-serif text-xs uppercase tracking-[0.2em] font-medium hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors"
              >
                Inquire Gifting
              </Link>
            </div>
          </div>

          {/* Right Hero Image - Clean Neutral Luxury Food Photo */}
          <div className="lg:col-span-6 relative aspect-16/9 lg:aspect-4/3 bg-[var(--background)] border border-[var(--border)] rounded-sm overflow-hidden shadow-sm">
            <Image
              src="/images/hero_neutral.jpg"
              alt="AJEEBAS Premium Chocolate Dates & Kunafa Bar"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-1">
              Explore Range
            </span>
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
              Featured Categories
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.15em] font-serif text-[var(--accent)] hover:underline flex items-center gap-1.5 font-medium"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/products?category=${encodeURIComponent(cat.category)}`}
              className="group brand-card p-4 flex flex-col items-center text-center cursor-pointer rounded-sm"
            >
              <div className="relative w-full aspect-square bg-[var(--surface)] overflow-hidden rounded-sm mb-3">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs font-serif font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                {cat.title}
              </h3>
              <span className="text-[10px] text-[var(--muted)] font-serif uppercase">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="py-14 px-6 md:px-12 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-1">
                Most Popular
              </span>
              <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs uppercase tracking-[0.15em] font-serif text-[var(--accent)] hover:underline flex items-center gap-1.5 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {bestSellers.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} onQuickView={(p) => setSelectedProduct(p)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 4. CHOCOLATE DATES COLLECTION */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-1">
              Handcrafted Medjool Dates
            </span>
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
              Chocolate Dates Collection
            </h2>
          </div>
          <Link
            href="/products?category=Dates"
            className="text-xs uppercase tracking-[0.15em] font-serif text-[var(--accent)] hover:underline flex items-center gap-1.5 font-medium"
          >
            <span>See All Dates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dateProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={(p) => setSelectedProduct(p)} />
          ))}
        </div>
      </section>

      {/* 5. KUNAFA COLLECTION */}
      <section className="py-14 px-6 md:px-12 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-1">
                Dubai Recipe
              </span>
              <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
                Pistachio Kunafa Collection
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kunafaProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="brand-card p-6 cursor-pointer flex flex-col sm:flex-row gap-6 items-center rounded-sm group"
              >
                <div className="relative w-full sm:w-40 aspect-square bg-[var(--background)] shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] tracking-[0.15em] text-[var(--accent)] font-serif uppercase font-bold block mb-1">
                      {product.badge || 'Signature Bar'}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[var(--muted)] font-sans leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
                    <span className="text-xs font-serif text-[var(--muted)]">{product.weight}</span>
                    <span className="text-base font-serif font-bold text-[var(--accent)]">{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT AJEEBAS */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative aspect-16/9 lg:aspect-4/3 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
            <Image
              src="/images/boutique_atelier.jpg"
              alt="AJEEBAS Chocolate Dubai Atelier"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-2">
              Our Confectionery
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--foreground)] mb-3">
              About AJEEBAS CHOCOLATE
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed mb-6">
              AJEEBAS CHOCOLATE is a luxury Dubai brand specializing in organic stuffed Medjool dates, crispy pistachio kunafa bars, coconut almond truffles, and filled compound chocolates. Each product is crafted in Dubai using roasted almonds, Bronte pistachios, and pure cocoa.
            </p>
            <div>
              <Link
                href="/about"
                className="inline-block px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] font-serif text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[var(--accent)] transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-14 px-6 md:px-12 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-1">
              Client Feedback
            </span>
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
              Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'The Pistachio Kunafa Bar is unmatched in texture and flavor. Beautiful packaging for gifting.',
                name: 'S. Al-Qasimi',
                location: 'Dubai',
              },
              {
                quote: 'AJEEBAS chocolate dates are our first choice for VIP hampers and corporate gifts.',
                name: 'T. Mansoor',
                location: 'Abu Dhabi',
              },
              {
                quote: 'World-class quality. The dark chocolate dates with roasted almond are exquisite.',
                name: 'E. Rostova',
                location: 'Zurich',
              },
            ].map((t, idx) => (
              <div key={idx} className="brand-card p-6 rounded-sm flex flex-col justify-between">
                <div className="flex gap-1 mb-3 text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent)]" />
                  ))}
                </div>
                <p className="text-xs text-[var(--foreground)]/90 italic font-serif leading-relaxed mb-4">
                  &quot;{t.quote}&quot;
                </p>
                <div>
                  <h4 className="text-xs font-serif font-bold text-[var(--accent)]">{t.name}</h4>
                  <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTACT CTA */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="p-10 bg-[var(--surface)] border border-[var(--border)] rounded-sm flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold mb-2">
            Gifting Inquiries
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[var(--foreground)] max-w-xl mb-4">
            Bespoke Hampers for Special Occasions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] font-sans max-w-lg mb-6 leading-relaxed">
            Inquire for custom wooden gift boxes, wedding favors, and international delivery.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-[var(--accent)] text-[#FAF7F2] dark:text-[#120B08] font-serif font-bold text-xs uppercase tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
          >
            Contact Concierge
          </Link>
        </div>
      </section>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
