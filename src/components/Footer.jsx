import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-deep border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo/Studio Branding */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <span className="font-display font-light text-sm tracking-mega text-white">
            A U F A<span className="text-gold font-medium">.</span>
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-slate-500 font-light">
            Luxury Residential Architecture
          </span>
        </div>

        {/* Copyright notice */}
        <div className="font-sans text-[10px] text-slate-500 font-light tracking-wide text-center md:text-right">
          &copy; {new Date().getFullYear()} AUFA STUDIO. All Rights Reserved. 
          <span className="block sm:inline sm:ml-4 text-slate-600 hover:text-gold transition-colors">
            Designed for Excellence
          </span>
        </div>

        {/* Scroll back to top */}
        <button
          onClick={scrollToTop}
          className="group p-3 bg-charcoal border border-white/5 hover:border-gold text-slate-400 hover:text-gold transition-all duration-300 focus:outline-none"
        >
          <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  );
}
