import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExplodedWatchViewer } from './components/ExplodedWatchViewer';
import { StatsStrip } from './components/StatsStrip';
import { Features } from './components/Features';
import { ProductShowcase } from './components/ProductShowcase';
import { Craftsmanship } from './components/Craftsmanship';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { SignupForm } from './components/SignupForm';
import { Footer } from './components/Footer';
import { ClockCursor } from './components/ClockCursor';
import { Timepiece, PlanTier } from './data/content';

export default function App() {
  // Reading position progress bar (0 to 100%)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Clock cursor toggle (default true on pointer devices)
  const [clockCursorEnabled, setClockCursorEnabled] = useState(true);

  // Reduced motion support state
  const [reducedMotion, setReducedMotion] = useState(false);

  // Selected timepiece or plan for the signup/reserve form
  const [selectedTimepiece, setSelectedTimepiece] = useState<Timepiece | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);

  // Initialize and load localStorage data
  useEffect(() => {
    try {
      const stored = localStorage.getItem('landing:stats');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.visitors = (parsed.visitors || 0) + 1;
        if (parsed.motion === 'reduce') {
          setReducedMotion(true);
        }
        localStorage.setItem('landing:stats', JSON.stringify(parsed));
      } else {
        localStorage.setItem(
          'landing:stats',
          JSON.stringify({
            visitors: 1,
            signups: 0,
            plan: 'yearly',
            motion: 'full',
          })
        );
      }
    } catch (e) {
      // ignore localStorage errors in restricted environments
    }

    // Check system prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  // Update reduced motion class on HTML/body
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }

    // Sync to localStorage
    try {
      const stored = localStorage.getItem('landing:stats');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.motion = reducedMotion ? 'reduce' : 'full';
        localStorage.setItem('landing:stats', JSON.stringify(parsed));
      }
    } catch (e) {
      // ignore
    }
  }, [reducedMotion]);

  // Track window scroll for the reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToAtelier = () => {
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleScrollToSignup = () => {
    const el = document.getElementById('signup');
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleSelectTimepiece = (piece: Timepiece) => {
    setSelectedTimepiece(piece);
    setSelectedPlan(null);
    handleScrollToSignup();
  };

  const handleSelectPlan = (plan: PlanTier, mode: 'deposit' | 'full') => {
    setSelectedPlan(plan);
    setSelectedTimepiece(null);
    // sync plan mode into landing:stats
    try {
      const stored = localStorage.getItem('landing:stats');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.plan = mode === 'full' ? 'yearly' : 'monthly';
        localStorage.setItem('landing:stats', JSON.stringify(parsed));
      }
    } catch (e) {
      // ignore
    }
    handleScrollToSignup();
  };

  return (
    <div className="relative min-h-screen bg-[#090b10] text-[#e2e8f0] selection:bg-sky-500/30 selection:text-white">
      {/* Interactive Miniature Mechanical Clock Cursor */}
      <ClockCursor enabled={clockCursorEnabled && !reducedMotion} />

      {/* Top Reading Position Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[100] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-sky-300 to-amber-300 transition-all duration-100 ease-out shadow-[0_0_8px_rgba(56,189,248,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Bar */}
      <Navbar
        clockCursorEnabled={clockCursorEnabled}
        onToggleClockCursor={() => setClockCursorEnabled(!clockCursorEnabled)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        onOpenReserveModal={handleScrollToSignup}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Animated Headline & 2 CTAs */}
        <Hero
          onExploreAtelier={handleScrollToAtelier}
          onOpenReserveModal={handleScrollToSignup}
          reducedMotion={reducedMotion}
        />

        {/* Number Counters Stats Strip */}
        <StatsStrip reducedMotion={reducedMotion} />

        {/* Interactive Separated & Combine Watch Section (Screenshot 2 & Video reference) */}
        <section id="architecture" className="py-20 sm:py-28 bg-[#090d16] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExplodedWatchViewer reducedMotion={reducedMotion} />
          </div>
        </section>

        {/* Feature Cards with Inline SVG Icons & Staggered Reveal */}
        <Features reducedMotion={reducedMotion} />

        {/* Manufacture Collection Product Showcase */}
        <ProductShowcase
          onSelectTimepiece={handleSelectTimepiece}
          onOpenReserveModal={handleScrollToSignup}
        />

        {/* Master Craftsmanship & Atelier Section */}
        <Craftsmanship />

        {/* Pricing Table with Monthly/Deposit vs Full Pre-Payment Save 20% */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* Auto-advancing Testimonials Carousel with arrow key support */}
        <Testimonials reducedMotion={reducedMotion} />

        {/* Accessible FAQ Accordion */}
        <Faq />

        {/* Reserve / Email Capture Form with validation & honeypot spam shield */}
        <SignupForm
          initialTimepiece={selectedTimepiece}
          initialPlan={selectedPlan}
        />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
