import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Navbar Header */}
      <header className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ${
        isScrolled || isOpen
          ? 'py-4 bg-charcoal-deep/90 backdrop-blur-md border-b border-white/5' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo - Top Left */}
          <button 
            onClick={() => scrollTo('home')} 
            className="text-left font-display font-light text-xl tracking-mega text-white hover:text-gold transition-colors focus:outline-none cursor-pointer"
          >
            A U F A<span className="text-gold font-medium">.</span>
          </button>

          {/* Hamburger Menu Toggle - Top Right */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 p-2 text-white hover:text-gold transition-colors focus:outline-none flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span className="font-display text-[9px] tracking-mega uppercase text-slate-400 group-hover:text-white transition-colors hidden sm:inline">
              {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className="flex flex-col gap-1.5 w-6 items-end">
              <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px] w-6 bg-gold' : 'w-6'}`} />
              <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : 'w-4 group-hover:w-6'}`} />
              <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px] w-6 bg-gold' : 'w-2 group-hover:w-6'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-charcoal-deep/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center"
          >
            {/* Architectural Grid Lines Overlay in Drawer */}
            <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
            <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-30" />

            <div className="relative z-10 flex flex-col items-center space-y-6">
              {navItems.map((item, idx) => (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-display text-3xl sm:text-5xl font-extralight uppercase tracking-mega text-slate-400 hover:text-gold transition-all duration-300 focus:outline-none flex items-center gap-3 group cursor-pointer"
                >
                  <span className="relative flex items-center pl-0 group-hover:pl-6 transition-all duration-500">
                    <Plus className="absolute left-0 h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100" />
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom info in Drawer */}
            <div className="absolute bottom-12 left-12 right-12 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 z-10 font-sans text-[10px] uppercase tracking-widest text-slate-500">
              <span>© {new Date().getFullYear()} AUFA STUDIO</span>
              <a href="mailto:hello@aufastudio.com" className="hover:text-gold transition-colors">hello@aufastudio.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
