'use client';

import { m, AnimatePresence } from 'framer-motion';
import { Heart, Zap, CheckCircle2, Activity, Microscope, Scissors, Sparkles, Star, Clock, Droplets, Smile, ArrowRight, Shield, Syringe } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { LiquidButton } from '@/components/LiquidButton';
import { Badge } from '@/components/Badge';
import { PhoneCardTooltip } from '@/components/PhoneCardTooltip';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const services = [
  { 
    id: 'dermatologia',
    icon: Sparkles, 
    title: "Dermatologia", 
    tag: "Pasja & Precyzja",
    desc: "Specjalizujemy się w leczeniu uporczywego świądu, alergii oraz skomplikowanych zmian skórnych. Twój pupil zasługuje na komfort bez drapania.",
    image: "/editorial-vet/emotional-vet/dermatologia_premium_vet_1777155118669.png",
    features: ["Alergologia", "Zeskrobiny", "Biopsje skóry", "Leczenie uszu"],
    stats: "98% skuteczności"
  },
  { 
    id: 'stomatologia',
    icon: Smile, 
    title: "Stomatologia", 
    tag: "RTG Cyfrowe",
    desc: "Zaawansowana diagnostyka RTG stomatologicznego pozwala nam wykryć to, czego nie widać gołym okiem. Pełna sanacja i chirurgia szczękowa.",
    image: "/editorial-vet/emotional-vet/stomatologia_premium_vet_1777155131239.png",
    features: ["RTG Stomatologiczne", "Usuwanie kamienia", "Ekstrakcje", "Higiena"],
    stats: "Nowoczesne RTG"
  },
  { 
    id: 'chirurgia',
    icon: Scissors, 
    title: "Chirurgia", 
    tag: "Bezpieczeństwo",
    desc: "Zabiegi chirurgii miękkiej oraz kastracje (tradycyjne i chemiczne Suprelorin) w najwyższym standardzie sterylności i opieki pooperacyjnej.",
    image: "/editorial-vet/emotional-vet/chirurgia_premium_vet_1777155145748.png",
    features: ["Chirurgia miękka", "Kastracje", "Suprelorin", "Onkologia"],
    stats: "Pełny monitoring"
  },
  { 
    id: 'diagnostyka',
    icon: Microscope, 
    title: "Diagnostyka", 
    tag: "Pełen Obraz",
    desc: "Własne laboratorium i zaawansowane USG/RTG pozwalają nam na szybkie postawienie trafnej diagnozy, co jest kluczowe w ratowaniu życia.",
    image: "/editorial-vet/emotional-vet/diagnostyka_premium_vet_1777155161736.png",
    features: ["USG Doppler", "Badania krwi", "Czipowanie", "Paszporty"],
    stats: "Wyniki od ręki"
  }
];

// --- 3D Components (Three.js) ---

