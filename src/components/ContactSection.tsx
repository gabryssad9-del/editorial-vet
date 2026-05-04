'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Badge } from './Badge';
import dynamic from 'next/dynamic';

const LiquidButton = dynamic(() => import('./LiquidButton').then(mod => mod.LiquidButton), { ssr: false });

export const ContactSection = () => {
  const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

  return (
    <section id="kontakt" className="py-12 md:py-20 px-4 md:px-8 relative bg-background">
      <div className="container mx-auto">
          <div className="bg-secondary/50 dark:bg-secondary/20 backdrop-blur-2xl rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 overflow-hidden relative shadow-premium border border-accent/10">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30">
               <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[150px]" />
               <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-[150px]" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
              <div className="text-foreground text-center lg:text-left">
                <Badge className="bg-accent/10 text-accent border-accent/20 mb-8">Kontakt Premium</Badge>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-outfit font-black mb-8 md:mb-12 tracking-tighter leading-[0.9] text-foreground">
                  Czekamy na <br /> <span className="text-accent italic">Wasz</span> sygnał.
                </h2>
                <div className="space-y-8 md:space-y-12">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center lg:items-start group/contact">
                    <div className="w-16 h-16 bg-card-bg rounded-2xl shadow-premium flex items-center justify-center text-accent group-hover/contact:bg-accent group-hover/contact:text-white transition-all duration-700 border border-accent/10 shrink-0"><Phone size={28} /></div>
                    <div className="text-center lg:text-left">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-gray/40 mb-1">Umów Wizytę</p>
                       <p className="text-2xl md:text-3xl font-black italic tracking-tight text-foreground">519 619 141</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center lg:items-start group/contact">
                    <div className="w-16 h-16 bg-card-bg rounded-2xl shadow-premium flex items-center justify-center text-accent group-hover/contact:bg-accent group-hover/contact:text-white transition-all duration-700 border border-accent/10 shrink-0"><MapPin size={28} /></div>
                    <div className="text-center lg:text-left">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-gray/40 mb-1">Nasza Siedziba</p>
                       <p className="text-2xl md:text-3xl font-black italic tracking-tight text-foreground">ul. Pana Tadeusza 6-6A, Olsztyn</p>
                    </div>
                  </div>
    
                  <div className="pt-8 border-t border-accent/10">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                      <Clock size={20} className="text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Godziny Przyjęć</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                      {[
                        { day: "Poniedziałek", hours: "10:00-14:00 | 16:00-18:00" },
                        { day: "Wtorek", hours: "08:00-16:00" },
                        { day: "Środa", hours: "10:00-14:00 | 16:00-18:00" },
                        { day: "Czwartek", hours: "08:00-16:00" },
                        { day: "Piątek", hours: "10:00-14:00 | 16:00-18:00" },
                        { day: "Sobota / Ndz", hours: "Zamknięte", closed: true }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[10px] font-bold border-b border-accent/5 pb-2">
                          <span className="text-foreground/40 uppercase tracking-widest">{item.day}</span>
                          <span className={cn("tracking-tight italic", item.closed ? "text-accent" : "text-foreground")}>{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card-bg/80 dark:bg-card-bg/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-premium border border-accent/10 max-w-xl mx-auto lg:mx-0 flex flex-col justify-center items-center text-center">
                 <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-8">
                   <Phone size={48} className="text-accent animate-pulse" />
                 </div>
                 <h3 className="text-3xl font-black mb-4">Nagły przypadek?</h3>
                 <p className="text-text-gray opacity-80 mb-8">Zrezygnowaliśmy z formularzy, bo w weterynarii liczy się każda minuta. Odbieramy telefony od razu.</p>
                 <a href="tel:+48519619141" className="w-full">
                   <LiquidButton className="w-full py-6 md:py-8 text-[12px] md:text-sm tracking-[0.3em] shadow-glow">
                      ZADZWOŃ TERAZ
                   </LiquidButton>
                 </a>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};
