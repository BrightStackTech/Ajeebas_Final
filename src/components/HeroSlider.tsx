'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: number;
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  categoryLink: string;
}

const BANNERS: BannerSlide[] = [
  {
    id: 1,
    subtitle: 'MAISON AJEEBAS',
    titleLine1: 'Chocolate Dates',
    titleLine2: 'Royal Collection',
    description: 'Organic Medjool dates stuffed with Californian almonds & Bronte pistachios, enrobed in single-origin cocoa.',
    image: '/images/assorted_dates.jpg',
    categoryLink: '/products?category=Dates',
  },
  {
    id: 2,
    subtitle: 'DUBAI ICONIC CREATION',
    titleLine1: 'Pistachio Kunafa',
    titleLine2: 'Artisanal Bars',
    description: 'Crispy butter-toasted kunafa filaments folded in Bronte pistachio cream and velvet Belgian milk chocolate.',
    image: '/images/pistachio_kunafa.jpg',
    categoryLink: '/products?category=Kunafa%20Bars',
  },
  {
    id: 3,
    subtitle: 'EMIRATES VIP GIFTING',
    titleLine1: 'Luxury Keepsake',
    titleLine2: 'Gifting Chests',
    description: 'Hand-carved wooden presentation boxes, gold monograms, and custom satin ribbons for royalty & VIPs.',
    image: '/images/light_hero_box.jpg',
    categoryLink: '/contact',
  },
  {
    id: 4,
    subtitle: 'DUBAI CONFECTIONERY',
    titleLine1: 'Dubai Chocolate',
    titleLine2: 'Master Creations',
    description: 'Velvety ganache truffles, almond rocher spheres, and gourmet filled pralines born in Downtown Dubai.',
    image: '/images/hero_neutral.jpg',
    categoryLink: '/products',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const slide = BANNERS[currentSlide];

  return (
    <section
      ref={containerRef}
      onMouseMove={(e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        const imgEl = document.getElementById(`hero-banner-img-${slide.id}`);
        if (imgEl) {
          imgEl.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        const imgEl = document.getElementById(`hero-banner-img-${slide.id}`);
        if (imgEl) {
          imgEl.style.transform = `translate3d(0px, 0px, 0)`;
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative w-full h-[80vh] lg:h-screen overflow-hidden group font-serif select-none"
    >
      {/* 1. Preload & Stacked Full-Width Banner Image Slides (True Crossfade with No Black Gap) */}
      {BANNERS.map((b, idx) => {
        const isActive = currentSlide === idx;
        return (
          <motion.div
            key={b.id}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 1.05,
              zIndex: isActive ? 10 : 0,
            }}
            transition={{
              opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <div
              id={`hero-banner-img-${b.id}`}
              className="relative w-full h-full transition-transform duration-300 ease-out"
            >
              <Image
                src={b.image}
                alt={b.titleLine1}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center w-full h-full"
              />
            </div>
            {/* Integrated Luxury Dark Gradient Overlay inside slide layer to prevent black background bleed */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.15) 100%)',
              }}
            />
          </motion.div>
        );
      })}

      {/* 2. Text Overlay Positioned ON TOP of Banners */}
      <div className="absolute inset-0 z-20 flex items-center px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pointer-events-none">
        <div className="w-full max-w-[650px] text-left text-[#F7F3EE] pointer-events-auto">
          <AnimatePresence mode="wait">
            <div key={slide.id} className="space-y-4">
              {/* Subtitle */}
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11px] font-serif uppercase tracking-[0.35em] text-[#D4B06A] font-semibold block"
              >
                {slide.subtitle}
              </motion.span>

              {/* Main Heading Reveal */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold leading-[1.08] text-[#F7F3EE]"
                >
                  {slide.titleLine1} <br />
                  <span className="italic font-normal text-[#D4B06A]">{slide.titleLine2}</span>
                </motion.h1>
              </div>

              {/* Description Reveal */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs sm:text-sm text-[#E4D8C8]/90 font-serif leading-relaxed max-w-lg pt-1"
              >
                {slide.description}
              </motion.p>

              {/* Buttons Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <Link
                  href={slide.categoryLink}
                  className="gold-shimmer-btn px-8 py-3.5 bg-[#C8A25A] text-[#120A07] font-serif text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#F7F3EE] hover:text-[#120A07] transition-all duration-300 text-center shadow-lg block"
                >
                  Explore Collection
                </Link>

                <Link
                  href="/contact"
                  className="px-8 py-3.5 border border-[#E4D8C8]/50 text-[#F7F3EE] font-serif text-xs uppercase tracking-[0.2em] font-medium hover:border-[#C8A25A] hover:text-[#C8A25A] backdrop-blur-xs transition-all duration-300 text-center block"
                >
                  Order Gifting Box
                </Link>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Luxury Previous / Next Hover Arrows */}
      <div
        className={`absolute inset-y-0 left-4 right-4 z-30 flex items-center justify-between pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={handlePrev}
          className="p-3.5 rounded-full bg-black/40 text-[#F7F3EE] border border-white/20 hover:border-[#C8A25A] hover:text-[#C8A25A] hover:bg-black/70 backdrop-blur-md transition-all cursor-pointer pointer-events-auto shadow-xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="p-3.5 rounded-full bg-black/40 text-[#F7F3EE] border border-white/20 hover:border-[#C8A25A] hover:text-[#C8A25A] hover:bg-black/70 backdrop-blur-md transition-all cursor-pointer pointer-events-auto shadow-xl"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 5. Slider Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-3">
        {BANNERS.map((b, idx) => (
          <button
            key={b.id}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              currentSlide === idx
                ? 'w-8 h-2 bg-[#C8A25A]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
