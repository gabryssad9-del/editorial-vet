'use client';

import { m, AnimatePresence } from 'framer-motion';
import { Heart, Zap, ChevronRight, ArrowLeft, CheckCircle2, Shield, Activity, Microscope, Scissors, Sparkles, Star, Clock, Droplets, Smile, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Lenis from 'lenis';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <m.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 rounded-2xl bg-accent/10 text-accent border border-accent/20 backdrop-blur-md"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </m.button>
  );
};

const services = [
  { 
    id: 'dermatologia',
    icon: Sparkles, 
    title: "Dermatologia", 
    subtitle: "Specjalizacja",
    desc: "Nasza szczególna pasja. Diagnozujemy i leczymy świąd ciała, problemy z uszami, zmiany skórne oraz guzki. Zapewniamy ulgę Twojemu pupilowi.",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1600",
    features: ["Wizyty Dermatologiczne", "Badania Skóry", "Leczenie Alergii", "Pobieranie Zeskrobin"],
    color: "from-orange-500/20 to-transparent"
  },
  { 
    id: 'stomatologia',
    icon: Smile, 
    title: "Stomatologia", 
    subtitle: "Zdrowy Uśmiech",
    desc: "Profesjonalna opieka stomatologiczna, w tym zaawansowane RTG stomatologiczne. Dbamy o higienę jamy ustnej i leczymy schorzenia zębów.",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=1600",
    features: ["RTG Stomatologiczne", "Sanacja Jamy Ustnej", "Ekstrakcje", "Profilaktyka"],
    color: "from-blue-400/20 to-transparent"
  },
  { 
    id: 'chirurgia',
    icon: Scissors, 
    title: "Chirurgia Miękka", 
    subtitle: "Zabiegi Specjalistyczne",
    desc: "Przeprowadzamy bezpieczne zabiegi chirurgii miękkiej, w tym kastracje kocurów oraz kastracje chemiczne (Suprelorin). Każdy pacjent jest pod troskliwą opieką.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1600",
    features: ["Chirurgia Miękka", "Kastracja Kocurów", "Kastracja Chemiczna", "Kontrola po zabiegu"],
    color: "from-accent/20 to-transparent"
  },
  { 
    id: 'diagnostyka',
    icon: Microscope, 
    title: "Diagnostyka & Profilaktyka", 
    subtitle: "Pełna Kontrola",
    desc: "Szeroki wachlarz badań: USG jamy brzusznej, RTG, badania krwi, ciśnienia oraz pełna profilaktyka (szczepienia, odrobaczenia, czipowanie).",
    image: "https://images.unsplash.com/photo-1579152276532-53513ca49231?q=80&w=1600",
    features: ["USG Jamy Brzusznej", "RTG Cyfrowe", "Badania Krwi", "Paszporty & Czipowanie"],
    color: "from-emerald-500/20 to-transparent"
  },
  { 
    id: 'pielegnacja',
    icon: Droplets, 
    title: "Pielęgnacja", 
    subtitle: "Grooming",
    desc: "Profesjonalne strzyżenie psów i kotów (również w premedykacji). Obcinanie pazurów oraz pielęgnacja dostosowana do potrzeb zwierzęcia.",
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=1600",
    features: ["Strzyżenie Psów & Kotów", "Strzyżenie w Premedykacji", "Kąpiele Pielęgnacyjne", "Obcinanie Pazurów"],
    color: "from-purple-500/20 to-transparent"
  }
];

