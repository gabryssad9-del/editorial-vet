'use client';
import React from 'react';
import { DynamicMotion } from './DynamicMotion';

export const HeroContent = () => {
  return (
    <DynamicMotion 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center lg:text-left"
    >
      <div className="flex flex-col items-center lg:items-start gap-8 md:gap-10 max-w-4xl">
        <Badge>Klinika Weterynaryjna Olsztyn</Badge>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-outfit font-black tracking-tighter leading-[0.85] text-foreground">
          Profesjonalna <br /> <span className="text-accent italic">opieka</span> dla pupili.
        </h1>
        <p className="text-base md:text-lg text-text-gray font-medium leading-relaxed max-w-2xl opacity-80 mx-auto lg:mx-0">
          Zapewniamy kompleksową pomoc medyczną, od profilaktyki po zaawansowaną chirurgię. Nasz zespół lekarzy łączy wieloletnie doświadczenie z nowoczesną diagnostyką, aby Twój pupil otrzymał najlepszą możliwą opiekę.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start w-full sm:w-auto mt-6 md:mt-10">
        <div className="w-full sm:w-auto transition-transform lg:hover:scale-105 active:scale-95">
          <LiquidButton href="https://vetmed.nakiedy.pl/" className="text-lg w-full sm:w-auto relative overflow-hidden shadow-glow">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Umów wizytę online <ChevronRight className="w-5 h-5 transition-transform lg:group-hover:translate-x-1" />
            </span>
          </LiquidButton>
        </div>
      </div>
    </DynamicMotion>
  );
};
