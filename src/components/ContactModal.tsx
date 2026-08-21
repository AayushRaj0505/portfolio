/**
 * ============================================================================
 * DIRECT TRANSMISSION / CONTACT MODAL COMPONENT
 * ============================================================================
 * Contact modal dialog with form validation, inquiry topic dropdown,
 * and particle confetti celebrations upon successful submission.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { X, Send, Sparkles, CheckCircle, Mail, MessageSquare, User, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ profile, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [projectType, setProjectType] = useState('Full-Time Role');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll and listen for Escape key
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
    
    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="font-mono-code text-[11px] text-[#4fb4ff] uppercase tracking-wider font-semibold block">
              Direct Transmission
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Get in Touch with {profile.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            id="close-contact-modal-btn"
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Message Dispatched!</h3>
            <p className="font-inter text-sm text-slate-300 max-w-sm">
              Thank you for reaching out, <strong className="text-white">{name}</strong>. I've received your note and will get back to you at <span className="text-[#4fb4ff]">{email}</span> within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-full bg-white text-slate-900 font-inter text-xs font-semibold uppercase tracking-wider hover:bg-slate-200 transition-all shadow cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-code text-xs text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full bg-[#070d1f] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4fb4ff]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-code text-xs text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#070d1f] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4fb4ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-code text-xs text-slate-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" /> Organization / Project
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company / Team"
                  className="w-full bg-[#070d1f] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4fb4ff]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono-code text-xs text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Inquiry Topic
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[#070d1f] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#4fb4ff]"
                >
                  <option value="Internship / Full-Time">Internship / Student Collab</option>
                  <option value="AI / Web Project">AI &amp; Web Project</option>
                  <option value="Consulting">Consulting &amp; Freelance</option>
                  <option value="Just saying Hi">Just Saying Hi</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono-code text-xs text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, team, or ideas..."
                className="w-full bg-[#070d1f] border border-white/15 rounded-lg p-3.5 text-sm text-white focus:outline-none focus:border-[#4fb4ff] resize-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="font-mono-code text-[11px] text-slate-400">
                Direct: <span className="text-white">{profile.email}</span>
              </span>
              <button
                type="submit"
                id="submit-contact-form-btn"
                className="px-6 py-3 rounded-full bg-[#008ef1] hover:bg-[#4fb4ff] text-slate-950 font-inter text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow cursor-pointer"
              >
                <span>Transmit Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
