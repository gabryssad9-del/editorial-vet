'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useInView } from 'framer-motion';
import { Heart, Star, Users, Camera, MessageCircle, HelpCircle, Phone, MapPin, Mail, Clock, ChevronRight, ChevronDown, CheckCircle2, Play, Plus, Zap, Sparkles, Smile, Droplets, Scissors, Menu, X, Sun, Moon, ArrowRight, Activity, Microscope, Shield, Syringe, Globe, Search } from 'lucide-react';
import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, OrbitControls, PresentationControls } from '@react-three/drei';
import Link from 'next/link';
import gsap from 'gsap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Navbar } from '@/components/Navbar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LiquidButton } from '@/components/LiquidButton';
import { Badge } from '@/components/Badge';
import { GroomingGallery } from '@/components/GroomingGallery';
import { InfinitePatients } from '@/components/InfinitePatients';
import { ContactMap } from '@/components/ContactMap';
import { ReviewsSection } from '@/components/ReviewsSection';


// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// --- Motion Magic (Hover Spells) ---

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-30 hidden lg:block transform-gpu"
      style={{
        background: useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(254,69,32,0.15), transparent 80%)`,
        willChange: "background"
      }}
    />
  );
};

// --- Spatial Elements ---

const FloatingOrb = ({ delay = 0, scale = 1, xOffset = "0%", yOffset = "0%" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const x = useSpring(useTransform(mouseX, [-1000, 1000], [-40 * scale, 40 * scale]), { stiffness: 50, damping: 25 });
  const y = useSpring(useTransform(mouseY, [-1000, 1000], [-40 * scale, 40 * scale]), { stiffness: 50, damping: 25 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.3, scale: scale }}
      transition={{ delay, duration: 2.5, ease: "easeOut" }}
      style={{ x, y, left: xOffset, top: yOffset }}
      className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-accent/20 via-blue-500/5 to-transparent blur-3xl -z-10 transform-gpu will-change-transform"
    />
  );
};



// --- 3D Components (Three.js) ---

const PawBackground = () => {
  const paws = [
    { id: 1, left: "5%", top: "15%", rotate: 15, scale: 1.2 },
    { id: 2, left: "85%", top: "10%", rotate: -20, scale: 0.8 },
    { id: 3, left: "45%", top: "5%", rotate: 45, scale: 0.6 },
    { id: 4, left: "15%", top: "45%", rotate: 110, scale: 1.1 },
    { id: 5, left: "75%", top: "55%", rotate: -45, scale: 0.9 },
    { id: 6, left: "35%", top: "75%", rotate: 180, scale: 1.3 },
    { id: 7, left: "90%", top: "85%", rotate: 30, scale: 0.7 },
    { id: 8, left: "10%", top: "90%", rotate: -15, scale: 1.0 },
    { id: 9, left: "55%", top: "35%", rotate: 60, scale: 0.5 },
    { id: 10, left: "25%", top: "25%", rotate: -90, scale: 0.8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
      {paws.map((paw) => (
        <motion.div
          key={paw.id}
          initial={{ rotate: paw.rotate, scale: paw.scale }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [paw.rotate, paw.rotate + 10, paw.rotate]
          }}
          transition={{ 
            duration: 8 + paw.id, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute will-change-transform transform-gpu"
          style={{ 
            left: paw.left, 
            top: paw.top, 
            color: '#FE4520',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <svg width="70" height="70" viewBox="0 0 48.839 48.839" fill="currentColor" style={{ display: 'block' }}>
            <path d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252
              c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373
              c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742
              c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181
              C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0
              S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971
              s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878
              c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z
               M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414
              S48.455,16.861,45.727,15.602z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};



const FAQItem = ({ question, answer, icon: Icon = HelpCircle }: { question: string, answer: string, icon?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={false}
      className={cn(
        "border-b border-border/50 transition-all duration-700 overflow-hidden",
        isOpen ? "bg-accent/5 rounded-[2rem] px-8 -mx-8 my-4 border-transparent" : "hover:bg-accent/5 rounded-[1.5rem] px-4 -mx-4 border-transparent"
      )}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left group"
      >
        <div className="flex items-center gap-6">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700",
            isOpen ? "bg-accent text-white rotate-[360deg] shadow-glow" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
          )}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <span className="text-xl md:text-2xl font-black text-foreground group-hover:text-accent transition-colors">
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={cn("transition-colors duration-500", isOpen ? "text-accent" : "text-gray-300")}
        >
          <Plus size={28} className={cn("transition-transform duration-500", isOpen && "rotate-45")} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="pb-8 text-lg text-text-gray leading-relaxed max-w-3xl ml-20">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};


const BentoCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 overflow-hidden group transition-all duration-700 transform-gpu",
        className
      )}
    >
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(circle at ${useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])} , rgba(255,255,255,0.15) 0%, transparent 80%)`
        }}
      />
      {children}
    </motion.div>
  );
};

