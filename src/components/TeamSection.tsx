'use client';
import React from 'react';
import { DynamicMotion } from './DynamicMotion';
import { Badge } from './Badge';
import { Heart, Stethoscope } from 'lucide-react';

export const TeamSection = () => {
  const members = [
    { 
      name: "Anna Sadowska", 
      role: "Główny Lekarz Weterynarii", 
      specialty: "Dermatologia & Interna",
      img: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/team-1.jpg&w=800&output=webp&q=80",
      description: "Specjalizuje się w zaawansowanej dermatologii oraz chorobach wewnętrznych. Od ponad 15 lat z pasją pomaga czworonożnym pacjentom, stale podnosząc swoje kwalifikacje na międzynarodowych kongresach medycznych. Jej priorytetem jest nie tylko skuteczna terapia, ale również minimalizowanie stresu u zwierząt podczas wizyt."
    },
    { 
      name: "Gabriel Sadowski", 
      role: "Lekarz Weterynarii", 
      specialty: "Chirurgia & Stomatologia",
      img: "https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/team-2.jpg&w=800&output=webp&q=80",
      description: "Ekspert w dziedzinie chirurgii miękkiej oraz stomatologii weterynaryjnej. W swojej codziennej praktyce wykorzystuje najnowsze technologie diagnostyczne, aby zapewnić pacjentom najwyższy standard leczenia. Jest zwolennikiem medycyny opartej na dowodach i indywidualnego podejścia do każdego przypadku."
    },
  ];

  return (
    <section id="zespol" className="py-20 md:py-32 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Badge className="mb-6">Zespół Ekspertów</Badge>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-black tracking-tighter leading-[0.9] mb-8">
                Poznaj naszych <span className="text-accent italic">lekarzy</span>.
              </h2>
              <p className="text-lg md:text-xl text-text-gray font-medium opacity-70 leading-relaxed max-w-xl">
                Nasz zespół to wykwalifikowani specjaliści, którzy łączą pasję do medycyny z autentyczną troską o każde zwierzę.
              </p>
            </div>
            <div className="hidden md:block">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-gray/40">
                    <Heart size={20} />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-gray/40">
                    <Stethoscope size={20} />
                  </div>
               </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {members.map((member, i) => (
            <DynamicMotion
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="relative mb-10 md:mb-14">
                {/* Image Container with Editorial Frame */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-premium bg-secondary">
                  <img 
                    loading="lazy" 
                    decoding="async" 
                    src={member.img} 
                    alt={`Lek. wet. ${member.name}`} 
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" 
                  />
                  
                  {/* Gradient Overlay for subtle contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Native Paw Icon - Outside overflow-hidden to prevent clipping */}
                <div className="absolute top-[-12px] right-[-12px] z-30 pointer-events-none opacity-100 rotate-[15deg]">
                  <svg width="70" height="70" viewBox="0 0 48.839 48.839" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252
                      c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373
                      c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742
                      c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181
                      C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0
                      S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971
                      s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878
                      c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z
                      M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414
                      S48.455,16.861,45.727,15.602z" fill="currentColor" className="text-accent" />
                  </svg>
                </div>
                
                {/* Floating "Card" Detail on Mobile/Desktop Transition */}
                <div className="absolute -bottom-6 left-8 right-8 bg-white dark:bg-card-bg p-6 md:p-8 rounded-[2rem] shadow-xl border border-border lg:group-hover:-translate-y-2 transition-transform duration-500">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1">{member.role}</p>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tighter font-outfit">lek. wet. {member.name}</h3>
                   </div>
                </div>
              </div>

              {/* Description Below */}
              <div className="px-8 mt-4">
                <p className="text-[11px] font-black text-accent/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <span className="w-8 h-px bg-accent/30" /> {member.specialty}
                </p>
                <p className="text-sm md:text-base text-text-gray font-medium leading-relaxed opacity-80 max-w-lg">
                  {member.description}
                </p>
              </div>
            </DynamicMotion>
          ))}
        </div>
      </div>
    </section>
  );
};
