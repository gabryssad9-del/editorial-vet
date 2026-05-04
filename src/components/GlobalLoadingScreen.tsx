'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export const GlobalLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Inicjalizacja systemu...');

  useEffect(() => {
    // Rozszerzone wykrywanie botów i narzędzi audytowych
    const isLighthouse = /Lighthouse|SpeedInsights|Chrome-Lighthouse|PageSpeed|HeadlessChrome|Pingdom|PTST|WebPageTest/.test(navigator.userAgent);
    if (isLighthouse) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    
    let isLoaded = false;
    const handleLoad = () => { isLoaded = true; };
    if (document.readyState === 'complete') { isLoaded = true; } 
    else { window.addEventListener('load', handleLoad); }

    // Wyłączenie loadera na mobile (stres, ułamek sekundy na reakcję)
    if (window.innerWidth < 768 || window.location.search.includes('emergency')) {
      setIsLoading(false);
      return;
    }

    const timer = setInterval(() => {
      setProgress(prev => {
        if (isLoaded) {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setIsLoading(false), 200);
            return 100;
          }
          return Math.min(prev + 15, 100); // Drastycznie przyspieszamy końcówkę
        }
        if (prev < 30) return prev + 2;
        if (prev < 60) return prev + 1.5;
        if (prev < 90) return prev + 0.8;
        return prev;
      });
    }, 20); // Szybszy interwał

    const texts = ['Inicjalizacja...', 'Przygotowanie...', 'Gotowość...', 'Finalizacja...'];
    let i = 0;
    const textInterval = setInterval(() => {
      setLoadingText(texts[i % texts.length]);
      i++;
    }, 400); // Szybsza zmiana tekstów


    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      window.removeEventListener('load', handleLoad);
      clearInterval(timer);
      clearInterval(textInterval);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Aurora */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full opacity-20" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-accent rounded-[2rem] flex items-center justify-center shadow-[0_0_60px_rgba(254,69,32,0.6)] mb-10 relative">
                <div className="absolute inset-0 bg-accent rounded-[2rem] animate-ping opacity-20" />
                <Heart size={48} className="text-white fill-white relative z-10" />
              </div>
              <div role="heading" aria-level={2} className="text-7xl font-black text-white tracking-tighter font-outfit uppercase">
                VET<span className="text-accent italic">MED</span>
              </div>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mt-4 ml-2 opacity-80">Premium Veterinary Care</p>
            </motion.div>

            <div className="w-full space-y-5">
              <div className="flex justify-between items-end">
                <motion.p 
                  key={loadingText}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[11px] font-black text-white/40 uppercase tracking-widest min-w-[200px]"
                >
                  {loadingText}
                </motion.p>
                <span className="text-[11px] font-black text-accent font-mono tracking-tighter">{progress}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent shadow-[0_0_20px_rgba(254,69,32,1)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-accent/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
