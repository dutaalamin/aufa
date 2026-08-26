import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';

export default function Navbar({ onNavigate, is3DActive, setIs3DActive, selectedProject, showPreloader }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [show3DHint, setShow3DHint] = useState(true);

  const navItems = [
    { label: 'About Us', id: 'about', hasSub: true },
    { label: 'Featured Projects', id: 'projects', hasSub: true },
    { label: 'Experiences', id: 'experiences', hasSub: true },
    { label: 'Contact', id: 'contact', hasSub: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.85);
      if (window.scrollY > 80) {
        setShow3DHint(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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
        <div className="w-full px-6 md:px-12 flex justify-between items-center relative">
          {/* Logo - Top Left */}
          <button 
            onClick={() => {
              if (is3DActive) {
                if (onNavigate) onNavigate('3d-home');
              } else {
                scrollTo('home');
              }
            }} 
            className={`text-left font-display font-light tracking-mega transition-all duration-500 focus:outline-none cursor-pointer ${
              is3DActive ? 'text-neutral-950 hover:text-neutral-700' : 'text-white hover:text-white/80'
            } ${
              isScrolled ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            A U F A
          </button>

          {/* 3D Mode Toggle Button - Centered */}
          {!selectedProject && !showPreloader && (
            <div className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
              <button
                onClick={() => {
                  setIs3DActive(!is3DActive);
                  setShow3DHint(false);
                }}
                className="relative w-12 h-12 flex items-center justify-center bg-transparent border-0 cursor-pointer group focus:outline-none pointer-events-auto"
                aria-label={is3DActive ? "Exit 3D Mode" : "Enter 3D Mode"}
              >
                {is3DActive ? (
                  /* Flat 2D square box containing the word 'EXIT' */
                  <div className="w-8 h-8 flex items-center justify-center border border-neutral-950 bg-transparent group-hover:bg-neutral-950 transition-colors duration-300">
                    <span className="font-display text-[8px] font-bold tracking-widest text-neutral-950 group-hover:text-white transition-colors duration-300 pl-[1px] select-none">
                      EXIT
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Static '3D' text centered inside the rotating cube */}
                    <span className="absolute font-display text-[10px] sm:text-[11px] font-bold tracking-wider z-10 select-none text-white">
                      3D
                    </span>

                    {/* Rotating 3D Wireframe Cube */}
                    <div className="w-8 h-8 relative [transform-style:preserve-3d] animate-[spin-3d_12s_linear_infinite] pointer-events-none">
                      {/* Cube Faces with thin borders */}
                      <div className="absolute inset-0 border border-white/20 group-hover:border-white/50 transition-colors duration-500 [transform:translateZ(16px)]" />
                      <div className="absolute inset-0 border border-white/20 group-hover:border-white/50 transition-colors duration-500 [transform:translateZ(-16px)_rotateY(180deg)]" />
                      <div className="absolute inset-0 border border-white/20 group-hover:border-white/50 transition-colors duration-500 [transform:translateX(16px)_rotateY(90deg)]" />
                      <div className="absolute inset-0 border border-white/20 group-hover:border-white/50 transition-colors duration-500 [transform:translateX(-16px)_rotateY(-90deg)]" />
                      <div className="absolute inset-0 border border-white/20 group-hover:border-white/50 transition-colors duration-500 [transform:translateY(-16px)_rotateX(90deg)]" />
                      <div className="absolute inset-0 border border-white/20 group-hover:border-white/50 transition-colors duration-500 [transform:translateY(16px)_rotateX(-90deg)]" />
                    </div>
                  </>
                )}
              </button>

              {/* Elegant floating tooltip hint on first load */}
              {show3DHint && !is3DActive && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
                  className="absolute top-full mt-4 w-52 bg-white text-black p-3.5 shadow-2xl text-center pointer-events-none border border-neutral-100/30 flex flex-col items-center gap-1"
                >
                  {/* Triangle pointing up to the 3D button */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white" />
                  
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] font-semibold text-neutral-900 block leading-tight">
                    Interactive Mode
                  </span>
                  <span className="font-sans text-[10px] text-neutral-500 font-light leading-normal block">
                    Click here to explore our project archive in a 3D environment.
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* Hamburger Menu Toggle - Top Right */}
          {!is3DActive && (
            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 transition-colors focus:outline-none flex items-center justify-center group cursor-pointer ${
                is3DActive ? 'text-neutral-950 hover:text-neutral-700' : 'text-white hover:text-slate-400'
              }`}
            >
              <div className="flex flex-col gap-1.5 w-6 items-end">
                <span className={`h-[1px] w-6 transition-colors duration-500 ${is3DActive ? 'bg-neutral-950' : 'bg-white'}`} />
                <span className={`h-[1px] w-4 group-hover:w-6 transition-all duration-300 ${is3DActive ? 'bg-neutral-950' : 'bg-white'}`} />
                <span className={`h-[1px] w-2 group-hover:w-6 transition-all duration-300 ${is3DActive ? 'bg-neutral-950' : 'bg-white'}`} />
              </div>
            </button>
          )}
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
              className="relative w-full sm:w-[420px] md:w-[40%] h-full bg-white text-slate-900 shadow-2xl flex flex-col justify-between p-8 md:p-12 z-10"
            >
              {/* Drawer Header: Close & Search */}
              <div className="flex items-center justify-end gap-6 text-black/50">
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
              <div className="flex flex-col items-start space-y-6 mt-6 md:mt-8 mb-auto pl-4 select-none">
                {navItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="font-sans text-xl sm:text-[22px] font-light text-neutral-900 hover:text-neutral-900/60 transition-all duration-300 focus:outline-none w-full text-left flex justify-between items-center group cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Drawer Footer: Socials & Policies */}
              <div className="space-y-6 pt-6">
                
                {/* Social Media Row (Official Solid SVG paths for natural bold appearance) */}
                <div className="flex items-center gap-4 text-black/60 pl-4">
                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.56v-2.87H10V9.3c0-2.42 1.44-3.76 3.65-3.76 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.57.74-1.57 1.51v1.8h2.7l-.43 2.87h-2.27V21.8c4.56-.93 8-4.96 8-9.8z"/>
                    </svg>
                  </a>
                  {/* Twitter / X */}
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* Email */}
                  <a href="mailto:aufa2601@gmail.com" className="hover:text-black transition-colors">
                    <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                  </a>
                </div>

                {/* Divider Rule */}
                <div className="h-[1px] bg-black/10 w-full" />

                {/* Policy Links (Thicker / Bold matching reference) */}
                <div className="text-[11px] font-sans tracking-wide text-black/70 font-semibold pl-4">
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
