import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const projectsData = [
  {
    id: 1,
    title: 'Villa Senja',
    tagline: 'Oceanfront brutalist masterpiece',
    category: 'Cliffside',
    location: 'Uluwatu, Bali',
    year: '2024',
    area: '750 sqm',
    scope: 'Architecture & Interior',
    client: 'Private Collector',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-home-with-swimming-pool-42220-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perched on a 50-meter cliff edge, Villa Senja integrates raw concrete plate structural elements with glass sliding facades, allowing views of the ocean from every room. A central infinity pool acts as a water bridge between the open-air social pavilions and private master wings, celebrating tropical luxury.',
    specifications: [
      { label: 'Primary Materials', value: 'Board-formed concrete, Ulin ironwood, local limestone' },
      { label: 'Status', value: 'Completed' },
      { label: 'Special Features', value: 'Suspended deck, double-height living room, passive ventilation' }
    ]
  },
  {
    id: 2,
    title: 'The Pine Canopy',
    tagline: 'Elevated timber eco-retreat',
    category: 'Forest',
    location: 'Bandung, West Java',
    year: '2023',
    area: '320 sqm',
    scope: 'Full Design & Build',
    client: 'Forest Cabin Resort',
    image: 'https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-house-42224-large.mp4',
    images: [
      'https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549556250-3a54da353e3d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Constructed on a steep topography without clearing the mature pine trees, this cabin is supported by a light diagonal steel pilotis framework. Clad in Shou Sugi Ban (charred cedar wood), it resists the damp forest climate naturally while forming a quiet, shadow-like silhouette among the trees.',
    specifications: [
      { label: 'Primary Materials', value: 'Charred pine, structural steel, double-glazed low-E glass' },
      { label: 'Status', value: 'Completed' },
      { label: 'Special Features', value: 'Minimal ground imprint, rainwater harvesting system' }
    ]
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
    ]
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
    ]
  }
];

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Cliffside', 'Forest', 'Tropical', 'Beachfront'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      className="relative py-24 md:py-32 bg-charcoal-dark overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <span className="font-display text-xs uppercase tracking-mega text-gold font-light block">
              PORTFOLIO
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Selected Residential <br />
              Villa Works
            </h2>
            <div className="w-16 h-[1px] bg-gold" />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-4 border-b border-white/5 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-display text-xxs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                  filter === cat 
                    ? 'border-gold text-gold bg-gold/5' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer relative bg-charcoal border border-white/5 overflow-hidden flex flex-col transition-all duration-700 hover:border-gold/30"
              >
                {/* Image Wrap */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-charcoal-deep/30 group-hover:bg-charcoal-deep/10 transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105" 
                  />
                  {/* Category Stamp */}
                  <span className="absolute top-4 left-4 z-20 bg-charcoal-deep/80 backdrop-blur-md px-3 py-1 font-display text-[9px] uppercase tracking-widest text-gold border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 relative bg-charcoal-deep/20">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-display text-xl md:text-2xl font-light text-white group-hover:text-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="font-display text-xxs uppercase tracking-widest text-slate-500">
                        {project.year}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 font-display text-[10px] uppercase tracking-widest text-slate-500">
                    <span>{project.location}</span>
                    <span>{project.area}</span>
                  </div>
                </div>

                {/* Decorative border overlays */}
                <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gold scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left z-20" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
