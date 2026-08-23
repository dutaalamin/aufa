import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const projectsData = [
  {
    id: 1,
    title: 'Villa Senja',
    tagline: 'Cliffside modern concrete sanctuary',
    category: 'Cliffside',
    location: 'Uluwatu, Bali',
    year: '2025',
    area: '750 sqm',
    scope: 'Architecture & Interior Design',
    client: 'Nara Residences Ltd.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-villa-with-a-swimming-pool-42226-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perched on a 90-meter limestone cliff overlooking the Indian Ocean. Villa Senja features massive fair-faced concrete plates stacked to optimize shade, while frameless double-glazed glass walls offer panoramic sea views. The design incorporates passive cooling design principles with wide ventilation corridors.',
    specifications: [
      { label: 'Primary Materials', value: 'Fair-faced concrete, local white limestone, structural steel' },
      { label: 'Status', value: 'Completed' },
      { label: 'Special Features', value: 'Cantilevered infinity pool, passive climate design' }
    ],
    featured: true
  },
  {
    id: 2,
    title: 'Forest Retreat',
    tagline: 'Elevated tropical canopy escape',
    category: 'Forest',
    location: 'Ubud, Bali',
    year: '2024',
    area: '450 sqm',
    scope: 'Full Architecture Scope',
    client: 'The Green Escape Group',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-villa-surrounded-by-nature-with-swimming-pool-42232-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed as a light footprint structure elevated above the damp jungle floor. Forest Retreat utilizes a modular steel column framework combined with recycled ironwood decks and custom bamboo woven screens. The project aims to touch the earth lightly, minimizing damage to Ubud’s native root networks.',
    specifications: [
      { label: 'Primary Materials', value: 'Recycled Ironwood, structural steel framework, bamboo screens' },
      { label: 'Status', value: 'Completed' },
      { label: 'Special Features', value: 'Minimal ground imprint, rainwater harvesting system' }
    ],
    featured: true
  },
  {
    id: 3,
    title: 'Brutalist Oasis',
    tagline: 'Courtyard-centric urban villa',
    category: 'Tropical',
    location: 'Yogyakarta',
    year: '2024',
    area: '580 sqm',
    scope: 'Architecture & Landscape',
    client: 'Art Curator family',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-exterior-44122-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An inward-facing structure designed to provide high privacy in a dense urban neighborhood. Rooms are organized around a rectangular central courtyard containing a volcanic andesite stone reflection pool. Teak wood louvers filter the direct tropical sun, creating dynamic shadow patterns throughout the day.',
    specifications: [
      { label: 'Primary Materials', value: 'Fair-faced concrete, reclaimed Teak, Andesite volcanic stone' },
      { label: 'Status', value: 'Completed' },
      { label: 'Special Features', value: 'Central microclimate courtyard, solar panel roof array' }
    ],
    featured: true
  },
  {
    id: 4,
    title: 'Sandstone Pavilion',
    tagline: 'Ocean-facing beach estate',
    category: 'Beachfront',
    location: 'Kuta, Lombok',
    year: '2025',
    area: '920 sqm',
    scope: 'Masterplanning & Architecture',
    client: 'Soma Wellness Resort',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-of-a-modern-apartment-42225-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A series of low-slung, open pavilion spaces celebrating beachfront living. The sandstone columns support wide overhanging roofs that shield the living spaces from direct monsoon rains and solar heat. Teak decks extend directly towards the beach, blurring the line between building and sand.',
    specifications: [
      { label: 'Primary Materials', value: 'Lombok sandstone, recycled Teak, bamboo woven screens' },
      { label: 'Status', value: 'Construction Stage' },
      { label: 'Special Features', value: 'Wide roof overhangs, custom structural columns, natural stone flooring' }
    ],
    featured: true
  },
  {
    id: 5,
    title: 'Glass Monolith',
    tagline: 'Minimalist cliffside pavilion',
    category: 'Cliffside',
    location: 'Uluwatu, Bali',
    year: '2025',
    area: '620 sqm',
    scope: 'Architecture & Interior',
    client: 'Private Owner',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-villa-with-a-swimming-pool-42226-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An ultra-minimalist single story glass volume set on cliff edge, utilizing high tech steel frames and frameless extra-clear structural glass walls.',
    specifications: [
      { label: 'Primary Materials', value: 'Structural steel, extra-clear glass, black basalt stone' },
      { label: 'Status', value: 'Design Stage' },
      { label: 'Special Features', value: '360 degree panoramic views, embedded heating/cooling floor panels' }
    ],
    featured: false
  },
  {
    id: 6,
    title: 'Canopy Villa',
    tagline: 'Jungle canopy cantilever villa',
    category: 'Forest',
    location: 'Ubud, Bali',
    year: '2024',
    area: '410 sqm',
    scope: 'Architecture & Landscape',
    client: 'Alila Group Resorts',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-villa-surrounded-by-nature-with-swimming-pool-42232-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cantilevered over a steep jungle ravine, this villa features dramatic views of Ubud forest and volcanic mountain ridges.',
    specifications: [
      { label: 'Primary Materials', value: 'Raw concrete, local bamboo laminates, glass panels' },
      { label: 'Status', value: 'Completed' },
      { label: 'Special Features', value: 'Double height living rooms, outdoor hanging firepit terrace' }
    ],
    featured: false
  },
  {
    id: 7,
    title: 'Concrete Sanctuary',
    tagline: 'Monolithic raw concrete family retreat',
    category: 'Tropical',
    location: 'Canggu, Bali',
    year: '2023',
    area: '480 sqm',
    scope: 'Full Design & Build',
    client: 'Design Collector family',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-exterior-44122-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A sanctuary composed of geometric raw concrete volumes containing private quarters, organized around a peaceful swimming pool and tropical gardens.',
    specifications: [
      { label: 'Primary Materials', value: 'Board-formed concrete, local limestone, steel mesh' },
      { label: 'Status', value: 'Completed' },
      { label: 'Special Features', value: 'Rooftop green garden, double skin thermal facade' }
    ],
    featured: false
  }
];

