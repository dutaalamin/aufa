import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { projectsData } from './Projects';

export default function Hero({ onSelectProject }) {
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
      {/* Background Video or Image with Crossfading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {currentProject.videoUrl ? (
            <video
              src={currentProject.videoUrl}
              poster={currentProject.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className={`w-full h-full object-cover ${currentProject.image.includes('3.png') ? 'scale-[1.3]' : ''}`}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Localized Dark Gradients (Protects top header and bottom text, leaving middle fully bright) */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none z-10 opacity-40" />

      {/* Bottom Panel Overlay */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-24 z-20 w-full px-6 md:px-12 flex flex-row items-center justify-between">
        
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
            <button
              onClick={() => onSelectProject && onSelectProject(currentProject)}
              className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white leading-none cursor-pointer hover:text-white/60 active:scale-[0.98] transition-all duration-300 ease-out text-left focus:outline-none"
            >
              {currentProject.title}
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: Slider Navigation controls (Right Arrow Only) */}
        <div className="flex items-center">
          <button
            onClick={handleNext}
            className="text-white hover:text-gold transition-colors cursor-pointer focus:outline-none duration-300 p-1"
            aria-label="Next Project"
          >
            <ChevronRight className="h-10 w-10 md:h-12 md:w-12" strokeWidth={2.5} />
          </button>
        </div>

      </div>

    </section>
  );
}
