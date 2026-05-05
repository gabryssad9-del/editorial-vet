'use client';

import React, { useState, useRef, useEffect } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scissors, Sparkles, MoveHorizontal } from 'lucide-react';
import { Badge } from './Badge';

interface ComparisonProps {
  before: string;
  after: string;
  label: string;
}

const ComparisonSlider = ({ before, after, label }: ComparisonProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPos = useMotionValue(50);
  
  // High stiffness + lower damping = very snappy and responsive feel
  const springPos = useSpring(sliderPos, { damping: 40, stiffness: 800, mass: 0.5 });
  const clipPath = useTransform(springPos, (pos) => `inset(0 ${100 - pos}% 0 0)`);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    sliderPos.set(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [isDragging]);

  return (
    <div className="relative group">
      <div 
        ref={containerRef}
        className="relative aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl border-4 border-white/10"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          handleMove(e.nativeEvent);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.nativeEvent);
        }}
      >
        {/* After Image (Background) */}
        <img 
          src={after} 
          alt={`${label} After`} 
          loading="lazy"
          decoding="async"
          draggable="false"
          width="600"
          height="750"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Before Image (Foreground, clipped) */}
        <m.div 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          style={{ clipPath }}
        >
          <img 
            src={before} 
            alt={`${label} Before`} 
            loading="lazy"
            decoding="async"
            draggable="false"
            width="600"
            height="750"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />
          {/* Before Label */}
          <div className="absolute top-6 left-6 z-20 bg-black/40 backdrop-blur-md text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
            Przed
          </div>
        </m.div>

        {/* After Label */}
        <div className="absolute top-6 right-6 z-0 bg-accent/80 backdrop-blur-md text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          Po wizycie
        </div>

        {/* Slider Line */}
        <m.div 
          className="absolute inset-y-0 z-30 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none"
          style={{ left: useTransform(springPos, (p) => `${p}%`) }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center text-accent">
            <MoveHorizontal size={20} />
          </div>
        </m.div>
      </div>
      
      <div className="mt-6 flex justify-between items-center px-2">
        <h3 className="text-xl font-black font-outfit uppercase tracking-tighter italic text-foreground">{label}</h3>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-accent/30" />)}
        </div>
      </div>
    </div>
  );
};

export const GroomingGallery = () => {
  const animals = [
    { label: "Pudel Królewski", before: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/poodle_before.png&w=600&output=webp&q=70", after: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/poodle_after.png&w=600&output=webp&q=70" },
    { label: "Yorkshire Terrier", before: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/yorkie_before.png&w=600&output=webp&q=70", after: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/yorkie_after.png&w=600&output=webp&q=70" },
    { label: "Kot Perski", before: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/cat_before.png&w=600&output=webp&q=70", after: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/cat_after.png&w=600&output=webp&q=70" },
    { label: "Sznaucer Olbrzym", before: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/schnauzer_before.png&w=600&output=webp&q=70", after: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/grooming/schnauzer_after.png&w=600&output=webp&q=70" },
  ];

  return (
    <section className="py-32 px-6 bg-background relative" id="pacjenci">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <Badge className="mb-6">Salon Piękności</Badge>
            <h2 className="text-5xl md:text-7xl font-black font-outfit tracking-tighter leading-[0.9] mb-8 text-foreground">
              Zmieniamy <span className="text-accent italic">Styl</span>,<br /> 
              Zachowujemy <span className="underline decoration-accent/30">Duszę</span>.
            </h2>
            <p className="text-lg text-foreground/60 max-w-lg font-medium">
              Przesuń suwak, aby zobaczyć magię profesjonalnej pielęgnacji. Nasi styliści dbają o każdy detal, od kąpieli po finalne cięcie.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {animals.map((animal, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ComparisonSlider {...animal} />
            </m.div>
          ))}
        </div>

        <m.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-widest text-xs hover:gap-4 transition-all cursor-pointer">
            Zobacz całe portfolio przemian <Sparkles size={14} />
          </div>
        </m.div>
      </div>
    </section>
  );
};
