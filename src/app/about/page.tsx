'use client';

import Image from 'next/image';

export default function AboutPage() {
  const timelineEvents = [
    {
      year: '2015',
      title: 'Foundation in Dubai',
      desc: 'Established in Downtown Dubai with a vision to merge heritage Medjool dates with European chocolate tempering mastery.',
    },
    {
      year: '2018',
      title: 'Atelier Opening',
      desc: 'Launched our flagship confectionery atelier catering to royal events, VIP delegations, and boutique luxury hampers.',
    },
    {
      year: '2021',
      title: 'Global Partnerships',
      desc: 'Expanded luxury supply to international boutique retailers, luxury hotel suites, and duty-free lounges.',
    },
    {
      year: '2024',
      title: 'Pistachio Kunafa Mastery',
      desc: 'Introduced the iconic Dubai Pistachio Kunafa bar, combining butter-toasted crispy phyllo with Bronte pistachio cream.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.35em] font-serif text-[var(--accent)] font-bold block mb-2">
            AJEEBAS CHOCOLATE
          </span>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[var(--foreground)] mb-4">
            A Legacy of <span className="italic font-normal text-[var(--accent)]">Dubai Confectionery</span>
          </h1>

          <p className="text-xs md:text-sm text-[var(--muted)] font-sans leading-relaxed">
            AJEEBAS CHOCOLATE was established in Dubai to honor Arabian hospitality. We transform hand-picked dates and premium cocoa into memorable gourmet creations.
          </p>
        </div>

        {/* Timeline */}
        <section className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-[var(--accent)] font-bold block mb-1">
              Our Journey
            </span>
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">
              Chronicles of <span className="italic font-normal text-[var(--accent)] font-normal">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="brand-card p-6 rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-serif font-bold text-[var(--accent)] block mb-2">{evt.year}</span>
                  <h3 className="text-base font-serif font-bold text-[var(--foreground)] mb-2">{evt.title}</h3>
                  <p className="text-xs text-[var(--muted)] font-sans leading-relaxed">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
            <span className="text-xs uppercase tracking-[0.2em] font-serif text-[var(--accent)] font-bold block mb-2">
              Our Philosophy
            </span>
            <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-3">
              Handcrafted Culinary Integrity
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed">
              We never compromise on raw ingredients. Every almond is slow-roasted, every date inspected for texture, and every chocolate batch tempered by hand in Dubai.
            </p>
          </div>

          <div className="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
            <span className="text-xs uppercase tracking-[0.2em] font-serif text-[var(--accent)] font-bold block mb-2">
              Our Vision
            </span>
            <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-3">
              Global Confectionery Ambassador
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed">
              To present Middle Eastern luxury chocolate craftsmanship across premier boutiques, international airports, and luxury private residences worldwide.
            </p>
          </div>
        </section>

        {/* Brand Statistics */}
        <section className="py-12 px-6 bg-[var(--surface)] border border-[var(--border)] rounded-sm mb-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '100%', label: 'Single-Origin Cocoa' },
              { num: '50K+', label: 'VIP Gifting Hampers' },
              { num: '18+', label: 'Signature Products' },
              { num: '10+', label: 'Years of Excellence' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl font-serif font-bold text-[var(--accent)] mb-1">{stat.num}</span>
                <span className="text-xs font-serif uppercase tracking-widest text-[var(--muted)] font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
