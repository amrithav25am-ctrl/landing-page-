import React, { useState } from 'react';
import { TIMEPIECES, Timepiece, PRICING_PLANS, PlanTier } from '../data/content';
import { ShieldCheck, Mail, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface SignupFormProps {
  initialTimepiece?: Timepiece | null;
  initialPlan?: PlanTier | null;
  onSuccessSignup?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  initialTimepiece,
  initialPlan,
  onSuccessSignup,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>(
    initialTimepiece?.id || initialPlan?.id || 'deep-sea'
  );
  const [deliveryRegion, setDeliveryRegion] = useState('Europe & Switzerland');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const validate = () => {
    const errs: { email?: string; name?: string } = {};
    if (!name.trim()) {
      errs.name = 'Please provide your full legal name for the certificate.';
    }
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email format (e.g., patron@domain.ch).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trap
    if (honeypot.trim() !== '') {
      console.warn('Spam submission thwarted');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate atelier reservation dispatch
    setTimeout(() => {
      const randomCode = `AURA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(randomCode);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Update localStorage stats
      try {
        const stored = localStorage.getItem('landing:stats');
        const parsed = stored ? JSON.parse(stored) : { visitors: 1, signups: 0, plan: 'yearly', motion: 'full' };
        parsed.signups = (parsed.signups || 0) + 1;
        localStorage.setItem('landing:stats', JSON.stringify(parsed));
      } catch (err) {
        // ignore
      }

      if (onSuccessSignup) {
        onSuccessSignup();
      }
    }, 700);
  };

  return (
    <section id="signup" className="py-24 sm:py-32 bg-[#080c14] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-2xl bg-gradient-to-b from-[#0f1628] to-[#090e1a] border border-slate-700/80 p-8 sm:p-14 shadow-2xl">
          
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase font-mono tracking-widest text-sky-400">
                  Atelier Reservation Confirmed
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Serial Number Reserved: {confirmationCode}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
                  Thank you, <strong className="text-white">{name}</strong>. An encrypted dossier and official allocation certificate have been dispatched to <strong className="text-sky-300">{email}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-xs font-mono text-slate-400 space-y-1">
                <div>Model Reference: <span className="text-white uppercase">{selectedModel}</span></div>
                <div>Vault Courier Dispatch: <span className="text-sky-300">Within 14 Business Days</span></div>
                <div>Transit Protocol: <span className="text-emerald-400">Malca-Amit Insured Armored</span></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                }}
                className="px-6 py-2.5 text-xs uppercase font-mono tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                Register Another Timepiece
              </button>
            </div>
          ) : (
            /* Form View */
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <div className="text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech">
                  Direct Atelier Allocation
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase font-display">
                  Reserve Your Commission
                </h2>
                <p className="text-slate-400 text-sm">
                  Join the private waiting registry for the next Calibre 10 production run. No upfront payment required to register serial preference.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto" noValidate>
                
                {/* Honeypot field for bot spam control (hidden from humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_bot_trap">Do not fill this field</label>
                  <input
                    type="text"
                    id="website_bot_trap"
                    name="website_bot_trap"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name Input */}
                <div>
                  <label htmlFor="reserve_name" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                    Collector Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="reserve_name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jean-Luc Vauthier"
                      className={`w-full pl-10 pr-4 py-3 bg-[#0a0f1b] border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                        errors.name
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="reserve_email" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="reserve_email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. j.vauthier@genevahorology.ch"
                      className={`w-full pl-10 pr-4 py-3 bg-[#0a0f1b] border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.email}</p>
                  )}
                </div>

                {/* Preferred Model Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reserve_model" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Preferred Reference
                    </label>
                    <select
                      id="reserve_model"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-3 py-3 bg-[#0a0f1b] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 font-mono"
                    >
                      <option value="deep-sea">AURA Calibre 10 Diver (300M)</option>
                      <option value="belmont">AURA Belmont (Skeleton Carré)</option>
                      <option value="steinach">AURA Steinach (Pavilion Chrono)</option>
                      <option value="sarnen">AURA Sarnen (Overland GMT)</option>
                      <option value="bespoke">Bespoke Commission Boxset</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reserve_region" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Delivery Region
                    </label>
                    <select
                      id="reserve_region"
                      value={deliveryRegion}
                      onChange={(e) => setDeliveryRegion(e.target.value)}
                      className="w-full px-3 py-3 bg-[#0a0f1b] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 font-mono"
                    >
                      <option value="Europe & Switzerland">Europe & Switzerland</option>
                      <option value="North America (USA & Canada)">North America (USA & Canada)</option>
                      <option value="Asia Pacific & Japan">Asia Pacific & Japan</option>
                      <option value="Middle East & Gulf">Middle East & Gulf</option>
                      <option value="Worldwide Vault Courier">Worldwide Vault Courier</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl text-xs uppercase tracking-[0.2em] font-bold bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Enciphering Atelier Registry...</span>
                    ) : (
                      <>
                        <span>Confirm Timepiece Allocation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Encrypted 256-bit Swiss privacy protection · No spam or third-party syndication</span>
                </div>

              </form>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
