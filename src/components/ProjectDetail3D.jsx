import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

  // Reset states and trigger auto-open timer when project changes to match the 3D camera zoom transition
  useEffect(() => {
    setShowDetails(false);
    if (detailsScrollRef.current) {
      detailsScrollRef.current.scrollTop = 0;
    }

    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [project]);

  // Handle back click with smooth slide-down exit transition
  const handleBack = (e) => {
    e.stopPropagation();
    setShowDetails(false);
    setTimeout(() => {
      onBack();
    }, 700);
  };

  return (
    <div className="w-full relative z-20 pointer-events-auto">

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