const LoadingScreen = ({ progress }: { progress: number }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10000] bg-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-12"
      >
        <img 
          src="/emotional-vet/vetmed1.png" 
          alt="Loading..." 
          className="h-32 md:h-48 w-auto brightness-150 contrast-125 drop-shadow-[0_0_30px_rgba(254,69,32,0.5)]" 
        />
        <motion.div 
          className="absolute -inset-10 bg-accent/20 rounded-full blur-[60px] -z-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="w-64 md:w-80 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_20px_rgba(254,69,32,0.8)]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <motion.span 
          key={Math.floor(progress)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-outfit font-black text-white italic tracking-tighter"
        >
          {Math.floor(progress)}%
        </motion.span>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent animate-pulse">Ładowanie standardów premium</span>
      </div>

    </motion.div>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const scaleScroll = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-32 px-4 md:px-8 overflow-hidden bg-background"
    >
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            <Badge>Wyjątkowa Opieka Dla Pupila</Badge>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-5xl md:text-6xl lg:text-[7.5rem] font-outfit font-black leading-[0.85] text-foreground mb-8 md:mb-12 tracking-tighter"
            >
              Gdzie Serce <br /> <span className="text-accent italic">Spotyka</span> Wiedzę.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-xl lg:text-2xl text-text-gray max-w-xl mx-auto lg:mx-0 mb-10 md:mb-16 leading-relaxed font-medium opacity-80"
            >
              Nie jesteśmy tylko kliniką. Jesteśmy miejscem, w którym strach zamienia się w zaufanie, a ból w zdrowie. Premium weterynaria w nowym wydaniu.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start"
            >
              <a href="https://vetmed.nakiedy.pl/" target="_blank" rel="noopener noreferrer" className="group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <LiquidButton className="text-lg w-full sm:w-auto relative overflow-hidden group">
                    <span className="relative z-10 flex items-center gap-2">
                      Umów wizytę <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ skewX: -20, width: '40px' }}
                    />
                  </LiquidButton>
                </motion.div>
              </a>
              <Link href="#o-nas">
                <LiquidButton variant="secondary" className="text-lg w-full sm:w-auto">
                  Poznaj nas
                </LiquidButton>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            style={{ 
              translateY: scrollY, 
              scale: scaleScroll,
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative will-change-transform transform-gpu"
          >
            <div 
              className="relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(254,69,32,0.15)] border-[12px] md:border-[20px] border-secondary group isolate transform-gpu"
              style={{ maskImage: 'radial-gradient(white, black)', WebkitMaskImage: 'radial-gradient(white, black)' }}
            >
              <img 
                src="/emotional-vet/hero-emotional.jpg" 
                alt="VETMED Hero" 
                decoding="async"
                className="w-full h-[450px] md:h-[750px] object-cover transition-transform duration-[4s] group-hover:scale-110 will-change-transform transform-gpu" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-background/20 backdrop-blur-xl px-4 md:px-8 py-2 md:py-4 rounded-full border border-background/30 text-foreground font-black text-[8px] md:text-xs uppercase tracking-widest">
                 Premium Care
              </div>
            </div>
            {/* Ambient elements - simplified */}
            <div className="absolute -top-10 md:-top-20 -right-10 md:-right-20 w-40 md:w-80 h-40 md:h-80 bg-accent/5 rounded-full blur-[60px] md:blur-[100px]" />
            <div className="absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-40 md:w-80 h-40 md:h-80 bg-blue-400/5 rounded-full blur-[60px] md:blur-[100px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: Sparkles, title: "Dermatologia", desc: "Nasze szczególne zainteresowanie. Diagnozujemy i leczymy choroby skóry, uszu oraz alergie." },
    { icon: Smile, title: "Stomatologia", desc: "Kompleksowa opieka dentystyczna, w tym zaawansowane RTG stomatologiczne dla pupila." },
    { icon: Scissors, title: "Chirurgia Miękka", desc: "Bezpieczne zabiegi chirurgiczne, kastracje oraz profesjonalna opieka pooperacyjna." },
    { icon: Droplets, title: "Pielęgnacja", desc: "Strzyżenie psów i kotów (również w premedykacji). Umawianie wyłącznie telefoniczne." },
  ];

  return (
    <section id="uslugi" className="py-24 md:py-52 px-4 md:px-8 relative overflow-hidden bg-secondary/50">
      {/* Decorative paws for this section specifically */}
      <div className="absolute top-10 left-10 opacity-5 -rotate-12 scale-150">
        <Heart size={200} fill="currentColor" className="text-accent" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5 rotate-12 scale-150">
        <Star size={200} fill="currentColor" className="text-accent" />
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-16 md:mb-32">
          <Badge>Oferta Ekspercka</Badge>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-outfit font-black tracking-tighter mb-6 md:mb-10 leading-none">Specjalizacje <br className="md:hidden" /> <span className="text-accent italic">VETMED</span>.</h2>
          <p className="text-base md:text-xl text-text-gray max-w-2xl mx-auto opacity-70">Precyzja diagnostyczna i serce do opieki w każdym detalu.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((s, i) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            
            const mouseXSpring = useSpring(x);
            const mouseYSpring = useSpring(y);
            
            const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
            const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

            const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const width = rect.width;
              const height = rect.height;
              const mouseX = event.clientX - rect.left;
              const mouseY = event.clientY - rect.top;
              
              const xPct = (mouseX / width) - 0.5;
              const yPct = (mouseY / height) - 0.5;
              
              x.set(xPct);
              y.set(yPct);
            };

            const handleMouseLeave = () => {
              x.set(0);
              y.set(0);
            };

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "1000px" }}
                className="group h-full"
              >
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card-bg h-full p-8 md:p-12 py-16 md:py-20 rounded-[3rem] md:rounded-[5.5rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.06)] border border-border flex flex-col items-center text-center hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.12)] transition-shadow duration-700 relative overflow-hidden"
                >
                  {/* Dynamic Shine Effect */}
                  <motion.div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: useMotionTemplate`radial-gradient(circle at ${useTransform(x, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(y, [-0.5, 0.5], ["0%", "100%"])} , rgba(254,69,32,0.05) 0%, transparent 60%)`
                    }}
                  />
                  
                  <div style={{ transform: "translateZ(50px)" }} className="w-20 h-20 md:w-28 md:h-28 bg-card-bg rounded-full shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center text-accent mb-8 md:mb-12 relative z-10 group-hover:shadow-glow/20 transition-all duration-700">
                    <s.icon className="w-8 h-8 md:w-11 md:h-11" strokeWidth={1.5} />
                  </div>
                  
                  <h3 style={{ transform: "translateZ(30px)" }} className="text-3xl md:text-4xl font-black mb-6 md:mb-8 tracking-tighter relative z-10 leading-none">{s.title}</h3>
                  <p style={{ transform: "translateZ(20px)" }} className="text-text-gray leading-relaxed text-base md:text-lg opacity-70 relative z-10 max-w-[220px]">
                    {s.desc}
                  </p>

                  <div style={{ transform: "translateZ(40px)" }} className="mt-8 md:mt-12 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-0 md:translate-y-4 group-hover:translate-y-0">
                     <Link href="/uslugi" className="text-[10px] font-black uppercase tracking-[0.4em] text-accent flex items-center gap-2">
                       Odkryj <ChevronRight size={14} />
                     </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="o-nas" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          <div className="rounded-[3rem] md:rounded-[5.5rem] overflow-hidden shadow-premium border-[12px] md:border-[20px] border-secondary group">
            <img src="/emotional-vet/history.jpg" alt="O nas" className="w-full h-[450px] md:h-[650px] object-cover transition-transform duration-[5s] group-hover:scale-110" />
          </div>
          <div className="absolute -bottom-10 -right-4 md:-bottom-16 md:-right-16 bg-accent p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-glow max-w-[200px] md:max-w-xs text-white">
             <div className="text-4xl md:text-6xl font-outfit font-black mb-2">15</div>
             <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.3em] opacity-80 leading-relaxed">Lat misji i zaufania w sercu Olsztyna.</p>
          </div>
        </motion.div>
        
        <div className="lg:pl-20 order-1 lg:order-2 text-center lg:text-left">
          <Badge>Nasza Misja</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-outfit font-black mb-8 md:mb-12 tracking-tighter leading-tight">Gdzie wiedza <br className="hidden md:block" /> <span className="text-accent italic">spotyka się</span> z pasją.</h2>
          <div className="space-y-6 md:space-y-10 text-lg md:text-xl text-text-gray leading-relaxed mb-12 md:mb-16 font-medium opacity-80">
             <p>Jesteśmy gabinetem weterynaryjnym oferującym pełną gamę usług dla zwierząt – od profilaktyki, poprzez leczenie chorób przewlekłych, po zaawansowaną diagnostykę i pielęgnację.</p>
             <p className="opacity-70">Naszym szczególnym zainteresowaniem cieszy się dziedzina <strong>dermatologii i stomatologii</strong>. Wykonujemy badania USG, RTG (w tym stomatologiczne), badania krwi oraz zabiegi chirurgii miękkiej.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-left">
              <div className="flex gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                   <p className="font-black text-xs md:text-sm uppercase mb-1 md:mb-2">Dermatologia</p>
                   <p className="text-[10px] md:text-xs text-text-gray opacity-60">Leczenie chorób skóry i uszu.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                   <p className="font-black text-xs md:text-sm uppercase mb-1 md:mb-2">Stomatologia</p>
                   <p className="text-[10px] md:text-xs text-text-gray opacity-60">RTG zębowe i chirurgia jamy ustnej.</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Team = () => {
  const members = [
    { 
      name: "Lek. Anna Nowak", 
      role: "CHIRURGIA & ONKOLOGIA", 
      img: "/emotional-vet/team-1.jpg",
      bio: "Leczy z pasji od ponad 12 lat. Specjalizuje się w chirurgii tkanek miękkich, dbając o każdy detal i komfort pacjenta."
    },
    { 
      name: "Lek. Piotr Wiśniewski", 
      role: "KARDIOLOGIA & USG", 
      img: "/emotional-vet/team-2.jpg",
      bio: "Mistrz precyzji diagnostycznej. Od 15 lat ratuje serca czworonogów, łącząc wiedzę z empatią."
    },
  ];

  return (
    <section id="zespol" className="py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <Badge>Nasi Eksperci</Badge>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-black mb-6 md:mb-8 tracking-tighter">Ludzie, którzy <span className="text-accent italic">kochają</span> zwierzęta.</h2>
          <p className="text-base md:text-xl text-text-gray max-w-xl mx-auto opacity-70">Każdy członek naszego zespołu to pasjonat i profesjonalista.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col md:flex-row gap-8 md:gap-12 items-center bg-secondary/30 p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-border group"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-[2rem] md:rounded-[3rem] overflow-hidden shrink-0 shadow-xl border-4 border-white/10 group-hover:scale-105 transition-transform duration-700">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-3xl md:text-4xl font-black mb-2 tracking-tighter">{m.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">{m.role}</p>
                <p className="text-base md:text-lg text-text-gray font-medium opacity-80 italic leading-relaxed">
                  "{m.bio}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapBlock = () => {
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
        
        {/* Overlay informing that map is inactive */}
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

const Contact = () => (
  <section id="kontakt" className="py-12 md:py-20 px-4 md:px-8 relative bg-background">
    <div className="container mx-auto">
        <div className="bg-secondary/50 dark:bg-secondary/20 backdrop-blur-2xl rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 overflow-hidden relative shadow-premium border border-accent/10">
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30">
             <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[150px]" />
             <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-[150px]" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="text-foreground text-center lg:text-left">
              <Badge className="bg-accent/10 text-accent border-accent/20 mb-8">Kontakt Premium</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-outfit font-black mb-8 md:mb-12 tracking-tighter leading-[0.9] text-foreground">
                Czekamy na <br /> <span className="text-accent italic">Wasz</span> sygnał.
              </h2>
              <div className="space-y-8 md:space-y-12">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center lg:items-start group/contact">
                  <div className="w-16 h-16 bg-card-bg rounded-2xl shadow-premium flex items-center justify-center text-accent group-hover/contact:bg-accent group-hover/contact:text-white transition-all duration-700 border border-accent/10 shrink-0"><Phone size={28} /></div>
                  <div className="text-center lg:text-left">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-gray/40 mb-1">Umów Wizytę</p>
                     <p className="text-2xl md:text-3xl font-black italic tracking-tight text-foreground">519 619 141</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center lg:items-start group/contact">
                  <div className="w-16 h-16 bg-card-bg rounded-2xl shadow-premium flex items-center justify-center text-accent group-hover/contact:bg-accent group-hover/contact:text-white transition-all duration-700 border border-accent/10 shrink-0"><MapPin size={28} /></div>
                  <div className="text-center lg:text-left">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-gray/40 mb-1">Nasza Siedziba</p>
                     <p className="text-2xl md:text-3xl font-black italic tracking-tight text-foreground">ul. Pana Tadeusza 6-6A, Olsztyn</p>
                  </div>
                </div>
  
                <div className="pt-8 border-t border-accent/10">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <Clock size={20} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Godziny Przyjęć</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    {[
                      { day: "Poniedziałek", hours: "10:00-14:00 | 16:00-18:00" },
                      { day: "Wtorek", hours: "08:00-16:00" },
                      { day: "Środa", hours: "10:00-14:00 | 16:00-18:00" },
                      { day: "Czwartek", hours: "08:00-16:00" },
                      { day: "Piątek", hours: "10:00-14:00 | 16:00-18:00" },
                      { day: "Sobota / Ndz", hours: "Zamknięte", closed: true }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] font-bold border-b border-accent/5 pb-2">
                        <span className="text-foreground/40 uppercase tracking-widest">{item.day}</span>
                        <span className={cn("tracking-tight italic", item.closed ? "text-accent" : "text-foreground")}>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card-bg/80 dark:bg-card-bg/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-premium border border-accent/10 max-w-xl mx-auto lg:mx-0">
               <form className="space-y-6 md:space-y-8">
                 <div className="space-y-3">
                   <label className="text-[9px] font-black uppercase tracking-[0.3em] text-text-gray/60 ml-2">Twoje Imię / Imię Pupila</label>
                   <input 
                     type="text" 
                     className="w-full bg-secondary/50 p-5 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] outline-none border border-border/50 focus:border-accent/30 focus:ring-4 ring-accent/5 transition-all duration-500 font-medium text-sm text-foreground placeholder:text-text-gray/50 shadow-sm" 
                     placeholder="Wpisz tutaj..." 
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[9px] font-black uppercase tracking-[0.3em] text-text-gray/60 ml-2">W czym możemy pomóc?</label>
                   <textarea 
                     rows={3} 
                     className="w-full bg-secondary/50 p-5 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] outline-none border border-border/50 focus:border-accent/30 focus:ring-4 ring-accent/5 transition-all duration-500 font-medium text-sm text-foreground placeholder:text-text-gray/50 shadow-sm" 
                     placeholder="Opisz krótko sprawę..."
                   ></textarea>
                 </div>
                 <LiquidButton className="w-full py-6 md:py-8 text-[10px] md:text-xs tracking-[0.5em] shadow-premium">
                    Wyślij Zapytanie
                 </LiquidButton>
               </form>
            </div>
          </div>
        </div>
    </div>
  </section>
);

export default function UltraPremiumVetPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const imagesToPreload = [
      "/emotional-vet/hero-emotional.jpg",
      "/emotional-vet/history.jpg",
      "/emotional-vet/vetmed1.png",
      "/emotional-vet/team-1.jpg",
      "/emotional-vet/team-2.jpg"
    ];

    let loadedCount = 0;
    const totalToLoad = imagesToPreload.length + 1; // +1 for fonts

    const updateProgress = () => {
      loadedCount++;
      setLoadingProgress((loadedCount / totalToLoad) * 100);
      if (loadedCount >= totalToLoad) {
        setTimeout(() => setIsLoading(false), 800); // Small buffer for smooth reveal
      }
    };

    // Preload Images
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Wait for fonts
    if (typeof document !== 'undefined') {
      document.fonts.ready.then(updateProgress);
    } else {
      updateProgress();
    }

    // Safety timeout
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={loadingProgress} key="loader" />}
      </AnimatePresence>

      <CursorGlow />
      <Navbar />
      <PawBackground />
      
      <Hero />
      
      <Services />
      <GroomingGallery />
      <InfinitePatients />
      
      <About />
      <Team />
      
      <section className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-auto md:h-[600px]">
            {/* Bento Tile 1: Massive Accent */}
            <BentoCard className="md:col-span-6 bg-accent text-white shadow-2xl shadow-accent/20">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Zap className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 text-white/40 group-hover:text-white transition-colors duration-500" />
                  <h3 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mb-4 opacity-80">Roczna skuteczność</h3>
                  <div className="text-[5rem] md:text-[9rem] font-black tracking-tighter leading-none mb-4">
                    <CountUp end={1200} /><span className="text-white/40">+</span>
                  </div>
                </div>
                <p className="text-lg md:text-xl font-medium max-w-xs opacity-90 italic">Precyzyjne RTG stomatologiczne i diagnostyka USG.</p>
              </div>
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
            </BentoCard>

            {/* Right Column Bento Container */}
            <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Bento Tile 2: Glassmorphism */}
              <BentoCard className="md:col-span-2 bg-secondary/50 backdrop-blur-3xl border-border flex items-center gap-6 md:gap-10">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-accent/10 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-accent shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <Heart className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-foreground mb-1 tracking-tighter"><CountUp end={50} />k<span className="text-accent">+</span></div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-text-gray/60">Leczone schorzenia</p>
                </div>
              </BentoCard>

              {/* Bento Tile 3: Minimal Dark */}
              <BentoCard className="bg-foreground text-background text-center flex flex-col justify-center">
                <div className="text-accent mb-4 md:mb-6 flex justify-center group-hover:rotate-[360deg] transition-transform duration-1000">
                  <Star className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter"><CountUp end={15} /></div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Lokalne zaufanie</p>
              </BentoCard>

              {/* Bento Tile 4: Clean White */}
              <BentoCard className="bg-card-bg border-2 border-accent/5 text-center flex flex-col justify-center shadow-xl shadow-black/5">
                <div className="text-accent/30 group-hover:text-accent transition-colors duration-500 mb-4 md:mb-6 flex justify-center">
                  <Users className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tighter"><CountUp end={2} /></div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-text-gray/60">Ekspertów</p>
              </BentoCard>
            </div>
          </div>
        </div>
      </section>

      <ContactMap />
      <ReviewsSection />

      {/* FAQ Section */}
      <section className="py-24 md:py-32 max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <Badge className="mb-6">FAQ</Badge>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-none">Pytania <br className="md:hidden" /> <span className="text-accent italic">i</span> Odpowiedzi</h2>
          <p className="text-lg md:text-xl text-text-gray opacity-70">Wszystko, co warto wiedzieć przed wizytą.</p>
        </div>
        
        <div className="space-y-4">
          {[
            { q: "Jak przygotować pupila do zabiegu?", a: "Zalecamy, aby zwierzę było na czczo przez minimum 12 godzin przed planowanym zabiegiem. Woda może być podawana bez ograniczeń.", icon: Syringe },
            { q: "Czy muszę umawiać się na wizytę?", a: "Tak, rezerwacja terminu pozwala nam uniknąć tłoku i zapewnić Twojemu pupilowi spokojną atmosferę bez zbędnego stresu w poczekalni.", icon: Clock },
            { q: "Co zrobić w nagłym przypadku w nocy?", a: "W godzinach nocnych oraz w weekendy prosimy o kontakt z najbliższą całodobową kliniką weterynaryjną. Współpracujemy z placówkami dyżurującymi.", icon: Phone },
            { q: "Czy wykonujecie badania krwi?", a: "Tak, pobieramy krew do badań, które następnie przesyłamy do renomowanego zewnętrznego laboratorium. Wyniki są zazwyczaj dostępne następnego dnia roboczego.", icon: Microscope },
          ].map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} icon={item.icon} />
          ))}
        </div>
      </section>

      <footer className="py-24 md:py-32 text-center lg:text-left bg-[#0D0D0D] text-white px-4 md:px-0 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-32 items-start mb-24 md:mb-32">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-4 font-outfit text-3xl md:text-4xl font-black tracking-tighter text-accent mb-8 md:mb-10">
                <img 
                  src="/emotional-vet/vetmed1.png" 
                  alt="VETMED Logo" 
                  className="h-24 md:h-32 w-auto object-contain brightness-125 contrast-125 drop-shadow-[0_0_20px_rgba(254,69,32,0.4)]" 
                />
              </div>
              <p className="text-base md:text-lg opacity-40 font-medium leading-relaxed max-w-xs text-white">
                Tworzymy standardy nowoczesnej weterynarii, w której pacjent jest zawsze na pierwszym miejscu.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:gap-20">
               <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6 md:mb-8">Nawigacja</h4>
                  <div className="flex flex-col gap-4 md:gap-6 text-sm font-bold opacity-60">
                     <Link href="/" className="hover:text-accent transition-colors">Start</Link>
                     <Link href="/uslugi" className="hover:text-accent transition-colors">Usługi</Link>
                     <Link href="/#o-nas" className="hover:text-accent transition-colors">O nas</Link>
                  </div>
               </div>
               <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6 md:mb-8">Social</h4>
                  <div className="flex flex-col gap-4 md:gap-6 text-sm font-bold opacity-60">
                     <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                     <a href="#" className="hover:text-accent transition-colors">Facebook</a>
                     <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-8 md:gap-10 items-center lg:items-start text-center lg:text-left">
               <div className="w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6 md:mb-8">VET-News</h4>
                  <div className="relative group">
                    <input 
                      type="email" 
                      placeholder="Twoje e-mail..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:border-accent/50 transition-all text-sm font-medium pr-32"
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-accent text-white px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                      Zapisz
                    </button>
                  </div>
                  <p className="text-[8px] font-bold opacity-20 uppercase tracking-widest mt-4">Wysyłamy tylko ważne info dla Twojego pupila.</p>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4 md:mb-8">Kontakt</h4>
                  <p className="text-xl md:text-2xl font-black italic opacity-80">kontakt@vetmed.pl</p>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-accent/10 gap-10">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-20">
              &copy; 2026 VETMED. Strona stworzona przez Gabriela Sadowskiego.
            </p>
            <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
               <Link href="/polityka-prywatnosci" className="opacity-20 hover:opacity-100 hover:text-accent transition-all duration-500">Polityka Prywatności</Link>
               <Link href="/regulamin" className="opacity-20 hover:opacity-100 hover:text-accent transition-all duration-500">Regulamin</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
