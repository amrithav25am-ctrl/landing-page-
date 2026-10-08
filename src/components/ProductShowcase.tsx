import React, { useState } from 'react';
import { TIMEPIECES, Timepiece } from '../data/content';
import { Eye, ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';

interface ProductShowcaseProps {
  onSelectTimepiece: (timepiece: Timepiece) => void;
  onOpenReserveModal: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onSelectTimepiece,
  onOpenReserveModal,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<Timepiece | null>(null);

  const filteredItems = TIMEPIECES.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'diver') return item.waterResistance.includes('300m');
    if (filter === 'chronograph') return item.edition.toLowerCase().includes('chronograph');
    if (filter === 'skeleton') return item.edition.toLowerCase().includes('skeleton') || item.edition.toLowerCase().includes('gmt');
    return true;
  });

  return (
    <section id="timepieces" className="py-24 sm:py-32 bg-[#06080e] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-slate-800/80 pb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech mb-2">
              The Manufacture Collection
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Featured Timepieces
            </h2>
          </div>

          {/* Functional Filter Tabs (Buttons, not pills) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg self-start md:self-auto">
            {[
              { id: 'all', label: 'All References' },
              { id: 'diver', label: 'Diver 300M' },
              { id: 'chronograph', label: 'Chronograph' },
              { id: 'skeleton', label: 'Haute Skeleton' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (Lead with imagery 65%-75% of card height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredItems.map((piece) => (
            <div
              key={piece.id}
              className="group rounded-xl bg-gradient-to-b from-[#0e1422] to-[#090d16] border border-slate-800/80 overflow-hidden hover:border-sky-500/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Visual Showcase Area */}
              <div className="relative aspect-square w-full p-6 flex items-center justify-center bg-[#070a12]/60 overflow-hidden">
                <img
                  src={piece.image}
                  alt={piece.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[82%] w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter brightness-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                />

                {/* Status Indicator */}
                <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                      piece.status === 'Available'
                        ? 'bg-emerald-400'
                        : piece.status === 'Last Ones'
                        ? 'bg-amber-400'
                        : 'bg-sky-400'
                    }`}
                  />
                  <span>{piece.status}</span>
                </div>

                {/* Quick Inspect Hover Overlay Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(piece)}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md bg-slate-900/90 text-sky-300 text-xs font-mono border border-slate-700/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </button>
              </div>

              {/* Product Information Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    {piece.edition}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mt-0.5">
                    {piece.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {piece.description}
                  </div>
                </div>

                {/* Specifications Bar */}
                <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{piece.caseSize}</span>
                  <span>·</span>
                  <span>{piece.waterResistance}</span>
                  <span>·</span>
                  <span className="text-amber-400/90">{piece.reserve}</span>
                </div>

                {/* Price and Action Button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-lg font-bold font-mono text-white tabular-nums">
                    €{piece.priceEur.toLocaleString()}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectTimepiece(piece);
                      onOpenReserveModal();
                    }}
                    className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all active:scale-95 flex items-center gap-1"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal for Selected Timepiece */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#0d1320] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 font-mono text-sm"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square bg-slate-900/60 rounded-xl flex items-center justify-center p-4 border border-slate-800">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.name}
                  className="max-h-[85%] object-contain"
                />
              </div>

              <div className="space-y-4">
                <div className="text-xs uppercase font-mono tracking-widest text-sky-400">
                  {activeModalItem.edition}
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  {activeModalItem.name}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalItem.description}
                </p>

                <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-slate-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Calibre:</span>
                    <span>{activeModalItem.caliber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dimensions:</span>
                    <span>{activeModalItem.caseSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Water Rating:</span>
                    <span>{activeModalItem.waterResistance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Power Autonomy:</span>
                    <span className="text-amber-400">{activeModalItem.reserve}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    €{activeModalItem.priceEur.toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTimepiece(activeModalItem);
                      setActiveModalItem(null);
                      onOpenReserveModal();
                    }}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all shadow-lg"
                  >
                    Proceed To Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
