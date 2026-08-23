import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Villa',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', projectType: 'Villa', message: '' });
      }, 3000);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 md:py-32 bg-charcoal-deep border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="font-display text-xs uppercase tracking-mega text-slate-400 font-light block">
                COLLABORATE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
                Let’s Structure <br />
                Your Vision
              </h2>
              <div className="w-16 h-[1px] bg-white" />
            </div>

            {/* Studio Info List */}
            <div className="space-y-6 font-sans text-xs md:text-sm text-slate-400 font-light">
              
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-display text-xs text-white uppercase tracking-widest mb-1">Studio Address</h4>
                  <p className="leading-relaxed">
                    AUFA STUDIO<br />
                    Jl. Pantai Bingin No. 42, Uluwatu<br />
                    Badung, Bali 80361, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-display text-xs text-white uppercase tracking-widest mb-1">Email Inquiry</h4>
                  <a href="mailto:hello@aufastudio.com" className="text-slate-300 hover:text-white transition-colors block">
                    hello@aufastudio.com
                  </a>
                  <a href="mailto:press@aufastudio.com" className="text-slate-500 hover:text-white transition-colors block text-xs mt-0.5">
                    press@aufastudio.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-white/60 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-display text-xs text-white uppercase tracking-widest mb-1">Call Us</h4>
                  <a href="tel:+62361765432" className="text-slate-300 hover:text-white transition-colors block">
                    +62 361 765 432
                  </a>
                  <span className="text-slate-500 text-xs block mt-0.5">Mon - Fri, 09:00 - 18:00 (GMT+8)</span>
                </div>
              </div>

            </div>

            {/* Social handles */}
            <div className="space-y-4 pt-4">
              <h4 className="font-display text-xs text-white uppercase tracking-widest">Connect</h4>
              <div className="flex items-center gap-3">
                <a 
                  href="https://behance.net" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-charcoal-deep border border-white/5 hover:border-white hover:text-white text-slate-400 transition-colors"
                >
                  <span className="font-display text-xs font-medium tracking-wider">Behance</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-charcoal-deep border border-white/5 hover:border-white hover:text-white text-slate-400 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-charcoal-deep border border-white/5 hover:border-white hover:text-white text-slate-400 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 p-8 md:p-12 relative overflow-hidden">
            
            {/* Outline accent lines */}
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-white/10" />
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-white/10" />

            {submitted ? (
              <div className="h-[350px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white animate-pulse">
                  <Send className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-white font-light">Thank You</h3>
                <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed">
                  Your message has been sent successfully. Our studio team will review your project parameters and contact you within 48 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="font-display text-[9px] uppercase tracking-widest text-slate-400 block">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-charcoal-deep border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-slate-600"
                    />
                  </div>
 
                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="font-display text-[9px] uppercase tracking-widest text-slate-400 block">Your Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-charcoal-deep border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="font-display text-[9px] uppercase tracking-widest text-slate-400 block">Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-charcoal-deep border border-white/10 px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-white transition-colors rounded-none"
                  >
                    <option value="Villa">Luxury Villa / Private Residence</option>
                    <option value="Resort">Wellness Resort / Cabin Estate</option>
                    <option value="Interior">Interior Space Architecture</option>
                    <option value="Commercial">Commercial / Mixed-Use Development</option>
                    <option value="Consultation">Design Feasibility Consultation</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="font-display text-[9px] uppercase tracking-widest text-slate-400 block">Brief Message</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your site location, estimated size, and design goals..."
                    className="w-full bg-charcoal-deep border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group w-full py-4 bg-transparent border border-white/40 hover:border-white text-white hover:text-black font-display text-xs uppercase tracking-widest transition-all duration-500 overflow-hidden relative"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Inquiry 
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-500" />
                  </span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
