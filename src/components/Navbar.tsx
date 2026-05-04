'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { LiquidButton } from './LiquidButton';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Magnetic effect for links
const MagneticLink = ({ children, className, href, onClick }: { children: React.ReactNode, className?: string, href: string, onClick?: (e: any) => void }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        ref={ref}
        href={href}
        onClick={onClick}
        className={cn("relative py-2 px-4 transition-colors duration-300", className)}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Start");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // High-performance Intersection Observer for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -25% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const linkName = id === "home" ? "Start" :
                          id === "uslugi" ? "Usługi" : 
                          id === "pacjenci" ? "Pacjenci" : 
                          id === "o-nas" ? "O nas" : 
                          id === "kontakt" ? "Kontakt" : null;
          if (linkName) setActiveLink(linkName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["home", "uslugi", "pacjenci", "o-nas", "kontakt"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: "Start", href: "/#home", isHash: true },
    { name: "Usługi", href: "/#uslugi", isHash: true },
    { name: "Pacjenci", href: "/#pacjenci", isHash: true },
    { name: "O nas", href: "/#o-nas", isHash: true },
    { name: "Kontakt", href: "/#kontakt", isHash: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string, href: string, isHash: boolean }) => {
    setActiveLink(item.name);
    if (item.isHash && window.location.pathname === '/') {
      const id = item.href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-4 md:px-8", 
        scrolled ? "py-3 md:py-4" : "py-6 md:py-10"
      )}>
        <div className={cn(
          "container mx-auto flex justify-between items-center px-6 md:px-10 py-3 md:py-4 rounded-[2.5rem] transition-all duration-700 border",
          scrolled 
            ? "bg-background/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-border/40" 
            : "bg-transparent border-transparent"
        )}>
          <Link href="/" className="flex items-center gap-3 md:gap-4 font-outfit text-2xl md:text-3xl font-black tracking-tighter text-accent group">
            <motion.img 
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              src="/editorial-vet/emotional-vet/vetmed1.png" 
              alt="VETMED Logo" 
              className="h-16 md:h-20 w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(254,69,32,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(254,69,32,0.6)] transition-all duration-500" 
            />
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-full relative" onMouseLeave={() => setHoveredLink(null)}>
              {navLinks.map((item) => {
                const isHovered = hoveredLink === item.name;
                const isActive = activeLink === item.name && hoveredLink === null;
                const showPill = isHovered || isActive;

                return (
                  <div 
                    key={item.name} 
                    className="relative" 
                    onMouseEnter={() => setHoveredLink(item.name)}
                  >
                    <Link 
                      href={item.href} 
                      onClick={(e) => handleNavClick(e, item)}
                      className={cn(
                        "relative z-10 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] px-6 py-2.5 transition-colors duration-300 block",
                        (hoveredLink ? isHovered : activeLink === item.name)
                          ? "text-background dark:text-foreground" 
                          : "text-foreground/50"
                      )}
                    >
                      {item.name}
                    </Link>
                    {showPill && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-foreground dark:bg-white rounded-full z-0 shadow-xl shadow-black/10 dark:shadow-white/5 transform-gpu will-change-transform"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <ThemeToggle />
              <a href="https://vetmed.nakiedy.pl/" target="_blank" rel="noopener noreferrer">
                <LiquidButton variant="dark" className="px-8 py-3 text-[10px] uppercase tracking-widest font-black">
                  Umów wizytę
                </LiquidButton>
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-2xl shadow-glow active:scale-95 transition-transform"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-background lg:hidden flex flex-col p-8 pt-32"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-14 h-14 flex items-center justify-center bg-accent/10 rounded-full text-accent"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col gap-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item);
                      if (!item.isHash || window.location.pathname !== '/') {
                        setIsMenuOpen(false);
                      }
                    }}
                    className="text-5xl font-black font-outfit tracking-tighter text-foreground hover:text-accent transition-colors flex items-center justify-between group"
                  >
                    {item.name}
                    <ChevronRight size={40} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent" />
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-12 border-t border-border mt-8"
              >
                <a href="https://vetmed.nakiedy.pl/" target="_blank" rel="noopener noreferrer">
                  <LiquidButton className="w-full text-2xl py-8">
                    Rezerwacja Online
                  </LiquidButton>
                </a>
              </motion.div>
            </div>

            <div className="mt-auto pb-12 flex flex-col gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Pogotowie</p>
                    <p className="text-2xl font-black">519 619 141</p>
                  </div>
               </div>
               <p className="text-sm font-bold opacity-40">Olsztyn, ul. Pana Tadeusza 6</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
