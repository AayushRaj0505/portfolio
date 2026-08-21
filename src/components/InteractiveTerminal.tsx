/**
 * ============================================================================
 * INTERACTIVE DEVELOPER TERMINAL COMPONENT
 * ============================================================================
 * An interactive BASH-style terminal emulator supporting commands like:
 * - `help`: Lists all available commands
 * - `aayush --skills`: Lists programming tools & languages
 * - `aayush --goals`: Lists active academic & learning goals
 * - `aayush --projects`: Lists projects roadmap
 * - `aayush --education`: Displays B.Tech CSE (AI) 2030 & IIT Madras info
 * - `aayush --contact`: Displays direct contact info
 * - `clear`: Clears terminal history
 * 
 * HOW TO EDIT:
 * - Add or change commands: edit the switch/case inside `executeCommand`.
 * ============================================================================
 */

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, CURRENT_GOALS, USER_PROFILE } from '../data/portfolioData';

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | ReactNode }>>([
    {
      cmd: 'aayush --welcome',
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-semibold">⚡ Aayush Interactive Terminal initialized.</p>
          <p className="text-slate-400">Type <span className="text-sky-300 font-mono">help</span> or click quick chips below to explore.</p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const quickCommands = ['help', 'aayush --education', 'aayush --skills', 'aayush --goals', 'aayush --projects', 'aayush --contact'];

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output: string | ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-indigo-300 font-semibold">Available Commands:</p>
            <p><span className="text-sky-300 font-mono">aayush --education</span> : View degree, AI specialisation &amp; IIT Madras status</p>
            <p><span className="text-sky-300 font-mono">aayush --skills</span> : Display tools &amp; technologies I practice</p>
            <p><span className="text-sky-300 font-mono">aayush --goals</span> : Show active learning goals</p>
            <p><span className="text-sky-300 font-mono">aayush --projects</span> : View first project and roadmap</p>
            <p><span className="text-sky-300 font-mono">aayush --contact</span> : Get direct email &amp; links</p>
            <p><span className="text-sky-300 font-mono">clear</span> : Clear terminal history</p>
          </div>
        );
        break;

      case 'aayush --education':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-amber-300 font-semibold">Academic Profile:</p>
            <p>🎓 <strong className="text-white">B.Tech in Computer Science &amp; Engineering (CSE)</strong></p>
            <p>   Specialisation in <span className="text-[#4fb4ff]">Artificial Intelligence (AI)</span> • Graduating in 2030</p>
            <p>🎓 <strong className="text-white">Data Science Program</strong></p>
            <p>   Indian Institute of Technology Madras (IIT Madras) • From 2025</p>
            <p>🌐 <strong className="text-white">Languages:</strong> {USER_PROFILE.languages.join(', ')}</p>
          </div>
        );
        break;

      case 'aayush --skills':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-indigo-300 font-semibold">Core Arsenal (Learning &amp; Practicing):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 font-mono">
              {SKILLS.map((s) => (
                <div key={s.id} className="text-slate-300">
                  • <span className="text-sky-300">{s.name}</span> ({s.proficiency}%)
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'aayush --goals':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-amber-300 font-semibold">Current Objectives:</p>
            {CURRENT_GOALS.map((g) => (
              <p key={g.id}>• <span className="text-white font-medium">{g.title}</span>: {g.description}</p>
            ))}
          </div>
        );
        break;

      case 'aayush --projects':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-emerald-400 font-semibold">Projects Status:</p>
            <p>✨ <span className="text-white font-medium">This Portfolio</span>: First completed build (React 19 + TypeScript)!</p>
            <p>🔒 <span className="text-slate-400">Reserved for future</span>: Space reserved for upcoming AI &amp; Software builds</p>
          </div>
        );
        break;

      case 'aayush --contact':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-emerald-400 font-semibold">Direct Communication:</p>
            <p>Email: <span className="text-white font-mono">{PERSONAL_INFO.email}</span></p>
            <p>Status: <span className="text-emerald-400 font-semibold">{PERSONAL_INFO.statusText}</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <span className="text-rose-400 text-xs">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="text-sky-300 font-mono underline">help</span> for assistance.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output }]);
    setInputVal('');
  };

  // Only scroll the inner terminal body, never force window scroll
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div id="interactive-terminal" className="bg-[#0f172a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono-code text-xs text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>aayush@portfolio: ~/terminal</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-code text-slate-500">BASH</span>
        </div>
      </div>

      {/* Quick Command Suggestion Chips */}
      <div className="px-4 py-2 bg-slate-900/50 border-b border-white/5 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-slate-500 font-medium">Quick run:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="text-[11px] font-mono-code px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-950 text-indigo-300 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Body with Self-Contained Scroll */}
      <div 
        ref={terminalBodyRef}
        className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-3 font-mono-code text-xs bg-[#060e20]/95 scroll-smooth"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-slate-200">{item.cmd}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Terminal Input Line */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          executeCommand(inputVal);
        }}
        className="px-4 py-3 bg-slate-950 border-t border-white/10 flex items-center gap-2"
      >
        <span className="text-emerald-400 font-mono-code font-bold text-xs">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type a command (e.g. 'help', 'aayush --education', 'aayush --skills')..."
          className="flex-1 bg-transparent text-xs font-mono-code text-white placeholder-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="p-1.5 rounded text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
