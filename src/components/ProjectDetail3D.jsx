import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function ProjectDetail3D({ project, onBack, onDetailsToggle, onGoHome, onSelectProject }) {
  if (!project) return null;

  const [showDetails, setShowDetails] = useState(false);
  const detailsScrollRef = useRef(null);

  // Filter out the main cover image from the rest of the gallery to avoid repetition
  const galleryImages = project.images.filter((img) => img !== project.image);

  // Notify parent component about details open/close state
  useEffect(() => {
    if (onDetailsToggle) {
      onDetailsToggle(showDetails);
    }
  }, [showDetails, onDetailsToggle]);

  // Reset states when project changes
  useEffect(() => {
    setShowDetails(false);
    if (detailsScrollRef.current) {
      detailsScrollRef.current.scrollTop = 0;
    }
  }, [project]);

  // Click handler on centered card image to open the project details page
  const handleCardClick = () => {
    setShowDetails(true);
  };

  // Handle back click with smooth slide-down exit transition
  const handleBack = (e) => {
    e.stopPropagation();
    setShowDetails(false);
    setTimeout(() => {
      onBack();
    }, 700);
  };

  // Listen for scroll down or swipe up gestures on Screen 1 (Preview) to open details page
  useEffect(() => {
    if (showDetails) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setShowDetails(true);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;
      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY; // positive = swipe up (scroll down)

      if (diffY > 15) {
        touchStartY = 0;
        setShowDetails(true);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showDetails, project]);

  return (
    <div className="w-full relative z-20 pointer-events-auto">
      
      {/* 1. VIEWPORT HERO OVERLAY (SCREEN 1 - PREVIEW CARD) */}
      <section className="fixed inset-0 h-screen w-full flex items-end justify-between p-12 bg-transparent pointer-events-none z-10">
        
        {/* Centered Large Square Image Link */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.button
            onClick={handleCardClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-[85vw] h-[85vw] sm:w-[450px] sm:h-[450px] md:w-[460px] md:h-[460px] bg-white border border-neutral-100 shadow-xl overflow-hidden pointer-events-auto cursor-pointer relative group text-left focus:outline-none"
          >
            <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-500 z-10" />
            
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                poster={project.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none group-hover:scale-104 transition-transform duration-700"
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ${project.image.includes('together3.webp') ? 'scale-[1.35] group-hover:scale-[1.4]' : ''}`}
              />
            )}
          </motion.button>
        </div>

        {/* Bottom Left Back Button */}
        <div className="absolute bottom-12 left-12 z-20 pointer-events-auto">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-900 bg-white hover:bg-neutral-50 hover:border-neutral-400 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none shadow-md"
            aria-label="Go back to 3D matrix"
          >
            <ArrowLeft className="h-5 w-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Bottom Center Title & Click Prompt */}
        <div className="absolute bottom-12 inset-x-0 mx-auto w-fit text-center pointer-events-none z-20 flex flex-col items-center gap-1">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-wide text-neutral-900 uppercase">
            {project.title}
          </h2>
          <span className="font-display text-[9px] uppercase tracking-widest text-neutral-400 font-medium">
            click image to see more
          </span>
        </div>

      </section>

      {/* SOLID DETAILS PANEL (SLIDES UP FROM BOTTOM) */}
      <motion.div
        ref={detailsScrollRef}
        data-lenis-prevent
        initial={{ y: '100%' }}
        animate={showDetails ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 bg-white overflow-y-auto z-30 pointer-events-auto"
      >
        {/* Sticky Top Header (<- Title) */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 py-4 px-6 md:px-12 border-b border-neutral-100 flex items-center">
          <button
            onClick={handleBack}
            className="hover:text-neutral-500 transition-colors cursor-pointer focus:outline-none flex items-center gap-3 font-display text-sm font-medium uppercase tracking-widest text-neutral-900"
          >
            <span className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-[10px]">
              ←
            </span>
            {project.title}
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="py-12 px-6 md:px-12 space-y-12 max-w-7xl mx-auto">
          
          {/* Overview & Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-4 border-b border-neutral-100 pb-12">
            
            {/* Description Text */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <h3 className="font-display text-xs uppercase tracking-mega text-neutral-400 font-medium">
                Project Overview
              </h3>
              <p className="font-sans text-base sm:text-lg font-light text-neutral-800 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-left lg:pl-12 lg:border-l border-neutral-100">
              <div>
                <span className="font-display text-[9px] uppercase tracking-widest text-neutral-400 block font-medium">Location</span>
                <span className="text-neutral-800 mt-1 block font-light text-sm">{project.location}</span>
              </div>
              <div>
                <span className="font-display text-[9px] uppercase tracking-widest text-neutral-400 block font-medium">Year</span>
                <span className="text-neutral-800 mt-1 block font-light text-sm">{project.year}</span>
              </div>
              {project.area && (
                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-neutral-400 block font-medium">Gross Area</span>
                  <span className="text-neutral-800 mt-1 block font-light text-sm">{project.area}</span>
                </div>
              )}
              {project.scope && (
                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-neutral-400 block font-medium">Scope of Work</span>
                  <span className="text-neutral-800 mt-1 block font-light text-sm">{project.scope}</span>
                </div>
              )}
              {project.client && (
                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-neutral-400 block font-medium">Client</span>
                  <span className="text-neutral-800 mt-1 block font-light text-sm">{project.client}</span>
                </div>
              )}
            </div>

          </div>

          {/* Big Featured Image */}
          <div className="w-full aspect-[16/10] overflow-hidden border border-neutral-100 bg-neutral-50 shadow-sm">
            <img 
              src={project.image} 
              alt={`${project.title} featured cover`} 
              className={`w-full h-full object-cover ${project.image.includes('together3.webp') ? 'scale-[1.35]' : ''}`}
            />
          </div>

          {/* Masonry Grid of Remaining Images */}
          {galleryImages.length > 0 && (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-0 w-full pt-4">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="break-inside-avoid mb-6 overflow-hidden border border-neutral-100 bg-neutral-50 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img 
                    src={img} 
                    alt={`${project.title} detail ${idx + 1}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.015]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </motion.div>

    </div>
  );
}
