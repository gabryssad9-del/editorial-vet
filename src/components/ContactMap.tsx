'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useMotionValue } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const MapClient = dynamic(() => import('./LeafletTransitMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-[700px] bg-[#0a0a0a] flex items-center justify-center font-outfit text-accent font-black tracking-widest uppercase">Inicjalizacja systemu...</div>
});

export const ContactMap = () => {
  const containerRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  useEffect(() => {
    const saved = localStorage.getItem('vet_card_pos_v2');
    if (saved) {
      const pos = JSON.parse(saved);
      cardX.set(pos.x);
      cardY.set(pos.y);
    }

    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                    getComputedStyle(document.body).backgroundColor === 'rgb(10, 10, 10)';
      setIsDarkMode(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [cardX, cardY]);

  const contactInfo = (
    <div className="space-y-6 md:space-y-10">
      <div className="flex items-start gap-4 md:gap-6">
        <div className="w-11 h-11 md:w-14 md:h-14 bg-accent/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-accent shrink-0">
          <MapPin size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1">Adres</p>
          <p className={`text-base md:text-lg font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ul. Pana Tadeusza 6, <br />10-461 Olsztyn
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 md:gap-6">
        <div className="w-11 h-11 md:w-14 md:h-14 bg-accent/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-accent shrink-0">
          <Phone size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1">Telefon</p>
          <p className={`text-base md:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>+48 519 619 141</p>
        </div>
      </div>

      <div className="flex items-start gap-4 md:gap-6">
        <div className="w-11 h-11 md:w-14 md:h-14 bg-accent/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-accent shrink-0">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1">Godziny</p>
          <p className={`text-base md:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Pn-Pt: 8:00 - 18:00 <br /><span className="opacity-60 text-sm">(szczegóły w FAQ)</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative bg-background overflow-hidden" id="kontakt">

      {/* Section header */}
      <div className="container mx-auto max-w-[1600px] px-6 pt-16 md:pt-24 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className={`text-4xl md:text-8xl font-black font-outfit tracking-tighter leading-none mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Znajdź naszą <br />
              <span className="text-accent italic">Lokalizację</span>.
            </h2>
            <p className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} text-base md:text-xl font-medium`}>
              Zapraszamy do naszej kliniki w samym sercu Olsztyna. Nowoczesna opieka, luksusowe warunki.
            </p>
          </div>
          
          {/* Desktop Contact Grid (Static) */}
          <div className="hidden lg:grid grid-cols-3 gap-6 w-full lg:w-auto">
            {[
              { label: 'Adres', val: 'ul. Pana Tadeusza 6, Olsztyn', icon: MapPin },
              { label: 'Telefon', val: '+48 519 619 141', icon: Phone },
              { label: 'Godziny', val: 'Pn-Pt: 8:00 - 18:00', icon: Clock }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-[2rem] border min-w-[240px] ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black shadow-sm'}`}>
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                  <item.icon size={18} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent mb-1">{item.label}</p>
                <p className="text-sm font-bold opacity-90 leading-tight">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: compact info strip (above map) ───────────────────────────── */}
      <div className="lg:hidden px-4 pb-3">
        <div className={`${isDarkMode ? 'bg-[#141414] border-white/8 text-white' : 'bg-white border-black/8 text-black shadow-lg'} rounded-2xl border px-5 py-4 flex flex-col gap-3`}>
          {/* Row 1: Address + Phone */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                <MapPin size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">Adres</p>
                <p className={`text-xs font-bold leading-tight truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>ul. Pana Tadeusza 6, Olsztyn</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                <Phone size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">Telefon</p>
                <p className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>+48 519 619 141</p>
              </div>
            </div>
          </div>
          {/* Row 2: Hours + GPS button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                <Clock size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">Godziny</p>
                <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Pn-Pt 8:00 – 18:00</p>
              </div>
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event('trigger-locate'))}
              className="shrink-0 flex items-center gap-2 bg-accent text-white rounded-xl px-4 py-2.5 font-black text-[9px] tracking-[0.2em] uppercase shadow-[0_8px_20px_rgba(254,69,32,0.4)] active:scale-95 transition-all"
            >
              <Navigation size={12} />
              GPS
            </button>
          </div>
        </div>
      </div>

      {/* Map component — handles its own mobile/desktop rendering internally */}
      <MapClient />



    </section>
  );
};
