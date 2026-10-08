import React, { useEffect, useRef } from 'react';
import { FEATURES, FeatureItem } from '../data/content';

interface FeaturesProps {
  reducedMotion?: boolean;
}

export const Features: React.FC<FeaturesProps> = ({ reducedMotion }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = sectionRef.current?.querySelectorAll('.reveal-card');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#080b12] relative overflow-hidden"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech">
            <span>Engineering Tenets · Chapter 02</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display">
            Constructed For The Extremes
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From the sub-zero depths of alpine glaciers to deep ocean trenches, each constituent is manufactured to endure relentless hydrostatic stress without compromise.
          </p>
        </div>

        {/* Feature Cards Grid (Staggered Reveal & 3D Card Tilt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feat, index) => (
            <FeatureCard
              key={feat.id}
              feature={feat}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Engineering Footnote Adjacency */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            <span>Certified by Contrôle Officiel Suisse des Chronomètres</span>
            <span className="mx-2">·</span>
            <span>Ref. ISO 6425 Diver Standard</span>
          </div>
          <div className="text-sky-400">
            Internal Quality Benchmark: 100% Hermetic Yield
          </div>
        </div>

      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
  reducedMotion?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, reducedMotion }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt micro-interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-card opacity-0 translate-y-8 transition-all duration-700 ease-out rounded-xl bg-gradient-to-b from-[#0e1524] to-[#0a0e18] border border-slate-800/80 p-7 hover:border-sky-500/50 hover:shadow-[0_15px_30px_rgba(56,189,248,0.12)] group flex flex-col justify-between"
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div>
        {/* Top: Icon & Metric Tag */}
        <div className="flex items-center justify-between mb-6">
          {/* Inline SVG Icon with hover wiggle animation */}
          <div className="w-12 h-12 rounded-lg bg-sky-950/50 border border-sky-800/40 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            {renderFeatureIcon(feature.icon)}
          </div>

          <div className="text-right">
            <span className="text-xl font-bold font-mono text-white group-hover:text-sky-300 transition-colors">
              {feature.specValue}
            </span>
            <span className="text-xs font-mono text-slate-400 ml-1">
              {feature.specUnit}
            </span>
          </div>
        </div>

        {/* Clean Unboxed Kicker */}
        <div className="text-xs uppercase tracking-widest text-sky-400 font-mono mb-2">
          {feature.kicker}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-200 transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Hairline Bottom Border Indicator */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Spec: 0{index + 1} / 06</span>
        <span className="text-sky-400/80 group-hover:translate-x-1 transition-transform">
          Dossier →
        </span>
      </div>
    </div>
  );
};

// Inline SVG Icons without external font dependencies
function renderFeatureIcon(type: FeatureItem['icon']) {
  switch (type) {
    case 'movement':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <path d="m5.6 5.6 2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </svg>
      );
    case 'case':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 2h6v3H9zM9 19h6v3H9z" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'seal':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'lume':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'crystal':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M10 3 8 9l4 12 4-12-2-6" />
          <path d="M2 9h20" />
        </svg>
      );
    case 'warranty':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
  }
}
