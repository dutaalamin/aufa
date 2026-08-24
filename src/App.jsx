import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutStatement from './components/AboutStatement';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);

  // Auto-scroll to top when a project is selected or deselected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedProject]);

  // Handle preloader display time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when preloader is active
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPreloader]);

  const handleNavigate = (id) => {
    if (selectedProject) {
      setSelectedProject(null);
      // Wait for Home components to mount, then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-charcoal-deep text-slate-100 selection:bg-white selection:text-black overflow-x-clip font-sans">
      
      {/* 0. PREMIUM PRELOADER INTRO SCREEN */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 bg-charcoal-deep z-50 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Architectural Grid Lines Overlay */}
            <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-15" />
            <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-20" />
            
            <div className="relative flex flex-col items-center gap-6 overflow-hidden">
              {/* Expanding Logo Letter-Spacing Animation */}
              <motion.div
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ 
                  letterSpacing: "0.8em", 
                  opacity: 1,
                  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                }}
                exit={{ 
                  scale: 0.97,
                  opacity: 0,
                  transition: { duration: 0.6, ease: "easeIn" }
                }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white select-none text-center pl-[0.8em]"
              >
                AUFA
              </motion.div>
              
              {/* Sleek Minimalist Linear Progress Bar */}
              <div className="w-20 sm:w-28 h-[1px] bg-white/10 overflow-hidden relative mt-1">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ 
                    left: "100%",
                    transition: { 
                      duration: 1.8, 
                      ease: "easeInOut",
                      repeat: Infinity
                    }
                  }}
                  className="absolute top-0 bottom-0 w-1/2 bg-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Background Fine Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-20 z-0" />

      {/* Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Sections */}
      <main className="relative z-10">
        {selectedProject ? (
          <ProjectDetail 
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
            onSelectProject={setSelectedProject}
          />
        ) : (
          <>
            <Hero onSelectProject={setSelectedProject} />
            <AboutStatement />
            <About />
            <Projects onSelectProject={setSelectedProject} />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
