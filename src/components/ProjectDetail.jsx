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
      <section className="relative h-[85vh] w-full flex items-end justify-start overflow-hidden bg-charcoal-dark border-b border-white/5">
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
              className="w-full h-full object-cover opacity-60 pointer-events-none"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-black/35 z-10" />
        </div>

        {/* Back Button (Subtle & Floating under Navbar) */}
        <button
          onClick={onBack}
          className="absolute top-28 left-6 md:left-12 z-30 font-display text-[10px] tracking-widest text-white/50 hover:text-white uppercase transition-colors flex items-center gap-2 focus:outline-none cursor-pointer group"
        >
          <ChevronLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </button>

        {/* Project Core Info Overlay */}
        <div className="w-full px-6 md:px-12 pb-16 md:pb-20 relative z-20 space-y-4 max-w-7xl">
          <span className="font-display text-[9px] sm:text-[10px] uppercase tracking-mega text-white/60 border border-white/20 px-3 py-1 bg-charcoal-deep/80 backdrop-blur-md">
            {project.category}
          </span>
          
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-wide pt-2">
            {project.title}
          </h1>
          
          <p className="font-sans text-sm sm:text-lg text-slate-400 font-light max-w-2xl italic leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* 2. SPECIFICATIONS & DESCRIPTION GRID */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Technical Data Sheet (4/12 grid) */}
          <div className="lg:col-span-4 space-y-6 border-l border-white/10 pl-6 py-2">
            <h4 className="font-display text-[10px] uppercase tracking-mega text-white/40 mb-4">
              Project Data
            </h4>
            
            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div>
                <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Location</span>
                <span className="text-slate-200 mt-1 block font-light">{project.location}</span>
              </div>
              
              <div>
                <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Year</span>
                <span className="text-slate-200 mt-1 block font-light">{project.year}</span>
              </div>

              {project.area && (
                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Gross Area</span>
                  <span className="text-slate-200 mt-1 block font-light">{project.area}</span>
                </div>
              )}

              {project.client && (
                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Client</span>
                  <span className="text-slate-200 mt-1 block font-light">{project.client}</span>
                </div>
              )}

              {project.scope && (
                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">Scope of Service</span>
                  <span className="text-slate-200 mt-1 block font-light">{project.scope}</span>
                </div>
              )}

              {/* Dynamic specs details */}
              {project.specifications && project.specifications.map((spec, index) => (
                <div key={index}>
                  <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 block">{spec.label}</span>
                  <span className="text-slate-200 mt-1 block font-light">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative / Description (8/12 grid) */}
          <div className="lg:col-span-8 space-y-6">
            <h4 className="font-display text-[10px] uppercase tracking-mega text-white/40">
              Overview
            </h4>
            <p className="font-sans text-base sm:text-lg lg:text-xl font-light text-slate-300 leading-relaxed pt-2">
              {project.description}
            </p>
          </div>

        </div>
      </section>

      {/* 3. HORIZONTAL IMAGE GALLERY (AEDAS STYLE) */}
      <section className="w-full py-12 md:py-20 border-t border-white/5 bg-charcoal-dark/20">
        <div className="w-full px-6 md:px-12 space-y-6 max-w-7xl mx-auto">
          
          {/* Gallery Header Controls */}
          <div className="flex items-center justify-between">
            <h4 className="font-display text-[10px] uppercase tracking-mega text-white/40">
              Visual Gallery
            </h4>
            
            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-4 text-white">
              <span className="font-display text-[10px] tracking-widest text-white/50 mr-2">
                {activeSlide + 1} / {project.images.length}
              </span>
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

          {/* Horizontal Scrolling Slider List */}
          <div 
            ref={galleryRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-none gap-6 snap-x snap-mandatory scroll-smooth pb-4"
          >
            {project.images.map((img, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 w-[85vw] sm:w-[65vw] md:w-[50vw] aspect-[16/10] snap-start border border-white/5 bg-charcoal-deep"
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

        </div>
      </section>

      {/* 4. NEXT PROJECT TEASER BANNER */}
      <section 
        onClick={() => {
          onSelectProject(nextProject);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center cursor-pointer overflow-hidden border-t border-white/10 group bg-black"
      >
        {/* Hover zoom background image */}
        <img 
          src={nextProject.image} 
          alt={nextProject.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out scale-102 group-hover:scale-105 opacity-30 group-hover:opacity-40"
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent pointer-events-none" />
        
        {/* Content Callout */}
        <div className="relative z-10 text-center space-y-4 px-6">
          <span className="font-display text-[9px] uppercase tracking-mega text-slate-400 group-hover:text-white transition-colors duration-300">
            Next Project
          </span>
          <h3 className="font-display text-3xl sm:text-5xl font-light text-white tracking-wide transition-colors duration-300 group-hover:text-gold">
            {nextProject.title}
          </h3>
          <p className="font-sans text-[11px] sm:text-xs text-slate-400 font-light">
            {nextProject.location} / {nextProject.year}
          </p>
        </div>
      </section>

    </div>
  );
}
