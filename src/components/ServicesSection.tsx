'use client';
import React from 'react';
import { DynamicMotion } from './DynamicMotion';

export const ServicesSection = () => {
  const services = [
    { icon: Sparkles, title: "Dermatologia", desc: "Nasze szczególne zainteresowanie. Diagnozujemy i leczymy choroby skóry, uszu oraz alergie." },
    { icon: Smile, title: "Stomatologia", desc: "Kompleksowa opieka dentystyczna, w tym zaawansowane RTG stomatologiczne dla pupila." },
    { icon: Scissors, title: "Chirurgia Miękka", desc: "Bezpieczne zabiegi chirurgiczne, kastracje oraz profesjonalna opieka pooperacyjna." },
    { icon: Droplets, title: "Pielęgnacja", desc: "Strzyżenie psów i kotów (również w premedykacji). Umawianie wyłącznie telefoniczne." },
  ];

  return (
    <section id="uslugi" className="py-16 md:py-32 px-4 md:px-8 relative overflow-hidden bg-secondary/50">
      {/* Decorative icons - Desktop only */}
      <div className="hidden lg:block absolute top-10 left-10 opacity-5 -rotate-12 scale-150 pointer-events-none">
        <Heart size={200} fill="currentColor" className="text-accent" />
      </div>
      <div className="hidden lg:block absolute bottom-10 right-10 opacity-5 rotate-12 scale-150 pointer-events-none">
        <Star size={200} fill="currentColor" className="text-accent" />
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <Badge>Oferta Ekspercka</Badge>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black tracking-tighter mb-4 md:mb-6 leading-none">Specjalizacje <br className="md:hidden" /> <span className="text-accent italic">VETMED</span>.</h2>
          <p className="text-sm md:text-base text-text-gray max-w-2xl mx-auto opacity-70">Precyzja diagnostyczna i serce do opieki w każdym detalu.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((s, i) => {
            return (
              <DynamicMotion
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="group h-full"
              >
                <div className="bg-card-bg h-full p-6 md:p-8 py-10 md:py-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm md:shadow-premium border border-border flex flex-col items-center text-center lg:hover:border-accent/30 lg:hover:shadow-[0_60px_120px_-30px_rgba(254,69,32,0.1)] transition-all duration-500 relative overflow-hidden">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-card-bg rounded-full shadow-sm md:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center text-accent mb-6 md:mb-8 relative z-10 lg:group-hover:bg-accent lg:group-hover:text-white transition-all duration-500">
                    <s.icon className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-5 tracking-tighter relative z-10 leading-none">{s.title}</h3>
                  <p className="text-text-gray leading-relaxed text-sm md:text-base opacity-70 relative z-10 max-w-[220px]">
                    {s.desc}
                  </p>
                  <div className="mt-6 md:mt-8">
                     <Link href="/uslugi" className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2 bg-accent/5 px-5 py-3 rounded-full border border-accent/10 lg:hover:bg-accent lg:hover:text-white transition-all duration-300">
                       Odkryj <ChevronRight size={14} />
                     </Link>
                  </div>
                </div>
              </DynamicMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
};
