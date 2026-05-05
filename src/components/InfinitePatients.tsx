'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from './Badge';

const patients = [
  { id: 0, name: "Bruno", breed: "Beagle", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1543466835-00a7907e9de1&w=600&output=webp&q=80" },
  { id: 1, name: "Misia", breed: "Tuxedo Cat", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1514888286974-6c03e2ca1dba&w=600&output=webp&q=80" },
  { id: 2, name: "Simba", breed: "Hamster", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1425082661705-1834bfd09dca&w=600&output=webp&q=80" },
  { id: 3, name: "Bella", breed: "Corgi", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1537151608828-ea2b11777ee8&w=600&output=webp&q=80" },
  { id: 4, name: "Rocky", breed: "Border Collie", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1583337130417-3346a1be7dee&w=600&output=webp&q=80" },
  { id: 5, name: "Sonia", breed: "Frenchie", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1583511655857-d19b40a7a54e&w=600&output=webp&q=80" },
  { id: 6, name: "Luna", breed: "British Cat", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1533738363-b7f9aef128ce&w=600&output=webp&q=80" },
  { id: 7, name: "Max", breed: "Pug", img: "https://images.weserv.nl/?url=images.unsplash.com/photo-1598133894008-61f7fdb8cc3a&w=600&output=webp&q=80" },
];

const PatientCard = ({ p }: { p: typeof patients[0] }) => (
  <m.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative h-48 sm:h-56 lg:h-60 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-secondary shadow-premium border border-accent/5"
  >
    <img 
       loading="lazy"
       decoding="async"
       src={p.img}
       alt={p.name}
       width="600"
       height="800"
       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/80 mb-1">{p.breed}</p>
      <h4 className="text-base md:text-lg font-black font-outfit text-white uppercase tracking-tighter leading-none">{p.name}</h4>
    </div>
  </m.div>
);

export const InfinitePatients = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const updateLimit = () => {
      setLimit(window.innerWidth < 640 ? 2 : 4);
    };
    updateLimit();
    window.addEventListener('resize', updateLimit);
    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  return (
    <section id="pacjenci" className="py-14 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <Badge>Nasza Galeria</Badge>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black mb-8 md:mb-12 tracking-tighter uppercase leading-none">
          Nasi <span className="text-accent italic">Pacjenci</span>.
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {patients.slice(0, limit).map((p) => (
             <PatientCard key={p.id} p={p} />
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-3 md:mt-5">
                {patients.slice(limit).map((p) => (
                  <PatientCard key={p.id} p={p} />
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
        
        <m.div layout className="mt-10 md:mt-14 flex justify-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-4 w-full sm:w-auto bg-secondary hover:bg-accent text-foreground hover:text-white px-10 py-5 min-h-[56px] rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-premium group active:scale-[0.97] border border-accent/10 touch-manipulation"
          >
            <span>{isExpanded ? 'Zwiń galerię' : 'Rozwiń galerię'}</span>
            {isExpanded 
              ? <ChevronUp className="group-hover:-translate-y-1 transition-transform shrink-0" size={18} />
              : <ChevronDown className="group-hover:translate-y-1 transition-transform shrink-0" size={18} />
            }
          </button>
        </m.div>
      </div>
      
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
    </section>
  );
};
