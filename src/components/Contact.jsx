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

      {/* Main Container - Full width matching Projects/Experiences */}
      <div className="w-full px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Section Header (Unified style aligning with Experiences) */}
        <div className="border-b border-white/5 pb-4">
          <h2 className="font-display text-xl sm:text-2xl font-light text-white tracking-wide uppercase">
            Contact
          </h2>
        </div>
        
        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Email Inquiry */}
          <div className="lg:col-span-4 space-y-2">
            <h4 className="font-display text-[9px] text-white/50 uppercase tracking-widest">
              Email Inquiry
            </h4>
            <a 
              href="mailto:hello@aufastudio.com" 
              className="font-sans text-sm sm:text-base text-white hover:text-white/80 font-medium transition-colors block"
            >
              hello@aufastudio.com
            </a>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-8">
            
            {submitted ? (
              <div className="h-[200px] flex flex-col justify-center text-left space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-light text-white">Thank you.</h3>
                <p className="font-sans text-xs sm:text-sm text-white/50">
                  Your message has been sent.
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
                      className="w-full bg-white/[0.02] border border-white/15 focus:border-white focus:bg-white/[0.04] px-4 py-3 text-xs text-white placeholder:text-white/30 outline-none rounded-none transition-all duration-300"
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
                      className="w-full bg-white/[0.02] border border-white/15 focus:border-white focus:bg-white/[0.04] px-4 py-3 text-xs text-white placeholder:text-white/30 outline-none rounded-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1 relative">
                  <label className="font-display text-[9px] uppercase tracking-widest text-white/50 block">Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/15 focus:border-white focus:bg-white/[0.04] px-4 py-3 text-xs text-white outline-none rounded-none cursor-pointer appearance-none pr-10 transition-all duration-300"
                  >
                    <option value="Villa" className="bg-charcoal-deep text-white">Luxury Villa / Private Residence</option>
                    <option value="Resort" className="bg-charcoal-deep text-white">Wellness Resort / Cabin Estate</option>
                    <option value="Interior" className="bg-charcoal-deep text-white">Interior Space Architecture</option>
                    <option value="Commercial" className="bg-charcoal-deep text-white">Commercial / Mixed-Use Development</option>
                    <option value="Consultation" className="bg-charcoal-deep text-white">Design Feasibility Consultation</option>
                  </select>
                  {/* Custom Arrow Selector */}
                  <div className="absolute right-3 top-[32px] pointer-events-none text-white/50">
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
                    className="w-full bg-white/[0.02] border border-white/15 focus:border-white focus:bg-white/[0.04] px-4 py-3 text-xs text-white placeholder:text-white/30 outline-none rounded-none resize-none transition-all duration-300"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group w-full py-4 text-white hover:text-white/80 font-display text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none"
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
