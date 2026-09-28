'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-all flex items-center justify-center"
      aria-label="Toggle light/dark theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-4 h-4 text-[#4A2C1A] transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
