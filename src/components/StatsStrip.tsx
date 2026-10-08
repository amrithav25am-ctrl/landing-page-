import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../data/content';

interface StatsStripProps {
  reducedMotion?: boolean;
}

export const StatsStrip: React.FC<StatsStripProps> = ({ reducedMotion }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 border-y border-slate-800/80 bg-[#070a11]/90 backdrop-blur-md py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-6 text-center">
          {STATS.map((stat, idx) => (
            <CounterCell
              key={stat.label}
              label={stat.label}
              targetValue={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              detail={stat.detail}
              shouldAnimate={hasAnimated && !reducedMotion}
              delay={idx * 150}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CounterCellProps {
  label: string;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  detail: string;
  shouldAnimate: boolean;
  delay: number;
}

const CounterCell: React.FC<CounterCellProps> = ({
  label,
  targetValue,
  prefix = '',
  suffix = '',
  detail,
  shouldAnimate,
  delay,
}) => {
  const [displayValue, setDisplayValue] = useState(shouldAnimate ? 0 : targetValue);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayValue(targetValue);
      return;
    }

    let start = 0;
    const duration = 1600;
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = targetValue / totalSteps;

    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setDisplayValue(targetValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [shouldAnimate, targetValue, delay]);

  const formattedValue = targetValue >= 1000
    ? displayValue.toLocaleString()
    : displayValue;

  return (
    <div className="space-y-1">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono tracking-tight text-white flex items-center justify-center">
        {prefix && <span className="text-sky-400 mr-0.5">{prefix}</span>}
        <span>{formattedValue}</span>
        {suffix && <span className="text-sky-400 text-lg sm:text-2xl ml-0.5">{suffix}</span>}
      </div>
      <div className="text-xs uppercase tracking-wider font-semibold text-slate-300">
        {label}
      </div>
      <div className="text-[11px] text-slate-500 font-mono">
        {detail}
      </div>
    </div>
  );
};
