'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, ShoppingBag, Gift, PhoneCall } from 'lucide-react';
import { PRODUCTS_DATA, Product } from '@/data/products';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  products?: Product[];
  quickReplies?: string[];
}

export default function ConciergeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Welcome to Maison AJEEBAS Concierge.\n\nI can help you discover our organic Medjool chocolate dates, iconic Pistachio Kunafa bars, corporate gifting boxes, or answer product questions.',
      quickReplies: ['Pistachio Kunafa', 'Chocolate Dates', 'Best Sellers', 'Corporate Gifting'],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const processUserQuery = (query: string) => {
    const text = query.toLowerCase();
    let botResponse = '';
    let foundProducts: Product[] | undefined;
    let replies: string[] = ['Browse Catalogue', 'WhatsApp Concierge', 'View Best Sellers'];

    if (text.includes('pistachio') || text.includes('kunafa')) {
      botResponse = 'Our signature Pistachio Kunafa Bar features butter-toasted crispy phyllo threads folded in rich Bronte pistachio paste, wrapped in pure cocoa.';
      foundProducts = PRODUCTS_DATA.filter((p) => p.category === 'Kunafa Bars' || p.name.includes('Pistachio'));
    } else if (text.includes('date') || text.includes('dates')) {
      botResponse = 'Our Medjool Chocolate Dates are organic, stuffed with roasted Californian almonds or pistachios, and enrobed in 38% milk or 70% dark Belgian chocolate.';
      foundProducts = PRODUCTS_DATA.filter((p) => p.category === 'Dates').slice(0, 3);
    } else if (text.includes('best seller') || text.includes('popular') || text.includes('recommend')) {
      botResponse = 'Here are Dubai’s most coveted creations selected by our clientele:';
      foundProducts = PRODUCTS_DATA.filter((p) => p.isBestSeller).slice(0, 3);
    } else if (text.includes('gifting') || text.includes('gift') || text.includes('wedding') || text.includes('corporate')) {
      botResponse = 'Maison AJEEBAS offers bespoke hand-carved wooden presentation chests, gold foil monograms, and custom satin ribbons. For VIP hampers, reach out to our concierge.';
      replies = ['Order Gifting Box', 'Contact Concierge'];
    } else if (text.includes('location') || text.includes('where') || text.includes('store') || text.includes('dubai')) {
      botResponse = 'Our luxury confectionery atelier is located at Fashion Avenue, Downtown Dubai, UAE. Open daily from 10:00 AM to 11:00 PM GST.';
    } else if (text.includes('truffle') || text.includes('truffles') || text.includes('rocher')) {
      botResponse = 'Our Artisanal Truffles and Almond Rocher feature velvety cocoa ganache wrapped in roasted almond bits and coconut flakes.';
      foundProducts = PRODUCTS_DATA.filter((p) => p.category === 'Truffles' || p.category === 'Rocher');
    } else {
      botResponse = 'Thank you for inquiring with Maison AJEEBAS. You can explore our complete catalogue or speak directly with our atelier specialist on WhatsApp.';
      replies = ['Browse Products', 'Contact Us', 'WhatsApp Direct'];
    }

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: botResponse,
          products: foundProducts,
          quickReplies: replies,
        },
      ]);
    }, 1000);
  };

  const handleSend = (overrideText?: string) => {
    const messageText = overrideText || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setInput('');
    processUserQuery(messageText);
  };

  return (
    <>
      {/* Floating Chat Trigger Button with Idle Floating Animation (0 -> -8px -> 0 every 3s) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -8, 0],
        }}
        transition={{ 
          opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          y: {
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[990] bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 font-serif text-xs font-semibold uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all cursor-pointer"
        aria-label="AJEEBAS Concierge Chat"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">AJEEBAS Concierge</span>
      </motion.button>

      {/* Chat Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-[995] w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] bg-[var(--background)] border border-[var(--border)] rounded-sm shadow-2xl flex flex-col overflow-hidden font-serif"
          >
            {/* Header */}
            <div className="bg-[var(--surface)] px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] flex items-center justify-center font-bold text-xs">
                  MA
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)]">
                    Maison Concierge
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest text-[var(--accent)] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Dubai Atelier Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-1"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-serif no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] font-semibold'
                        : 'bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Render Recommended Products inside Chat */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-2">
                        {msg.products.map((p) => (
                          <Link
                            key={p.id}
                            href="/products"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 p-2 bg-[var(--card-bg)] rounded-sm hover:border-[var(--accent)] border border-transparent transition-all"
                          >
                            <span className="font-bold text-[var(--accent)] text-[11px] flex-1 line-clamp-1">
                              {p.name}
                            </span>
                            <span className="font-bold text-[var(--foreground)] text-[10px]">
                              {p.price}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Replies */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(reply)}
                          className="px-3 py-1 border border-[var(--border)] text-[10px] uppercase tracking-wider text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors rounded-full bg-[var(--surface)]"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-[10px] text-[var(--muted)] italic">
                  <Sparkles className="w-3 h-3 text-[var(--accent)] animate-spin" />
                  <span>AJEEBAS Concierge is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[var(--surface)] border-t border-[var(--border)] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask concierge about chocolates, gifting..."
                className="flex-1 bg-[var(--background)] border border-[var(--border)] px-3.5 py-2 text-xs font-serif text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--accent)] rounded-sm"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 bg-[var(--accent)] text-[#F7F3EE] dark:text-[#120A07] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors rounded-sm cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
