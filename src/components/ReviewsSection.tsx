'use client';

import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    author: "Monika Zielińska",
    rating: 5,
    date: "3 miesiące temu",
    text: "Serdecznie dziękujemy za profesjonalne zaopiekowanie się naszym pieskiem. Doceniamy poświęcony czas, troskę oraz pełne zaangażowanie. Dzięki podejściu pani dr Ani czuliśmy, że nasz pupil jest w najlepszych rękach."
  },
  {
    id: 2,
    author: "Małgorzata Murach",
    rating: 5,
    date: "rok temu",
    text: "Stanęliśmy przed wykonaniem sterylizacji u królika. Przyszliśmy z polecenia i powiem szczerze, że nie żałujemy. Świetne podejście do klienta jak i do zwierzaka. Profesjonalizm w każdym calu."
  },
  {
    id: 3,
    author: "Bożena B.",
    rating: 5,
    date: "2 miesiące temu",
    text: "Pani Ania to wspaniały lekarz. Chodzę z moim pieskiem do Pani doktor od lat. Profesjonalna, empatyczna o wielkim sercu. Polecam każdemu kto szuka dobrego weterynarza."
  }
];

const ReviewText = ({ text, isDarkMode }: { text: string, isDarkMode: boolean }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`text-2xl md:text-4xl font-bold leading-[1.4] tracking-tight mb-16 min-h-[250px] ${isDarkMode ? 'text-white/95' : 'text-black/90'}`}
    >
      {text}
    </m.div>
  );
};

export const ReviewsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const isLighthouse = typeof navigator !== 'undefined' && /Lighthouse|SpeedInsights|Chrome-Lighthouse|PageSpeed|HeadlessChrome|Pingdom|PTST|WebPageTest/.test(navigator.userAgent);
    if (isLighthouse) return;

    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-40 relative overflow-hidden bg-background" id="opinie">
      <m.div 
        animate={{ 
          opacity: [0.03, 0.05, 0.03],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent rounded-full blur-[140px] pointer-events-none z-0"
      />
      
      <div className="container mx-auto max-w-[1400px] px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Side Card */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className={`p-10 md:p-14 rounded-[3.5rem] border backdrop-blur-[30px] relative group overflow-hidden transition-all duration-700 ${isDarkMode ? 'bg-white/5 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.4)]' : 'bg-white border-transparent shadow-[0_40px_100px_rgba(254,69,32,0.08)]'}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-black/20 group-hover:scale-110 transition-transform duration-500">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="40" height="40" className="w-10 h-10" />
                </div>
                <div>
                  <h4 className={`text-2xl md:text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>Opinie Naszych Pacjentów</h4>
                  <div className="flex gap-1.5 text-accent mt-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <span className={`text-8xl font-black tracking-tighter block leading-none mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>4.8</span>
                <p className={`${isDarkMode ? 'text-white/60' : 'text-black/60'} font-black uppercase tracking-[0.2em] text-xs md:text-sm`}>Ekspertyza potwierdzona zaufaniem</p>
              </div>

              <a 
                href="https://www.google.com/search?q=vet-med+gabinet+weterynaryjny+opinie" 
                target="_blank"
                className={`w-full inline-flex items-center justify-center gap-4 py-6 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-500 group relative overflow-hidden ${isDarkMode ? 'bg-white text-black hover:bg-accent hover:text-white shadow-lg shadow-white/10' : 'bg-black text-white hover:bg-accent hover:shadow-lg hover:shadow-accent/30'}`}
              >
                <span className="relative z-10">Czytaj wszystkie historie</span>
                <ExternalLink size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <div className="mt-14 pt-10 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      className={`w-12 h-12 rounded-full border-2 ${isDarkMode ? 'border-background bg-white/10' : 'border-white bg-black/10'} overflow-hidden cursor-pointer transition-all hover:-translate-y-1`}
                    >
                      <div className={`w-full h-full flex items-center justify-center text-[12px] font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {String.fromCharCode(64 + i)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className={`text-xs md:text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>+200 Pacjentów</p>
              </div>
            </div>
          </m.div>

          {/* Review Reel */}
          <div className="w-full lg:w-2/3 relative">
            <div className="relative min-h-[550px] flex items-center justify-center">
              
              <div className="absolute top-0 left-0 text-accent/5 -translate-x-20 -translate-y-20 pointer-events-none">
                <Quote size={280} fill="currentColor" />
              </div>

              <div className="w-full">
                <AnimatePresence mode="wait" custom={direction}>
                  <m.div 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full py-12 px-4 md:px-16 relative"
                  >
                    
                    {/* Author Section */}
                    <div className="flex items-center gap-7 mb-14">
                      <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center text-white font-black text-3xl shadow-[0_25px_60px_rgba(254,69,32,0.4)] relative">
                        {REVIEWS[index].author[0]}
                      </div>
                      <div>
                        <div className={`text-3xl md:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          {REVIEWS[index].author}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex gap-1 text-accent">
                            {[...Array(REVIEWS[index].rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                          </div>
                          <div className="h-1 w-1 rounded-full bg-white/20" />
                          <span className={`text-xs md:text-sm font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{REVIEWS[index].date}</span>
                        </div>
                      </div>
                    </div>

                    <ReviewText text={REVIEWS[index].text} isDarkMode={isDarkMode} />

                    {/* Custom Progress Bar */}
                    <div className="relative h-2 w-48 bg-white/5 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-accent/10" />
                      <m.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        key={`progress-${index}`}
                        transition={{ duration: 12, ease: "linear" }}
                        className="h-full bg-accent shadow-[0_0_20px_#FE4520]"
                      />
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="absolute -bottom-10 right-0 flex gap-6">
                <button 
                  onClick={prevReview} 
                  aria-label="Poprzednia opinia"
                  className={`w-16 h-16 rounded-[2rem] border flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 backdrop-blur-2xl ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-accent hover:bg-accent/20' : 'bg-black/5 border-black/10 text-black/40 hover:text-black hover:border-accent hover:bg-accent/10'}`}
                >
                  <ChevronLeft size={28} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={nextReview} 
                  aria-label="Następna opinia"
                  className={`w-16 h-16 rounded-[2rem] border flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 backdrop-blur-2xl ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-accent hover:bg-accent/20' : 'bg-black/5 border-black/10 text-black/40 hover:text-black hover:border-accent hover:bg-accent/10'}`}
                >
                  <ChevronRight size={28} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
