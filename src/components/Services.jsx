import React from 'react';
import { Layers, Home, Compass, Eye } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Home,
      title: 'Architectural Design',
      desc: 'Bespoke conceptualization, space planning, and facade layouts tailored to high-end residential estates and luxury private villas.',
    },
    {
      icon: Layers,
      title: 'Interior Architecture',
      desc: 'Seamless detailing from built-in teak wood joinery to structural light integration, selecting tactile materials that elevate spatial warmth.',
    },
    {
      icon: Compass,
      title: 'Site & Masterplanning',
      desc: 'Topographical analysis, microclimate orientation, and site layout designs to integrate structural masses naturally with the surrounding land.',
    },
    {
      icon: Eye,
      title: '3D Spatial Visualization',
      desc: 'High-fidelity photorealistic rendering, materials simulation, and architectural walk-through animations to visualize spaces before construction.',
    }
  ];

  return (
    <section 
      id="services" 
      className="relative py-24 md:py-32 bg-charcoal-deep overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 mb-16 max-w-xl">
          <span className="font-display text-xs uppercase tracking-mega text-slate-400 font-light block">
            EXPERTISE
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
            Our Architectural Services
          </h2>
          <div className="w-16 h-[1px] bg-white" />
          <p className="font-sans text-xs md:text-sm text-slate-400 font-light leading-relaxed pt-2">
            We guide clients through the entire design journey, from a blank piece of paper to the final built hand-over.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx}
                className="group relative p-8 bg-white/[0.01] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col justify-between min-h-[220px]"
              >
                {/* Structural Line Overlays */}
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-white/10 group-hover:bg-white/40 transition-colors duration-500" />
                <div className="absolute top-0 left-0 w-[1px] h-8 bg-white/10 group-hover:bg-white/40 transition-colors duration-500" />

                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-charcoal-deep border border-white/10 text-white/60 group-hover:text-black group-hover:bg-white transition-colors duration-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg text-white font-light group-hover:text-white transition-colors duration-300">
                      {svc.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                {/* Numbering Indicator */}
                <span className="self-end font-display text-[10px] tracking-widest text-slate-700 group-hover:text-white/45 transition-colors duration-500 pt-6">
                  0{idx + 1} // STUDIO SERVICE
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
