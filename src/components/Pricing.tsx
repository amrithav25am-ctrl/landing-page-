import React, { useState } from 'react';
import { PRICING_PLANS, PlanTier } from '../data/content';
import { Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: PlanTier, mode: 'deposit' | 'full') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  // 'full' (with 20% discount benefit) vs 'deposit'
  const [paymentMode, setPaymentMode] = useState<'deposit' | 'full'>('full');

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#060910] relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech">
            <span>Commission Tiers · Series 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display">
            Securing Your Serial Number
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every timepiece is hand-regulated and issued with an individualized chronometer certification and international courier vault transit.
          </p>

          {/* Payment Mode Segmented Control with Save 20% Badge */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1 shadow-lg">
              <button
                type="button"
                onClick={() => setPaymentMode('deposit')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  paymentMode === 'deposit'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                20% Initial Deposit
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('full')}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 ${
                  paymentMode === 'full'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Full Atelier Pre-Order</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid (Three Tiers with highlighted recommended tier) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isHighlighted = Boolean(plan.popular);
            // Recompute price based on toggle: if full, save 20% off retail; if deposit, pay 20% of retail upfront
            const calculatedPrice = paymentMode === 'full'
              ? Math.round(plan.fullPrice * 0.8)
              : plan.depositPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#101a2e] to-[#0a111e] border-2 border-sky-400/80 shadow-[0_20px_50px_rgba(56,189,248,0.2)] lg:-translate-y-3 z-20'
                    : 'bg-gradient-to-b from-[#0d121c] to-[#080c14] border border-slate-800 hover:border-slate-700'
                } p-8`}
              >
                {/* Popular Marker */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sky-400 text-slate-950 text-xs font-bold font-mono uppercase tracking-widest shadow-md">
                    Recommended Master Plan
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white font-display">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="text-xs text-sky-400 font-mono mb-4">
                    {plan.editionLimit}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {plan.tierSubtitle}
                  </p>

                  {/* Price Display */}
                  <div className="py-5 border-y border-slate-800/80 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums">
                        €{calculatedPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {paymentMode === 'full' ? 'pre-order total' : 'initial reservation'}
                      </span>
                    </div>

                    {paymentMode === 'full' && (
                      <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                        <span className="line-through text-slate-500">
                          €{plan.fullPrice.toLocaleString()}
                        </span>
                        <span>· 20% Pre-Order Advantage Applied</span>
                      </div>
                    )}
                  </div>

                  {/* Specs Summary */}
                  <div className="my-5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-300">
                    <span className="text-slate-500 block text-[10px] uppercase">Configuration:</span>
                    {plan.specs}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mt-6">
                    <div className="text-xs uppercase font-mono tracking-wider text-slate-400">
                      Included With Commission:
                    </div>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan, paymentMode)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                      isHighlighted
                        ? 'bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)]'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>Commission This Edition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-center text-[10px] font-mono text-slate-500 mt-2.5">
                    14-Day Vault Inspection Guarantee · Insured Delivery
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
