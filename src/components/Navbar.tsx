import React, { useState, useEffect } from 'react';
import { Watch, Eye, Shield, Sliders, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  clockCursorEnabled: boolean;
  onToggleClockCursor: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenReserveModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  clockCursorEnabled,
  onToggleClockCursor,
  reducedMotion,
  onToggleReducedMotion,
  onOpenReserveModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracker
      const sections = ['hero', 'architecture', 'features', 'timepieces', 'craftsmanship', 'pricing', 'faq'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Engineering', href: '#features', id: 'features' },
    { label: 'Timepieces', href: '#timepieces', id: 'timepieces' },
    { label: 'Atelier', href: '#craftsmanship', id: 'craftsmanship' },
    { label: 'Editions', href: '#pricing', id: 'pricing' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090b10]/92 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg'
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand single-element wordmark */}
        <a
          href="#hero"
          className="text-lg sm:text-xl font-bold tracking-[0.2em] uppercase text-white font-display hover:text-sky-300 transition-colors shrink-0"
        >
          AURA <span className="text-xs tracking-[0.3em] font-normal text-slate-400">SWISS</span>
        </a>

        {/* Zone 2: Navigation Links (Clean text with subtle underlines) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions & Preferences */}
        <div className="flex items-center gap-3">
          {/* Clock Cursor Toggle */}
          <button
            type="button"
            onClick={onToggleClockCursor}
            title={clockCursorEnabled ? 'Clock Cursor: ON' : 'Clock Cursor: OFF'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              clockCursorEnabled
                ? 'bg-sky-500/15 border-sky-400/60 text-sky-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Toggle mechanical clock cursor"
          >
            <Watch className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] uppercase tracking-wider">Clock Cursor</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            type="button"
            onClick={onToggleReducedMotion}
            title={reducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              reducedMotion
                ? 'bg-amber-500/15 border-amber-400/60 text-amber-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Toggle prefers reduced motion"
          >
            <span className="text-[11px] uppercase tracking-wider">
              {reducedMotion ? 'Motion: Off' : 'Motion: Full'}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onOpenReserveModal}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] active:scale-95 whitespace-nowrap"
          >
            Reserve Timepiece
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090b10] border-b border-slate-800 px-6 py-5 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 transition-colors ${
                  activeSection === link.id ? 'text-sky-400 font-bold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => {
                onToggleClockCursor();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5"
            >
              <Watch className="w-3.5 h-3.5 text-sky-400" />
              <span>Clock Cursor: {clockCursorEnabled ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={() => {
                onToggleReducedMotion();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
            >
              Motion: {reducedMotion ? 'REDUCED' : 'FULL'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
