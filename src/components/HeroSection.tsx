'use client';
import React from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';

const LiquidButton = dynamic(() => import('./LiquidButton').then(mod => mod.LiquidButton), { ssr: true });
const Badge = dynamic(() => import('./Badge').then(mod => mod.Badge), { ssr: true });

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-32 pb-20 md:pt-52 md:pb-32 px-4 md:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center lg:items-start gap-8 md:gap-10 max-w-4xl"
            >
              <Badge>Klinika Weterynaryjna Olsztyn</Badge>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black tracking-tighter leading-[0.85] text-foreground">
                Profesjonalna <br /> <span className="text-accent italic">opieka</span> dla pupili.
              </h1>
              <p className="text-xl md:text-2xl text-text-gray font-medium leading-relaxed max-w-2xl opacity-80 mx-auto lg:mx-0">
                Zapewniamy kompleksową pomoc medyczną, od profilaktyki po zaawansowaną chirurgię. Nasz zespół lekarzy łączy wieloletnie doświadczenie z nowoczesną diagnostyką, aby Twój pupil otrzymał najlepszą możliwą opiekę.
              </p>
            </m.div>
            <m.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start w-full sm:w-auto"
            >
              <div className="w-full sm:w-auto transition-transform hover:scale-105 active:scale-95">
                <LiquidButton href="https://vetmed.nakiedy.pl/" className="text-lg w-full sm:w-auto relative overflow-hidden shadow-glow">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Umów wizytę online <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </LiquidButton>
              </div>
            </m.div>
          </m.div>
          
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div 
              className="relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(254,69,32,0.15)] border-[12px] md:border-[20px] border-secondary group isolate"
            >
              <img 
                src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=800&output=webp&q=70" 
                srcSet="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=450&output=webp&q=50 450w,
                        https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=800&output=webp&q=60 800w,
                        https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=1200&output=webp&q=70 1200w"
                sizes="(max-width: 640px) 450px, (max-width: 1024px) 800px, 1000px"
                alt="VETMED Hero" 
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width="1200"
                height="750"
                className="w-full h-[450px] md:h-[750px] object-cover transition-transform duration-[4s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-background/20 backdrop-blur-xl px-4 md:px-8 py-2 md:py-4 rounded-full border border-background/30 text-foreground font-black text-[8px] md:text-xs uppercase tracking-widest">
                 Premium Care
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};
