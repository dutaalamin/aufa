import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="relative min-h-screen bg-charcoal text-slate-100 selection:bg-gold selection:text-charcoal-deep overflow-x-hidden font-sans">
      
      {/* 4-Corner Architectural Screen Frame (Aedas premium touch) */}
      <div className="fixed inset-0 pointer-events-none border-[8px] md:border-[12px] border-charcoal-deep z-50" />
      
      {/* Dynamic Background Fine Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines-fine pointer-events-none opacity-20 z-0" />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects onSelectProject={setSelectedProject} />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal Overlay */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
