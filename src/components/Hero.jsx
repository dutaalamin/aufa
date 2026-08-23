import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal-deep"
    >
      {/* Background Image with Parallax & Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-40 scale-105 transition-transform duration-10000 ease-out"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />
      
      {/* Dark Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/80 via-transparent to-charcoal-deep/80 z-10" />

      {/* Architectural Grid Overlay (Thin Lines) */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-10" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none z-10 opacity-50" />

      {/* Subtle Vertical Gold Accent Line */}
      <div className="absolute left-12 md:left-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10 hidden sm:block" />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-start mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span className="font-display text-xs md:text-sm uppercase tracking-mega text-gold font-light block">
            ARCHITECTURE & SPATIAL DESIGN
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-none text-white max-w-4xl">
            SCULPTING <span className="font-light italic text-gold-light">SPACES</span><br />
            DEFINING LIVES<span className="text-gold font-medium">.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-slate-300 font-light text-sm md:text-lg max-w-xl leading-relaxed font-sans"
        >
          Aufa Studio crafts bespoke luxury residences and modern villas. 
          By combining raw concrete, warm timber, and spatial geometry, we structure homes that harmonize with nature.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full sm:w-auto"
        >
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-transparent border border-gold/40 text-white font-display text-xs uppercase tracking-widest hover:border-gold hover:text-charcoal-deep transition-all duration-500 overflow-hidden focus:outline-none"
          >
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Projects 
              <ArrowDown className="h-3 w-3 group-hover:translate-y-1 transition-transform duration-500" />
            </span>
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-display text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-4 flex items-center justify-center border-b border-transparent hover:border-white/20"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Floating Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={scrollToProjects}>
        <span className="font-display text-[9px] uppercase tracking-mega text-slate-400">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1.5 h-1.5 bg-gold rounded-full"
        />
      </div>
    </section>
  );
}
