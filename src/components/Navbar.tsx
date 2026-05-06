'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Menu, X, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ThemeToggle } from './ThemeToggle';
import { LiquidButton } from './LiquidButton';
import { PhoneLink } from './PhoneDialog';
import { PhoneCardTooltip } from './PhoneCardTooltip';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const MobileMenu = dynamic(() => import('./MobileMenu').then(mod => mod.MobileMenu), { ssr: false });

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DesktopPhoneTooltip = () => (
  <PhoneCardTooltip 
    className="w-10 h-10 flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-2xl border border-border/40 transition-all active:scale-95"
  >
    <Phone size={18} />
  </PhoneCardTooltip>
);

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
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
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
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
    
    const observedIds = new Set<string>();

    const attachObservers = () => {
      sections.forEach(id => {
        if (!observedIds.has(id)) {
          const el = document.getElementById(id);
          if (el) {
            observer.observe(el);
            observedIds.add(id);
          }
        }
      });
    };

    // Initial check
    attachObservers();

    // Retry checks for dynamic content (ssr: false)
    const intervals = [500, 1500, 3000, 6000];
    const timers = intervals.map(delay => setTimeout(attachObservers, delay));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      timers.forEach(clearTimeout);
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
      if (!isHome) {
        e.preventDefault();
        window.location.href = `/editorial-vet/${id !== 'home' ? '#' + id : ''}`;
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
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

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
            <Link 
              href="#home" 
              onClick={(e) => handleNavClick(e, { name: "Start", href: "#home", isHash: true })}
              className="flex items-center gap-3 md:gap-4 font-outfit text-2xl md:text-3xl font-black tracking-tighter text-accent group"
            >
              <img 
                src="/editorial-vet/emotional-vet/og-image.png" 
                alt="VETMED Logo" 
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width="200"
                height="100"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(254,69,32,0.3)] group-hover:scale-105 transition-all duration-500" 
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div
              ref={navContainerRef}
              className="relative flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-full"
              onMouseLeave={() => setHoveredLink(null)}
            >
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
              <DesktopPhoneTooltip />
              <ThemeToggle />
              <LiquidButton href="https://vetmed.nakiedy.pl/" variant="dark" className="px-6 py-3 text-xs md:text-sm uppercase tracking-widest font-black">
                Umów wizytę
              </LiquidButton>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <PhoneLink
              phone="+48519619141"
              displayPhone="519 619 141"
              className="w-10 h-10 flex items-center justify-center bg-[#ff3b3b]/10 text-[#ff3b3b] rounded-xl active:scale-95 transition-transform border border-[#ff3b3b]/20"
            >
              <Phone size={18} />
            </PhoneLink>
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

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navLinks={navLinks} 
        onNavClick={handleNavClick} 
      />
    </>
  );
};
