'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useCartStore } from '@/store/useCartStore';
import MegaMenu from './MegaMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/products', isMega: true },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Order Gifting Box', href: '/contact' },
  ];

  const mobileCategories = [
    { name: 'Chocolate Dates', href: '/products?category=Dates' },
    { name: 'Pistachio Kunafa Bars', href: '/products?category=Kunafa%20Bars' },
    { name: 'Truffles', href: '/products?category=Truffles' },
    { name: 'Rocher', href: '/products?category=Rocher' },
    { name: 'Crunchy Sticks', href: '/products?category=Crunchy%20Sticks' },
    { name: 'Filled Compound Chocolates', href: '/products?category=Filled%20Compound%20Chocolates' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] py-3.5 shadow-sm'
            : 'bg-[var(--background)] py-6 border-b border-transparent'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-36 md:w-44 h-9 md:h-10">
              <Image
                src="/images/logo_official.png"
                alt="MAISON AJEEBAS"
                fill
                priority
                className="object-contain object-left dark:brightness-125 transition-all"
              />
            </div>
          </Link>

          {/* Center Navigation - Staggered entrance */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href && link.name !== 'Order Gifting Box';
              const isOrderButton = link.name === 'Order Gifting Box';

              if (link.isMega) {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    className="relative py-1"
                  >
                    <Link
                      href={link.href}
                      className={`nav-link text-[11px] tracking-[0.2em] uppercase font-serif py-1 relative flex items-center gap-1 ${
                        isActive ? 'text-[var(--accent)] font-semibold active' : 'text-[var(--foreground)]/80 hover:text-[var(--accent)]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3 h-3 text-[var(--accent)]" />
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={isOrderButton ? undefined : { y: -2 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {isOrderButton ? (
                    <Link
                      href={link.href}
                      className="gold-shimmer-btn px-5 py-2 text-[11px] font-serif uppercase tracking-[0.2em] border border-[var(--accent)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[#F7F3EE] dark:hover:text-[#120A07] transition-all duration-300 font-medium block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className={`nav-link text-[11px] tracking-[0.2em] uppercase font-serif py-1 relative block ${
                        isActive ? 'text-[var(--accent)] font-semibold active' : 'text-[var(--foreground)]/80 hover:text-[var(--accent)]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Right Side Theme Toggle & Cart Icon with Bounce */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/cart"
              className="relative p-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Shopping Cart"
            >
              <motion.div
                key={totalItems}
                animate={totalItems > 0 ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <ShoppingBag className="w-4 h-4" />
              </motion.div>
              {mounted && totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={`badge-${totalItems}`}
                  className="absolute -top-1.5 -right-1.5 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] text-[10px] font-serif font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />

            <Link
              href="/cart"
              className="relative p-1.5 text-[var(--foreground)]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] text-[9px] font-serif font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--foreground)] p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[var(--accent)]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* MegaMenu Dropdown (Desktop Only) */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </header>

      {/* Mobile Luxury Overlay Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 top-[64px] z-40 bg-[var(--background)] px-8 py-8 flex flex-col justify-between border-t border-[var(--border)] lg:hidden overflow-y-auto"
        >
          <div className="flex flex-col gap-4 font-serif">
            {navLinks.map((link, idx) => {
              if (link.name === 'Collection') {
                return (
                  <div key={idx} className="border-b border-[var(--border)]/40 py-2">
                    <button
                      onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}
                      className="w-full text-left text-sm tracking-[0.25em] uppercase flex items-center justify-between text-[var(--foreground)] font-semibold"
                    >
                      <span>Collection</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileCollectionOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mobile Accordion */}
                    {mobileCollectionOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pl-4 pt-3 space-y-2.5"
                      >
                        {mobileCategories.map((c, i) => (
                          <Link
                            key={i}
                            href={c.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--accent)]"
                          >
                            └ {c.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-[0.25em] uppercase py-2 border-b border-[var(--border)]/40 ${
                    pathname === link.href ? 'text-[var(--accent)] font-semibold' : 'text-[var(--foreground)]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm tracking-[0.25em] uppercase py-2 text-[var(--accent)] font-semibold border-b border-[var(--border)]/40"
            >
              <span>View Gourmet Cart</span>
              <span className="bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] text-xs font-bold px-2 py-0.5 rounded-full">
                {mounted ? totalItems : 0}
              </span>
            </Link>
          </div>

          <div className="pt-6 border-t border-[var(--border)] text-center font-serif text-xs text-[var(--muted)] tracking-widest uppercase">
            Maison Ajeebas • Dubai Luxury Chocolate
          </div>
        </motion.div>
      )}
    </>
  );
}
