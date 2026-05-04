'use client';

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

const patients = [
  { id: 0, name: "Bruno", breed: "Beagle", story: "Uratowany z schroniska, dziś najszybszy tropiciel.", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200" },
  { id: 1, name: "Misia", breed: "Tuxedo Cat", story: "Mruczy głośniej niż silnik Ferrari.", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200" },
  { id: 2, name: "Simba", breed: "Hamster", story: "Mały ciałem, wielki duchem.", img: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1200" },
  { id: 3, name: "Bella", breed: "Corgi", story: "Wróciła do biegania po urazie kręgosłupa.", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1200" },
  { id: 4, name: "Rocky", breed: "Border Collie", story: "Mistrz frisbee, któremu uratowaliśmy wzrok.", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1200" },
  { id: 5, name: "Sonia", breed: "Frenchie", story: "Nasza najstarsza radosna pacjentka.", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200" },
  { id: 6, name: "Luna", breed: "British Cat", story: "Królowa elegancji po zabiegu.", img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1200" },
  { id: 7, name: "Max", breed: "Pug", story: "Wyleczyliśmy jego alergię na trawę.", img: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=1200" },
];

export const InfinitePatients = () => {
  const [virtualIdx, setVirtualIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                    getComputedStyle(document.body).backgroundColor === 'rgb(10, 10, 10)';
      setIsDarkMode(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  const rotationValue = useMotionValue(0);
  const smoothRotation = useSpring(rotationValue, {
    stiffness: 150, // Ultra-reaktywność
    damping: 22,   
    mass: 0.8       // Jeszcze lżejszy start
  });

  const activeIdx = ((virtualIdx % patients.length) + patients.length) % patients.length;

  const next = useCallback(() => {
    const nextVal = virtualIdx + 1;
    setVirtualIdx(nextVal);
    rotationValue.set(nextVal); // Natychmiastowa reakcja bez czekania na useEffect
  }, [virtualIdx, rotationValue]);

  const prev = useCallback(() => {
    const prevVal = virtualIdx - 1;
    setVirtualIdx(prevVal);
    rotationValue.set(prevVal); // Natychmiastowa reakcja
  }, [virtualIdx, rotationValue]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isHovered, next, virtualIdx]);

  return (
    <section className="py-32 relative bg-background overflow-hidden flex flex-col items-center">
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10 mb-16 text-center">
        <h2 className={`text-5xl md:text-8xl font-black font-outfit tracking-tighter leading-tight uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Nasza <span className="text-accent italic">Galeria</span>.
        </h2>
      </div>

      {/* Main Slider */}
      <div className="relative h-[550px] md:h-[650px] w-full flex items-center justify-center mb-12">
        <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center pointer-events-none">
          {patients.map((p, i) => (
             <PatientCard 
               key={p.id} 
               p={p} 
               index={i} 
               smoothRotation={smoothRotation} 
               activeIdx={activeIdx}
               isHovered={isHovered}
               setIsHovered={setIsHovered}
               isDarkMode={isDarkMode}
             />
          ))}
        </div>
      </div>

      {/* Navigation Panel (Minimalist Red Lines) */}
      <div className="relative z-50 flex items-center gap-2 md:gap-8 w-full justify-center px-4 mt-8">
        <button onClick={prev} className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all active:scale-90 shadow-2xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}><ChevronLeft size={20} /></button>
        
        <div className="flex items-center gap-2 md:gap-4 px-2 h-12 overflow-x-auto no-scrollbar max-w-[60vw]">
          {patients.map((_, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                onClick={() => {
                  const diff = i - activeIdx;
                  const wrappedDiff = ((diff + patients.length / 2) % patients.length + patients.length) % patients.length - patients.length / 2;
                  const nextVal = virtualIdx + wrappedDiff;
                  setVirtualIdx(nextVal);
                  rotationValue.set(nextVal);
                }}
                className="group p-1 md:p-2 flex items-center justify-center shrink-0"
              >
                <motion.div 
                  animate={{ 
                    width: isActive ? 24 : 8,
                    height: isActive ? 4 : 4,
                    backgroundColor: isActive ? "#FE4520" : (isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"),
                    opacity: isActive ? 1 : 0.5
                  }}
                  className="rounded-full transition-shadow duration-300 group-hover:opacity-100 shadow-[0_0_10px_rgba(254,69,32,0)] group-hover:shadow-[0_0_10px_rgba(254,69,32,0.2)]"
                  style={{ boxShadow: isActive ? "0 0 15px rgba(254,69,32,0.5)" : "none" }}
                />
              </button>
            );
          })}
        </div>

        <button onClick={next} className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl border flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all active:scale-90 shadow-2xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}><ChevronRight size={20} /></button>
      </div>
    </section>
  );
};

// Memoizujemy pojedynczą kartę, aby uniknąć ciężkich re-renderów całej galerii
const PatientCard = React.memo(({ p, index, smoothRotation, activeIdx, isHovered, setIsHovered, isDarkMode }: any) => {
  const x = useTransform(smoothRotation, (rot: number) => {
    const len = patients.length;
    let diff = index - (rot % len);
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    const finalDiff = ((diff + len / 2) % len + len) % len - len / 2;
    return finalDiff * 360;
  });

  const scale = useTransform(smoothRotation, (rot: number) => {
    const len = patients.length;
    let diff = Math.abs(index - (rot % len));
    if (diff > len / 2) diff = len - diff;
    const finalDiff = Math.abs(((diff + len / 2) % len + len) % len - len / 2);
    
    // Płynne mapowanie: centrum = 1.0, bok = 0.9, dal = 0.8
    if (finalDiff <= 1) return 1 - (finalDiff * 0.1);
    return 0.9 - ((finalDiff - 1) * 0.1);
  });

  const y = useTransform(smoothRotation, (rot: number) => {
    const len = patients.length;
    let diff = Math.abs(index - (rot % len));
    if (diff > len / 2) diff = len - diff;
    const finalDiff = Math.abs(((diff + len / 2) % len + len) % len - len / 2);
    return finalDiff * -25;
  });

  const opacity = useTransform(smoothRotation, (rot: number) => {
    const len = patients.length;
    let diff = Math.abs(index - (rot % len));
    if (diff > len / 2) diff = len - diff;
    const finalDiff = Math.abs(((diff + len / 2) % len + len) % len - len / 2);
    
    // Płynne mapowanie: centrum = 1.0, bok = 0.8, dal = 0.5
    if (finalDiff <= 1) return 1 - (finalDiff * 0.2);
    return 0.8 - ((finalDiff - 1) * 0.3);
  });

  // Inteligentny zoom zdjęcia: rośnie płynnie w miarę zbliżania się do centrum
  const imageScale = useTransform(smoothRotation, (rot: number) => {
    const len = patients.length;
    let diff = Math.abs(index - (rot % len));
    if (diff > len / 2) diff = len - diff;
    const finalDiff = Math.abs(((diff + len / 2) % len + len) % len - len / 2);
    
    // Gdy finalDiff = 0 (centrum), skala to 1.12. Gdy finalDiff >= 1, skala to 1.02.
    const progress = Math.max(0, 1 - finalDiff);
    const baseZoom = 1.02 + (progress * 0.10);
    return baseZoom;
  });

  // Dynamiczny Z-Index i Cień (płynne przejście)
  const zIndex = useTransform(smoothRotation, (rot: number) => {
    const len = patients.length;
    let diff = Math.abs(index - (rot % len));
    if (diff > len / 2) diff = len - diff;
    const finalDiff = Math.abs(((diff + len / 2) % len + len) % len - len / 2);
    return Math.round(30 - (finalDiff * 10));
  });

  const shadowOpacity = useTransform(smoothRotation, (rot: number) => {
    const len = patients.length;
    let diff = Math.abs(index - (rot % len));
    if (diff > len / 2) diff = len - diff;
    const finalDiff = Math.abs(((diff + len / 2) % len + len) % len - len / 2);
    return Math.max(0, 1 - finalDiff);
  });

  const isActive = index === activeIdx;

  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex }}
      className="absolute w-[280px] md:w-[380px] aspect-[3/4] cursor-pointer pointer-events-auto will-change-transform transform-gpu"
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spatial Background Glow */}
      {isActive && (
        <motion.div 
          animate={{ 
            opacity: isHovered ? 0.4 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-accent/30 blur-[120px] rounded-full -z-10"
        />
      )}

      <motion.div 
        style={{ 
          scale: isActive && isHovered ? 1.05 : 1,
          boxShadow: useTransform(shadowOpacity, [0, 1], [
            "0 10px 30px rgba(0,0,0,0.1)",
            "0 50px 100px rgba(0,0,0,0.5)"
          ]),
          perspective: "1000px"
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`relative w-full h-full rounded-[2.5rem] overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#141414]' : 'bg-white'} border border-white/5 will-change-transform transform-gpu`}
      >
        {/* Internal Image Zoom - teraz zsynchronizowany z ruchem i hoverem */}
        <motion.img 
          style={{ 
            scale: isHovered && isActive ? 1.18 : imageScale,
            transformOrigin: 'center center',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={p.img} 
          alt={p.name} 
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover will-change-transform transform-gpu" 
        />

        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90 ${isDarkMode ? 'from-black/95 via-black/20' : 'from-black/80'}`} />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-10 z-20">
          <motion.p 
            animate={{ y: isActive && isHovered ? 0 : 5, opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-3"
          >
            {p.breed}
          </motion.p>
          
          <motion.h4 
            animate={{ scale: isActive && isHovered ? 1.05 : 1 }}
            className="text-5xl font-black font-outfit text-white uppercase tracking-tighter leading-none"
          >
            {p.name}
          </motion.h4>
          
          <AnimatePresence>
            {isActive && isHovered && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: 20 }} 
                animate={{ opacity: 1, height: 'auto', y: 0 }} 
                exit={{ opacity: 0, height: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/70 text-sm leading-relaxed font-medium italic">
                    "{p.story}"
                  </p>
                  
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "40px" }} 
                    className="h-1 bg-accent mt-4 rounded-full" 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shimmer Glare Effect */}
        <motion.div 
          animate={{ 
            x: isHovered ? ["-100%", "200%"] : "-100%",
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
});

PatientCard.displayName = 'PatientCard';
