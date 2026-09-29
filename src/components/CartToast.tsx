'use client';

import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';

export default function CartToast() {
  const { toastMessage, setToastMessage } = useCartStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-[999] bg-[var(--surface)] text-[var(--foreground)] border border-[var(--accent)] px-5 py-3.5 rounded-sm shadow-xl flex items-center gap-3 backdrop-blur-md font-serif"
        >
          <div className="p-1.5 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] rounded-full">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold block">
              COLLECTION UPDATED
            </span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
