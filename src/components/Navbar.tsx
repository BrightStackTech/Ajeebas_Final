'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[var(--accent)] text-[#FAF7F2] dark:text-[#120B08] py-1 text-[11px] text-center tracking-[0.2em] uppercase font-serif font-semibold z-50 relative">
        AJEEBAS CHOCOLATE • Premium Dubai Chocolate Collection
      </div>

      {/* Main Header with Smart Scroll Hide/Show */}
      <header
        className={`fixed top-7 left-0 right-0 z-40 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'py-2.5 bg-[var(--background)]/95 border-b border-[var(--border)] shadow-sm backdrop-blur-md'
            : 'py-3.5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-40 h-10 md:h-11">
              <Image
                src="/images/logo_official.png"
                alt="AJEEBAS CHOCOLATE Official Logo"
                fill
                priority
                className="object-contain object-left dark:filter dark:brightness-125"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-[0.15em] uppercase font-serif transition-colors py-1 relative ${
                    isActive ? 'text-[var(--accent)] font-bold' : 'text-[var(--foreground)]/80 hover:text-[var(--accent)]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-5 py-2 text-xs font-serif uppercase tracking-[0.15em] border border-[var(--accent)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[#FAF7F2] dark:hover:text-[#120B08] transition-all font-medium"
            >
              Order Gifting Box
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--foreground)] p-1.5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-30 bg-[var(--background)] border-b border-[var(--border)] px-6 py-8 md:hidden shadow-lg">
          <div className="flex flex-col gap-5 items-center text-center font-serif">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase ${
                  pathname === link.href ? 'text-[var(--accent)] font-bold' : 'text-[var(--foreground)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-xs uppercase tracking-[0.2em] bg-[var(--accent)] text-[#FAF7F2] dark:text-[#120B08] text-center font-semibold mt-2"
            >
              Order Gifting Box
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
