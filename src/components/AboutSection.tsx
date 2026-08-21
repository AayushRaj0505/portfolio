/**
 * ============================================================================
 * ABOUT ME SECTION COMPONENT
 * ============================================================================
 * Features narrative storytelling with interactive scroll-based word illumination,
 * quick status badges, expandable academic & engineering focus accordion, and a CV modal trigger.
 * 
 * HOW TO EDIT:
 * - Change the narrative text: edit `para1Text` and `para2Text` below.
 * - Change location/skills badges: edit the badge spans in paragraph 1.
 * - Change the education cards: edit the expandable deep dive grid below.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { MapPin, Terminal, Sparkles, ArrowRight, FileText, GraduationCap, Languages } from 'lucide-react';

interface AboutSectionProps {
  profile: UserProfile;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, onOpenResume }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollRatio, setScrollRatio] = useState<number>(0);

  /* 
    ==========================================================================
    SCROLL-BASED TEXT ILLUMINATION TRACKER:
    - Words illuminate from muted gray into crisp white font as you scroll.
    ==========================================================================
  */
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight * 0.9;
      const end = -rect.height * 0.5;
      const current = rect.top;
      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollRatio(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* 
    ==========================================================================
    NARRATIVE TEXT STRINGS:
    - Updated to reflect that this is Aayush's first project in life, currently
      in college for B.Tech in CSE (AI) graduating in 2030, and IIT Madras Data Science.
    ==========================================================================
  */
  const para1Text = "I'm Aayush, a Computer Science & Engineering student specializing in AI, also pursuing Data Science from IIT Madras. This portfolio is the very first project I have built in my life as I dive into web engineering, algorithms, and intelligent systems.";
  const para2Text = "I believe great engineering is about mastering foundational computer science concepts, writing clean and readable code, and continuously learning by building real, interactive applications.";

  // Helper rendering illuminated words
  const renderIlluminatedWords = (text: string, progressOffset: number, progressScale: number) => {
    const words = text.split(' ');
    return words.map((word, idx) => {
      const wordProgress = (idx / words.length) * progressScale + progressOffset;
      const isLit = scrollRatio >= wordProgress;
      return (
        <span
          key={idx}
          className={`transition-colors duration-500 ease-out ${
            isLit ? 'text-white font-medium drop-shadow-sm' : 'text-slate-500/40'
          }`}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-28 w-full bg-[#0c1324] border-t border-white/10 relative z-20"
      id="about"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8 w-full flex flex-col gap-12">
        
        {/* Section Header Label */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono-code text-[12px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4fb4ff]" />
            About me
          </span>
        </div>

        {/* 1st Narrative Paragraph */}
        <div className="flex flex-col gap-6">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug tracking-tight">
            {renderIlluminatedWords(para1Text, 0.05, 0.45)}
          </p>

          {/* Badges Directly Under 1st Paragraph */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Badge 1: Location */}
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono-code text-xs text-white flex items-center gap-2 hover:border-[#4fb4ff] transition-colors cursor-default shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#4fb4ff]" />
              <span>India • Available worldwide</span>
            </span>

            {/* Badge 2: Academic Specialisation */}
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono-code text-xs text-white flex items-center gap-2 hover:border-[#ffbc4d] transition-colors cursor-default shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-[#ffbc4d]" />
              <span>CSE (AI) 2030 &amp; IIT Madras (2025)</span>
            </span>

            {/* Badge 3: Languages Known */}
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono-code text-xs text-white flex items-center gap-2 hover:border-emerald-400 transition-colors cursor-default shadow-sm">
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>English, Hindi, Japanese</span>
            </span>
          </div>
        </div>

        {/* 2nd Narrative Paragraph */}
        <div className="flex flex-col gap-6 pt-4">
          <p className="font-display text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight">
            {renderIlluminatedWords(para2Text, 0.5, 0.45)}
          </p>

          {/* Action Buttons Directly Under 2nd Paragraph */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* "More about me" Accordion Toggle */}
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              id="more-about-me-btn"
              className="px-6 py-3 border border-white/25 hover:border-white text-white font-inter text-xs tracking-wider uppercase font-semibold rounded-full hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{showFullBio ? 'Show Less' : 'More about me'}</span>
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showFullBio ? 'rotate-90' : ''}`} />
            </button>

            {/* "Resume / CV" Modal Trigger Button */}
            <button
              onClick={onOpenResume}
              id="about-resume-btn"
              className="px-7 py-3 bg-white text-slate-950 font-inter text-xs tracking-wider uppercase font-semibold rounded-full hover:bg-slate-200 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-white/10 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Resume / CV</span>
            </button>
          </div>
        </div>

        {/* 
          ==========================================================================
          EXPANDABLE ACADEMIC & ENGINEERING FOCUS ACCORDION
          ==========================================================================
        */}
        {showFullBio && (
          <div className="mt-6 p-8 rounded-2xl bg-[#151b2d] border border-white/15 animate-fadeIn flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#4fb4ff]" /> Education &amp; Learning Journey
              </h3>
              <span className="font-mono-code text-xs text-slate-400">
                Undergraduate • In College
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-slate-300 font-inter leading-relaxed">
              {/* Card 1: B.Tech in CSE (AI) */}
              <div className="p-5 rounded-xl bg-[#070d1f] border border-white/10 flex flex-col gap-2">
                <span className="font-mono-code text-xs text-[#4fb4ff] uppercase font-semibold">1. B.Tech in CSE (AI)</span>
                <p className="text-xs text-slate-300">
                  Currently in college pursuing B.Tech in Computer Science with a Specialisation in Artificial Intelligence (Graduating in 2030).
                </p>
              </div>

              {/* Card 2: IIT Madras Data Science */}
              <div className="p-5 rounded-xl bg-[#070d1f] border border-white/10 flex flex-col gap-2">
                <span className="font-mono-code text-xs text-[#ffbc4d] uppercase font-semibold">2. IIT Madras Data Science</span>
                <p className="text-xs text-slate-300">
                  Pursuing Data Science from Indian Institute of Technology Madras (IIT Madras) from 2025, focusing on mathematical foundations, Python, and data algorithms.
                </p>
              </div>

              {/* Card 3: First Project & Languages */}
              <div className="p-5 rounded-xl bg-[#070d1f] border border-white/10 flex flex-col gap-2">
                <span className="font-mono-code text-xs text-emerald-400 uppercase font-semibold">3. First Project &amp; Languages</span>
                <p className="text-xs text-slate-300">
                  This portfolio is my very first software build in life. Multilingual communicator in <strong>English</strong>, <strong>Hindi</strong>, and <strong>Japanese</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
