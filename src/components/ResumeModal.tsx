/**
 * ============================================================================
 * RESUME / CURRICULUM VITAE MODAL COMPONENT
 * ============================================================================
 * Clean, single-page printable Curriculum Vitae modal with PDF export support.
 * 
 * DETAILS INCLUDED:
 * - Bachelor of Technology in Computer Science & Engineering (CSE)
 *   with Specialisation in Artificial Intelligence (AI) - Graduating in 2030
 * - Data Science Program from IIT Madras (From 2025)
 * - Languages Known: English, Hindi, Japanese
 * - First engineering build: Intro Webpage & Cinematic Portfolio
 * 
 * HOW TO EDIT:
 * - Modify education, summary, or project bullet points directly in this file
 *   or in `/src/data/portfolioData.ts`.
 * ============================================================================
 */

import React, { useEffect } from 'react';
import { UserProfile } from '../types';
import { X, Code, Briefcase, GraduationCap, MapPin, Mail, Github, Globe } from 'lucide-react'; //add download here 

interface ResumeModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ profile, isOpen, onClose }) => {
  // Lock body scroll and listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Single-Page Print / Download Trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0f172a] border border-white/20 rounded-2xl shadow-2xl text-slate-100 flex flex-col">
        
        {/* Top Action Header Bar (Excluded from Print) */}
        <div className="no-print sticky top-0 z-20 flex items-center justify-between px-5 sm:px-6 py-3.5 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono-code text-xs text-white font-semibold uppercase tracking-wider">
              Curriculum Vitae • {profile.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* <button
              onClick={handlePrint}
              id="print-resume-btn"
              className="px-3 py-1.5 rounded-lg bg-[#008ef1] hover:bg-[#007cd3] text-white transition-colors text-xs font-inter font-semibold flex items-center gap-1.5 shadow-md shadow-[#008ef1]/20 cursor-pointer"
              title="Download 1-Page PDF / Print"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF / Print</span>
              <span className="sm:hidden">Print</span>
            </button> */}
            <button
              onClick={onClose}
              id="close-resume-modal-btn"
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dedicated Single-Page Printable Document Sheet */}
        <div
          id="printable-cv-document"
          className="p-6 sm:p-8 md:p-9 flex flex-col gap-5 text-slate-300 font-inter text-xs leading-relaxed bg-[#0f172a] print:bg-white print:text-slate-900 print:p-0"
        >
          
          {/* Header Contact Block */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-white/10 print:border-slate-300">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white print:text-slate-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="font-inter text-sm text-[#4fb4ff] print:text-sky-700 font-semibold mt-0.5">
                B.Tech in CSE (AI, Graduating 2030) | IIT Madras Data Science (2025)
              </p>
            </div>
            <div className="flex flex-col gap-1 text-[11px] font-mono-code text-slate-400 print:text-slate-700">
              <span className="flex items-center gap-1.5 text-slate-200 print:text-slate-900 font-semibold">
                <Mail className="w-3.5 h-3.5 text-[#4fb4ff] print:text-sky-700 shrink-0" /> {profile.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 print:text-slate-500 shrink-0" /> {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400 print:text-slate-500 shrink-0" /> github.com/aayushraj0505
              </span>
            </div>
          </div>

          {/* Academic & Career Profile Summary */}
          <div className="flex flex-col gap-1.5">
            <h2 className="font-mono-code text-[11px] text-[#ffbc4d] print:text-amber-800 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> Academic &amp; Engineering Profile
            </h2>
            <p className="text-slate-300 print:text-slate-800 text-[11.5px] leading-relaxed">
              Undergraduate Computer Science &amp; Engineering student with a specialisation in Artificial Intelligence (graduating 2030) and pursuing Data Science at IIT Madras (from 2025). Passionate about algorithmic problem solving, web engineering, interactive systems, and machine learning. This portfolio represents my very first completed engineering build.
            </p>
          </div>

          {/* Education Breakdown (Updated with graduation year 2030 & IIT Madras from 2025) */}
          <div className="flex flex-col gap-2">
            <h2 className="font-mono-code text-[11px] text-[#4fb4ff] print:text-sky-800 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Education &amp; Academic Credentials
            </h2>
            <div className="flex flex-col gap-2.5">
              {/* Institution 1: B.Tech CSE (AI) */}
              <div className="p-3 rounded-xl bg-[#070d1f] print:bg-slate-100 border border-white/5 print:border-slate-200 flex flex-col gap-0.5">
                <div className="flex flex-wrap justify-between items-center">
                  <strong className="text-white print:text-slate-900 text-xs font-display">
                    Bachelor of Technology (B.Tech) - Computer Science &amp; Engineering (CSE)
                  </strong>
                  <span className="font-mono-code text-[10.5px] text-[#4fb4ff] print:text-sky-800 font-semibold">
                    Graduating in 2030
                  </span>
                </div>
                <span className="text-[11px] text-[#ffbc4d] print:text-amber-800 font-mono-code">
                  Specialisation in Artificial Intelligence (AI) • Undergraduate (In Progress)
                </span>
                <p className="text-[11px] text-slate-300 print:text-slate-700 mt-1">
                  Focus: Artificial Intelligence, Machine Learning, Data Structures &amp; Algorithms, Object-Oriented Programming, and Computer Science Foundations.
                </p>
              </div>

              {/* Institution 2: IIT Madras Data Science */}
              <div className="p-3 rounded-xl bg-[#070d1f] print:bg-slate-100 border border-white/5 print:border-slate-200 flex flex-col gap-0.5">
                <div className="flex flex-wrap justify-between items-center">
                  <strong className="text-white print:text-slate-900 text-xs font-display">
                    Data Science Program - Indian Institute of Technology Madras (IIT Madras)
                  </strong>
                  <span className="font-mono-code text-[10.5px] text-emerald-400 print:text-emerald-800 font-semibold">
                    Pursuing (From 2025)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 print:text-slate-600 font-mono-code">
                  Foundational &amp; Advanced Coursework in Data Science, Statistics, and Python
                </span>
                <p className="text-[11px] text-slate-300 print:text-slate-700 mt-1">
                  Rigorous curriculum focusing on computational thinking, mathematical modeling, statistical analysis, and Python programming.
                </p>
              </div>
            </div>
          </div>

          {/* Languages Known & Core Competencies */}
          <div className="flex flex-col gap-1.5">
            <h2 className="font-mono-code text-[11px] text-emerald-400 print:text-emerald-800 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Languages Known &amp; Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono-code">
              {/* Languages Known */}
              <div className="p-2.5 rounded-lg bg-[#070d1f] print:bg-slate-100 border border-white/5 print:border-slate-200">
                <strong className="text-white print:text-slate-900 block mb-0.5">Languages Known:</strong>
                <span className="text-slate-300 print:text-slate-800">
                  • <strong>English</strong> (Fluent)<br />
                  • <strong>Hindi</strong> (Native)<br />
                  • <strong>Japanese</strong> (Learning &amp; Conversational)
                </span>
              </div>
              
              {/* Core Technologies */}
              <div className="p-2.5 rounded-lg bg-[#070d1f] print:bg-slate-100 border border-white/5 print:border-slate-200">
                <strong className="text-white print:text-slate-900 block mb-0.5">Programming &amp; Web Stack:</strong>
                <span className="text-slate-400 print:text-slate-700">
                  C / C++, Python, JavaScript (ES6+), React 19, TypeScript, Tailwind CSS, HTML5 Canvas API, Git &amp; GitHub
                </span>
              </div>
            </div>
          </div>

          {/* First Engineering Project */}
          <div className="flex flex-col gap-2">
            <h2 className="font-mono-code text-[11px] text-[#ffbc4d] print:text-amber-800 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Engineering Showcase &amp; Projects
            </h2>
            <div className="border-l-2 border-[#4fb4ff]/60 print:border-sky-700 pl-3 flex flex-col gap-0.5">
              <div className="flex flex-wrap justify-between items-center">
                <h3 className="text-white print:text-slate-900 font-bold text-xs font-display">
                  Interactive Portfolio &amp; Kinetic Particle Sandbox Lab (1st Project Built)
                </h3>
                <span className="font-mono-code text-[10.5px] text-slate-400 print:text-slate-600">2025 - 2026</span>
              </div>
              <span className="text-[10.5px] text-[#4fb4ff] print:text-sky-700 font-mono-code">React 19, TypeScript, Tailwind CSS v4, HTML5 Canvas API</span>
              <ul className="mt-1 list-disc list-inside text-[11px] text-slate-300 print:text-slate-700 space-y-0.5">
                <li>Built a full-featured web portfolio with dark Obsidian aesthetics and 100% responsive cross-device layout.</li>
                <li>Engineered a custom 60 FPS multi-wave particle arcade simulation with collision mathematics and gravity mechanics.</li>
                <li>Created an interactive developer terminal CLI with command parsing and quick chips.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
