/**
 * ============================================================================
 * MAIN APPLICATION CONTAINER - AAYUSH RAJ PORTFOLIO
 * ============================================================================
 * Orchestrates all visual and interactive sections in order:
 *  1. Header: Fixed navbar with "Say Hi" email action and active link tracking
 *  2. Hero: Headline typography, studio portrait, and CTA pills
 *  3. LabSection: Orbital Energy Collector physics arcade & Developer CLI
 *  4. WorkSection: 2x2 grid featuring 1st project and reserved slots
 *  5. StackSection: Filterable skill matrix with confidence progress meters
 *  6. AboutSection: Scroll word illumination, academic badges & education focus
 *  7. SayHelloSection: Electric cobalt blue CTA banner with clipboard copy
 *  8. ProjectModal / ContactModal / ResumeModal: Overlays for detail views
 * 
 * HOW TO EDIT:
 * - See `/docs/DOCUMENTATION.md` for section guides and customization instructions.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LabSection } from './components/LabSection';
import { WorkSection } from './components/WorkSection';
import { StackSection } from './components/StackSection';
import { AboutSection } from './components/AboutSection';
import { SayHelloSection } from './components/SayHelloSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { USER_PROFILE, PROJECTS } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  // Navigation & Modal States
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Active section detector & scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      const sections = ['home', 'lab', 'work', 'arsenal', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTerminal = () => {
    handleNavigate('lab');
  };

  return (
    <div className="min-h-screen bg-[#0c1324] text-slate-100 font-inter selection:bg-[#4fb4ff] selection:text-[#003352] relative">
      
      {/* 
        ======================================================================
        TOP READING SCROLL PROGRESS BAR
        ======================================================================
      */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#4fb4ff] to-[#008ef1] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 
        ======================================================================
        1. FIXED HEADER NAVBAR
        ======================================================================
      */}
      <Header
        profile={USER_PROFILE}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative w-full">
        
        {/* 2. Hero Introduction Section */}
        <Hero
          profile={USER_PROFILE}
          onNavigate={handleNavigate}
          onOpenTerminal={handleOpenTerminal}
        />

        {/* 3. Interactive Sandbox & Kinetic Particle Game */}
        <LabSection profile={USER_PROFILE} />

        {/* 4. Selected Work / Projects (2x2 Grid) */}
        <WorkSection
          projects={PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 5. Arsenal / Skills & Tools Matrix */}
        <StackSection />

        {/* 6. About Me (Narrative Illumination + Academic Focus) */}
        <AboutSection
          profile={USER_PROFILE}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 7. Say Hello / Contact CTA Banner */}
        <SayHelloSection
          profile={USER_PROFILE}
          onOpenContactModal={() => setIsContactOpen(true)}
        />
      </main>

      {/* 
        ======================================================================
        MODAL OVERLAYS
        ======================================================================
      */}
      {/* Interactive Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Transmission Contact Form Modal */}
      <ContactModal
        profile={USER_PROFILE}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Single-Page Printable / Viewable Resume / CV Modal */}
      <ResumeModal
        profile={USER_PROFILE}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
