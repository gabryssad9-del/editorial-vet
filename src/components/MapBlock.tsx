'use client';
import React, { useState } from 'react';
import { m } from 'framer-motion';

export const MapBlock = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <m.div 
      id="kontakt"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-8 h-[350px] md:h-[450px] bg-secondary rounded-[3rem] md:rounded-[4rem] p-4 md:p-6 border border-accent/10 shadow-premium relative group overflow-hidden"
    >
      <div 
        className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-secondary relative z-10 cursor-pointer group/map"
        onClick={() => setIsActive(true)}
      >
        {isActive ? (
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2358.918239023157!2d20.4851214!3d53.7745674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e27940e4f3a3a3%3A0x334469e06180630!2sul.%20Pana%20Tadeusza%206%2C%2010-461%20Olsztyn!5e0!3m2!1spl!2spl!4v1714063200000!5m2!1spl!2spl" 
            width="100%" 
            height="100%" 
            style={{ 
              border: 0, 
              filter: 'grayscale(0.1) contrast(1.05)', 
            }} 
            allowFullScreen={true} 
            loading="eager" 
          ></iframe>
        ) : (
          <div className="relative w-full h-full">
            <img 
              src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/map-placeholder.jpg&w=1000&output=webp&q=80" 
              alt="Mapa lokalizacji VETMED"
              className="w-full h-full object-cover brightness-90 group-hover/map:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
               <div className="bg-card-bg/95 backdrop-blur-md px-8 py-4 rounded-full shadow-premium text-[11px] font-black uppercase tracking-[0.2em] text-accent border border-accent/20 group-hover/map:scale-110 transition-transform">
                  Kliknij, aby interaktywnie wyświetlić mapę
               </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    </m.div>
  );
};
