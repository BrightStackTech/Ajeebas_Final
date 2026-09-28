'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 50,
        colors: ['#B88A2E', '#D4AF37', '#2A1A12'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.35em] font-serif text-[var(--accent)] font-bold block mb-2">
            AJEEBAS CONCIERGE
          </span>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[var(--foreground)] mb-3">
            Contact Us & <span className="italic font-normal text-[var(--accent)]">Gifting Inquiries</span>
          </h1>

          <p className="text-xs md:text-sm text-[var(--muted)] font-sans leading-relaxed">
            Contact our Dubai concierge team for custom chocolate date hampers, corporate gifts, wedding favors, or boutique inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[var(--surface)] p-8 md:p-10 border border-[var(--border)] rounded-sm">
            <h2 className="text-xl font-serif font-bold text-[var(--foreground)] mb-6">
              Send a Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-[var(--background)] border border-[var(--accent)] rounded-sm flex flex-col items-center gap-3">
                <Check className="w-8 h-8 text-[var(--accent)]" />
                <h3 className="text-lg font-serif font-bold text-[var(--accent)]">Inquiry Transmitted</h3>
                <p className="text-xs text-[var(--muted)] font-sans leading-relaxed max-w-md">
                  Thank you for reaching out to AJEEBAS CHOCOLATE. Our Dubai concierge team will reply within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2 border border-[var(--accent)] text-[var(--accent)] text-xs font-serif uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[#FAF7F2] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name *"
                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-xs font-sans text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] rounded-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address *"
                      className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-xs font-sans text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] rounded-sm"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone / WhatsApp"
                      className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-xs font-sans text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your gifting requirement, order quantity, or boutique inquiry..."
                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-xs font-sans text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--accent)] text-[#FAF7F2] dark:text-[#120B08] font-serif font-bold text-xs uppercase tracking-[0.2em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Location Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[var(--surface)] p-8 border border-[var(--border)] rounded-sm flex flex-col gap-5 font-serif">
              <h3 className="text-lg font-bold text-[var(--foreground)]">Boutique & Concierge</h3>

              <div className="flex flex-col gap-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[var(--accent)] font-bold font-serif">Dubai Atelier</p>
                    <p className="text-[var(--muted)]">Fashion Avenue, Downtown Dubai, UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[var(--accent)] font-bold font-serif">Telephone / WhatsApp</p>
                    <p className="text-[var(--muted)]">+971 4 800 25332</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[var(--accent)] font-bold font-serif">Email</p>
                    <p className="text-[var(--muted)]">concierge@ajeebaschocolate.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-16/9 bg-[var(--surface)] border border-[var(--border)] rounded-sm flex flex-col items-center justify-center text-center p-6">
              <MapPin className="w-6 h-6 text-[var(--accent)] mb-2" />
              <span className="font-serif text-sm font-bold text-[var(--foreground)]">Downtown Dubai Atelier</span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[var(--muted)] mt-0.5">Open Daily • 10:00 AM – 10:00 PM GST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
