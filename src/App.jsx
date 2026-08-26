import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutStatement from './components/AboutStatement';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import ProjectDetail3D from './components/ProjectDetail3D';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeHero from './components/ThreeHero';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);

  // Smooth page transition handler for selecting projects
  const navigateToProject = React.useCallback((project) => {
    setIsTransitioning(true);
    if (window.lenis) window.lenis.stop();

    // After 400ms (when transition overlay is dark), swap content and scroll
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
        if (window.lenis && !is3DActive) window.lenis.start();
      }, 150);
    }, 400);
  }, [is3DActive]);

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

  // Prevent background scrolling when preloader, selected project, or 3D mode is active
  useEffect(() => {
    if (showPreloader || is3DActive || selectedProject) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPreloader, is3DActive, selectedProject]);

  const handleNavigate = (id) => {
    // If in 3D mode, close it first
    if (is3DActive) setIs3DActive(false);

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
      
      {/* 3D Canvas Background Layer */}
      <AnimatePresence>
        {is3DActive && !selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-10 bg-white"
          >
            <ThreeHero onSelectProject={navigateToProject} selectedProject={selectedProject} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Mode Toggle Button */}
      {!selectedProject && !showPreloader && (
        <button
          onClick={() => setIs3DActive(!is3DActive)}
          className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 px-5 py-2 rounded-full text-[10px] font-display tracking-[0.3em] font-medium uppercase transition-all duration-500 cursor-pointer pointer-events-auto shadow-sm ${
            is3DActive
              ? 'bg-neutral-950 text-white hover:bg-neutral-800 border border-neutral-900'
              : 'bg-white/5 text-white/90 hover:bg-white hover:text-black border border-white/15'
          }`}
        >
          {is3DActive ? 'EXIT' : '3D'}
        </button>
      )}

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

      {/* Page Transition Overlay (Minimal clean dip-to-black shutter) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.25 }
            }}
            className="fixed inset-0 bg-charcoal-deep z-50 pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Dynamic Background Fine Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-20 z-0" />

      {/* Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Sections */}
      <main className="relative z-10">
        {selectedProject ? (
          is3DActive ? (
            <ProjectDetail3D 
              project={selectedProject} 
              onBack={() => navigateToProject(null)} 
              onSelectProject={navigateToProject}
            />
          ) : (
            <ProjectDetail 
              project={selectedProject} 
              onBack={() => navigateToProject(null)} 
              onSelectProject={navigateToProject}
            />
          )
        ) : (
          <>
            {is3DActive ? (
              null
            ) : (
              <>
                <Hero onSelectProject={navigateToProject} />
                <AboutStatement />
                <About />
                <Projects onSelectProject={navigateToProject} />
                <Contact />
                <Footer />
              </>
            )}
          </>
        )}
      </main>

    </div>
  );
}
