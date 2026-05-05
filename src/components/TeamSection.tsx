'use client';
import React from 'react';
import { m } from 'framer-motion';
import { Badge } from './Badge';

export const TeamSection = () => {
  const members = [
    { 
      name: "Anna Sadowska", 
      role: "Główny Lekarz Weterynarii", 
      img: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/team-1.jpg&w=600&output=webp&q=70",
      description: "Specjalizuje się w zaawansowanej dermatologii oraz chorobach wewnętrznych. Od ponad 15 lat z pasją pomaga czworonożnym pacjentom, stale podnosząc swoje kwalifikacje na międzynarodowych kongresach medycznych. Jej priorytetem jest nie tylko skuteczna terapia, ale również minimalizowanie stresu u zwierząt podczas wizyt."
    },
    { 
      name: "Gabriel Sadowski", 
      role: "Lekarz Weterynarii", 
      img: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/team-2.jpg&w=600&output=webp&q=70",
      description: "Ekspert w dziedzinie chirurgii miękkiej oraz stomatologii weterynaryjnej. W swojej codziennej praktyce wykorzystuje najnowsze technologie diagnostyczne, aby zapewnić pacjentom najwyższy standard leczenia. Jest zwolennikiem medycyny opartej na dowodach i indywidualnego podejścia do każdego przypadku."
    },
  ];

  return (
    <section id="zespol" className="py-14 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-14">
            <Badge>Zespół Ekspertów</Badge>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black mb-6 tracking-tighter leading-[0.9]">
              Poznaj naszych <span className="text-accent italic">lekarzy</span>.
            </h2>
            <p className="text-sm md:text-base text-text-gray max-w-3xl mx-auto leading-relaxed font-medium opacity-80">
              Nasz zespół to wykwalifikowani specjaliści, którzy każdego dnia dbają o zdrowie i komfort Twoich pupili. Łączymy pasję do medycyny z autentyczną troską o każde zwierzę, które trafia pod naszą opiekę.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {members.map((member, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-premium border border-accent/10 group bg-secondary"
            >
              <div className="h-[380px] md:h-[560px] w-full overflow-hidden relative">
                <img loading="lazy" decoding="async" src={member.img} alt={`Lek. wet. ${member.name}`} width="600" height="750" className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-accent mb-2">{member.role}</p>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">lek. wet. {member.name}</h3>
                  <p className="text-sm md:text-base text-white/70 font-medium leading-relaxed max-w-lg">
                    {member.description}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
