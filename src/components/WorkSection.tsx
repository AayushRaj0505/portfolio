/**
 * ============================================================================
 * SELECTED WORK / PROJECTS COMPONENT
 * ============================================================================
 * Displays Aayush's featured work in a responsive 2x2 grid.
 * 
 * - Card 1: Features this active portfolio project (first project built in life!)
 * - Cards 2, 3, 4: Set to "Reserved for future" with tags & descriptions
 *   cleanly commented out so you can unlock them anytime when building new projects.
 * 
 * HOW TO EDIT:
 * - To add new projects or edit details, open `/src/data/portfolioData.ts`.
 * - To change animation duration & smoothness, look for `transitionDuration` below.
 * ============================================================================
 */

import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ projects, onSelectProject }) => {
  // Display the 4 project slots in a balanced 2x2 grid layout
  const displayProjects = projects.slice(0, 4);

  return (
    <section className="py-24 w-full relative z-20 bg-[#0c1324] border-t border-white/10 overflow-hidden" id="work">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        
        {/* 
          ==========================================================================
          SECTION HEADER (Title & Sub-description)
          ==========================================================================
        */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono-code text-[12px] text-slate-400 uppercase tracking-widest block mb-2 font-medium">
              Portfolio
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Selected work
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            {/* 
              COMMENTED AS REQUESTED:
              "Featured systems and software projects engineered for performance, clean architecture, and responsive user experiences."
            */}
            {/* <p className="font-inter text-[14px] text-slate-400 max-w-md text-left md:text-right leading-relaxed">
              Featured systems and software projects engineered for performance, clean architecture, and responsive user experiences.
            </p> */}
            <p className="font-inter text-[14px] text-slate-400 max-w-md text-left md:text-right leading-relaxed">
              My first software engineering project and reserved spaces for future builds during college.
            </p>
          </div>
        </div>

        {/* 
          ==========================================================================
          PROJECT CARDS 2x2 GRID (Smooth Edge-to-Center Glide & Settle Animation)
          - Left cards glide in from the left edge (x: -120 -> 0)
          - Right cards glide in from the right edge (x: +120 -> 0)
          ==========================================================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => {
            const isLeftColumn = index % 2 === 0;
            const isFirstProject = index === 0;

            return (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  x: isLeftColumn ? -220 : 220,
                  scale: 0.98,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{
                  duration: 1.5,
                  delay: (index % 2) * 0.16 + Math.floor(index / 2) * 0.08,
                  ease: [0.19, 1, 0.22, 1], // Expo ease-out for ultra-smooth gliding & soft landing
                }}
                className="w-full will-change-transform"
              >
                {/* 
                  Interactive Project Card:
                  - Immediate hover lift
                  - Clean seamless layout
                */}
                <div
                  onClick={() => onSelectProject(project)}
                  id={`project-card-${project.id}`}
                  className="group cursor-pointer relative rounded-2xl overflow-hidden bg-[#151b2d] border border-white/10 hover:border-white/25 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,142,241,0.25)] flex flex-col justify-between transition-all duration-300 ease-out"
                >
                  {/* Media Image Container with Seamless Scrim */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#0c1324]">
                    <img
                      className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500 opacity-85"
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                    />
                    
                    {/* Seamless Gradient Overlay blending perfectly into #151b2d */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151b2d] via-[#151b2d]/50 to-transparent pointer-events-none" />

                    {/* Floating Action Badge on Hover */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="px-3 py-1.5 rounded-full bg-white text-slate-950 font-inter text-xs font-semibold flex items-center gap-1 shadow-lg backdrop-blur-sm">
                        <span>{isFirstProject ? 'View Case Study' : 'View Details'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom Card Content Block */}
                  <div className="p-7 sm:p-8 pt-4 flex flex-col gap-3 relative z-10 bg-[#151b2d]">
                    
                    {/* Meta Row: Category & Period */}
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-mono-code text-[11px] sm:text-[12px] text-[#4fb4ff] uppercase tracking-wider font-semibold">
                        {isFirstProject ? project.category : 'FUTURE PROJECT'}
                      </span>
                      <span className="font-mono-code text-[11px] sm:text-[12px] text-slate-400 tracking-wider">
                        {project.period}
                      </span>
                    </div>

                    {/* Project Title Heading: Card 1 has real title; Cards 2, 3, 4 say "Reserved for future" */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#4fb4ff] transition-colors flex items-center justify-between">
                      <span>{isFirstProject ? project.title : 'Reserved for future'}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#4fb4ff] transition-opacity" />
                    </h3>

                    {/* 
                      CARD DESCRIPTION:
                      - Card 1: Displays full project description.
                      - Cards 2, 3, 4: Commented out as requested.
                    */}
                    {isFirstProject ? (
                      <p className="font-inter text-[13px] sm:text-[14px] text-slate-300 line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    ) : (
                      /* 
                        TAGS & DESCRIPTION FOR FUTURE PROJECTS ARE COMMENTED OUT HERE:
                        Uncomment when you are ready to publish your next project!
                      */
                      /* 
                      <p className="font-inter text-[13px] sm:text-[14px] text-slate-300 line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                      </p> 
                      */
                      <p className="font-inter text-[13px] sm:text-[14px] text-slate-400 italic">
                        Reserved space for future software &amp; AI builds.
                      </p>
                    )}

                    {/* 
                      TECH TAGS CHIPS:
                      - Card 1: Displays active tech tags (React 19, TypeScript, etc.).
                      - Cards 2, 3, 4: Commented out as requested.
                    */}
                    {isFirstProject ? (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.slice(0, 4).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono-code text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono-code text-slate-400">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    ) : (
                      /* 
                        TAGS FOR FUTURE PROJECTS (COMMENTED OUT):
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono-code text-slate-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      */
                      null
                    )}

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
