import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Instagram, Linkedin, Facebook, Twitter, Mail } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home', hasSub: false },
    { label: 'About Us', id: 'about', hasSub: true },
    { label: 'Selected Projects', id: 'projects', hasSub: true },
    { label: 'Services', id: 'services', hasSub: true },
    { label: 'Contact', id: 'contact', hasSub: false },
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

  // Prevent background scrolling when menu drawer is open
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
        isScrolled
          ? 'py-4 bg-charcoal-deep/90 backdrop-blur-md border-b border-white/5' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}>
        <div className="w-full px-6 md:px-12 flex justify-between items-center">
          {/* Logo - Top Left */}
          <button 
            onClick={() => scrollTo('home')} 
            className="text-left font-display font-light text-xl tracking-mega text-white hover:text-slate-400 transition-colors focus:outline-none cursor-pointer"
          >
            A U F A<span className="text-white/60 font-medium">.</span>
          </button>

          {/* Hamburger Menu Toggle - Top Right */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-white hover:text-slate-400 transition-colors focus:outline-none flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span className="font-display text-[9px] tracking-mega uppercase text-slate-400 group-hover:text-white transition-colors hidden sm:inline">
              Menu
            </span>
            <div className="flex flex-col gap-1.5 w-6 items-end">
              <span className="h-[1px] bg-white w-6" />
              <span className="h-[1px] bg-white w-4 group-hover:w-6 transition-all duration-300" />
              <span className="h-[1px] bg-white w-2 group-hover:w-6 transition-all duration-300" />
            </div>
          </button>
        </div>
      </header>

      {/* Slide-out Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black cursor-zoom-out"
            />

            {/* White Drawer Panel (Width: full on mobile, ~500px on desktop) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full sm:w-[460px] md:w-[500px] h-full bg-white text-slate-900 shadow-2xl flex flex-col justify-between p-8 md:p-12 z-10"
            >
              {/* Drawer Header: Close & Search */}
              <div className="flex items-center justify-end gap-6 text-slate-500">
                {/* Search Icon */}
                <button className="hover:text-black transition-colors focus:outline-none cursor-pointer">
                  <Search className="h-4 w-4" />
                </button>
                {/* Close Button Drawer */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-black transition-colors focus:outline-none cursor-pointer ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="flex flex-col items-start space-y-6 my-auto pl-4 select-none">
                {navItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="font-display text-2xl md:text-3xl font-light text-slate-700 hover:text-black transition-all duration-300 focus:outline-none w-full text-left flex justify-between items-center group cursor-pointer pr-4"
                  >
                    <span>{item.label}</span>
                    {item.hasSub && (
                      <span className="text-slate-300 group-hover:text-slate-800 transition-colors duration-300 font-extralight text-xl">
                        +
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Drawer Footer: Socials & Policies */}
              <div className="space-y-6 pt-6">
                
                {/* Social Media Row */}
                <div className="flex items-center gap-4 text-slate-700 pl-4">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <Instagram className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <Linkedin className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <Facebook className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <Twitter className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </a>
                  <a href="mailto:hello@aufastudio.com" className="hover:text-black transition-colors">
                    <Mail className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </a>
                </div>

                {/* Divider Rule */}
                <div className="h-[1px] bg-slate-100 w-full" />

                {/* Policy Links */}
                <div className="text-[9px] uppercase tracking-widest text-slate-400 font-light pl-4">
                  <a href="#privacy" className="hover:text-black transition-colors">Privacy & Cookies Policy</a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