const PawBackground = () => {
  const paws = [
    { id: 1, left: "5%", top: "15%", rotate: 15, scale: 1.2 },
    { id: 2, left: "85%", top: "10%", rotate: -20, scale: 0.8 },
    { id: 3, left: "45%", top: "5%", rotate: 45, scale: 0.6 },
    { id: 4, left: "15%", top: "45%", rotate: 110, scale: 1.1 },
    { id: 5, left: "75%", top: "55%", rotate: -45, scale: 0.9 },
    { id: 6, left: "35%", top: "75%", rotate: 180, scale: 1.3 },
    { id: 7, left: "90%", top: "85%", rotate: 30, scale: 0.7 },
    { id: 10, left: "25%", top: "25%", rotate: -90, scale: 0.8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15">
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute will-change-transform transform-gpu"
          style={{ 
            left: paw.left, 
            top: paw.top, 
            color: '#FE4520',
            transform: `rotate(${paw.rotate}deg) scale(${paw.scale})`,
          }}
        >
          <svg width="70" height="70" viewBox="0 0 48.839 48.839" fill="currentColor">
            <path d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252
              c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373
              c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742
              c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181
              C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0
              S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971
              s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878
              c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z
               M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414
              S48.455,16.861,45.727,15.602z"/>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default function ServicesPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen relative bg-background font-inter overflow-x-hidden selection:bg-accent selection:text-white">
      <Navbar />
      <PawBackground />
      
      {/* Brand Bloom - Czerwień i Grafit */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent rounded-full blur-[150px] opacity-[0.08]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-200 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-8">
            Ekspercka Opieka
          </Badge>
          <m.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl lg:text-9xl font-outfit font-black tracking-tighter leading-[0.85] mb-8"
          >
            Nasze <br /> <span className="text-accent italic">Usługi</span>.
          </m.h1>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-text-gray max-w-2xl mx-auto font-medium opacity-60 leading-relaxed"
          >
            Od profilaktyki po zaawansowaną chirurgię – zapewniamy kompleksowe wsparcie dla Twojego przyjaciela.
          </m.p>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {services.map((service, index) => (
              <m.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative group rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-border shadow-premium transition-all duration-700",
                  index === 0 || index === 3 ? "md:col-span-7 h-[500px] md:h-[600px]" : "md:col-span-5 h-[500px] md:h-[600px]"
                )}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-0 opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 transition-all duration-700" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col transition-all duration-700">
                  {/* Top Badges - Improved Mobile Layout */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white px-3 md:px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                      {service.tag}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-accent italic bg-accent/10 backdrop-blur-md px-3 py-1 rounded-full border border-accent/20 shadow-sm">
                      {service.stats}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-accent mb-4 md:6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <service.icon size={index === 0 || index === 3 ? 32 : 24} />
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-outfit font-black tracking-tighter mb-3 md:mb-4 text-white group-hover:text-accent transition-colors drop-shadow-2xl leading-none">
                      {service.title}
                    </h3>
                    <p className="text-[13px] md:text-base text-white/80 font-medium mb-6 md:mb-8 max-w-md leading-relaxed drop-shadow-lg">
                      {service.desc}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent rounded-full shadow-[0_0_10px_rgba(254,69,32,0.5)]" />
                          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-all duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </m.div>
            ))}

            {/* CTA Tile */}
            <m.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-12 bg-secondary/80 dark:bg-secondary/40 backdrop-blur-xl text-foreground rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 text-center relative overflow-hidden group/cta"
            >
              <div className="relative z-10 max-w-3xl mx-auto">
                <Badge className="bg-accent/10 text-accent border-accent/20 mb-8">Gotowy na wizytę?</Badge>
                <h2 className="text-4xl md:text-7xl font-outfit font-black tracking-tighter mb-8 leading-[0.9] text-foreground">
                  Zatroszczymy się o <br /> Twój największy <span className="text-accent italic">Skarb</span>.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <LiquidButton href="https://vetmed.nakiedy.pl/" className="px-12 py-5 text-lg">
                    Umów wizytę online
                  </LiquidButton>
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-1 lg:hidden">Lub zadzwoń bezpośrednio</span>
                    <a href="tel:519619141" className="text-2xl font-black hover:text-accent transition-colors lg:hidden">519 619 141</a>
                    
                    <PhoneCardTooltip align="left" className="hidden lg:flex flex-col items-start">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">Lub zadzwoń bezpośrednio</span>
                      <span className="text-2xl font-black hover:text-accent transition-colors">519 619 141</span>
                    </PhoneCardTooltip>
                  </div>
                </div>
              </div>

              {/* Floating Icons Background */}
              <div className="absolute inset-0 pointer-events-none opacity-5 group-hover/cta:opacity-10 transition-opacity">
                 <Shield size={150} className="absolute -top-10 -left-10 rotate-12" />
                 <Syringe size={120} className="absolute -bottom-10 -right-10 -rotate-12" />
                 <Activity size={100} className="absolute top-1/2 left-20 -translate-y-1/2 opacity-20" />
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 font-outfit text-2xl font-black tracking-tighter text-accent">
            <img 
              src="/editorial-vet/emotional-vet/vetmed1.png" 
              alt="VETMED Logo" 
              className="h-20 w-auto object-contain brightness-110 drop-shadow-[0_0_10px_rgba(254,69,32,0.2)]" 
            />
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-text-gray">
             <Link href="/polityka-prywatnosci" className="hover:text-accent transition-colors">Prywatność</Link>
             <Link href="/regulamin" className="hover:text-accent transition-colors">Regulamin</Link>
             <Link href="/" className="hover:text-accent transition-colors">Start</Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">
            &copy; 2026 VETMED. Premium Veterinary Care.
          </p>
        </div>
      </footer>
    </main>
  );
}

