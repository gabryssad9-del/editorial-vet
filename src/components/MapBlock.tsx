'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const MapBlock = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-8 h-[350px] md:h-[450px] bg-secondary rounded-[3rem] md:rounded-[4rem] p-4 md:p-6 border border-accent/10 shadow-premium relative group overflow-hidden"
    >
      <div 
        className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-secondary relative z-10 cursor-pointer"
        onClick={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2358.918239023157!2d20.4851214!3d53.7745674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e27940e4f3a3a3%3A0x334469e06180630!2sul.%20Pana%20Tadeusza%206%2C%2010-461%20Olsztyn!5e0!3m2!1spl!2spl!4v1714063200000!5m2!1spl!2spl" 
          width="100%" 
          height="100%" 
          style={{ 
            border: 0, 
            filter: 'grayscale(0.1) contrast(1.05)', 
            pointerEvents: isActive ? 'auto' : 'none' 
          }} 
          allowFullScreen={true} 
          loading="lazy" 
        ></iframe>
        
        {!isActive && (
          <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/5 pointer-events-none transition-colors duration-500 flex items-center justify-center">
             <div className="bg-card-bg/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-premium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 text-[10px] font-black uppercase tracking-widest text-accent border border-accent/10">
                Kliknij, aby użyć mapy
             </div>
          </div>
        )}
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    </motion.div>
  );
};
