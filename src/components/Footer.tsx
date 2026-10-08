import React from 'react';
import { Watch } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-lg font-bold tracking-[0.2em] uppercase text-white font-display">
              AURA <span className="text-xs tracking-[0.3em] font-normal text-slate-400">SWISS</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Independent manufacture horology based in La Chaux-de-Fonds, Switzerland. Dedicated to mechanical transparency and extreme durability.
            </p>
            <div className="text-[11px] font-mono text-sky-400 pt-1">
              Atelier No. CH-645-102948-1
            </div>
          </div>

          {/* Timepieces Nav */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-white text-xs mb-3 font-mono">
              References
            </div>
            <ul className="space-y-2">
              <li><a href="#timepieces" className="hover:text-sky-300 transition-colors">AURA Belmont Carré</a></li>
              <li><a href="#timepieces" className="hover:text-sky-300 transition-colors">AURA Steinach Chronograph</a></li>
              <li><a href="#timepieces" className="hover:text-sky-300 transition-colors">AURA Calibre 10 Diver</a></li>
              <li><a href="#timepieces" className="hover:text-sky-300 transition-colors">AURA Sarnen GMT</a></li>
            </ul>
          </div>

          {/* Manufacture Nav */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-white text-xs mb-3 font-mono">
              Manufacture
            </div>
            <ul className="space-y-2">
              <li><a href="#architecture" className="hover:text-sky-300 transition-colors">Calibre 10 Architecture</a></li>
              <li><a href="#features" className="hover:text-sky-300 transition-colors">316L Metallurgy</a></li>
              <li><a href="#craftsmanship" className="hover:text-sky-300 transition-colors">Master Horologist Atelier</a></li>
              <li><a href="#pricing" className="hover:text-sky-300 transition-colors">Commission Process</a></li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-white text-xs mb-3 font-mono">
              Private Atelier
            </div>
            <p className="text-slate-400 leading-relaxed">
              Rue de la Paix 18<br />
              2300 La Chaux-de-Fonds<br />
              Canton of Neuchâtel, Switzerland
            </p>
            <div className="pt-2 font-mono text-slate-300">
              concierge@auraswiss.ch
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} AURA SWISS Manufacture SA. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Swiss Made Horology</span>
            <span>·</span>
            <span>Contrôle Officiel Suisse des Chronomètres</span>
            <span>·</span>
            <span>ISO 6425 Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
