import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Layers, Maximize } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Disable page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-y-auto">
        
        {/* Backdrop glassmorphism blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal-deep/90 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal Window Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-charcoal-deep border-0 md:border border-white/10 w-full max-w-6xl h-full md:h-[85vh] shadow-2xl flex flex-col md:flex-row z-10 overflow-hidden"
        >
          
          {/* Close button for Mobile (Floating Top Right) */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-40 p-3 bg-charcoal-deep/80 backdrop-blur-md text-white hover:text-gold border border-white/10 rounded-none focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Side: Large Visual Showcase */}
          <div className="w-full md:w-3/5 h-[45vh] md:h-full relative bg-charcoal-dark flex flex-col justify-between group">
            
            {/* Active Display Image */}
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              <img 
                src={project.images[activeImageIndex]} 
                alt={`${project.title} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-700" 
              />
              
              {/* Image Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Slider Navigation Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-charcoal-deep/70 backdrop-blur-sm border border-white/10 text-white hover:text-gold hover:border-gold transition-all duration-300 focus:outline-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-charcoal-deep/70 backdrop-blur-sm border border-white/10 text-white hover:text-gold hover:border-gold transition-all duration-300 focus:outline-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Thumbnail Selectors (Sticky Bottom overlay on image) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 max-w-[90%] overflow-x-auto py-1 px-2 bg-charcoal-deep/80 backdrop-blur-md border border-white/5">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-9 flex-shrink-0 border transition-all duration-300 ${
                    idx === activeImageIndex 
                      ? 'border-gold brightness-100 scale-105' 
                      : 'border-white/10 brightness-50 hover:brightness-90'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Pagination display */}
            <div className="absolute top-4 left-4 z-20 bg-charcoal-deep/80 backdrop-blur-md border border-white/5 px-3 py-1 font-display text-[9px] uppercase tracking-widest text-slate-400">
              {activeImageIndex + 1} / {project.images.length}
            </div>
          </div>

          {/* Right Side: Detailed Project Data Sheet */}
          <div className="w-full md:w-2/5 h-[55vh] md:h-full overflow-y-auto bg-charcoal-deep border-t md:border-t-0 md:border-l border-white/10 flex flex-col p-6 md:p-10 justify-between">
            
            <div className="space-y-8">
              {/* Header Title */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-display text-[9px] uppercase tracking-mega text-gold font-light border border-gold/20 px-2 py-0.5">
                    {project.category}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight leading-tight pt-1">
                  {project.title}
                </h2>
                <p className="font-sans text-xs text-slate-400 font-light italic">
                  {project.tagline}
                </p>
              </div>

              {/* Technical Facts Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 text-xs font-sans">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-gold/60" />
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block leading-none font-display">Location</span>
                    <span className="text-slate-200 mt-1 block">{project.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-gold/60" />
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block leading-none font-display">Year</span>
                    <span className="text-slate-200 mt-1 block">{project.year}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <Maximize className="h-3.5 w-3.5 text-gold/60" />
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block leading-none font-display">Area</span>
                    <span className="text-slate-200 mt-1 block">{project.area}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <Layers className="h-3.5 w-3.5 text-gold/60" />
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block leading-none font-display">Scope</span>
                    <span className="text-slate-200 mt-1 block">{project.scope}</span>
                  </div>
                </div>
              </div>

              {/* Concept Text */}
              <div className="space-y-3">
                <h3 className="font-display text-xs uppercase tracking-widest text-gold font-light">
                  Design Concept
                </h3>
                <p className="font-sans text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Detailed Technical Specifications Table */}
              <div className="space-y-3">
                <h3 className="font-display text-xs uppercase tracking-widest text-gold font-light">
                  Project Specifications
                </h3>
                <div className="border border-white/5 bg-charcoal-dark/20 p-4 space-y-3 font-sans text-xs">
                  {project.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-start gap-4 pb-2 border-b border-white/5 last:border-b-0 last:pb-0">
                      <span className="text-slate-500 font-light min-w-[100px]">{spec.label}</span>
                      <span className="text-slate-300 text-right">{spec.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-light">Client</span>
                    <span className="text-slate-300 text-right">{project.client}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Back Button (Desktop Close action representation) */}
            <div className="pt-8 border-t border-white/5 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 border border-white/10 hover:border-gold hover:text-gold transition-colors font-display text-[10px] uppercase tracking-widest text-slate-400 focus:outline-none"
              >
                Close Project
              </button>
            </div>
            
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
