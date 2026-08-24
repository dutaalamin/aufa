import React from 'react';
import { motion } from 'framer-motion';

export default function AboutStatement() {
  return (
    <section 
      id="philosophy" 
      className="relative h-screen w-full flex items-end justify-start overflow-hidden bg-charcoal-deep"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-90 scale-[1.35]"
        style={{ 
          backgroundImage: `url('/together3.webp')` 
        }}
      />
      
      {/* Localized Dark Gradients (Protects text layout, leaving central architecture bright) */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
      
      {/* Fine Grid Lines Overlay */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-10 opacity-20" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none z-10 opacity-30" />

      {/* Content Container (Bottom-Left Aligned, Full Width padding) */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-16 md:pb-24 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-light text-white leading-relaxed md:leading-[1.4] tracking-wide"
        >
          Aufa creates world-class, sustainable architecture and culturally inspired design solutions tailored to the evolving residential and villa needs of communities.
        </motion.p>
      </div>

    </section>
  );
}
