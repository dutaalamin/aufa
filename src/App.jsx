import React, { useState, useEffect } from 'react';
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

  // Auto-scroll to top when a project is selected or deselected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedProject]);

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
