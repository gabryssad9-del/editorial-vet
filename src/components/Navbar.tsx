'use client';

import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Menu, X, ChevronRight, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { LiquidButton } from './LiquidButton';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  // ... existing state and effects ...
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Start");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 100) {
        setActiveLink("Start");
      }
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
                          (id === "o-nas" || id === "zespol") ? "O nas" : 
                          id === "kontakt" ? "Kontakt" : null;
          if (linkName) setActiveLink(linkName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["home", "uslugi", "pacjenci", "o-nas", "zespol", "kontakt"];
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
    { name: "Start", href: "#home", isHash: true },
    { name: "Usługi", href: "#uslugi", isHash: true },
    { name: "Pacjenci", href: "#pacjenci", isHash: true },
    { name: "O nas", href: "#o-nas", isHash: true },
    { name: "Kontakt", href: "#kontakt", isHash: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string, href: string, isHash: boolean }) => {
    if (item.isHash) {
      const id = item.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        setActiveLink(item.name);
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setIsMenuOpen(false);
        // Update URL hash without jumping
        window.history.pushState(null, '', `#${id}`);
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
          <div className="flex items-center gap-4">
            {!isHome && (
              <Link 
                href="/" 
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 border border-accent/20"
              >
                <ArrowLeft size={16} /> Powrót
              </Link>
            )}
            <Link href="/" className="flex items-center gap-3 md:gap-4 font-outfit text-2xl md:text-3xl font-black tracking-tighter text-accent group">
              <img 
                src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/vetmed1.png&w=120&output=webp&q=50" 
                srcSet="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/vetmed1.png&w=120&output=webp&q=50 120w"
                sizes="120px"
                alt="VETMED Logo" 
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width="80"
                height="80"
                className="h-16 md:h-20 w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(254,69,32,0.3)] group-hover:scale-105 transition-all duration-500" 
              />
            </Link>
          </div>

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
                        "relative z-10 text-xs lg:text-sm font-bold uppercase tracking-[0.15em] px-6 py-2.5 transition-colors duration-300 block",
                        (hoveredLink ? isHovered : activeLink === item.name)
                          ? "text-white dark:text-black" 
                          : "text-black/60 dark:text-white/60"
                      )}
                    >
                      {item.name}
                    </Link>
                    {showPill && (
                      <m.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-black dark:bg-white rounded-full z-0 shadow-xl shadow-black/10 dark:shadow-white/5"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center gap-3 lg:gap-4 ml-2 lg:ml-4">
              <a href="tel:+48519619141" className="flex items-center gap-2 bg-[#ff3b3b]/10 text-[#ff3b3b] hover:bg-[#ff3b3b] hover:text-white border border-[#ff3b3b]/20 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full transition-all duration-300 font-black uppercase tracking-widest text-xs md:text-sm group shadow-[0_0_15px_rgba(255,59,59,0.2)] hover:shadow-[0_0_25px_rgba(255,59,59,0.4)]">
                <span className="w-2 h-2 rounded-full bg-current animate-ping opacity-75"></span>
                <span className="w-2 h-2 rounded-full bg-current absolute"></span>
                Nagły Przypadek
              </a>
              <ThemeToggle />
              <LiquidButton href="https://vetmed.nakiedy.pl/" variant="dark" className="px-6 py-3 text-xs md:text-sm uppercase tracking-widest font-black">
                Umów wizytę
              </LiquidButton>
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
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[110] bg-background lg:hidden flex flex-col p-8 pt-32"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-14 h-14 flex items-center justify-center bg-accent/10 rounded-full text-accent"
              aria-label="Zamknij menu"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col gap-8">
              {navLinks.map((item, i) => (
                <m.div
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
                    className="text-4xl font-black font-outfit tracking-tighter text-foreground hover:text-accent transition-colors flex items-center justify-between group"
                  >
                    {item.name}
                    <ChevronRight size={40} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent" />
                  </Link>
                </m.div>
              ))}
              
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-12 border-t border-border mt-8 flex flex-col gap-4"
              >
                <a href="tel:+48519619141" className="w-full flex items-center justify-center gap-3 bg-[#ff3b3b] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_15px_40px_rgba(255,59,59,0.2)]">
                   <Phone size={20} /> NAGŁY PRZYPADEK
                </a>
                <LiquidButton href="https://vetmed.nakiedy.pl/" className="w-full text-base py-5">
                  Rezerwacja Online
                </LiquidButton>
              </m.div>
            </div>

            <div className="mt-auto pb-12 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-0.5">Recepcja</p>
                    <a href="tel:+48519619141" className="text-2xl font-black hover:text-accent transition-colors block leading-none">519 619 141</a>
                  </div>
               </div>
               <p className="text-xs font-bold opacity-60">Olsztyn, ul. Pana Tadeusza 6</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
