import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth page transition handler for selecting projects
  const navigateToProject = (project) => {
    setIsTransitioning(true);
    if (window.lenis) window.lenis.stop();

    // After 500ms (when transition overlay is dark), swap content and scroll
    setTimeout(() => {
      setSelectedProject(project);

      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      // Short buffer before fading transition screen out
      setTimeout(() => {
        setIsTransitioning(false);
        if (window.lenis) window.lenis.start();
      }, 300);
    }, 500);
  };

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (showPreloader) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutQuart
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [showPreloader]);

  // Auto-scroll to top when a project is selected or deselected
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedProject]);

  // Handle preloader display time (faster timeout)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when preloader is active
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (window.lenis) window.lenis.start();
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
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { duration: 1.5 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { duration: 1.5 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
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
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 bg-charcoal-deep z-50 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Architectural Grid Lines Overlay */}
            <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-15" />
            <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-20" />
            
            <div className="relative flex flex-col items-center gap-6 overflow-hidden">
              {/* Expanding Logo Letter-Spacing Animation (Snappy & Fast) */}
              <motion.div
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ 
                  letterSpacing: "0.8em", 
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                }}
                exit={{ 
                  scale: 0.98,
                  opacity: 0,
                  transition: { duration: 0.3, ease: "easeIn" }
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

      {/* Page Transition Loader Screen */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            className="fixed inset-0 bg-charcoal-deep z-50 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-15" />
            <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-20" />
            
            <div className="relative flex flex-col items-center gap-4 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="font-display text-xs uppercase tracking-mega text-white font-light text-glow"
              >
                LOADING PROJECT
              </motion.div>
              
              {/* Thin elegant horizontal line loader */}
              <div className="w-20 h-[1px] bg-white/10 overflow-hidden relative">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
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
            onBack={() => navigateToProject(null)} 
            onSelectProject={navigateToProject}
          />
        ) : (
          <>
            <Hero onSelectProject={navigateToProject} />
            <AboutStatement />
            <About />
            <Projects onSelectProject={navigateToProject} />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
