import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/content';
import { ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

interface TestimonialsProps {
  reducedMotion?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ reducedMotion }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto advance every 6 seconds unless paused or reduced motion
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, reducedMotion]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Keyboard navigation support (ArrowLeft, ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-[#080b12] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-sky-400 font-mono-tech">
            The Collector Registry
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase font-display">
            Words From The Wrist
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative rounded-2xl bg-gradient-to-b from-[#0f1626] to-[#0a0f1b] border border-slate-800 p-8 sm:p-14 shadow-2xl focus:outline-none focus:ring-1 focus:ring-sky-500/50"
          aria-roledescription="carousel"
          aria-label="Collector Testimonials"
        >
          {/* Subtle horology quote mark */}
          <Quote className="w-12 h-12 text-sky-500/20 mb-6" />

          {/* Quote content */}
          <div aria-live="polite" className="min-h-[140px] flex flex-col justify-between">
            <blockquote className="text-lg sm:text-2xl text-slate-100 font-normal leading-relaxed italic">
              "{current.quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">
                    {current.author}
                  </h4>
                  {current.verifiedOwner && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Verified Patron</span>
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  {current.title} · {current.city}
                </div>
              </div>

              <div className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-sky-300 self-start sm:self-auto">
                {current.timepiece}
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons & Dots */}
          <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'w-8 bg-sky-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next / Previous Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-lg bg-slate-850 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-lg bg-slate-850 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
