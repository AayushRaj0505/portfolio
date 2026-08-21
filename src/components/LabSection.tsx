/**
 * ============================================================================
 * INTERACTIVE LAB & SANDBOX COMPONENT
 * ============================================================================
 * Features a gamified wave-based kinetic particle collector arcade and an
 * interactive terminal CLI tab.
 * 
 * GAMEPLAY MECHANICS:
 * - Green Orbs (+1 point): Collect by hovering or touching cursor.
 * - Golden Orb (+10 points): Rare high-value orb.
 * - Red Hazards: Avoid! Colliding with a red hazard costs 1 shield. 3 shields total.
 * - Wave Level System: Clear all orbs to advance to the next wave with +25 bonus.
 * 
 * HOW TO EDIT:
 * - Tweak game speed or orb counts: edit `initWaveEntities` function below.
 * ============================================================================
 */

import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { Sparkles, Trophy, RotateCcw, Play, Pause, Terminal as TerminalIcon, Gamepad2, ShieldAlert, Layers, ArrowRight } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';

interface LabSectionProps {
  profile: UserProfile;
}

export const LabSection: React.FC<LabSectionProps> = ({ profile: _profile }) => {
  const [activeTab, setActiveTab] = useState<'game' | 'terminal'>('game');

  // Game Lifecycle States
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [waveTransition, setWaveTransition] = useState<{ active: boolean; waveNum: number; countdown: number } | null>(null);

  // Score & Gameplay States
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [wave, setWave] = useState<number>(1);
  const [greenRemaining, setGreenRemaining] = useState<number>(6);
  const [goldRemaining, setGoldRemaining] = useState<number>(1);
  const [shields, setShields] = useState<number>(3);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number; isHover: boolean }>({ x: -100, y: -100, isHover: false });

  // Mutable game state ref for the animation loop
  const gameStateRef = useRef({
    score: 0,
    wave: 1,
    shields: 3,
    isGameStarted: false,
    isPlaying: false,
    isGameOver: false,
    isTransitioning: false,
  });

  // Sync ref with React states
  useEffect(() => {
    gameStateRef.current = {
      score,
      wave,
      shields,
      isGameStarted,
      isPlaying,
      isGameOver,
      isTransitioning: waveTransition !== null && waveTransition.active,
    };
  }, [score, wave, shields, isGameStarted, isPlaying, isGameOver, waveTransition]);

  // Wave 3-Second Transition Timer Effect
  useEffect(() => {
    if (!waveTransition || !waveTransition.active) return;
    if (waveTransition.countdown > 0) {
      const timer = setTimeout(() => {
        setWaveTransition((prev) => (prev ? { ...prev, countdown: prev.countdown - 1 } : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Transition finished (3 seconds passed) -> Advance wave
      setWave(waveTransition.waveNum);
      setWaveTransition(null);
    }
  }, [waveTransition]);

  useEffect(() => {
    if (activeTab !== 'game') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 440);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight || 440;
      }
    };
    window.addEventListener('resize', handleResize);

    // Ball Entities Interfaces
    interface CollectibleBall {
      id: string;
      type: 'green' | 'gold';
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      points: number;
      pulse: number;
    }

    interface RedHazardBall {
      id: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
    }

    interface BurstFX {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
    }

    interface BackgroundParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    // Ambient background stars
    const bgParticles: BackgroundParticle[] = [];
    for (let i = 0; i < 30; i++) {
      bgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
      });
    }

    let burstParticles: BurstFX[] = [];

    // Spawns wave entities safely within responsive canvas boundaries
    const initWaveEntities = (currentWave: number) => {
      const speedMultiplier = 1 + (currentWave - 1) * 0.16; // +16% speed increase per wave
      const margin = 50;
      const safeWidth = Math.max(80, width - margin * 2);
      const safeHeight = Math.max(80, height - margin * 2);
      
      const collectibles: CollectibleBall[] = [];

      // 6 Green Balls (1 Point each)
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.7 + Math.random() * 0.4) * speedMultiplier;
        collectibles.push({
          id: `green-${i}-${Date.now()}`,
          type: 'green',
          x: Math.random() * safeWidth + margin,
          y: Math.random() * safeHeight + margin,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 9,
          points: 1,
          pulse: Math.random() * Math.PI,
        });
      }

      // Exactly 1 Golden Ball (10 Points)
      const goldAngle = Math.random() * Math.PI * 2;
      const goldSpeed = (0.85 + Math.random() * 0.4) * speedMultiplier;
      collectibles.push({
        id: `gold-${Date.now()}`,
        type: 'gold',
        x: Math.random() * safeWidth + margin,
        y: Math.random() * safeHeight + margin,
        vx: Math.cos(goldAngle) * goldSpeed,
        vy: Math.sin(goldAngle) * goldSpeed,
        radius: 12,
        points: 10,
        pulse: 0,
      });

      // Red Danger Hazards (Wave 1 = 1 red, Wave 2 = 2 red, etc.)
      const hazardCount = Math.min(8, currentWave);
      const hazards: RedHazardBall[] = [];
      for (let i = 0; i < hazardCount; i++) {
        const hazardAngle = Math.random() * Math.PI * 2;
        const hazardSpeed = (0.8 + Math.random() * 0.5) * speedMultiplier;
        hazards.push({
          id: `red-${i}-${Date.now()}`,
          x: Math.random() * safeWidth + margin,
          y: Math.random() * safeHeight + margin,
          vx: Math.cos(hazardAngle) * hazardSpeed,
          vy: Math.sin(hazardAngle) * hazardSpeed,
          radius: 13,
          pulse: Math.random() * Math.PI,
        });
      }

      setGreenRemaining(6);
      setGoldRemaining(1);
      return { collectibles, hazards };
    };

    let { collectibles, hazards } = initWaveEntities(wave);

    // Main 60 FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space background grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      for (let x = 20; x < width; x += 35) {
        for (let y = 20; y < height; y += 35) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      const active =
        gameStateRef.current.isGameStarted &&
        gameStateRef.current.isPlaying &&
        !gameStateRef.current.isGameOver &&
        !gameStateRef.current.isTransitioning;

      // Draw ambient background particles
      ctx.fillStyle = 'rgba(79, 180, 255, 0.25)';
      for (let i = 0; i < bgParticles.length; i++) {
        const p = bgParticles[i];
        if (active) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Cursor Gravity Field (Only when game is actively playing)
      if (mousePos.current.isHover && active) {
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, 45, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(79, 180, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#4fb4ff';
        ctx.shadowColor = '#4fb4ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 1. Render & Update Red Hazard Balls
      for (let i = 0; i < hazards.length; i++) {
        const red = hazards[i];
        if (active) {
          red.x += red.vx;
          red.y += red.vy;
          red.pulse += 0.06;
          if (red.x < red.radius || red.x > width - red.radius) red.vx *= -1;
          if (red.y < red.radius || red.y > height - red.radius) red.vy *= -1;
        }

        const redR = red.radius + Math.sin(red.pulse) * 1.5;
        
        // Danger glowing aura
        ctx.beginPath();
        ctx.arc(red.x, red.y, redR + 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Solid red sphere
        ctx.beginPath();
        ctx.arc(red.x, red.y, redR, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Warning core icon
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(red.x, red.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Collision detection with player cursor
        if (active && mousePos.current.isHover) {
          const dist = Math.hypot(mousePos.current.x - red.x, mousePos.current.y - red.y);
          if (dist < redR + 15) {
            const newShields = Math.max(0, gameStateRef.current.shields - 1);
            setShields(newShields);
            setScore((prev) => Math.max(0, prev - 5));

            // Hazard burst animation
            for (let b = 0; b < 16; b++) {
              burstParticles.push({
                x: red.x,
                y: red.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                alpha: 1,
                color: '#ef4444',
                size: 2.5,
              });
            }

            // Relocate red ball
            const safeW = Math.max(80, width - 100);
            const safeH = Math.max(80, height - 100);
            red.x = Math.random() * safeW + 50;
            red.y = Math.random() * safeH + 50;

            if (newShields === 0) {
              setIsGameOver(true);
            }
          }
        }
      }

      // 2. Render & Update Collectible Balls (Green 1pt & Gold 10pt)
      for (let i = collectibles.length - 1; i >= 0; i--) {
        const ball = collectibles[i];
        if (active) {
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.pulse += 0.05;
          if (ball.x < ball.radius || ball.x > width - ball.radius) ball.vx *= -1;
          if (ball.y < ball.radius || ball.y > height - ball.radius) ball.vy *= -1;
        }

        const ballR = ball.radius + Math.sin(ball.pulse) * 1.5;

        if (ball.type === 'gold') {
          // GOLDEN BALL (+10 Points)
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ballR + 7, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ballR, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+10', ball.x, ball.y);
        } else {
          // GREEN BALL (+1 Point)
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ballR + 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ballR, 0, Math.PI * 2);
          ctx.fillStyle = '#34d399';
          ctx.shadowColor = '#34d399';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#064e3b';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+1', ball.x, ball.y);
        }

        // Collection Check
        if (active && mousePos.current.isHover) {
          const dist = Math.hypot(mousePos.current.x - ball.x, mousePos.current.y - ball.y);
          if (dist < ballR + 18) {
            const newScore = gameStateRef.current.score + ball.points;
            setScore(newScore);
            setHighScore((prev) => Math.max(prev, newScore));

            const burstColor = ball.type === 'gold' ? '#fbbf24' : '#34d399';
            const count = ball.type === 'gold' ? 18 : 10;
            for (let b = 0; b < count; b++) {
              burstParticles.push({
                x: ball.x,
                y: ball.y,
                vx: (Math.random() - 0.5) * (ball.type === 'gold' ? 6 : 4),
                vy: (Math.random() - 0.5) * (ball.type === 'gold' ? 6 : 4),
                alpha: 1,
                color: burstColor,
                size: ball.type === 'gold' ? 3 : 2,
              });
            }

            // Remove collected ball
            collectibles.splice(i, 1);
            const gCount = collectibles.filter((b) => b.type === 'green').length;
            const goldCount = collectibles.filter((b) => b.type === 'gold').length;
            setGreenRemaining(gCount);
            setGoldRemaining(goldCount);

            // WAVE COMPLETE CHECK: All orbs cleared!
            if (collectibles.length === 0) {
              const currentWaveNumber = gameStateRef.current.wave;
              const nextWaveNumber = currentWaveNumber + 1;
              setScore((prev) => prev + 25);

              // Celebration burst
              for (let b = 0; b < 30; b++) {
                burstParticles.push({
                  x: width / 2,
                  y: height / 2,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  alpha: 1,
                  color: b % 2 === 0 ? '#4fb4ff' : '#fbbf24',
                  size: 3,
                });
              }

              // Trigger 3-Second Transition Countdown overlay
              setWaveTransition({
                active: true,
                waveNum: nextWaveNumber,
                countdown: 3,
              });

              // Prepare next wave entities
              const newWaveData = initWaveEntities(nextWaveNumber);
              collectibles = newWaveData.collectibles;
              hazards = newWaveData.hazards;
            }
          }
        }
      }

      // 3. Render burst particles
      for (let b = burstParticles.length - 1; b >= 0; b--) {
        const bp = burstParticles[b];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.alpha -= 0.035;
        if (bp.alpha <= 0) {
          burstParticles.splice(b, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
        ctx.fillStyle = bp.color;
        ctx.globalAlpha = bp.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isGameStarted, isPlaying, isGameOver, activeTab, wave]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    setIsPlaying(true);
    setIsGameOver(false);
    setWaveTransition(null);
    setScore(0);
    setWave(1);
    setShields(3);
  };

  const handleResetGame = () => {
    setIsGameStarted(false);
    setIsPlaying(false);
    setIsGameOver(false);
    setWaveTransition(null);
    setScore(0);
    setWave(1);
    setShields(3);
    setGreenRemaining(6);
    setGoldRemaining(1);
  };

  return (
    <section className="py-16 sm:py-24 w-full relative z-20 bg-[#0c1324] border-t border-white/10" id="lab">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4 sm:gap-6 border-b border-white/10 pb-5 sm:pb-6">
          <div>
            <span className="font-mono-code text-[11px] sm:text-[12px] text-[#ffbc4d] uppercase tracking-widest block mb-1.5 sm:mb-2 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Lab &amp; Sandbox
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-tight">
              {activeTab === 'game' ? 'Orbital Energy Collector: Wave Survival' : 'Interactive Developer Terminal'}
            </h2>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/10 shadow-inner w-full sm:w-auto justify-center sm:justify-start">
            <button
              onClick={() => setActiveTab('game')}
              id="lab-tab-game"
              className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono-code font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'game'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-sky-300" />
              <span>Orbital Game</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              id="lab-tab-terminal"
              className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono-code font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TerminalIcon className="w-4 h-4 text-emerald-300" />
              <span>Interactive CLI</span>
            </button>
          </div>
        </div>

        {/* View 1: Wave-Based Particle Game */}
        {activeTab === 'game' && (
          <div className="bg-[#151b2d] border border-white/15 rounded-2xl p-3.5 sm:p-6 md:p-7 relative overflow-hidden shadow-2xl animate-fadeIn">
            
            {/* Top Dashboard: Score, Wave Level, Targets Left, Shields & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-white/10">
              
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                {/* Score */}
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase tracking-wider">Score</span>
                  <span className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#4fb4ff]">
                    {score}
                  </span>
                </div>

                {/* Wave Level */}
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#ffbc4d]" /> Level
                  </span>
                  <span className="font-mono-code text-base sm:text-lg md:text-xl font-bold text-[#ffbc4d]">
                    Wave {wave}
                  </span>
                </div>

                {/* Remaining Targets in Current Wave */}
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase tracking-wider">Remaining Orbs</span>
                  <div className="flex items-center gap-2 mt-0.5 sm:mt-1 font-mono-code text-[11px] sm:text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400" /> {greenRemaining} (1pt)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400" /> {goldRemaining} (10pt)
                    </span>
                  </div>
                </div>

                {/* Shields */}
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-rose-400" /> Shields
                  </span>
                  <div className="flex items-center gap-1 mt-1 sm:mt-1.5">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`w-2.5 sm:w-3 h-3.5 sm:h-4 rounded-sm transition-all ${
                          s <= shields ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-700/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Best High Score */}
                <div className="hidden sm:flex flex-col">
                  <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-emerald-400" /> Best
                  </span>
                  <span className="font-mono-code text-base sm:text-lg md:text-xl font-bold text-slate-200">
                    {highScore}
                  </span>
                </div>
              </div>

              {/* Action Controls (Pause / Resume & Reset) */}
              <div className="flex items-center gap-2">
                {isGameStarted && !isGameOver && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isPlaying
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                        : 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300 font-bold'
                    }`}
                    title={isPlaying ? 'Pause game' : 'Resume game'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Resume'}</span>
                  </button>
                )}
                <button
                  onClick={handleResetGame}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset to start menu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isGameStarted ? 'Reset' : 'Restart'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Canvas Container */}
            <div
              className="w-full h-[440px] sm:h-[450px] md:h-[480px] rounded-xl bg-[#070d1f] relative overflow-hidden border border-white/10 cursor-crosshair mt-3 sm:mt-4 touch-none select-none"
              onMouseMove={(e) => {
                if (!isGameStarted || !isPlaying || isGameOver || waveTransition !== null) return;
                const rect = e.currentTarget.getBoundingClientRect();
                mousePos.current = {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  isHover: true,
                };
              }}
              onMouseLeave={() => {
                mousePos.current.isHover = false;
              }}
              onTouchStart={(e) => {
                if (!isGameStarted || !isPlaying || isGameOver || waveTransition !== null) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                if (touch) {
                  mousePos.current = {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top,
                    isHover: true,
                  };
                }
              }}
              onTouchMove={(e) => {
                if (!isGameStarted || !isPlaying || isGameOver || waveTransition !== null) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                if (touch) {
                  mousePos.current = {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top,
                    isHover: true,
                  };
                }
              }}
              onTouchEnd={() => {
                mousePos.current.isHover = false;
              }}
            >
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* 1. START GAME MENU OVERLAY */}
              {!isGameStarted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070d1f]/94 backdrop-blur-md z-30 p-3.5 sm:p-6 overflow-y-auto">
                  <div className="max-w-md w-full text-center flex flex-col items-center gap-2.5 sm:gap-4 my-auto">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-[#4fb4ff] shadow-lg shadow-indigo-500/20">
                      <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <span className="font-mono-code text-[10px] sm:text-xs text-[#ffbc4d] uppercase tracking-widest font-bold">
                        Interactive Physics Arcade
                      </span>
                      <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-extrabold text-white mt-0.5 sm:mt-1">
                        Orbital Energy Collector
                      </h3>
                    </div>

                    {/* How to Play Rules */}
                    <div className="w-full bg-[#11192e] border border-white/10 rounded-xl p-2.5 sm:p-3.5 text-left text-[11px] sm:text-xs font-mono-code space-y-1.5 sm:space-y-2 text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span><strong>Green Orbs:</strong> Collect for <strong>+1 point</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        <span><strong>Golden Orb (Rare):</strong> Collect for <strong>+10 points</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        <span><strong>Red Hazards:</strong> Dodge them! Losing 3 shields ends game.</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sky-300 pt-0.5 border-t border-white/10">
                        <Sparkles className="w-3 h-3 text-[#ffbc4d] shrink-0" />
                        <span>Clear all orbs to advance waves &amp; earn +25 bonus!</span>
                      </div>
                    </div>

                    {/* Launch Game CTA */}
                    <button
                      onClick={handleStartGame}
                      id="launch-orbital-game-btn"
                      className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#008ef1] to-[#4fb4ff] text-slate-950 font-inter text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#008ef1]/25 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Start Game</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. WAVE CLEARED 3-SECOND COUNTDOWN OVERLAY */}
              {waveTransition && waveTransition.active && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070d1f]/85 backdrop-blur-sm z-30 animate-fadeIn p-4">
                  <div className="text-center flex flex-col items-center gap-2.5 sm:gap-3">
                    <div className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-mono-code font-bold">
                      WAVE COMPLETED • +25 PTS BONUS
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                      Wave {waveTransition.waveNum - 1} Cleared!
                    </h3>
                    <p className="font-mono-code text-xs sm:text-sm text-slate-300">
                      Preparing <span className="text-[#ffbc4d] font-bold">Wave {waveTransition.waveNum}</span> (Speed &amp; Hazards Increased)...
                    </p>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-600/30 border border-indigo-400 flex items-center justify-center font-display text-xl sm:text-2xl font-black text-[#4fb4ff] animate-pulse shadow-lg shadow-indigo-500/30">
                      {waveTransition.countdown > 0 ? waveTransition.countdown : 'GO!'}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PAUSED SCREEN OVERLAY */}
              {isGameStarted && !isPlaying && !isGameOver && waveTransition === null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070d1f]/85 backdrop-blur-sm z-30 gap-3 p-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">Simulation Paused</h3>
                  <p className="font-mono-code text-xs text-slate-400">Interactions and scoring are frozen.</p>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="mt-2 px-6 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-inter text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Resume Game</span>
                  </button>
                </div>
              )}

              {/* 4. GAME OVER SCREEN OVERLAY */}
              {isGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070d1f]/90 backdrop-blur-sm z-30 gap-3 sm:gap-4 p-4">
                  <div className="text-center">
                    <span className="font-mono-code text-xs text-rose-400 uppercase tracking-widest block font-bold">Shields Depleted</span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Game Over</h3>
                    <p className="font-mono-code text-slate-300 text-xs sm:text-sm mt-1">
                      Reached <span className="text-[#ffbc4d] font-bold">Wave {wave}</span> • Final Score: <span className="text-[#4fb4ff] font-bold">{score}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-2.5 rounded-full bg-white text-slate-950 font-inter text-xs font-semibold hover:bg-slate-200 transition-all cursor-pointer shadow-lg"
                  >
                    Play Again
                  </button>
                </div>
              )}

              {/* Bottom footer speed indicator */}
              <div className="absolute bottom-2.5 right-3 text-[10px] sm:text-[11px] font-mono-code text-slate-500 pointer-events-none">
                Wave Speed: {(1 + (wave - 1) * 0.16).toFixed(2)}x
              </div>
            </div>
          </div>
        )}

        {/* View 2: Interactive CLI Terminal */}
        {activeTab === 'terminal' && (
          <div className="animate-fadeIn">
            <InteractiveTerminal />
          </div>
        )}

      </div>
    </section>
  );
};
