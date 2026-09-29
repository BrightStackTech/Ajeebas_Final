'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const timelineItems = timelineRef.current.querySelectorAll('.story-step');

    timelineItems.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    if (galleryRef.current) {
      const galleryImages = galleryRef.current.querySelectorAll('.gallery-item');
      galleryImages.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.92, rotate: i % 2 === 0 ? -2 : 2 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const storySteps = [
    {
      step: '01',
      title: 'Origins',
      subtitle: 'BORN IN DOWNTOWN DUBAI',
      text: 'Maison AJEEBAS was established with a vision to transform traditional Arabian Medjool dates into high-confectionery luxury masterpieces, merging Middle Eastern hospitality with European bean-to-bar cocoa craftsmanship.',
      image: '/images/boutique_atelier.jpg',
    },
    {
      step: '02',
      title: 'Craftsmanship',
      subtitle: 'UNCOMPROMISING PURITY & TEMPERING',
      text: 'Every almond is slow-roasted in gold copper kettles, every Medjool date hand-inspected for nectar density, and every chocolate batch tempered by hand in small quantities in Dubai.',
      image: '/images/pistachio_kunafa.jpg',
    },
    {
      step: '03',
      title: 'Dubai Heritage',
      subtitle: 'THE SACRED ART OF HOSPITALITY',
      text: 'Offering dates and sweetmeats is a centuries-old Emirati ritual of honour and welcome. Maison AJEEBAS elevates this heritage to grace royal weddings, international summits, and diplomatic luxury hampers.',
      image: '/images/hero_neutral.jpg',
    },
    {
      step: '04',
      title: 'Luxury Gifting',
      subtitle: 'KEEPSAKE PRESENTATION',
      text: 'From hand-carved wooden presentation chests to gold foil monograms and bespoke satin ribbons, receiving a Maison AJEEBAS creation is an unforgettable sensory experience.',
      image: '/images/light_hero_box.jpg',
    },
  ];

  const galleryImages = [
    { src: '/images/assorted_dates.jpg', alt: 'Artisan Medjool Dates' },
    { src: '/images/pistachio_kunafa.jpg', alt: 'Pistachio Kunafa Bar' },
    { src: '/images/truffles_rocher.jpg', alt: 'Coconut Almond Truffles' },
    { src: '/images/crunchy_sticks.jpg', alt: 'Wafer Crunchy Sticks' },
    { src: '/images/filled_compound.jpg', alt: 'Filled Pralines' },
    { src: '/images/hero_neutral.jpg', alt: 'Maison Atelier' },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-28 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto text-center mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-3"
        >
          MAISON AJEEBAS DUBAI
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif font-extrabold text-[var(--foreground)] mb-6 max-w-4xl mx-auto leading-tight"
        >
          The Art of <span className="italic font-normal text-[var(--accent)]">Luxury Confectionery</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-[var(--muted)] font-serif max-w-2xl mx-auto leading-relaxed"
        >
          A story told through Arabian heritage, Dubai craftsmanship, and European cocoa mastery.
        </motion.p>
      </section>

      {/* 2. STORYTELLING TIMELINE (PROGRESSIVE REVEAL) */}
      <section ref={timelineRef} className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-24 lg:space-y-36 mb-32">
        {storySteps.map((sec, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className="story-step grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              {/* Image with Mask Reveal style */}
              <div className={`lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 w-full rounded-sm overflow-hidden border border-[var(--border)] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <Image
                  src={sec.image}
                  alt={sec.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Story Content */}
              <div className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif text-xs font-bold text-[var(--accent)] px-2.5 py-0.5 border border-[var(--accent)]">
                    {sec.step}
                  </span>
                  <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-[var(--muted)] font-semibold">
                    {sec.subtitle}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--foreground)] mb-6 leading-tight">
                  {sec.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted)] font-serif leading-relaxed mb-6">
                  {sec.text}
                </p>
                <div className="w-12 h-[1px] bg-[var(--accent)]" />
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. IMMERSIVE GALLERY SECTION (STAGGER & ROTATE ON SCROLL) */}
      <section ref={galleryRef} className="py-24 bg-[var(--surface)] border-y border-[var(--border)] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-2">
            VISUAL ARCHIVE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--foreground)]">
            Maison Atelier Gallery
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="gallery-item relative aspect-square rounded-sm overflow-hidden brand-card group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-6">
                <span className="text-xs font-serif text-[#F7F3EE] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KEY METRICS */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-serif">
          <div>
            <span className="block text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-1">100%</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Single-Origin Cocoa</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-1">Handpicked</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Medjool Dates</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-1">Dubai</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Artisan Atelier</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-1">Worldwide</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Concierge Delivery</span>
          </div>
        </div>
      </section>
    </div>
  );
}
