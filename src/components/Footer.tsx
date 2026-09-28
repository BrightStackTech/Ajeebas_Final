import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] text-[var(--foreground)] pt-14 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand Logo & Title */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-44 h-12">
                <Image
                  src="/images/logo_official.png"
                  alt="AJEEBAS CHOCOLATE Official Logo"
                  fill
                  className="object-contain object-left dark:filter dark:brightness-125"
                />
              </div>
            </Link>
            <p className="text-xs text-[var(--muted)] font-sans leading-relaxed">
              AJEEBAS CHOCOLATE • Premium Dubai Chocolate Collection. Handcrafted Chocolate Dates, Kunafa Bars & Gourmet Confectionery.
            </p>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-2.5 font-serif">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-bold">
              Products
            </h4>
            <ul className="flex flex-col gap-1.5 text-xs text-[var(--muted)] font-sans">
              <li><Link href="/products?category=Dates" className="hover:text-[var(--accent)]">Chocolate Dates</Link></li>
              <li><Link href="/products?category=Kunafa Bars" className="hover:text-[var(--accent)]">Kunafa Bars</Link></li>
              <li><Link href="/products?category=Truffles" className="hover:text-[var(--accent)]">Truffles & Rocher</Link></li>
              <li><Link href="/products?category=Crunchy Sticks" className="hover:text-[var(--accent)]">Wafer Crunchy Sticks</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2.5 font-serif">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-bold">
              Company
            </h4>
            <ul className="flex flex-col gap-1.5 text-xs text-[var(--muted)] font-sans">
              <li><Link href="/about" className="hover:text-[var(--accent)]">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent)]">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent)]">Gifting Concierge</Link></li>
            </ul>
          </div>

          {/* Boutique Location */}
          <div className="flex flex-col gap-2.5 font-serif">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-bold">
              Boutique
            </h4>
            <p className="text-xs text-[var(--muted)] font-sans leading-relaxed">
              Fashion Avenue, Downtown Dubai, UAE <br />
              Tel: +971 4 800 25332 <br />
              Email: concierge@ajeebaschocolate.com
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] text-center text-xs font-sans text-[var(--muted)]">
          © {new Date().getFullYear()} AJEEBAS CHOCOLATE. All Rights Reserved. Downtown Dubai, UAE.
        </div>
      </div>
    </footer>
  );
}
