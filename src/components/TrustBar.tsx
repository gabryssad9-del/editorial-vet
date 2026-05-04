'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Heart, MapPin } from 'lucide-react';

export const TrustBar = () => {
  const points = [
    { icon: Microscope, title: "Pełna Diagnostyka", desc: "Badania i wyniki na miejscu" },
    { icon: Heart, title: "Bezstresowo", desc: "Dog & Cat Friendly" },
    { icon: MapPin, title: "Darmowy Parking", desc: "Wygodny podjazd prosto pod wejście" }
  ];
  return (
    <section className="py-12 md:py-16 bg-background relative z-10 border-b border-border/50 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
          {points.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="flex items-center gap-6 pt-6 md:pt-0 first:pt-0 md:px-6 transition-all duration-500 group cursor-default"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 shadow-inner group-hover:shadow-[0_0_40px_rgba(254,69,32,0.15)] group-hover:bg-accent/15 transition-all duration-500">
                <p.icon className="w-10 h-10 md:w-12 md:h-12 text-accent group-hover:scale-110 transition-transform duration-500 ease-out" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-outfit font-black text-2xl md:text-3xl mb-1 tracking-tight group-hover:text-accent transition-colors duration-500">{p.title}</h3>
                <p className="text-text-gray font-medium text-base md:text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