export default function Projects({ onSelectProject }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  // Filter featured and standard project arrays
  const featuredProjects = projectsData.filter((p) => p.featured);
  const allProjects = projectsData;

  const scrollToAllProjects = () => {
    const el = document.getElementById('all-projects-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="projects" 
      className="relative py-24 md:py-32 bg-charcoal-deep overflow-hidden"
    >
      {/* Background Architectural Blueprint Lines */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-45" />

      <div className="w-full px-6 md:px-12 relative z-10 space-y-24">
        
        {/* ROW 1: FEATURED PROJECTS SLIDER */}
        <div className="space-y-8">
          
          {/* Header Row */}
          <div className="flex items-end justify-between border-b border-white/5 pb-4">
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-xl sm:text-2xl font-light text-white tracking-wide uppercase">
                Featured Projects
              </h2>
              <button 
                onClick={scrollToAllProjects}
                className="font-display text-[10px] tracking-widest text-slate-400 hover:text-white uppercase transition-colors focus:outline-none cursor-pointer hidden sm:block"
              >
                View All &gt;
              </button>
            </div>
            
            {/* Minimalist Arrow Navigation Controls */}
            <div className="flex items-center gap-4 text-white">
              <button 
                onClick={scrollLeft} 
                className="text-slate-400 hover:text-white transition-colors focus:outline-none cursor-pointer p-1"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 stroke-[1.5]" />
              </button>
              <button 
                onClick={scrollRight} 
                className="text-slate-400 hover:text-white transition-colors focus:outline-none cursor-pointer p-1"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Slider List */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-none gap-6 scroll-smooth pb-4 snap-x snap-mandatory"
          >
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group flex-shrink-0 w-[280px] sm:w-[340px] snap-start cursor-pointer space-y-4"
              >
                {/* Image Showcase Container */}
                <div className="aspect-[3/4] w-full overflow-hidden relative border border-white/5">
                  {/* Subtle 5% Overlay on hover */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Category Indicator Stamp */}
                  <span className="absolute top-4 left-4 z-20 bg-charcoal-deep/80 backdrop-blur-md px-3 py-1 font-display text-[9px] uppercase tracking-widest text-white border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Text Metadata Details */}
                <div className="space-y-1 pl-1">
                  <h3 className="font-display text-sm font-light text-white group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[11px] text-slate-500 font-light">
                    {project.location} / {project.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ROW 2: ALL PROJECTS GRID */}
        <div id="all-projects-anchor" className="space-y-12 pt-8">
          
          {/* Header Row */}
          <div className="border-b border-white/5 pb-4">
            <h2 className="font-display text-xl sm:text-2xl font-light text-white tracking-wide uppercase">
              All Projects
            </h2>
          </div>

          {/* Grid Layout (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {allProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer space-y-4"
              >
                {/* Image Container */}
                <div className="aspect-[16/10] w-full overflow-hidden relative border border-white/5">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Text Metadata Details */}
                <div className="space-y-1 pl-1">
                  <h3 className="font-display text-sm font-light text-white group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[11px] text-slate-500 font-light">
                    {project.location} / {project.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
