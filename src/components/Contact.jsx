import React, { useState } from 'react';

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
      className="relative py-24 md:py-32 bg-charcoal-deep overflow-hidden"
    >
      {/* Background blueprint grids */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="font-display text-xs uppercase tracking-mega text-white/50 font-light block">
                COLLABORATE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
                Let’s Structure <br />
                Your Vision
              </h2>
              <div className="w-16 h-[1px] bg-white" />
            </div>

            {/* Studio Info List (Aedas line-divider style) */}
            <div className="w-full flex flex-col pt-4">
              
              {/* Address Row */}
              <div className="border-t border-white/10 py-6 space-y-2">
                <h4 className="font-display text-[9px] text-white/50 uppercase tracking-widest">
                  Studio Address
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white font-light leading-relaxed">
                  AUFA STUDIO<br />
                  Jl. Pantai Bingin No. 42, Uluwatu<br />
                  Badung, Bali 80361, Indonesia
                </p>
              </div>

              {/* Email Row */}
              <div className="border-t border-white/10 py-6 space-y-2">
                <h4 className="font-display text-[9px] text-white/50 uppercase tracking-widest">
                  Email Inquiry
                </h4>
                <div className="space-y-1 font-sans text-xs sm:text-sm text-white font-light">
                  <a href="mailto:hello@aufastudio.com" className="hover:text-white/80 transition-colors block">
                    hello@aufastudio.com
                  </a>
                  <a href="mailto:press@aufastudio.com" className="text-white/60 hover:text-white transition-colors block text-xs mt-0.5">
                    press@aufastudio.com
                  </a>
                </div>
              </div>

              {/* Phone Row */}
              <div className="border-t border-white/10 border-b border-white/10 py-6 space-y-2">
                <h4 className="font-display text-[9px] text-white/50 uppercase tracking-widest">
                  Call Us
                </h4>
                <div className="space-y-1 font-sans text-xs sm:text-sm text-white font-light">
                  <a href="tel:+62361765432" className="hover:text-white/80 transition-colors block">
                    +62 361 765 432
                  </a>
                  <span className="text-white/40 text-xs block mt-0.5">
                    Mon - Fri, 09:00 - 18:00 (GMT+8)
                  </span>
                </div>
              </div>

            </div>
            
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 pt-4">
            
            {submitted ? (
              <div className="h-[350px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white animate-pulse">
                  <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-white font-light">Thank You</h3>
                <p className="font-sans text-xs text-white/60 max-w-sm leading-relaxed">
                  Your message has been sent successfully. Our studio team will review your project parameters and contact you within 48 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="font-display text-[9px] uppercase tracking-widest text-white/50 block">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 px-0 text-xs text-white placeholder:text-white/20 outline-none transition-colors duration-300 rounded-none"
                    />
                  </div>
 
                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="font-display text-[9px] uppercase tracking-widest text-white/50 block">Your Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 px-0 text-xs text-white placeholder:text-white/20 outline-none transition-colors duration-300 rounded-none"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1 relative">
                  <label className="font-display text-[9px] uppercase tracking-widest text-white/50 block">Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 px-0 text-xs text-white outline-none transition-colors duration-300 rounded-none cursor-pointer appearance-none"
                  >
                    <option value="Villa" className="bg-charcoal-deep text-white">Luxury Villa / Private Residence</option>
                    <option value="Resort" className="bg-charcoal-deep text-white">Wellness Resort / Cabin Estate</option>
                    <option value="Interior" className="bg-charcoal-deep text-white">Interior Space Architecture</option>
                    <option value="Commercial" className="bg-charcoal-deep text-white">Commercial / Mixed-Use Development</option>
                    <option value="Consultation" className="bg-charcoal-deep text-white">Design Feasibility Consultation</option>
                  </select>
                  {/* Custom Arrow Selector */}
                  <div className="absolute right-0 bottom-3 pointer-events-none text-white/40">
                    <svg className="h-3 w-3 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="font-display text-[9px] uppercase tracking-widest text-white/50 block">Brief Message</label>
                  <textarea 
                    required
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your site location, estimated size, and design goals..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 px-0 text-xs text-white placeholder:text-white/20 outline-none transition-colors duration-300 rounded-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group w-full py-6 border-t border-b border-white/10 hover:border-white text-white font-display text-xs uppercase tracking-widest transition-all duration-500 flex items-center justify-between cursor-pointer focus:outline-none"
                >
                  <span>Send Inquiry</span>
                  <span className="text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg className="h-4 w-4 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
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
