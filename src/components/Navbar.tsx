'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { m, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Menu, X, ChevronRight, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { LiquidButton } from './LiquidButton';
import { PhoneLink } from './PhoneDialog';
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
      // If not on home page, navigate there first
      if (!isHome) {
        e.preventDefault();
        window.location.href = `/${id !== 'home' ? '#' + id : ''}`;
        return;
      }
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

  // Refs for the magic sliding pill
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [pillStyle, setPillStyle] = useState({ x: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const activeKey = hoveredLink ?? activeLink;
    const activeRef = linkRefs.current[activeKey];
    const containerEl = navContainerRef.current;
    if (activeRef && containerEl) {
      const cRect = containerEl.getBoundingClientRect();
      const aRect = activeRef.getBoundingClientRect();
      setPillStyle({
        x: aRect.left - cRect.left,
        width: aRect.width,
        ready: true,
      });
    }
  }, [hoveredLink, activeLink]);

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
          <div className="flex items-center gap-3 md:gap-4">
            {!isHome && (
              <Link 
                href="/" 
                className="flex items-center gap-1.5 px-3 md:px-4 py-2 bg-accent/10 text-accent rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 border border-accent/20 whitespace-nowrap"
              >
                <ArrowLeft size={14} /> <span className="hidden sm:inline">Powrót</span>
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
            {/* Magic sliding pill nav */}
            <div
              ref={navContainerRef}
              className="relative flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-full"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {/* Single sliding pill — always in DOM, positioned via measured refs */}
              {pillStyle.ready && (
                <m.div
                  className="absolute top-1 bottom-1 bg-black dark:bg-white rounded-full z-0 shadow-xl shadow-black/10 dark:shadow-white/5 pointer-events-none"
                  animate={{ x: pillStyle.x, width: pillStyle.width }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.7 }}
                  style={{ left: 0 }}
                />
              )}

              {navLinks.map((item) => {
                const isActiveOrHovered = hoveredLink ? hoveredLink === item.name : activeLink === item.name;
                return (
                  <div
                    key={item.name}
                    ref={(el) => { linkRefs.current[item.name] = el; }}
                    className="relative"
                    onMouseEnter={() => setHoveredLink(item.name)}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={cn(
                        "relative z-10 text-xs lg:text-sm font-bold uppercase tracking-[0.15em] px-6 py-2.5 transition-colors duration-200 block select-none",
                        isActiveOrHovered
                          ? "text-white dark:text-black"
                          : "text-black/60 dark:text-white/60"
                      )}
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center gap-3 lg:gap-4 ml-2 lg:ml-4">
              <PhoneLink
                phone="+48519619141"
                displayPhone="519 619 141"
                className="flex items-center gap-2 bg-[#ff3b3b]/10 text-[#ff3b3b] hover:bg-[#ff3b3b] hover:text-white border border-[#ff3b3b]/20 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full transition-all duration-300 font-black uppercase tracking-widest text-xs md:text-sm group shadow-[0_0_15px_rgba(255,59,59,0.2)] hover:shadow-[0_0_25px_rgba(255,59,59,0.4)]"
              >
                <span className="w-2 h-2 rounded-full bg-current animate-ping opacity-75"></span>
                <span className="w-2 h-2 rounded-full bg-current absolute"></span>
                Nagły Przypadek
              </PhoneLink>
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
            className="fixed inset-0 z-[110] bg-background lg:hidden flex flex-col p-6 pt-24 overflow-y-auto"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full text-accent"
              aria-label="Zamknij menu"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col gap-5 flex-1">
              {navLinks.map((item, i) => (
                <m.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link 
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item);
                      if (!item.isHash || window.location.pathname !== '/') {
                        setIsMenuOpen(false);
                      }
                    }}
                    className="text-3xl font-black font-outfit tracking-tighter text-foreground hover:text-accent transition-colors flex items-center justify-between group"
                  >
                    {item.name}
                    <ChevronRight size={32} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent" />
                  </Link>
                </m.div>
              ))}
              
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-6 border-t border-border mt-2 flex flex-col gap-3"
              >
                <PhoneLink
                   phone="+48519619141"
                   displayPhone="519 619 141"
                   className="w-full flex items-center justify-center gap-3 bg-[#ff3b3b] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(255,59,59,0.2)] active:scale-95 transition-transform"
                >
                   <Phone size={18} /> Nagły Przypadek
                </PhoneLink>
                <LiquidButton href="https://vetmed.nakiedy.pl/" className="w-full text-sm py-4">
                  Umów wizytę online
                </LiquidButton>
              </m.div>

              <div className="flex items-center gap-4 py-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-0.5">Recepcja</p>
                  <PhoneLink
                    phone="+48519619141"
                    displayPhone="519 619 141"
                    className="text-xl font-black hover:text-accent transition-colors block leading-none"
                  >519 619 141</PhoneLink>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
