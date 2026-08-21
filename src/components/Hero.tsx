/**
 * ============================================================================
 * HERO INTRODUCTION COMPONENT
 * ============================================================================
 * The primary full-screen landing view featuring Aayush's headline typography,
 * portrait photo background, call-to-action pills, and teaser to the Lab.
 * 
 * HOW TO EDIT:
 * - Change headline or sub-headline: edit the <h1> and <h2> tags below.
 * - Change bio pitch: edit the paragraph text inside the hero content wrapper.
 * - Change background colors: edit the style={{ backgroundColor, backgroundImage }}.
 * - Change portrait photos: replace the image imports at the top of this file.
 * ============================================================================
 */

import React from 'react';
import { UserProfile } from '../types';
import { ArrowDown, Sparkles } from 'lucide-react';

/* 
  ==========================================================================
  IMAGE ASSETS & PORTRAIT CONFIGURATION:
  - heroDesktopImg: Full-width background portrait for desktop & tablet screens
  - heroMobileImg: Vertical background portrait optimized for mobile devices
  ==========================================================================
*/
import heroDesktopImg from '../assets/images/new-6-(1).png';
import heroMobileImg from '../assets/images/aayush-mobile-image.png';

interface HeroProps {
  profile: UserProfile;
  onNavigate: (sectionId: string) => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate }) => {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#1e78b7] text-white select-none"
      id="home"
      style={{
        /* 
          HERO BACKGROUND COLOR & STUDIO SPOTLIGHT GRADIENT:
          - Creates a smooth studio lighting atmosphere behind the portrait photo.
        */
        backgroundColor: '#1e78b7',
        backgroundImage: 'radial-gradient(circle at 70% 30%, #2989cc 0%, #1c74b3 55%, #15629c 100%)',
      }}
    >
      {/* 
        ==========================================================================
        BACKGROUND PORTRAIT CONTAINER:
        - Mobile: uses heroMobileImg centered.
        - Tablet & Desktop: uses heroDesktopImg positioned cleanly on the right half.
        ==========================================================================
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Desktop & Tablet Portrait */}
        <img
          src={heroDesktopImg}
          alt={profile.name || "Aayush Raj"}
          className="hidden md:block w-full h-full object-cover md:object-[86%_center] lg:object-[75%_center] xl:object-right-center mix-blend-normal opacity-95 transition-all duration-700 md:scale-100 lg:scale-[1.05]"
        />
        {/* Mobile Portrait */}
        <img
          src={heroMobileImg}
          alt={profile.name || "Aayush Raj"}
          className="block md:hidden w-full h-full object-cover object-center opacity-90 transition-opacity duration-700"
        />
        
        {/* Readability Gradient Scrims (Ensures text is 100% crisp & readable) */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#1766a0]/85 via-[#1c74b3]/40 to-transparent pointer-events-none hidden md:block" />
        <div className="absolute bottom-0 inset-x-0 h-3/5 bg-gradient-to-t from-[#15629c]/95 via-[#1766a0]/60 to-transparent pointer-events-none md:hidden" />
      </div>

      {/* 
        ==========================================================================
        HERO CONTENT OVERLAY (Display Typography & Action Buttons)
        ==========================================================================
      */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full min-h-screen flex flex-col justify-end md:justify-center pt-28 pb-16 md:py-24 relative z-10">
        <div className="max-w-xl lg:max-w-2xl flex flex-col items-start gap-4 sm:gap-6 animate-fadeIn">
          
          {/* Main Display Typography (Headline & Subhead) */}
          <div className="space-y-1 sm:space-y-2">
            {/* Primary Name Headline */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.02] drop-shadow-sm">
              Aayush Raj.
            </h1>
            {/* Specialisation Sub-Headline */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#95d2fb] tracking-tight leading-[1.08] drop-shadow-sm">
              CSE (AI) &amp; Data Science Scholar.
            </h2>
          </div>

          {/* Subtitle / Bio Pitch */}
          <p className="font-inter text-sm sm:text-base md:text-lg text-slate-100/95 max-w-xl leading-relaxed font-normal pt-2 drop-shadow-sm">
            Undergraduate student specializing in Artificial Intelligence (graduating 2030) and pursuing Data Science from IIT Madras. Exploring web engineering, interactive physics, and building smart software.
          </p>

          {/* Action Button Capsules */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            {/* "View my work" Solid White Pill Button */}
            <button
              onClick={() => onNavigate('work')}
              id="hero-view-work-btn"
              className="px-7 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-inter text-sm font-bold rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-black/15 cursor-pointer"
            >
              <span>View my work</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            {/* "About me" Glass Pill Button */}
            <button
              onClick={() => onNavigate('about')}
              id="hero-about-me-btn"
              className="px-7 py-3.5 bg-slate-950/30 hover:bg-slate-950/50 backdrop-blur-md border border-white/25 hover:border-white/50 text-white font-inter text-sm font-semibold rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            >
              <span>About me</span>
            </button>
          </div>

          {/* Quick Lab Teaser Button */}
          <div className="pt-2">
            <button
              onClick={() => onNavigate('lab')}
              className="inline-flex items-center gap-2 text-xs font-mono-code text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15 transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Explore Interactive Lab &amp; Game →</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
