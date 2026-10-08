import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, Sparkles, Sliders, Eye } from 'lucide-react';

interface HeroExplodedWatchProps {
  reducedMotion?: boolean;
}

interface WatchLayer {
  id: string;
  name: string;
  subtitle: string;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dxExploded: number;
  dyExploded: number;
  zIndex: number;
  rotationExploded?: number;
}

const LAYERS: WatchLayer[] = [
  {
    id: 'hands',
    name: 'Luminescent Skeleton Hands',
    subtitle: 'Super-LumiNova BGW9 Rhodium Coated',
    sx: 90,
    sy: 240,
    sw: 160,
    sh: 300,
    dxExploded: -460,
    dyExploded: 0,
    zIndex: 90,
  },
  {
    id: 'dial',
    name: 'Midnight Blue Sunray Dial',
    subtitle: 'Galvanic Brass with Luminous Indices',
    sx: 230,
    sy: 200,
    sw: 180,
    sh: 360,
    dxExploded: -330,
    dyExploded: 0,
    zIndex: 80,
  },
  {
    id: 'dateWheel',
    name: 'Instantaneous Date Wheel',
    subtitle: 'Perforated Calendar Complication',
    sx: 350,
    sy: 210,
    sw: 160,
    sh: 340,
    dxExploded: -220,
    dyExploded: 0,
    zIndex: 70,
  },
  {
    id: 'gears',
    name: 'Epicycloidal Brass Gear Train',
    subtitle: 'Center Pinion & Escape Wheels',
    sx: 470,
    sy: 250,
    sw: 130,
    sh: 260,
    dxExploded: -130,
    dyExploded: 0,
    zIndex: 60,
    rotationExploded: 25,
  },
  {
    id: 'case',
    name: '316L Monobloc Middle Case',
    subtitle: 'Brushed Oystersteel with Knurled Crown',
    sx: 540,
    sy: 140,
    sw: 270,
    sh: 470,
    dxExploded: 0,
    dyExploded: 0,
    zIndex: 50,
  },
  {
    id: 'movement',
    name: 'Calibre 10 Skeleton Bridge',
    subtitle: 'Manufacture In-House Movement',
    sx: 740,
    sy: 190,
    sw: 180,
    sh: 370,
    dxExploded: 140,
    dyExploded: 0,
    zIndex: 40,
  },
  {
    id: 'balance',
    name: 'Balance Spring & Ruby Jewels',
    subtitle: '29 Synthetic Rubies · 28,800 VPH',
    sx: 860,
    sy: 220,
    sw: 160,
    sh: 330,
    dxExploded: 255,
    dyExploded: 0,
    zIndex: 35,
  },
  {
    id: 'rotor',
    name: 'AURA Oscillating Rotor',
    subtitle: 'Tungsten-Weighted Automatic Mass',
    sx: 950,
    sy: 230,
    sw: 160,
    sh: 310,
    dxExploded: 355,
    dyExploded: 0,
    zIndex: 30,
    rotationExploded: -15,
  },
  {
    id: 'caseback',
    name: 'Exhibition Screwed Caseback',
    subtitle: 'Hermetic Seal Rated to 300 Meters',
    sx: 1040,
    sy: 150,
    sw: 220,
    sh: 450,
    dxExploded: 465,
    dyExploded: 0,
    zIndex: 20,
  },
  {
    id: 'bracelet',
    name: 'Milanese Steel Mesh Bracelet',
    subtitle: 'Supple Oysterflex & Double Clasp',
    sx: 1210,
    sy: 210,
    sw: 166,
    sh: 350,
    dxExploded: 600,
    dyExploded: 0,
    zIndex: 10,
  },
];

