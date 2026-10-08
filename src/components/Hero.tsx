import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Shield, Sparkles } from 'lucide-react';
import { HeroExplodedWatch } from './HeroExplodedWatch';

interface HeroProps {
  onExploreAtelier: () => void;
  onOpenReserveModal: () => void;
  reducedMotion?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreAtelier,
  onOpenReserveModal,
  reducedMotion,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroChapters = [
    {
      num: '01',
      title: 'Time, Redefined.',
      subtitle: 'Featured Timepiece · Calibre 10',
      metric: 'Haute Horlogerie Chronometer',
    },
    {
      num: '02',
      title: 'Sealed Against The Deep.',
      subtitle: 'Chapter 02 · Hydrodynamic',
      metric: '300M / 1,000FT Rating',
    },
    {
      num: '03',
      title: 'Every Layer, Deliberate.',
      subtitle: 'Chapter 03 · Architecture',
      metric: '240 Hand-Fitted Parts',
    },
    {
      num: '04',
      title: 'Precision As Foundation.',
      subtitle: 'Chapter 04 · Atelier',
      metric: '± 2 Seconds / Day',
    },
  ];

  // Auto rotate chapters gently if not reduced motion
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroChapters.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [reducedMotion, heroChapters.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#090c14] via-[#090b10] to-[#07090e]"
    >
      {/* Background Atmosphere & Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-sky-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-[10%] w-[450px] h-[450px] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Geometric Horological Compass */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] rounded-full border border-sky-400/20 flex items-center justify-center animate-spin-slow">
          <div className="w-3/4 h-3/4 rounded-full border border-dashed border-sky-400/20" />
          <div className="w-1/2 h-1/2 rounded-full border border-sky-400/15" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        
        {/* Top Header Block: Headline, Prose & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Column: Animated Headline & Story */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Chapter Kicker */}
            <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>{heroChapters[activeSlide].subtitle}</span>
            </div>

            {/* Headline with Staggered Word Reveal */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase font-display leading-[1.05]">
              {heroChapters[activeSlide].title.split(' ').map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="inline-block mr-3 animate-fade-in transition-transform duration-500"
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Editorial Lead Prose */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Twenty-four screws, each torqued to 0.4 newton-metres. A cold-cast gasket of fluorinated nitrile. Three hundred meters of deep water held back by tolerances measured in microns.
            </p>
          </div>

          {/* Right Column: CTAs and Quick Specs */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            {/* Quick Specs Micro-Grid */}
            <div className="grid grid-cols-3 gap-3 pt-3 pb-3 border-y border-slate-800/80 font-mono">
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Depth Rating</div>
                <div className="text-sm font-semibold text-white mt-0.5">300M / 30 Bar</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Metallurgy</div>
                <div className="text-sm font-semibold text-sky-300 mt-0.5">316L Steel</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Chronometer</div>
                <div className="text-sm font-semibold text-amber-300 mt-0.5">± 2 sec/day</div>
              </div>
            </div>

            {/* Two Call to Actions */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenReserveModal}
                className="group px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.55)] active:scale-95 flex items-center gap-2.5"
              >
                <span>Reserve Timepiece</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExploreAtelier}
                className="px-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-sky-500/50 transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Inside The Atelier</span>
              </button>
            </div>
          </div>

        </div>

        {/* FRONT CENTERPIECE: 100% Exact Reference Image with Automatic Separate & Combine Animation */}
        <div className="pt-2">
          <HeroExplodedWatch reducedMotion={reducedMotion} />
        </div>

      </div>
    </section>
  );
};
