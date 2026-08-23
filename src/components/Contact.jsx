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
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                Contact
              </h2>
            </div>

            {/* Studio Info List (Simple text style) */}
            <div className="w-full flex flex-col space-y-6">
              
              {/* Email Row */}
              <div className="space-y-2">
                <h4 className="font-display text-[9px] text-white/50 uppercase tracking-widest">
                  Email Inquiry
                </h4>
                <div className="space-y-1 font-sans text-sm sm:text-base text-white font-light">
                  <a href="mailto:hello@aufastudio.com" className="hover:text-white/80 transition-colors block font-medium">
                    hello@aufastudio.com
                  </a>
                  <a href="mailto:press@aufastudio.com" className="text-white/60 hover:text-white transition-colors block text-sm mt-1">
                    press@aufastudio.com
                  </a>
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
                      className="w-full bg-white text-slate-900 px-4 py-3 text-xs outline-none rounded-none placeholder:text-slate-400"
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
                      className="w-full bg-white text-slate-900 px-4 py-3 text-xs outline-none rounded-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1 relative">
                  <label className="font-display text-[9px] uppercase tracking-widest text-white/50 block">Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-white text-slate-900 px-4 py-3 text-xs outline-none rounded-none cursor-pointer appearance-none pr-10"
                  >
                    <option value="Villa" className="bg-white text-slate-900">Luxury Villa / Private Residence</option>
                    <option value="Resort" className="bg-white text-slate-900">Wellness Resort / Cabin Estate</option>
                    <option value="Interior" className="bg-white text-slate-900">Interior Space Architecture</option>
                    <option value="Commercial" className="bg-white text-slate-900">Commercial / Mixed-Use Development</option>
                    <option value="Consultation" className="bg-white text-slate-900">Design Feasibility Consultation</option>
                  </select>
                  {/* Custom Arrow Selector */}
                  <div className="absolute right-3 top-[32px] pointer-events-none text-slate-500">
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
                    className="w-full bg-white text-slate-900 px-4 py-3 text-xs outline-none rounded-none resize-none placeholder:text-slate-400"
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
