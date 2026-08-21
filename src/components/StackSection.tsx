/**
 * ============================================================================
 * ARSENAL / SKILLS & TOOLS SECTION COMPONENT
 * ============================================================================
 * Displays Aayush's technical skills organized by category pills with confidence
 * progress meters and an interactive detail modal on card click.
 * 
 * HOW TO EDIT:
 * - Modify skill list and proficiencies in `/src/data/portfolioData.ts`.
 * - Change filter categories in `categories` array below.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../data/portfolioData';
import { Skill } from '../types';
import {
  Code2,
  Palette,
  Sparkles,
  Server,
  GitBranch,
  Figma,
  Terminal,
  Zap,
  X,
} from 'lucide-react';

export const StackSection: React.FC = () => {
  /* 
    ==========================================================================
    STATE MANAGEMENT:
    - selectedCategory: Filter tab ('All', 'Core Fundamentals', etc.)
    - activeSkill: Skill selected for detail modal
    - visibleSkills: Set of skill IDs visible in viewport for scroll animation
    ==========================================================================
  */
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const skillRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const categories = ['All', 'Core Fundamentals', 'Frameworks & Styling', 'Workflow & Tools'];

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  /* 
    ==========================================================================
    INTERSECTION OBSERVER (SCROLL-TRIGGERED SPRING ANIMATION)
    ==========================================================================
  */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-skill-id');
            if (id) {
              setVisibleSkills((prev) => {
                const next = new Set(prev);
                next.add(id);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = Object.values(skillRefs.current);
    for (const el of elements) {
      if (el instanceof HTMLElement) {
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, [filteredSkills]);

  // Resolves category icon based on name
  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
      case 'Code2':
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-sky-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-orange-400" />;
      case 'Figma':
        return <Figma className="w-5 h-5 text-pink-400" />;
      default:
        return <Terminal className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="arsenal" className="py-20 md:py-28 relative bg-[#0c1324] border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 
          ==========================================================================
          SECTION HEADER
          ==========================================================================
        */}
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-indigo-500 rounded-full inline-block" />
            <span className="font-mono-code text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Arsenal
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills &amp; Tools
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-inter">
            Core technologies and foundational languages I practice regularly. Focusing on strong computer science fundamentals and hands-on building.
          </p>
        </div>

        {/* 
          ==========================================================================
          CATEGORY FILTER PILLS (Click to switch categories)
          ==========================================================================
        */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`skill-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 
          ==========================================================================
          SKILLS GRID WITH STAGGERED SPRING ENTRANCE
          ==========================================================================
        */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill, index) => {
            const isVisible = visibleSkills.has(skill.id);
            const popupClasses = isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-10 scale-90';

            return (
              <div
                key={skill.id}
                ref={(el) => {
                  skillRefs.current[skill.id] = el;
                }}
                data-skill-id={skill.id}
                id={`skill-card-${skill.id}`}
                onClick={() => setActiveSkill(skill)}
                style={{
                  transitionDuration: '850ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.45, 0.64, 1)',
                  transitionDelay: `${(index % 4) * 80}ms`,
                }}
                className={`bg-[#151b2d] border border-white/10 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col justify-between group cursor-pointer relative transition-all will-change-transform hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(99,102,241,0.25)] shadow-black/20 ${popupClasses}`}
              >
                <div>
                  {/* Header: Icon + Level Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {getSkillIcon(skill.iconName)}
                    </div>
                    
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-indigo-950/80 text-indigo-300 border-indigo-500/30">
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="font-display text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed font-inter">
                    {skill.description}
                  </p>

                  {/* Feature Chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {skill.popularFor.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-500/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Proficiency Meter */}
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-code">
                    <span>Confidence</span>
                    <span className="font-mono-code font-semibold text-slate-200">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full transition-all duration-1000"
                      style={{ width: isVisible ? `${skill.proficiency}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          ==========================================================================
          SKILL DETAIL MODAL (Opens on clicking any skill card)
          ==========================================================================
        */}
        {activeSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveSkill(null);
            }}
          >
            <div className="bg-[#0f172a] max-w-md w-full rounded-2xl p-6 border border-white/15 shadow-2xl relative animate-scaleUp">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                    {getSkillIcon(activeSkill.iconName)}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">
                      {activeSkill.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono-code">
                      {activeSkill.category} • {activeSkill.level}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-300 font-inter">
                <p className="leading-relaxed">
                  {activeSkill.description}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Focus Concepts</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeSkill.popularFor.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-200 border border-indigo-500/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveSkill(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