export default function ServicesThemeV1() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wrapper: document.getElementById('services-scroll-container') as HTMLElement,
      content: document.getElementById('services-scroll-content') as HTMLElement,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen md:h-screen bg-background font-inter selection:bg-accent selection:text-white overflow-x-hidden relative flex flex-col">
      
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <AnimatePresence mode="wait">
          <m.div 
            key={activeTab}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className={cn("absolute inset-0 bg-gradient-to-br opacity-30 blur-[120px]", services[activeTab].color)}
          />
        </AnimatePresence>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 px-4 md:px-8 py-4 bg-background/40 backdrop-blur-md border-b border-accent/5">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 font-outfit text-xl font-black tracking-tighter text-accent group">
            <Heart fill="currentColor" size={20} className="group-hover:scale-110 transition-transform" />
            <span className="hidden xs:inline">VETMED</span>
          </Link>
          <div className="flex items-center gap-4 md:gap-8">
            <ThemeToggle />
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> 
              <span className="hidden sm:inline">Wróć do kliniki</span>
              <span className="sm:hidden">Wróć</span>
            </Link>
            <a href="https://vetmed.nakiedy.pl/" target="_blank" rel="noopener noreferrer">
              <button className="px-4 md:px-5 py-2 bg-foreground text-background rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all whitespace-nowrap">
                Umów wizytę
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Master-Detail Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Detail View (Left on Desktop, Top/Hidden on Mobile depending on state) */}
        <div className={cn(
          "flex-1 relative flex items-center justify-center p-6 md:p-12 overflow-hidden border-r border-accent/5 transition-all duration-500",
          "lg:flex", // Always show on desktop
          activeTab === -1 ? "hidden" : "flex" // Toggle on mobile if we added a list-only mode (but here we always have one active)
        )}>
          <AnimatePresence mode="wait">
            <m.div 
              key={activeTab}
              initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl grid grid-cols-1 gap-8 md:gap-12"
            >
              <div className="relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 md:border-4 border-border/50 backdrop-blur-md">
                <img 
                  src={services[activeTab].image} 
                  alt={services[activeTab].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-8 left-8 flex items-center gap-4">
                  <div className="px-3 py-1.5 md:px-4 py-2 bg-card-bg/20 backdrop-blur-md rounded-full border border-border/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">
                    Usługa 0{activeTab + 1}
                  </div>
                </div>
              </div>

              <div className="max-w-2xl text-center lg:text-left">
                <m.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-outfit font-black tracking-tighter mb-4 md:mb-6 leading-none text-foreground"
                >
                  {services[activeTab].title} <br />
                  <span className="text-accent italic">{services[activeTab].subtitle}</span>
                </m.h1>
                <p className="text-base md:text-lg text-text-gray font-medium opacity-60 leading-relaxed mb-6 md:mb-8">
                  {services[activeTab].desc}
                </p>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  {services[activeTab].features.map((f, i) => (
                    <div key={i} className="flex items-center justify-center lg:justify-start gap-3 bg-card-bg/5 p-3 rounded-xl border border-border lg:bg-transparent lg:p-0 lg:border-none">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Master List (Right on Desktop, Bottom/Scroll on Mobile) */}
        <div 
          id="services-scroll-container"
          className="w-full lg:w-[450px] bg-card-bg/5 backdrop-blur-xl border-l border-border overflow-y-auto scrollbar-hide p-6 md:p-8 flex flex-col gap-4"
        >
          <div id="services-scroll-content" className="flex flex-col gap-4 min-h-full">
            <div className="mb-4 text-center lg:text-left">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2">Zakres Usług</h3>
              <p className="text-xs opacity-40 font-medium">Kliknij, aby poznać detale oferty.</p>
            </div>

          {services.map((s, i) => (
            <m.div
              key={s.id}
              onClick={() => {
                setActiveTab(i);
                if (window.innerWidth < 1024) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "cursor-pointer group relative p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 border border-transparent",
                activeTab === i 
                  ? "bg-foreground text-background shadow-2xl scale-[1.02]" 
                  : "bg-card-bg/5 hover:bg-card-bg/10 text-foreground border-border/50"
              )}
            >
              <div className="flex items-center gap-4 md:gap-5">
                <div className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all",
                  activeTab === i ? "bg-accent text-white" : "bg-accent/5 text-accent"
                )}>
                  <s.icon className="w-4.5 h-4.5 md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-black tracking-tighter leading-none mb-1">{s.title}</h4>
                  <p className={cn(
                    "text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-40",
                    activeTab === i && "text-background/60"
                  )}>{s.subtitle}</p>
                </div>
                {activeTab === i && (
                  <m.div 
                    layoutId="active-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                  />
                )}
              </div>
            </m.div>
          ))}

          {/* Quick Info Sidebar */}
          <div className="mt-auto pt-8 border-t border-border/50 grid grid-cols-2 gap-4">
             <div className="p-4 md:p-5 rounded-2xl bg-accent text-white flex flex-col justify-between aspect-square group overflow-hidden relative">
                <Clock size={20} className="mb-2" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-tight">Strzyżenia: <br />Tylko Telefon</span>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-card-bg/20 rounded-full blur-xl group-hover:scale-150 transition-transform" />
             </div>
             <div className="p-4 md:p-5 rounded-2xl bg-card-bg/5 border border-border flex flex-col justify-between aspect-square">
                <Activity size={20} className="text-accent mb-2" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-tight">Dermatologia <br />& Stomatologia</span>
             </div>
          </div>
        </div>
      </div>

      </div>

      {/* Footer Compact */}
      <footer className="px-4 md:px-8 py-4 md:py-6 bg-background border-t border-accent/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
         <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-20 text-center md:text-left">
            &copy; 2026 VETMED. Wszystkie prawa zastrzeżone.
         </p>
         <div className="flex gap-6 text-[8px] font-black uppercase tracking-widest opacity-30">
            <Link href="/polityka-prywatnosci" className="hover:text-accent transition-colors">Polityka Prywatności</Link>
            <Link href="/regulamin" className="hover:text-accent transition-colors">Regulamin</Link>
         </div>
      </footer>
    </main>
  );
}
