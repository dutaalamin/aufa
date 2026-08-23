import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { projectsData } from './Projects';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
  };

  const currentProject = projectsData[activeIndex];

  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal-deep"
    >
      {/* Background Video with Crossfading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <video
            src={currentProject.videoUrl}
            poster={currentProject.image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/45 to-charcoal-deep/20 z-10 pointer-events-none" />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none z-10 opacity-40" />

      {/* Bottom Panel Overlay */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-24 z-20 w-full px-6 md:px-12 flex flex-row items-end justify-between">
        
        {/* Left Side: Project Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-1"
          >
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white leading-none flex items-center gap-2">
              <span className="text-gold font-light">+</span> {currentProject.title}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: Slider Navigation controls (Right Arrow Only) */}
        <div className="flex gap-2">
          <button
            onClick={handleNext}
            className="p-3 bg-charcoal-deep/60 hover:bg-gold hover:text-charcoal-deep text-slate-300 transition-all duration-300 border border-white/5 hover:border-gold cursor-pointer focus:outline-none"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>

    </section>
  );
}
