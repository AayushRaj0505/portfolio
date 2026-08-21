/**
 * ============================================================================
 * PROJECT CASE STUDY MODAL COMPONENT
 * ============================================================================
 * Deep dive overlay displaying complete architectural blueprints, key metrics,
 * milestones, and live source code / demo links for selected projects.
 * ============================================================================
 */

import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Layers, Calendar } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll and listen for Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0f172a] border border-white/15 rounded-2xl shadow-2xl text-slate-100 flex flex-col">
        
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#008ef1]/15 text-[#4fb4ff] border border-[#008ef1]/30 font-mono-code text-[11px] uppercase tracking-wider font-semibold">
              {project.category}
            </span>
            <span className="font-mono-code text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.period}
            </span>
          </div>
          <button
            onClick={onClose}
            id="close-project-modal-btn"
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Hero Banner */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-[#070d1f]">
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="font-inter text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-8">
          
          {/* Key Metrics Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono-code text-[11px] text-slate-400 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#4fb4ff] mt-0.5">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Deep Overview & Blueprint */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono-code text-xs text-[#4fb4ff] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
              <Layers className="w-4 h-4" /> Architectural Blueprint &amp; Purpose
            </h3>
            <p className="font-inter text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
            {project.architectureOverview && (
              <div className="p-4 rounded-lg bg-[#070d1f] border border-white/5 font-mono-code text-xs text-slate-300 leading-relaxed mt-2">
                <span className="text-[#ffbc4d] font-semibold block mb-1">Architecture Highlights:</span>
                {project.architectureOverview}
              </div>
            )}
          </div>

          {/* Key Innovations & Milestones */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono-code text-xs text-[#4fb4ff] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Core Innovations &amp; Milestones
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4fb4ff] mt-2 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono-code text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && project.liveUrl !== '#home' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="modal-live-demo-link"
                  className="px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-inter text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="modal-github-code-link"
                  className="px-4 py-2.5 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/5 font-inter text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono-code text-slate-400 hover:text-white cursor-pointer"
            >
              Press ESC or click outside to close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
