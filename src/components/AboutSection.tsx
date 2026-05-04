'use client';
import React from 'react';
import { motion as m } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from './Badge';

export const AboutSection = () => (
  <section id="o-nas" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <m.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          <div className="rounded-[3rem] md:rounded-[5.5rem] overflow-hidden shadow-premium border-[12px] md:border-[20px] border-secondary group">
            <img 
              loading="lazy" 
              decoding="async" 
              src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/history.jpg&w=800&output=webp&q=80" 
              alt="O nas" 
              className="w-full h-[450px] md:h-[650px] object-cover transition-transform duration-[5s] group-hover:scale-110" 
            />
          </div>
          <div className="absolute -bottom-10 -right-4 md:-bottom-16 md:-right-16 bg-accent p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-glow max-w-[200px] md:max-w-xs text-white">
             <div className="text-4xl md:text-6xl font-outfit font-black mb-2">15</div>
             <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.3em] opacity-80 leading-relaxed">Lat misji i zaufania w sercu Olsztyna.</p>
          </div>
        </m.div>
        
        <div className="lg:pl-20 order-1 lg:order-2 text-center lg:text-left">
          <Badge>Nasza Misja</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-outfit font-black mb-8 md:mb-12 tracking-tighter leading-tight">Gdzie wiedza <br className="hidden md:block" /> <span className="text-accent italic">spotyka się</span> z pasją.</h2>
          <div className="space-y-6 md:space-y-10 text-lg md:text-xl text-text-gray leading-relaxed mb-12 md:mb-16 font-medium opacity-80">
             <p>Jesteśmy gabinetem weterynaryjnym oferującym pełną gamę usług dla zwierząt – od profilaktyki, poprzez leczenie chorób przewlekłych, po zaawansowaną diagnostykę i pielęgnację.</p>
             <p className="opacity-70">Naszym szczególnym zainteresowaniem cieszy się dziedzina <strong>dermatologii i stomatologii</strong>. Wykonujemy badania USG, RTG (w tym stomatologiczne), badania krwi oraz zabiegi chirurgii miękkiej.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-left">
              <div className="flex gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                   <p className="font-black text-xs md:text-sm uppercase mb-1 md:mb-2">Dermatologia</p>
                   <p className="text-[10px] md:text-xs text-text-gray opacity-60">Leczenie chorób skóry i uszu.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                   <p className="font-black text-xs md:text-sm uppercase mb-1 md:mb-2">Stomatologia</p>
                   <p className="text-[10px] md:text-xs text-text-gray opacity-60">RTG zębowe i chirurgia jamy ustnej.</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
