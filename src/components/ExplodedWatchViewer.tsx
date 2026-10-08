import React, { useState, useEffect } from 'react';
import { EXPLODED_PARTS, WatchPart } from '../data/content';
import { Layers, Combine, Eye, Compass, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

interface ExplodedWatchViewerProps {
  reducedMotion?: boolean;
}

export const ExplodedWatchViewer: React.FC<ExplodedWatchViewerProps> = ({ reducedMotion }) => {
  // explodeProgress: 0 (fully assembled) to 1 (fully separated)
  const [explodeProgress, setExplodeProgress] = useState<number>(0.85);
  const [selectedPart, setSelectedPart] = useState<WatchPart>(EXPLODED_PARTS[4]); // Calibre 10 by default
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(2);

  // Auto animation toggle
  useEffect(() => {
    if (!isAutoPlaying || reducedMotion) return;
    const interval = setInterval(() => {
      setExplodeProgress((prev) => {
        if (prev >= 1) return 0.05;
        return Number((prev + 0.015).toFixed(3));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reducedMotion]);

  const handleToggleState = () => {
    if (explodeProgress > 0.4) {
      setExplodeProgress(0); // Combine
    } else {
      setExplodeProgress(0.9); // Explode
    }
  };

  const isAssembled = explodeProgress < 0.15;

  return (
    <div className="relative w-full rounded-2xl border border-slate-800/80 bg-gradient-to-b from-[#0c121e] via-[#090d16] to-[#070a10] p-4 sm:p-8 overflow-hidden shadow-2xl">
      {/* Horological Blueprint Grid & Ambient Cyan Glow */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header / Chapter Status Strip */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/70 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Interactive Deconstruction · Chapter 03 Architecture</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Every Layer, Deliberate.
          </h3>
        </div>

        {/* Action Controls: Combine vs Explode + Auto Cycle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggleState}
            className="flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-slate-800/90 hover:bg-sky-500/20 text-slate-200 hover:text-white border border-slate-700/80 hover:border-sky-500/50 transition-all shadow-sm active:scale-95"
            aria-label={isAssembled ? "Explode watch components" : "Combine watch components"}
          >
            {isAssembled ? (
              <>
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Explode Parts</span>
              </>
            ) : (
              <>
                <Combine className="w-4 h-4 text-amber-400" />
                <span>Combine Watch</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg border transition-all ${
              isAutoPlaying
                ? 'bg-sky-500/20 border-sky-400 text-sky-300 ring-1 ring-sky-400/40'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAutoPlaying ? 'Pause Cycle' : 'Auto Motion'}
          </button>
        </div>
      </div>

      {/* Stage Area: Interactive Graphic Viewport */}
      <div className="relative z-10 my-6 min-h-[380px] sm:min-h-[460px] flex items-center justify-center select-none overflow-hidden rounded-xl bg-[#070b13]/80 border border-slate-800/50">
        
        {/* Technical Horological Compass in Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full border border-sky-400/30 flex items-center justify-center animate-spin-slow">
            <div className="w-[85%] h-[85%] rounded-full border border-dashed border-sky-300/20" />
            <div className="absolute w-full h-[1px] bg-sky-400/30" />
            <div className="absolute h-full w-[1px] bg-sky-400/30" />
          </div>
        </div>

        {/* Dynamic Image Backdrop (Crossfading from Exploded to Assembled based on progress) */}
        <div className="relative w-full max-w-4xl h-[340px] sm:h-[420px] flex items-center justify-center px-4">
          
          {/* Assembled Image */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{
              opacity: 1 - Math.min(1, explodeProgress * 1.5),
              transform: `scale(${1 - explodeProgress * 0.08})`,
            }}
          >
            <img
              src="/src/assets/images/hero_aura_assembled_1791433836486.jpg"
              alt="AURA Calibre 10 Assembled Timepiece"
              className="max-h-[320px] sm:max-h-[380px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] filter brightness-105"
            />
            {/* Pulsing Lume Indicator in Assembled Mode */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-400/40 text-[11px] text-sky-300 font-mono-tech tracking-wide backdrop-blur-sm">
              HERMETIC MONOBLOC READY · 300M RATED
            </div>
          </div>

          {/* Exploded Graphic Layers */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{
              opacity: Math.min(1, explodeProgress * 1.6),
            }}
          >
            <img
              src="/src/assets/images/hero_aura_exploded_1791433820422.jpg"
              alt="AURA Calibre 10 Exploded Technical Deconstruction"
              className="max-h-[300px] sm:max-h-[360px] w-full object-contain filter contrast-105 brightness-110 drop-shadow-[0_20px_40px_rgba(3,105,161,0.25)]"
            />

            {/* Interactive Layer Pinpoints across the exploded horizontal spread */}
            <div className="absolute inset-0 flex items-center justify-around px-2 sm:px-10 pointer-events-none">
              {EXPLODED_PARTS.map((part, index) => {
                const isCurrent = selectedPart.id === part.id;
                // compute horizontal pin position
                const leftPercent = 14 + index * 12;
                return (
                  <div
                    key={part.id}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `${leftPercent}%`,
                      top: index % 2 === 0 ? '28%' : '66%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedPart(part)}
                      className={`group relative flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'scale-125 z-40'
                          : 'scale-90 hover:scale-110 opacity-70 hover:opacity-100 z-20'
                      }`}
                      aria-label={`Inspect ${part.name}`}
                    >
                      {/* Pulse Ring */}
                      <span
                        className={`absolute w-8 h-8 rounded-full border transition-all ${
                          isCurrent
                            ? 'border-sky-400 animate-ping opacity-75'
                            : 'border-slate-500/40 group-hover:border-sky-400/60'
                        }`}
                      />
                      {/* Hotspot Disc */}
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-colors shadow-lg ${
                          isCurrent
                            ? 'bg-sky-400 text-slate-950 ring-2 ring-white/80'
                            : 'bg-slate-900/90 text-sky-300 border border-slate-700 group-hover:border-sky-400'
                        }`}
                      >
                        0{index + 1}
                      </span>

                      {/* Tooltip on Hover / Focus */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-slate-900/95 border border-slate-700 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                        {part.name.split(' ')[0]} {part.name.split(' ')[1] || ''}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Micro Floating Screws & Mechanical Accents */}
            <div className="absolute left-[18%] top-[20%] text-[10px] font-mono text-sky-400/80 animate-gentle-float">
              ⚙ Titanium M0.8 Screws (6x)
            </div>
            <div className="absolute right-[16%] top-[78%] text-[10px] font-mono text-amber-400/80 animate-gentle-float">
              ❖ 29 Synthetic Ruby Bearings
            </div>
          </div>
        </div>

        {/* Bottom Interactive Explosion Slider */}
        <div className="absolute bottom-3 left-4 right-4 sm:left-12 sm:right-12 z-30 flex flex-col sm:flex-row items-center gap-3 bg-[#0a0f1b]/90 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300 whitespace-nowrap">
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>Assembly Separation:</span>
            <span className="text-sky-400 font-bold w-12 text-right">
              {Math.round(explodeProgress * 100)}%
            </span>
          </div>

          <div className="flex-1 w-full flex items-center gap-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Assembled
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeProgress}
              onChange={(e) => setExplodeProgress(parseFloat(e.target.value))}
              className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400 hover:accent-sky-300"
              aria-label="Adjust watch explosion separation level"
            />
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Exploded
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setExplodeProgress(0)}
              className="px-2 py-1 text-[10px] uppercase font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              0% Lock
            </button>
            <button
              type="button"
              onClick={() => setExplodeProgress(1)}
              className="px-2 py-1 text-[10px] uppercase font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              100% Deconstruct
            </button>
          </div>
        </div>
      </div>

      {/* Selected Component Inspection Dossier */}
      <div className="relative z-20 rounded-xl bg-slate-900/60 border border-slate-800 p-5 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-sky-400 font-mono-tech">
              <span>{selectedPart.subtitle}</span>
              <span>·</span>
              <span className="text-slate-400">Tolerance: {selectedPart.tolerance}</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              {selectedPart.name}
            </h4>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {selectedPart.description}
            </p>
          </div>

          {/* Engineering Specifications Chiplet */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 font-mono">
              <span className="text-slate-400">Material: </span>
              <span className="text-amber-300 font-medium">{selectedPart.material}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-950/40 border border-sky-800/50 text-sky-300 font-mono">
              <span className="text-slate-400">Hydrostatic: </span>
              <span className="font-semibold">30 Bar Tested</span>
            </div>
          </div>
        </div>

        {/* Quick Thumbnails to inspect any layer */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs uppercase font-mono text-slate-400 whitespace-nowrap mr-2">
            Inspect Part:
          </span>
          {EXPLODED_PARTS.map((part) => (
            <button
              key={part.id}
              onClick={() => setSelectedPart(part)}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-all ${
                selectedPart.id === part.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 font-medium'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
              {part.name.split(' ')[0]} {part.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
