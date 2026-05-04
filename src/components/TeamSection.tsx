'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';

export const TeamSection = () => {
  const members = [
    { 
      name: "Anna Sadowska", // Placeholder fixed with common name or keep placeholder
      role: "Główny Lekarz Weterynarii", 
      img: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/team-1.jpg&w=600&output=webp&q=80",
      quote: "Każde merdnięcie ogonem na widok lekarza to nasz największy sukces."
    },
    { 
      name: "Gabriel Sadowski", 
      role: "Lekarz Weterynarii", 
      img: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/team-2.jpg&w=600&output=webp&q=80",
      quote: "Traktujemy każdego pacjenta tak, jakby był naszym własnym pupilem."
    },
  ];

  return (
    <section id="zespol" className="py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 md:mb-24">
            <Badge>Nasz Zespół</Badge>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-outfit font-black mb-8 tracking-tighter leading-[0.9]">
              Leczymy nie tylko ciało, ale i <span className="text-accent italic">serce</span>.
            </h2>
            <p className="text-lg md:text-xl text-text-gray max-w-3xl mx-auto leading-relaxed font-medium opacity-80">
              Za każdą diagnozą kryje się członek czyjejś rodziny. Mamy sprzęt z najwyższej półki, ale naszą największą siłą jest empatia. Wiemy, jak silna jest Twoja więź z pupilem, dlatego robimy wszystko, by leczenie było bezstresowe.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-premium border border-accent/10 group bg-secondary"
            >
              <div className="h-[450px] md:h-[600px] w-full overflow-hidden relative">
                <img loading="lazy" decoding="async" src={m.img} alt={`Lek. wet. ${m.name}`} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-accent mb-2">{m.role}</p>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">lek. wet. {m.name}</h3>
                  <p className="text-base md:text-lg text-white/90 font-medium italic leading-relaxed border-l-2 border-accent pl-4">
                    "{m.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
