'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Check, Clock, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    giftingType: 'Personal Gifting Box',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#C8A25A', '#D4B06A', '#2C1810'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-28 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] uppercase tracking-[0.3em] font-serif text-[var(--accent)] font-semibold block mb-3">
            MAISON CONCIERGE
          </span>

          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[var(--foreground)] mb-4 leading-tight">
            Contact & <span className="italic font-normal text-[var(--accent)]">Bespoke Inquiries</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted)] font-serif leading-relaxed">
            Reach out to our Dubai Concierge team for custom chocolate dates hampers, VIP event favors, or international boutique distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 brand-card p-8 md:p-12 rounded-sm"
          >
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-2">
              Send a Concierge Request
            </h2>
            <p className="text-xs text-[var(--muted)] font-serif mb-8">
              Fill out the form below and our atelier manager will get in touch within 2 hours GST.
            </p>

            {submitted ? (
              <div className="p-10 text-center bg-[var(--surface)] border border-[var(--accent)] rounded-sm flex flex-col items-center gap-4">
                <div className="p-3 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] rounded-full">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--foreground)]">Inquiry Received</h3>
                <p className="text-xs text-[var(--muted)] font-serif leading-relaxed max-w-md">
                  Thank you for reaching out to Maison AJEEBAS. A concierge specialist has been assigned to your request.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-8 py-3 border border-[var(--accent)] text-[var(--accent)] text-xs font-serif uppercase tracking-[0.2em] hover:bg-[var(--accent)] hover:text-[#F7F3EE] dark:hover:text-[#120A07] transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-serif">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] block mb-2 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sheikh Mohammed Al-Maktoum"
                    className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3.5 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--accent)] rounded-sm transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] block mb-2 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3.5 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--accent)] rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] block mb-2 font-semibold">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3.5 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--accent)] rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] block mb-2 font-semibold">
                    Gifting Category
                  </label>
                  <select
                    value={formData.giftingType}
                    onChange={(e) => setFormData({ ...formData, giftingType: e.target.value })}
                    className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3.5 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] rounded-sm transition-colors"
                  >
                    <option value="Personal Gifting Box">Personal Gifting Box</option>
                    <option value="Corporate Gifting & Hampers">Corporate Gifting & Hampers</option>
                    <option value="Wedding Favors & Special Events">Wedding Favors & Special Events</option>
                    <option value="Boutique Wholesale Inquiry">Boutique Wholesale Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] block mb-2 font-semibold">
                    Message / Special Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about desired box quantities, delivery locations, custom ribbon choices..."
                    className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3.5 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--accent)] rounded-sm transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] font-serif font-bold text-xs uppercase tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 shadow-sm"
                >
                  Submit Concierge Inquiry
                </button>
              </form>
            )}
          </motion.div>

          {/* Boutique Details & Direct CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/971480025332"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all rounded-sm flex items-center gap-5 group"
            >
              <div className="p-3.5 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] rounded-full shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[var(--accent)] font-semibold block">
                  INSTANT ASSISTANCE
                </span>
                <h4 className="text-base font-serif font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  WhatsApp Concierge Line
                </h4>
                <p className="text-xs text-[var(--muted)] font-serif mt-0.5">Click to chat directly with our Dubai atelier</p>
              </div>
            </a>

            {/* Atelier Info */}
            <div className="brand-card p-8 rounded-sm space-y-6 font-serif">
              <h3 className="text-xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-4">
                Dubai Boutique Atelier
              </h3>

              <div className="space-y-5 text-xs font-serif">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground)] font-bold block">Fashion Avenue, Downtown Dubai</span>
                    <span className="text-[var(--muted)]">Adjacent to Luxury Boulevard, Dubai, UAE</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground)] font-bold block">Telephone</span>
                    <span className="text-[var(--muted)]">+971 4 800 25332 (800-AJEEBAS)</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground)] font-bold block">Direct Email</span>
                    <span className="text-[var(--muted)]">concierge@ajeebaschocolate.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground)] font-bold block">Business Hours</span>
                    <span className="text-[var(--muted)]">Monday – Sunday: 10:00 AM – 11:00 PM GST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map Placeholder */}
            <div className="aspect-16/9 bg-[var(--surface)] border border-[var(--border)] rounded-sm flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
              <MapPin className="w-8 h-8 text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform duration-500" />
              <span className="font-serif text-base font-bold text-[var(--foreground)]">Downtown Dubai Location</span>
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[var(--muted)] mt-1">Latitude: 25.1972° N, Longitude: 55.2744° E</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
