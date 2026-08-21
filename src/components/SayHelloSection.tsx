/**
 * ============================================================================
 * SAY HELLO / CONTACT CTA SECTION COMPONENT
 * ============================================================================
 * Giant electric cobalt blue banner triggering the user's default email client,
 * copy-to-clipboard email utility, social links (GitHub & LinkedIn), and back-to-top button.
 * 
 * HOW TO EDIT:
 * - Change background color: edit the style={{ backgroundColor: 'rgb(0, 142, 241)' }}.
 * - Change email address or socials: edit `/src/data/portfolioData.ts`.
 * ============================================================================
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react';

interface SayHelloSectionProps {
  profile: UserProfile;
  onOpenContactModal: () => void;
}

export const SayHelloSection: React.FC<SayHelloSectionProps> = ({
  profile,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  /* 
    ==========================================================================
    DIRECT MAIL CLIENT TRIGGER:
    - Launches default email application with pre-filled recipient and subject.
    ==========================================================================
  */
  const handleDirectEmail = () => {
    window.location.href = `mailto:${profile.email}?subject=Hello%20Aayush%20-%20Project%20Inquiry&body=Hi%20Aayush,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect!`;
  };

  /* 
    ==========================================================================
    COPY EMAIL TO CLIPBOARD HELPER
    ==========================================================================
  */
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="py-20 sm:py-28 w-full text-white relative z-20"
      style={{ backgroundColor: 'rgb(0, 142, 241)' }}
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col gap-12 sm:gap-20">
        
        {/* 
          ==========================================================================
          GIANT "Say hello" CTA BUTTON
          ==========================================================================
        */}
        <button
          onClick={handleDirectEmail}
          id="say-hello-giant-cta"
          className="group text-left text-white font-bold leading-none tracking-tighter flex items-center justify-between text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-sora focus:outline-none transition-transform hover:translate-x-2 cursor-pointer"
          aria-label="Open email client to message Aayush"
          title={`Send email to ${profile.email}`}
        >
          <span className="drop-shadow-sm">Say hello</span>
          <ArrowUpRight className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300 stroke-[2.5] shrink-0" />
        </button>

        {/* 
          ==========================================================================
          3-COLUMN FOOTER INFORMATION ROW:
          - Col 1: Direct Email & Copy Clipboard button
          - Col 2: Social Links (GitHub, LinkedIn - Intro Webpage removed as requested)
          - Col 3: Location & Smooth Back-to-Top button
          ==========================================================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-8 border-t border-white/25">
          
          {/* Email Column */}
          <div className="flex flex-col gap-2 min-w-0">
            <span className="font-inter text-[11px] text-white/80 font-semibold uppercase tracking-[0.2em]">
              Email
            </span>
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <a
                href={`mailto:${profile.email}?subject=Hello%20Aayush%20-%20Project%20Inquiry`}
                className="font-inter text-base sm:text-lg text-white font-medium hover:underline decoration-white/40 underline-offset-4 transition-all break-all"
              >
                {profile.email}
              </a>
              <button
                onClick={handleCopyEmail}
                id="copy-email-btn"
                title="Copy email to clipboard"
                className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors shrink-0 cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copiedEmail && (
              <span className="text-[11px] text-white/90 font-mono-code">Copied to clipboard!</span>
            )}
          </div>

          {/* Socials Column (Intro Webpage link cleanly removed as requested) */}
          <div className="flex flex-col gap-2 min-w-0">
            <span className="font-inter text-[11px] text-white/80 font-semibold uppercase tracking-[0.2em]">
              Elsewhere
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 font-inter text-base sm:text-lg text-white font-medium">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline decoration-white/40 underline-offset-4 transition-all"
              >
                GitHub
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline decoration-white/40 underline-offset-4 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Location & Back-to-Top Column */}
          <div className="flex justify-between items-start md:items-center min-w-0">
            <div className="flex flex-col gap-2">
              <span className="font-inter text-[11px] text-white/80 font-semibold uppercase tracking-[0.2em]">
                Based in
              </span>
              <span className="font-inter text-base sm:text-lg text-white font-medium">
                {profile.location}
              </span>
            </div>
            <button
              onClick={scrollToTop}
              id="scroll-to-top-btn"
              className="group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0c1324] text-white flex items-center justify-center hover:bg-[#1e293b] transition-all hover:scale-110 shadow-lg shrink-0 cursor-pointer ml-4"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
