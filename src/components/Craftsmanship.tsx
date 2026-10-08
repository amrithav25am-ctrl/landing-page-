import React, { useState } from 'react';
import { Microscope, Award, CheckCircle2, Sliders } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Hand-Anglage & Black Polish',
      desc: 'Every steel bridge is bevelled by hand with diamond-impregnated boxwood pegs to create a flawless 45-degree mirror sheen.',
      metric: '0.05 mm chamfer width',
    },
    {
      num: '02',
      title: 'Thermal & Positional Regulation',
      desc: 'Tested over 360 hours in five separate spatial orientations across three temperatures: 4°C, 20°C, and 38°C.',
      metric: 'Surpassing COSC benchmarks',
    },
    {
      num: '03',
      title: 'Paramagnetic Hairspring',
      desc: 'Formed from a proprietary niobium-zirconium alloy that remains completely unaffected by magnetic fields up to 15,000 gauss.',
      metric: '10x shock resilience',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#080c14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Macro Craftsmanship Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl group">
              <img
                src="/src/assets/images/atelier_craftsmanship_macro_1791433848987.jpg"
                alt="Swiss Master Watchmaker Regulating Calibre 10 Escapement Wheel"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase font-mono tracking-widest text-sky-400">
                    La Chaux-de-Fonds Atelier
                  </div>
                  <div className="text-white font-bold text-lg">
                    Calibre 10 Escapement Assembly
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-slate-700 text-xs font-mono text-amber-300">
                  29 Synthetic Rubies
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 px-5 py-3.5 rounded-xl bg-[#0d1424] border border-sky-500/40 shadow-2xl text-xs font-mono text-slate-200 flex items-center gap-3">
              <Award className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <div className="text-white font-bold">100% Manufacture In-House</div>
                <div className="text-slate-400 text-[11px]">Zero Third-Party Ebauches</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Interactive Craft Steps */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech mb-2">
                Chapter 04 · The Atelier
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display leading-tight">
                Precision is not a feature. It is our foundation.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-4">
                In an era of mass industrial replication, each AURA timepiece is individually hand-assembled by a solitary master watchmaker. From bridge graining to balance poise, nothing leaves our bench without human scrutiny.
              </p>
            </div>

            {/* Interactive Craft Steps Accordion/Tabs */}
            <div className="space-y-3.5">
              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-slate-900/90 border-sky-500/60 shadow-[0_10px_25px_rgba(56,189,248,0.1)]'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-sky-400 font-bold">
                        {step.num}
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {step.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {step.metric}
                    </span>
                  </div>

                  {activeStep === idx && (
                    <p className="text-sm text-slate-300 mt-3 pl-7 leading-relaxed">
                      {step.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
