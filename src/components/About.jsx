import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section 
      id="about" 
      className="relative h-screen w-full flex items-end justify-start overflow-hidden bg-charcoal-deep"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-50 scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />
      
      {/* Dark Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/50 to-charcoal-deep/20 z-10 pointer-events-none" />
      
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
