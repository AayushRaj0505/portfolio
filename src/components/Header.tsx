/**
 * ============================================================================
 * HEADER NAVIGATION COMPONENT
 * ============================================================================
 * Fixed glassmorphic navigation bar with logo brand, smooth section jumping,
 * and a direct "Say Hi" email client trigger.
 * 
 * HOW TO EDIT:
 * - Change navigation links: edit `navItems` array below.
 * - Change brand text: edit the brand logo button text.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  profile: UserProfile;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeSection,
  onNavigate,
}) => {
  // Tracks whether user has scrolled past top to add glassmorphic background
  const [isScrolled, setIsScrolled] = useState(false);
  // Mobile drawer open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Navigation Order: Home -> Lab -> Work -> Arsenal -> About
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'lab', label: 'Lab' },
    { id: 'work', label: 'Work' },
    { id: 'arsenal', label: 'Arsenal' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Direct Mail Client trigger for "Say Hi" button
  const handleDirectEmail = () => {
    window.location.href = `mailto:${profile.email}?subject=Hello%20Aayush%20-%20Project%20Inquiry&body=Hi%20Aayush,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect!`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c1324]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo / Home Button */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-white font-display text-lg font-bold tracking-tight hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
          id="header-brand-logo"
        >
          <Sparkles className="w-4 h-4 text-[#4fb4ff]" />
          <span>{profile.alias || 'Aayush'}.</span>
        </button>

        {/* Center Pill Navigation for Desktop */}
        <nav
          className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner"
          id="desktop-navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-link-${item.id}`}
                className={`px-4 py-1.5 rounded-full text-xs font-inter transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button: Direct Email trigger */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleDirectEmail}
            id="say-hi-header-btn"
            className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-white text-slate-950 font-inter text-xs font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <span>Say Hi</span>
            <span className="text-sm select-none" role="img" aria-label="waving hand">👋</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleDirectEmail}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-white text-slate-950 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Say Hi</span>
            <span className="text-sm select-none" role="img" aria-label="waving hand">👋</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-6 pt-3 pb-6 bg-[#0c1324]/95 backdrop-blur-xl border-b border-white/10 flex flex-col gap-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-inter flex items-center justify-between cursor-pointer ${
                activeSection === item.id
                  ? 'bg-white text-slate-950 font-semibold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
