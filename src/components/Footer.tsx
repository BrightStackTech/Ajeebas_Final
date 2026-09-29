'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[var(--surface)] border-t border-[var(--border)] text-[var(--foreground)] pt-20 pb-12 transition-colors duration-500 font-serif"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Logo & Narrative */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="inline-block">
              <div className="relative w-44 h-10">
                <Image
                  src="/images/logo_official.png"
                  alt="Maison AJEEBAS"
                  fill
                  className="object-contain object-left dark:brightness-125 transition-all"
                />
              </div>
            </Link>
            <p className="text-xs text-[var(--muted)] leading-relaxed max-w-sm">
              Maison AJEEBAS is a Dubai luxury chocolate house specializing in organic Medjool dates, pistachio kunafa bars, cocoa truffles, and bespoke VIP gifting boxes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted)]">
              <li>
                <Link href="/products?category=Dates" className="hover:text-[var(--accent)] transition-colors">
                  Chocolate Dates
                </Link>
              </li>
              <li>
                <Link href="/products?category=Kunafa Bars" className="hover:text-[var(--accent)] transition-colors">
                  Pistachio Kunafa Bars
                </Link>
              </li>
              <li>
                <Link href="/products?category=Truffles" className="hover:text-[var(--accent)] transition-colors">
                  Artisanal Truffles
                </Link>
              </li>
              <li>
                <Link href="/products?category=Crunchy Sticks" className="hover:text-[var(--accent)] transition-colors">
                  Wafer Crunchy Sticks
                </Link>
              </li>
              <li>
                <Link href="/products?category=Filled Compound Chocolates" className="hover:text-[var(--accent)] transition-colors">
                  Filled Compound
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] font-semibold mb-4">
              Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[var(--accent)] transition-colors">Full Catalogue</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent)] transition-colors">Our Heritage</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Concierge & Gifting</Link>
              </li>
            </ul>
          </div>

          {/* Boutique Contact */}
          <div className="lg:col-span-4 space-y-3 text-xs text-[var(--muted)]">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[var(--accent)] font-semibold mb-4">
              Dubai Boutique
            </h4>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
              Fashion Avenue, Downtown Dubai, UAE
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
              +971 4 800 25332
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
              WhatsApp: +971 50 000 0000
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
              concierge@ajeebaschocolate.com
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[var(--muted)] uppercase tracking-wider">
          <span>© {new Date().getFullYear()} MAISON AJEEBAS DUBAI. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">Facebook</a>
            <a href="https://wa.me/971480025332" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
