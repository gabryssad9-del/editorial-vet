'use client';
import React from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';

const LiquidButton = dynamic(() => import('./LiquidButton').then(mod => mod.LiquidButton), { ssr: true });
const Badge = dynamic(() => import('./Badge').then(mod => mod.Badge), { ssr: true });

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const scaleScroll = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section id="start" className="min-h-screen pt-32 pb-20 md:pt-52 md:pb-32 px-4 md:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <m.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            <Badge>Wyjątkowa Opieka Dla Pupila</Badge>
            <m.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-5xl md:text-6xl lg:text-[7.5rem] font-outfit font-black leading-[0.85] text-foreground mb-8 md:mb-12 tracking-tighter"
            >
              Gdzie Serce <br /> <span className="text-accent italic">Spotyka</span> Wiedzę.
            </m.h1>
            <m.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-xl lg:text-2xl text-text-gray max-w-xl mx-auto lg:mx-0 mb-10 md:mb-16 leading-relaxed font-medium opacity-80"
            >
              Znajdziemy przyczynę bólu, zanim Twój pupil poczuje stres. Tworzymy domową atmosferę, w której zwierzęta czują się bezpiecznie, a Ty masz pewność, że są w kochających rękach.
            </m.p>
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start w-full sm:w-auto"
            >
              <a href="https://vetmed.nakiedy.pl/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto group">
                <m.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <LiquidButton className="text-lg w-full sm:w-auto relative overflow-hidden shadow-glow">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Umów wizytę online <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </LiquidButton>
                </m.div>
              </a>
              <a href="tel:+48519619141" className="w-full sm:w-auto">
                <m.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <LiquidButton variant="secondary" className="text-lg w-full sm:w-auto border-accent/20 bg-accent/5 hover:bg-accent/10">
                    <span className="flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5 text-accent" />
                      Zadzwoń: 519 619 141
                    </span>
                  </LiquidButton>
                </m.div>
              </a>
            </m.div>
          </m.div>
          
          <m.div
            style={{ 
              translateY: scrollY, 
              scale: scaleScroll,
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
            initial={{ opacity: 1, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative will-change-transform transform-gpu"
          >
            <div 
              className="relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(254,69,32,0.15)] border-[12px] md:border-[20px] border-secondary group isolate transform-gpu"
              style={{ maskImage: 'radial-gradient(white, black)', WebkitMaskImage: 'radial-gradient(white, black)' }}
            >
              <img 
                src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=1000&output=webp&q=80" 
                srcSet="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=400&output=webp&q=60 400w, https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=1000&output=webp&q=80 1000w"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="VETMED Hero" 
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width="1200"
                height="750"
                className="w-full h-[450px] md:h-[750px] object-cover transition-transform duration-[4s] group-hover:scale-110 will-change-transform transform-gpu" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-background/20 backdrop-blur-xl px-4 md:px-8 py-2 md:py-4 rounded-full border border-background/30 text-foreground font-black text-[8px] md:text-xs uppercase tracking-widest">
                 Premium Care
              </div>
            </div>
            <div className="absolute -top-10 md:-top-20 -right-10 md:-right-20 w-40 md:w-80 h-40 md:h-80 bg-accent/5 rounded-full blur-[60px] md:blur-[100px]" />
            <div className="absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-40 md:w-80 h-40 md:h-80 bg-blue-400/5 rounded-full blur-[60px] md:blur-[100px]" />
          </m.div>
        </div>
      </div>
    </section>
  );
};
