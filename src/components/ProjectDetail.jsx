import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Layers, Maximize } from 'lucide-react';
import { projectsData } from './Projects';

export default function ProjectDetail({ project, onBack, onSelectProject }) {
  if (!project) return null;

  const galleryRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Find next project
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // Reset slide index and scroll when project changes
  useEffect(() => {
    setActiveSlide(0);
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = 0;
    }
  }, [project]);

  const handleScroll = () => {
    if (galleryRef.current) {
      const { scrollLeft, clientWidth } = galleryRef.current;
      // Estimate the current slide index based on scroll position
      const children = galleryRef.current.children;
      let currentIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const distance = Math.abs(child.offsetLeft - scrollLeft - 24); // 24px is gap/padding adjustment
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = i;
        }
      }
      setActiveSlide(currentIndex);
    }
  };

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const { clientWidth } = galleryRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-charcoal-deep text-slate-100 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-end justify-start overflow-hidden bg-charcoal-dark border-b border-white/5">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-95 pointer-events-none"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover opacity-95 ${project.image.includes('3.png') ? 'scale-[1.35]' : ''}`}
            />
          )}
          {/* Localized Dark Gradients (Protects top header and bottom text, leaving middle fully bright) */}
          <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Project Core Info Overlay */}
        <div className="w-full px-6 md:px-12 pb-16 md:pb-20 relative z-20 space-y-2 max-w-7xl">
          
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-wide pt-2">
            {project.title}
          </h1>
          
          <p className="font-sans text-sm sm:text-lg text-slate-400 font-light max-w-2xl italic leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* 2. HORIZONTAL IMAGE GALLERY (AEDAS STYLE) */}
      <section className="w-full py-12 md:py-20 bg-charcoal-dark/20">
        <div className="w-[95vw] md:w-[90vw] mx-auto space-y-6">

          {/* Horizontal Scrolling Slider List */}
          <div 
            ref={galleryRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-none gap-6 snap-x snap-mandatory scroll-smooth pb-4"
          >
            {project.images.map((img, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 w-full sm:w-[60%] md:w-[50%] aspect-[16/10] snap-start border border-white/5 bg-charcoal-deep"
              >
                <img 
                  src={img} 
                  alt={`${project.title} gallery detail ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-101"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Gallery Footer Controls */}
          <div className="flex items-center justify-between text-white pt-2">
            <span className="font-display text-[10px] tracking-widest text-white/50">
              {activeSlide + 1} / {project.images.length}
            </span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollGallery('left')} 
                className="border border-white/10 hover:border-white text-white/60 hover:text-white transition-colors p-2 cursor-pointer focus:outline-none"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => scrollGallery('right')} 
                className="border border-white/10 hover:border-white text-white/60 hover:text-white transition-colors p-2 cursor-pointer focus:outline-none"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. OVERVIEW & SPECIFICATIONS (AEDAS STYLE) */}
      <section className="w-[95vw] md:w-[90vw] mx-auto py-16 md:py-24 space-y-16">
        {/* Description Text */}
        <div className="space-y-6 max-w-4xl text-left">
          <h3 className="font-display text-xs uppercase tracking-mega text-white/40">
            Project Overview
          </h3>
          <p className="font-sans text-base sm:text-lg md:text-xl font-light text-slate-200 leading-relaxed md:leading-[1.6]">
            {project.description}
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-12 pt-4">
          <div>
            <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Location</span>
            <span className="text-slate-200 mt-1.5 block font-light text-sm sm:text-base">{project.location}</span>
          </div>
          <div>
            <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Year</span>
            <span className="text-slate-200 mt-1.5 block font-light text-sm sm:text-base">{project.year}</span>
          </div>
          {project.area && (
            <div>
              <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Gross Area</span>
              <span className="text-slate-200 mt-1.5 block font-light text-sm sm:text-base">{project.area}</span>
            </div>
          )}
          {project.scope && (
            <div>
              <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Scope of Work</span>
              <span className="text-slate-200 mt-1.5 block font-light text-sm sm:text-base">{project.scope}</span>
            </div>
          )}
          {project.client && (
            <div>
              <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Client</span>
              <span className="text-slate-200 mt-1.5 block font-light text-sm sm:text-base">{project.client}</span>
            </div>
          )}
          {project.specifications && project.specifications.map((spec, idx) => (
            <div key={idx}>
              <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">{spec.label}</span>
              <span className="text-slate-200 mt-1.5 block font-light text-sm sm:text-base">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEXT PROJECT TEASER BANNER */}
      <section className="w-[95vw] md:w-[90vw] mx-auto py-16 md:py-24 space-y-6">
        {/* Section Header */}
        <div className="pb-2">
          <h4 className="font-display text-xl sm:text-2xl font-light text-white tracking-wide uppercase">
            Next Project
          </h4>
        </div>

        {/* Next Project Card */}
        <div 
          onClick={() => {
            onSelectProject(nextProject);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="relative w-full h-[50vh] md:h-[60vh] cursor-pointer overflow-hidden group bg-charcoal-dark border border-white/10"
        >
          {/* Hover zoom background image (Fully bright!) */}
          <img 
            src={nextProject.image} 
            alt={nextProject.title} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out scale-100 group-hover:scale-102 opacity-95 group-hover:opacity-100"
          />
          
          {/* Subtle localized dark gradient at the bottom for readability of the white text overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
          
          {/* Bottom Info Overlay (Absolute bottom-left aligned with header) */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 space-y-2 text-left">
            <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-wide leading-none transition-colors duration-300 group-hover:text-gold">
              {nextProject.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 font-light">
              {nextProject.location} / {nextProject.year}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
