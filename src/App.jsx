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
import Preloader from './components/Preloader';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Smooth page transition handler for selecting projects
  const navigateToProject = React.useCallback((project) => {
    setIsTransitioning(true);
    setIsDetailsOpen(false);
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

  // Smooth transition to 2D Home page deactivating 3D mode
  const goBackToHome = React.useCallback(() => {
    setIsTransitioning(true);
    setIsDetailsOpen(false);
    if (window.lenis) window.lenis.stop();

    setTimeout(() => {
      setIs3DActive(false);
      setSelectedProject(null);

      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      setTimeout(() => {
        setIsTransitioning(false);
        if (window.lenis) window.lenis.start();
      }, 150);
    }, 400);
  }, []);

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
    // If id is '3d-home', stay in 3D mode but return to the 3D home matrix
    if (id === '3d-home') {
      setIsDetailsOpen(false);
      navigateToProject(null);
      return;
    }

    // If in 3D mode, close it first
    if (is3DActive) setIs3DActive(false);
    setIsDetailsOpen(false);

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
        {is3DActive && (
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

      {/* 0. PREMIUM PRELOADER INTRO SCREEN */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Page Transition Overlay (Theme-adaptive minimal shutter transition) */}
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
            className={`fixed inset-0 z-50 pointer-events-auto ${
              is3DActive ? 'bg-white' : 'bg-charcoal-deep'
            }`}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Background Fine Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-20 z-0" />

      {/* Navigation */}
      {(!selectedProject || (is3DActive && !isDetailsOpen)) && (
        <Navbar 
          onNavigate={handleNavigate} 
          is3DActive={is3DActive} 
          setIs3DActive={setIs3DActive} 
          selectedProject={selectedProject}
          showPreloader={showPreloader}
        />
      )}

      {/* Main Sections */}
      <main className="relative z-10">
        {selectedProject ? (
          is3DActive ? (
            <ProjectDetail3D 
              project={selectedProject} 
              onBack={() => navigateToProject(null)} 
              onDetailsToggle={setIsDetailsOpen}
              onGoHome={goBackToHome}
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
                <Hero onSelectProject={navigateToProject} setIs3DActive={setIs3DActive} />
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
