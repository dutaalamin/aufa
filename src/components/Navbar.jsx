import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home', hasSub: false },
    { label: 'About Us', id: 'about', hasSub: true },
    { label: 'Selected Projects', id: 'projects', hasSub: true },
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
            className="p-2 text-white hover:text-slate-400 transition-colors focus:outline-none flex items-center justify-center group cursor-pointer"
          >
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
                
                {/* Social Media Row (Official Solid SVG paths for natural bold appearance) */}
                <div className="flex items-center gap-4 text-slate-800 pl-4">
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-slate-500 transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-500 transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-slate-500 transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.56v-2.87H10V9.3c0-2.42 1.44-3.76 3.65-3.76 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.57.74-1.57 1.51v1.8h2.7l-.43 2.87h-2.27V21.8c4.56-.93 8-4.96 8-9.8z"/>
                    </svg>
                  </a>
                  {/* Twitter / X */}
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-slate-500 transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* Email */}
                  <a href="mailto:hello@aufastudio.com" className="hover:text-slate-500 transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                  </a>
                </div>

                {/* Divider Rule */}
                <div className="h-[1px] bg-slate-200 w-full" />

                {/* Policy Links (Thicker / Bold matching reference) */}
                <div className="text-[11px] font-sans tracking-wide text-slate-800 font-semibold pl-4">
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
