import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef(null);
  
  // Track scroll progress of the 180vh container (smooth middle-ground height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Slide the black panel off-screen across 75% of the scroll (0% to 75%)
  // This makes the transition feel smooth and majestic, not too fast
  const x = useTransform(scrollYProgress, [0, 0.75], ["0%", "-100%"]);
  
  // Fade out left text in the first 30% of the scroll
  const opacityLeft = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Fade in right text as the black panel slides away (35% to 70% scroll)
  const opacityRight = useTransform(scrollYProgress, [0.35, 0.7, 1.0], [0, 1, 1]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[220vh] w-full bg-charcoal-deep">
      
      {/* Pinned Sticky Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-row">
        
        {/* Full-screen Background Image (Bright luxury villa architecture) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-90"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80')` 
          }}
        />
        
        {/* Localized Dark Gradients (Protects text, leaving middle fully bright) */}
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-grid-lines pointer-events-none z-10 opacity-15" />
        <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none z-10 opacity-20" />

        {/* Left Side: Sliding Black Panel */}
        <motion.div 
          style={{ x }}
          className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-charcoal-deep z-20 flex items-center justify-start pl-[5vw] pr-[5vw] md:pl-[10vw] md:pr-16"
        >
          {/* Grid lines inside sliding panel */}
          <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
          
          <motion.div 
            style={{ opacity: opacityLeft }}
            className="relative z-10 max-w-md space-y-4"
          >
            <p className="font-display text-xl md:text-2xl lg:text-[28px] font-light text-white leading-relaxed">
              As a leading, bespoke architecture studio, Aufa integrates local environmental knowledge with tropical sustainability and residential design innovation.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side: Fade-in Text Overlay (Bottom-Right Aligned) */}
        <motion.div 
          style={{ opacity: opacityRight }}
          className="absolute bottom-16 md:bottom-24 left-[5vw] right-[5vw] md:left-auto md:right-[10vw] z-30 max-w-xl text-left md:text-right flex flex-col items-start md:items-end gap-6"
        >
          <p className="font-display text-base md:text-lg lg:text-[22px] font-light text-white leading-relaxed md:leading-[1.5]">
            Our team of design experts delivers site-specific solutions and high-performance layouts that create a positive, lasting impact for the families we design for.
          </p>
          
          <button 
            onClick={scrollToProjects}
            className="font-display text-xs uppercase tracking-mega text-white hover:text-slate-400 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            + Explore Projects
          </button>
        </motion.div>

      </div>

    </div>
  );
}
