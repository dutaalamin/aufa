import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      <div className="absolute inset-x-0 bottom-16 md:bottom-24 z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-row items-end justify-between">
        
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
            <span className="font-display text-[10px] tracking-mega text-gold uppercase font-light">
              FEATURED PROJECT
            </span>
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white leading-none flex items-center gap-2">
              <span className="text-gold font-light">+</span> {currentProject.title}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: Slider Navigation controls */}
        <div className="flex items-center gap-6">
          {/* Pagination Counter */}
          <div className="font-display text-xs tracking-mega text-slate-400 font-light select-none">
            <span className="text-white">0{activeIndex + 1}</span> / 0{projectsData.length}
          </div>

          {/* Nav buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-3 bg-charcoal-deep/60 hover:bg-gold hover:text-charcoal-deep text-slate-300 transition-all duration-300 border border-white/5 hover:border-gold cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-charcoal-deep/60 hover:bg-gold hover:text-charcoal-deep text-slate-300 transition-all duration-300 border border-white/5 hover:border-gold cursor-pointer focus:outline-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Subtitle brand statement on top-right */}
      <div className="absolute top-28 right-6 md:right-12 z-20 max-w-[240px] text-right pointer-events-none hidden md:block">
        <p className="font-sans text-[9px] text-slate-400 font-light tracking-mega leading-relaxed uppercase">
          Crafting bespoke luxury villas that balance light, raw concrete, and landscape integration.
        </p>
      </div>

    </section>
  );
}
