'use client';
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Sparkles, Smile, Scissors, Droplets, ChevronRight, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './Badge';

export const ServicesSection = () => {
  const services = [
    { icon: Sparkles, title: "Dermatologia", desc: "Nasze szczególne zainteresowanie. Diagnozujemy i leczymy choroby skóry, uszu oraz alergie." },
    { icon: Smile, title: "Stomatologia", desc: "Kompleksowa opieka dentystyczna, w tym zaawansowane RTG stomatologiczne dla pupila." },
    { icon: Scissors, title: "Chirurgia Miękka", desc: "Bezpieczne zabiegi chirurgiczne, kastracje oraz profesjonalna opieka pooperacyjna." },
    { icon: Droplets, title: "Pielęgnacja", desc: "Strzyżenie psów i kotów (również w premedykacji). Umawianie wyłącznie telefoniczne." },
  ];

  return (
    <section id="uslugi" className="py-24 md:py-52 px-4 md:px-8 relative overflow-hidden bg-secondary/50">
      <div className="absolute top-10 left-10 opacity-5 -rotate-12 scale-150">
        <Heart size={200} fill="currentColor" className="text-accent" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5 rotate-12 scale-150">
        <Star size={200} fill="currentColor" className="text-accent" />
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-16 md:mb-32">
          <Badge>Oferta Ekspercka</Badge>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-outfit font-black tracking-tighter mb-6 md:mb-10 leading-none">Specjalizacje <br className="md:hidden" /> <span className="text-accent italic">VETMED</span>.</h2>
          <p className="text-base md:text-xl text-text-gray max-w-2xl mx-auto opacity-70">Precyzja diagnostyczna i serce do opieki w każdym detalu.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((s, i) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const mouseXSpring = useSpring(x);
            const mouseYSpring = useSpring(y);
            const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
            const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

            const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const width = rect.width;
              const height = rect.height;
              const mouseX = event.clientX - rect.left;
              const mouseY = event.clientY - rect.top;
              x.set((mouseX / width) - 0.5);
              y.set((mouseY / height) - 0.5);
            };

            const handleMouseLeave = () => {
              x.set(0);
              y.set(0);
            };

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "1000px" }}
                className="group h-full"
              >
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card-bg h-full p-8 md:p-12 py-16 md:py-20 rounded-[3rem] md:rounded-[5.5rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.06)] border border-border flex flex-col items-center text-center hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.12)] transition-shadow duration-700 relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: useMotionTemplate`radial-gradient(circle at ${useTransform(x, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(y, [-0.5, 0.5], ["0%", "100%"])} , rgba(254,69,32,0.05) 0%, transparent 60%)`
                    }}
                  />
                  <div style={{ transform: "translateZ(50px)" }} className="w-20 h-20 md:w-28 md:h-28 bg-card-bg rounded-full shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center text-accent mb-8 md:mb-12 relative z-10 group-hover:shadow-glow/20 transition-all duration-700">
                    <s.icon className="w-8 h-8 md:w-11 md:h-11" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ transform: "translateZ(30px)" }} className="text-3xl md:text-4xl font-black mb-6 md:mb-8 tracking-tighter relative z-10 leading-none">{s.title}</h3>
                  <p style={{ transform: "translateZ(20px)" }} className="text-text-gray leading-relaxed text-base md:text-lg opacity-70 relative z-10 max-w-[220px]">
                    {s.desc}
                  </p>
                  <div style={{ transform: "translateZ(40px)" }} className="mt-8 md:mt-12">
                     <Link href="/uslugi" className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2 bg-accent/5 px-5 py-3 rounded-full border border-accent/10 hover:bg-accent hover:text-white transition-all duration-300">
                       Odkryj <ChevronRight size={14} />
                     </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