const SCREWS = [
  { sx: 110, sy: 250, sw: 36, sh: 36, dxExploded: -510, dyExploded: -130 },
  { sx: 340, sy: 220, sw: 36, sh: 36, dxExploded: -310, dyExploded: -160 },
  { sx: 345, sy: 520, sw: 36, sh: 36, dxExploded: -290, dyExploded: 140 },
  { sx: 590, sy: 190, sw: 36, sh: 36, dxExploded: -60, dyExploded: -190 },
  { sx: 830, sy: 180, sw: 36, sh: 36, dxExploded: 180, dyExploded: -190 },
  { sx: 940, sy: 170, sw: 36, sh: 36, dxExploded: 290, dyExploded: -200 },
  { sx: 840, sy: 550, sw: 36, sh: 36, dxExploded: 190, dyExploded: 160 },
  { sx: 980, sy: 540, sw: 36, sh: 36, dxExploded: 330, dyExploded: 155 },
];

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const HeroExplodedWatch: React.FC<HeroExplodedWatchProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState<number>(0.9);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [animStatus, setAnimStatus] = useState<string>('Separating Parts...');
  const [hoveredLayer, setHoveredLayer] = useState<WatchLayer | null>(null);

  // References to keep state in requestAnimationFrame
  const progressRef = useRef<number>(0.9);
  const isAutoRef = useRef<boolean>(true);
  const imagesRef = useRef<{
    exploded: HTMLImageElement | null;
    assembled: HTMLImageElement | null;
    isLoaded: boolean;
  }>({
    exploded: null,
    assembled: null,
    isLoaded: false,
  });

  // Load image assets
  useEffect(() => {
    let mounted = true;
    const imgExp = new Image();
    const imgAss = new Image();

    imgExp.src = '/src/assets/images/aura_exploded_reference_exact_1791434626266.jpg';
    imgAss.src = '/src/assets/images/aura_assembled_reference_exact_1791434640182.jpg';

    let count = 0;
    const onLoad = () => {
      count++;
      if (count >= 2 && mounted) {
        imagesRef.current = {
          exploded: imgExp,
          assembled: imgAss,
          isLoaded: true,
        };
      }
    };

    imgExp.onload = onLoad;
    imgAss.onload = onLoad;

    return () => {
      mounted = false;
    };
  }, []);

  // Sync state to ref
  useEffect(() => {
    isAutoRef.current = isAutoPlaying && !reducedMotion;
  }, [isAutoPlaying, reducedMotion]);

  // Main automatic animation cycle & Canvas rendering loop
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();
    const cycleTotal = 9500; // 9.5s total loop

    const render = (now: number) => {
      // 1. Compute automatic progress
      if (isAutoRef.current) {
        const elapsed = (now - startTime) % cycleTotal;
        let t = 0;

        if (elapsed < 2400) {
          // Stage 1: Assembled rest (0% exploded)
          t = 0;
          setAnimStatus('Assembled Monobloc · Sealed 300M');
        } else if (elapsed < 4800) {
          // Stage 2: Smooth separation outward
          const p = (elapsed - 2400) / 2400;
          t = easeInOutCubic(p);
          setAnimStatus('Auto-Separating Watch Components...');
        } else if (elapsed < 7200) {
          // Stage 3: Full exploded rest (100% separated)
          t = 1;
          setAnimStatus('Deconstructed View · 10 Layers Separated');
        } else {
          // Stage 4: Smooth combine inward
          const p = (elapsed - 7200) / 2300;
          t = 1 - easeInOutCubic(p);
          setAnimStatus('Auto-Combining Into Casing...');
        }

        progressRef.current = t;
        setProgress(Number(t.toFixed(2)));
      }

      // 2. Render to Canvas
      const canvas = canvasRef.current;
      if (canvas && imagesRef.current.isLoaded) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const W = canvas.width;
          const H = canvas.height;
          const currentP = progressRef.current;
          const imgExp = imagesRef.current.exploded!;
          const imgAss = imagesRef.current.assembled!;

          // Clear
          ctx.clearRect(0, 0, W, H);

          // Center coordinate for middle case
          const centerX = 650;
          const centerY = 370;

          // A. Draw High-Tech Blueprint Background
          ctx.save();
          // Draw base reference background
          ctx.drawImage(imgExp, 0, 0, W, H);
          ctx.restore();

          // B. Draw Assembled Base when p is small (fades out as watch separates)
          if (currentP < 0.6) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - currentP * 2);
            // Draw perfectly centered assembled watch
            const assW = 600;
            const assH = 600;
            ctx.drawImage(
              imgAss,
              388,
              84,
              600,
              600,
              centerX - assW / 2 + 10,
              centerY - assH / 2 + 10,
              assW,
              assH
            );
            ctx.restore();
          }

          // C. Draw the Separating & Combining Watch Layers
          // As p goes from 0 to 1, each part glides from dx=0 to dx=dxExploded
          LAYERS.forEach((layer) => {
            ctx.save();

            const currentDx = layer.dxExploded * currentP;
            const currentDy = layer.dyExploded * currentP;
            const targetX = centerX + currentDx;
            const targetY = centerY + currentDy;

            // Opacity: parts fade in smoothly as they separate from the assembled core
            ctx.globalAlpha = layer.id === 'case' ? 1 : Math.min(1, 0.2 + currentP * 0.85);

            // Subtle drop shadow under floating parts in 3D
            if (currentP > 0.05) {
              ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
              ctx.shadowBlur = 18 * currentP;
              ctx.shadowOffsetX = 8 * currentP;
              ctx.shadowOffsetY = 12 * currentP;
            }

            // Draw layer slice from reference image
            ctx.drawImage(
              imgExp,
              layer.sx,
              layer.sy,
              layer.sw,
              layer.sh,
              targetX - layer.sw / 2,
              targetY - layer.sh / 2,
              layer.sw,
              layer.sh
            );

            // Glowing cyan rim glint along edges
            if (currentP > 0.3) {
              ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
              ctx.shadowBlur = 10;
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
              ctx.lineWidth = 1;
              ctx.strokeRect(
                targetX - layer.sw / 2 + 2,
                targetY - layer.sh / 2 + 2,
                layer.sw - 4,
                layer.sh - 4
              );
            }

            ctx.restore();
          });

          // D. Draw Floating Titanium Screws along dynamic separation vectors
          SCREWS.forEach((screw, i) => {
            ctx.save();
            const curX = centerX + screw.dxExploded * currentP;
            const curY = centerY + screw.dyExploded * currentP;
            ctx.globalAlpha = Math.min(1, currentP * 1.2);
            ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
            ctx.shadowBlur = 8;
            ctx.drawImage(
              imgExp,
              screw.sx,
              screw.sy,
              screw.sw,
              screw.sh,
              curX - screw.sw / 2,
              curY - screw.sh / 2,
              screw.sw,
              screw.sh
            );
            ctx.restore();
          });

          // E. Draw Glowing Blue Neon Rail Laser at the Base
          ctx.save();
          const railY = 625;
          // Core bright laser line
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 16;
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(80, railY);
          ctx.lineTo(W - 80, railY);
          ctx.stroke();

          // Dynamic light pulse riding the rail
          const pulseX = 100 + ((now / 20) % (W - 200));
          const grad = ctx.createRadialGradient(pulseX, railY, 0, pulseX, railY, 80);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pulseX, railY, 80, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleManualScrub = (val: number) => {
    setIsAutoPlaying(false);
    isAutoRef.current = false;
    progressRef.current = val;
    setProgress(val);
    setAnimStatus(val < 0.2 ? 'Assembled Monobloc' : val > 0.8 ? '100% Deconstructed' : 'Manual Position');
  };

  const handleResumeAuto = () => {
    setIsAutoPlaying(true);
    isAutoRef.current = true;
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-sky-800/80 bg-[#050811] shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
      
      {/* Top Bar: Live Status & Controls */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3.5 bg-[#070d1a]/95 border-b border-sky-900/50 backdrop-blur-md">
        
        {/* Status indicator with pinging beacon */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
          </span>
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-sky-300 font-bold">
            {animStatus}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={isAutoPlaying ? () => { setIsAutoPlaying(false); isAutoRef.current = false; } : handleResumeAuto}
            className={`px-3 py-1.5 text-xs font-mono uppercase rounded-lg border transition-all flex items-center gap-1.5 ${
              isAutoPlaying
                ? 'bg-sky-500/20 border-sky-400/80 text-sky-300 ring-1 ring-sky-400/30'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-sky-400" />
                <span>Auto-Animated: ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Auto</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleManualScrub(0)}
            className={`px-3 py-1.5 text-xs font-mono uppercase rounded-lg transition-all ${
              progress <= 0.15
                ? 'bg-sky-400 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Combine
          </button>

          <button
            type="button"
            onClick={() => handleManualScrub(1)}
            className={`px-3 py-1.5 text-xs font-mono uppercase rounded-lg transition-all ${
              progress >= 0.85
                ? 'bg-sky-400 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Separate
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport (1376x768 native resolution with high performance rendering) */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] bg-[#04060c] flex items-center justify-center select-none overflow-hidden">
        
        {/* Animated Canvas */}
        <canvas
          ref={canvasRef}
          width={1376}
          height={768}
          className="w-full h-full object-contain cursor-crosshair filter brightness-105"
        />

        {/* Interactive Layer Hotspot Pins visible when separated */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: Math.max(0, (progress - 0.3) * 1.5) }}
        >
          {LAYERS.map((layer) => {
            const leftPercent = 50 + (layer.dxExploded / 1376) * 100 * progress;
            return (
              <div
                key={layer.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${leftPercent}%`,
                  top: layer.id === 'case' ? '48%' : layer.id === 'hands' || layer.id === 'bracelet' ? '54%' : '36%',
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredLayer(layer)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <div className="relative group cursor-pointer">
                  <span className="w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-white flex items-center justify-center shadow-[0_0_12px_#38bdf8] group-hover:scale-125 transition-transform" />
                  <span className="absolute -inset-1 rounded-full border border-sky-400 animate-ping opacity-60" />

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900/95 border border-sky-400/60 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none z-50">
                    <span className="text-sky-300 font-bold block">{layer.name}</span>
                    <span className="text-slate-400 text-[10px]">{layer.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Manual Scrub & Inspection Strip */}
      <div className="relative z-30 px-5 sm:px-8 py-3.5 bg-[#060b17]/95 border-t border-sky-900/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="text-slate-300 flex items-center gap-2">
          <span className="text-sky-400 font-bold">Active Layer:</span>
          <span>
            {hoveredLayer ? (
              <strong className="text-white">{hoveredLayer.name} · {hoveredLayer.subtitle}</strong>
            ) : progress > 0.5 ? (
              '10 Horological Layers Separated in 3D Space'
            ) : (
              'Parts Locked into 316L Monobloc Middle Case'
            )}
          </span>
        </div>

        {/* Scrub Slider */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-slate-400 uppercase text-[11px] tracking-wider">
            Assembly Separation:
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => handleManualScrub(parseFloat(e.target.value))}
            className="w-36 sm:w-48 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
            aria-label="Manually adjust watch separation level"
          />
          <span className="text-sky-400 font-bold w-12 text-right">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>

    </div>
  );
};
