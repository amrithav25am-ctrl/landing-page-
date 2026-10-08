import React, { useEffect, useState, useRef } from 'react';

interface ClockCursorProps {
  enabled: boolean;
}

export const ClockCursor: React.FC<ClockCursorProps> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(() => new Date());
  const requestRef = useRef<number | null>(null);

  // Live clock hands
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Mouse move listener
  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('clock-cursor-active');
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      document.body.classList.remove('clock-cursor-active');
      return;
    }

    document.body.classList.add('clock-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.closest('.interactive-hotspot')
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('clock-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, isVisible]);

  if (!enabled || !isVisible) return null;

  // Compute angles
  const milliseconds = time.getMilliseconds();
  const seconds = time.getSeconds() + milliseconds / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const secondAngle = seconds * 6; // 360 / 60
  const minuteAngle = minutes * 6; // 360 / 60
  const hourAngle = hours * 30; // 360 / 12

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out select-none"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
      aria-hidden="true"
    >
      {/* Outer Targeting Ring on Hover */}
      <div
        className={`absolute inset-0 -m-3 rounded-full border border-sky-400/50 transition-all duration-300 pointer-events-none ${
          isHoveringClickable
            ? 'scale-125 opacity-100 border-sky-300 ring-2 ring-sky-400/20'
            : 'scale-90 opacity-0'
        }`}
      />

      {/* Mini Mechanical Watch Face */}
      <div
        className={`relative w-9 h-9 rounded-full bg-[#0b101b]/90 backdrop-blur-md border border-slate-600/80 shadow-[0_0_12px_rgba(56,189,248,0.35)] flex items-center justify-center transition-all duration-200 ${
          isHoveringClickable ? 'scale-110 border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.6)]' : ''
        }`}
      >
        {/* Watch Bezel Ticks */}
        <div className="absolute inset-0 rounded-full">
          {/* 12, 3, 6, 9 markers */}
          <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-sky-400 rounded-full" />
          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-sky-400/70 rounded-full" />
          <span className="absolute left-0.5 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-sky-400/70 rounded-full" />
          <span className="absolute right-0.5 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-sky-400/70 rounded-full" />
        </div>

        {/* Center Jewel / Axis */}
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 z-30 shadow-[0_0_4px_#f59e0b]" />

        {/* Hour Hand */}
        <div
          className="absolute w-[1.5px] h-2.5 bg-slate-200 rounded-full origin-bottom z-10 bottom-1/2 left-[calc(50%-0.75px)] shadow-sm"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        />

        {/* Minute Hand */}
        <div
          className="absolute w-[1px] h-3.5 bg-sky-300 rounded-full origin-bottom z-20 bottom-1/2 left-[calc(50%-0.5px)] shadow-sm"
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        />

        {/* Second Hand (Fine Horology Sweep) */}
        <div
          className="absolute w-[0.75px] h-4 bg-red-400 origin-bottom z-25 bottom-1/2 left-[calc(50%-0.375px)]"
          style={{ transform: `rotate(${secondAngle}deg)` }}
        >
          <div className="w-1 h-1 rounded-full bg-red-400 -ml-[1px] mt-0" />
        </div>

        {/* Subtle Sapphire Reflection */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
