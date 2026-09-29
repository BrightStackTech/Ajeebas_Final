'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCTS_DATA, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import HeroSlider from '@/components/HeroSlider';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heritageRef = useRef<HTMLDivElement>(null);

  // Scroll parallax for Heritage Section
  const { scrollYProgress: heritageScroll } = useScroll({
    target: heritageRef,
    offset: ['start end', 'end start'],
  });

  const imageParallaxY = useTransform(heritageScroll, [0, 1], ['-8%', '8%']);
  const contentParallaxY = useTransform(heritageScroll, [0, 1], ['0%', '0%']);

  const bestSellers = PRODUCTS_DATA.filter((p) => p.isBestSeller || p.isFeatured);

  const categories = [
    {
      title: 'Chocolate Dates',
      subtitle: 'Organic Medjool dates filled with whole roasted almonds & Bronte pistachios',
      count: '10 Signature Varieties',
      image: '/images/assorted_dates.jpg',
      category: 'Dates',
    },
    {
      title: 'Pistachio Kunafa Bars',
      subtitle: 'Dubai’s iconic creation featuring toasted crispy kunafa and creamy pistachio butter',
      count: '2 Artisan Bars',
      image: '/images/pistachio_kunafa.jpg',
      category: 'Kunafa Bars',
    },
    {
      title: 'Truffles',
      subtitle: 'Velvety cocoa ganache center enveloped in roasted almond and toasted coconut shavings',
      count: '2 Gourmet Truffles',
      image: '/images/truffles_rocher.jpg',
      category: 'Truffles',
    },
    {
      title: 'Rocher',
      subtitle: 'Crunchy spherical wafer pralines encasing whole caramelized almonds',
      count: 'Classic Rocher Spheres',
      image: '/images/truffles_rocher.jpg',
      category: 'Rocher',
    },
    {
      title: 'Crunchy Sticks',
      subtitle: 'Multi-layered crispy wafer rolls dipped in Belgian milk chocolate and roasted nuts',
      count: '2 Crispy Varieties',
      image: '/images/crunchy_sticks.jpg',
      category: 'Crunchy Sticks',
    },
    {
      title: 'Filled Compound Chocolates',
      subtitle: 'Decadent pralines bursting with wild blueberry, Oreo cream, Nutella swirl & royal kulfi',
      count: '4 Gourmet Fillings',
      image: '/images/filled_compound.jpg',
      category: 'Filled Compound Chocolates',
    },
  ];

  const testimonials = [
    {
      quote: "The Pistachio Kunafa Bar is a revelation in texture and cocoa richness. Magnificent presentation for royal gifting.",
      author: "H.H. Sheikha Fatima Al Qasimi",
      role: "Dubai Patron",
    },
    {
      quote: "AJEEBAS chocolate dates have set the golden standard across our luxury hotel suites in the Emirates.",
      author: "Marcus Vance",
      role: "Hospitality Executive",
    },
    {
      quote: "Handcrafted perfection. The dark chocolate Medjool dates with slow-roasted almonds are unmatched globally.",
      author: "Elena Rostova",
      role: "Zurich Chocolatier Connoisseur",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO SECTION - LUXURY FULL-WIDTH BANNER CAROUSEL */}
      <HeroSlider />

      {/* 2. HERITAGE SECTION WITH PARALLAX & MASK REVEAL */}
      <section ref={heritageRef} className="py-20 lg:py-28 px-6 md:px-12 bg-[var(--surface)] border-y border-[var(--border)] overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Parallax Image Left */}
          <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 w-full rounded-sm overflow-hidden border border-[var(--border)]">
            <motion.div style={{ y: imageParallaxY }} className="relative w-full h-[120%] -top-[10%]">
              <Image
                src="/images/boutique_atelier.jpg"
                alt="Dubai Confectionery Atelier Craftsmanship"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Story Content Right */}
          <motion.div
            style={{ y: contentParallaxY }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-3">
              DUBAI HERITAGE & CRAFTSMANSHIP
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--foreground)] mb-6 leading-tight">
              An Elevated Confectionery <br />
              <span className="italic font-normal text-[var(--accent)]">Born in the Emirates</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[var(--muted)] font-serif leading-relaxed">
              <p>
                In the heart of Dubai, Maison AJEEBAS reimagines Arabian hospitality through the art of fine chocolate tempering and hand-selected raw ingredients.
              </p>
              <p>
                From organic Medjool dates stuffed with Californian almonds to crispy butter-toasted kunafa filaments folded in Bronte pistachio cream, our creations celebrate the rich heritage of Dubai gifting culture.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] grid grid-cols-3 gap-6">
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[var(--accent)]">100%</span>
                <span className="text-[10px] uppercase tracking-widest font-serif text-[var(--muted)]">Single Origin</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[var(--accent)]">Handcrafted</span>
                <span className="text-[10px] uppercase tracking-widest font-serif text-[var(--muted)]">In Dubai</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[var(--accent)]">Pure</span>
                <span className="text-[10px] uppercase tracking-widest font-serif text-[var(--muted)]">Cocoa Butter</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BEST SELLERS - HORIZONTAL CAROUSEL WITH MOMENTUM DRAG */}
      <section className="py-20 lg:py-28 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-2">
              CURATED SELECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--foreground)]">
              Best Sellers
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollSlider('left')}
              className="p-3 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all rounded-full cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="p-3 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all rounded-full cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Drag & Scroll Container with momentum */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-8 pt-2 snap-x snap-mandatory"
        >
          {bestSellers.map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={product} onQuickView={(p) => setSelectedProduct(p)} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES - FULL WIDTH CATEGORY BLOCKS WITH ALTERNATING HORIZONTAL SLIDE ANIMATION */}
      <section className="py-20 lg:py-28 px-6 md:px-12 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-2">
              MAISON COLLECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--foreground)]">
              Product Categories
            </h2>
          </motion.div>

          <div className="space-y-12">
            {categories.map((cat, idx) => {
              const isEven = idx % 2 === 0;
              const slideX = isEven ? -80 : 80;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: slideX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center brand-card p-6 lg:p-10 rounded-sm group overflow-hidden ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`lg:col-span-7 relative aspect-16/9 lg:aspect-21/9 w-full overflow-hidden rounded-sm ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                  </div>

                  <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[var(--accent)] font-semibold mb-2">
                      {cat.count}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted)] font-serif leading-relaxed mb-6">
                      {cat.subtitle}
                    </p>
                    <div>
                      <Link
                        href={`/products?category=${encodeURIComponent(cat.category)}`}
                        className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                      >
                        <span>Explore Category</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. GIFTING EXPERIENCE SECTION */}
      <section className="py-20 lg:py-28 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-3">
              THE ART OF GIFTING
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--foreground)] mb-6 leading-tight">
              Dubai Luxury Gifting <br />
              <span className="italic font-normal text-[var(--accent)]">Custom Keepsake Packaging</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-serif leading-relaxed mb-8">
              Whether celebrating weddings, corporate milestones, or intimate gatherings, Maison AJEEBAS offers bespoke wooden gift boxes, satin ribbons, and custom monogramming crafted in Dubai.
            </p>
            <div>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] font-serif text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 inline-block"
              >
                Inquire Corporate Gifting
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 relative aspect-4/3 w-full rounded-sm overflow-hidden border border-[var(--border)]"
          >
            <Image
              src="/images/light_hero_box.jpg"
              alt="Dubai Luxury Gifting Packaging"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER */}
      <section className="py-20 lg:py-28 px-6 md:px-12 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-4">
            CONNOISSEUR APPRAISALS
          </span>

          <div className="min-h-[160px] flex flex-col justify-center items-center">
            <p className="text-lg sm:text-2xl font-serif italic text-[var(--foreground)] leading-relaxed mb-6">
              &quot;{testimonials[currentTestimonial].quote}&quot;
            </p>
            <h4 className="text-xs font-serif uppercase tracking-[0.2em] font-bold text-[var(--accent)]">
              {testimonials[currentTestimonial].author}
            </h4>
            <span className="text-[10px] font-serif uppercase tracking-widest text-[var(--muted)] mt-0.5">
              {testimonials[currentTestimonial].role}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentTestimonial === idx ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-[var(--border)]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
