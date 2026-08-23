import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { value: '18+', label: 'Luxury Villas' },
    { value: '05', label: 'Design Awards' },
    { value: '08+', label: 'Years Experience' },
    { value: '25+', label: 'Collaborators' },
  ];

  return (
    <section 
      id="about" 
      className="relative py-24 md:py-32 bg-charcoal border-b border-white/5 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading and Stats */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="font-display text-xs uppercase tracking-mega text-gold font-light block">
                STUDIO PROFILE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
                Pioneering Luxury <br />
                Residential Architecture
              </h2>
              <div className="w-16 h-[1px] bg-gold mt-6" />
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="space-y-1 border-l border-white/10 pl-6"
                >
                  <span className="font-display text-3xl md:text-5xl font-light text-gold-light tracking-tight block">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs uppercase tracking-widest text-slate-400 block">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-8 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
              className="space-y-6 text-slate-300 font-light font-sans text-sm md:text-base leading-relaxed"
            >
              <p>
                Founded by Aufa, <strong className="text-white font-medium">AUFA STUDIO</strong> is a boutique architecture firm dedicated to the creation of high-end residential estates, private villas, and wellness resorts. We view architecture not just as static structures, but as a living canvas where light, air, and materials interact.
              </p>
              
              <p>
                Our signature aesthetic is characterized by raw brutalist concrete volumes, tempered with warm teakwood, structural steel, and natural sandstone. By integrating passive cooling design, lush tropical courtyard landscaping, and extensive glass facades, we erase the boundaries between the indoor shelter and the natural outdoor landscape.
              </p>

              <blockquote className="border-l-2 border-gold pl-6 py-2 my-8 italic text-slate-100 font-light text-base md:text-lg">
                "Architecture should not shout; it should speak in whispers, inviting the landscape to enter and become part of the daily human ritual."
              </blockquote>

              <p>
                Each project undergoes a rigorous conceptual design phase involving meticulous spatial analysis, daylight simulation, and material research. We believe a villa is the ultimate expression of its dweller's lifestyle—a tailored sanctuary built to stand the test of time.
              </p>
            </motion.div>

            {/* Asymmetric Visual Element - Architectural Line Box */}
            <div className="relative border border-white/5 p-8 mt-12 overflow-hidden group hover:border-gold/20 transition-colors duration-500 bg-charcoal-dark/20 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-gold/10 group-hover:border-gold/40 transition-colors duration-700" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-gold/10 group-hover:border-gold/40 transition-colors duration-700" />
              
              <h3 className="font-display text-sm uppercase tracking-widest text-gold mb-3">Our Core Philosophy</h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Sustainability is woven directly into our spatial layouts. We maximize cross-ventilation, utilize locally sourced building stones, and capture greywater to cultivate native micro-forests within residential boundaries.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
