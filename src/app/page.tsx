'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useInView } from 'framer-motion';
import { Heart, Star, Users, Camera, MessageCircle, HelpCircle, Phone, MapPin, Mail, Clock, ChevronRight, ChevronDown, CheckCircle2, Play, Plus, Zap, Sparkles, Smile, Droplets, Scissors, Menu, X, Sun, Moon, ArrowRight, Activity, Microscope, Shield, Syringe, Globe, Search } from 'lucide-react';
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('@/components/Navbar').then(mod => mod.Navbar), { ssr: true });
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle').then(mod => mod.ThemeToggle), { ssr: false });
const LiquidButton = dynamic(() => import('@/components/LiquidButton').then(mod => mod.LiquidButton), { ssr: false });
const Badge = dynamic(() => import('@/components/Badge').then(mod => mod.Badge), { ssr: true });
const TrustBar = dynamic(() => import('@/components/TrustBar').then(mod => mod.TrustBar), { ssr: true });
const Services = dynamic(() => import('@/components/ServicesSection').then(mod => mod.ServicesSection), { ssr: true });
const About = dynamic(() => import('@/components/AboutSection').then(mod => mod.AboutSection), { ssr: true });
const Team = dynamic(() => import('@/components/TeamSection').then(mod => mod.TeamSection), { ssr: true });
const GroomingGallery = dynamic(() => import('@/components/GroomingGallery').then(mod => mod.GroomingGallery), { ssr: true });
const InfinitePatients = dynamic(() => import('@/components/InfinitePatients').then(mod => mod.InfinitePatients), { ssr: true });
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection').then(mod => mod.ReviewsSection), { ssr: true });
const MapBlock = dynamic(() => import('@/components/MapBlock').then(mod => mod.MapBlock), { ssr: true });
const ContactMap = dynamic(() => import('@/components/ContactMap').then(mod => mod.ContactMap), { ssr: true });
const BentoCard = dynamic(() => import('@/components/BentoCard').then(mod => mod.BentoCard), { ssr: true });
const FAQItem = dynamic(() => import('@/components/FAQItem').then(mod => mod.FAQItem), { ssr: true });
const Hero = dynamic(() => import('@/components/HeroSection').then(mod => mod.Hero), { ssr: true });
const CountUp = dynamic(() => import('@/components/CountUp').then(mod => mod.CountUp), { ssr: true });






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





export default function UltraPremiumVetPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setIsLoading(false);
    setLoadingProgress(100);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Usunięto redundantny LoadingScreen */}

      <CursorGlow />
      <Navbar />
      <PawBackground />
      
      <Hero />
      <TrustBar />

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
                  src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/vetmed1.png&w=400&output=webp" 
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
