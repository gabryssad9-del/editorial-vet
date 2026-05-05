

import React from 'react';
import { 
  Heart, Star, Users, Zap, ChevronRight, Menu, X, ArrowRight, Phone
} from 'lucide-react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/HeroSection';

const ServicesSection = dynamic(() => import('@/components/ServicesSection').then(mod => mod.ServicesSection));
const AboutSection = dynamic(() => import('@/components/AboutSection').then(mod => mod.AboutSection));
const TeamSection = dynamic(() => import('@/components/TeamSection').then(mod => mod.TeamSection));
const GroomingGallery = dynamic(() => import('@/components/GroomingGallery').then(mod => mod.GroomingGallery));
const InfinitePatients = dynamic(() => import('@/components/InfinitePatients').then(mod => mod.InfinitePatients));
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection').then(mod => mod.ReviewsSection));
const ContactSection = dynamic(() => import('@/components/ContactSection').then(mod => mod.ContactSection));
const BentoCard = dynamic(() => import('@/components/BentoCard').then(mod => mod.BentoCard));
const FAQSection = dynamic(() => import('@/components/FAQSection').then(mod => mod.FAQSection));
const TrustBar = dynamic(() => import('@/components/TrustBar').then(mod => mod.TrustBar));
const CountUp = dynamic(() => import('@/components/CountUp').then(mod => mod.CountUp));

import { ClientDecorations } from '@/components/ClientDecorations';

// Utils
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function UltraPremiumVetPage() {
  return (
      <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
        <ClientDecorations />
        <Navbar />
        
        <Hero />
        <section className="py-8 bg-background">
          <div className="container mx-auto">
             <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
        </section>

        <ServicesSection />
        <GroomingGallery />
        <InfinitePatients />
        
        <AboutSection />
        <TeamSection />
      
      <section className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
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

      <ReviewsSection />
      <ContactSection />

      {/* FAQ Section */}
      <FAQSection />

      <footer className="py-24 md:py-32 text-center lg:text-left bg-[#0D0D0D] text-white px-4 md:px-0 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start mb-24 md:mb-32">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-4 font-outfit text-3xl md:text-4xl font-black tracking-tighter text-accent mb-8 md:mb-10">
                <img 
                  src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/vetmed1.png&w=400&output=webp" 
                  alt="VETMED Logo" 
                  className="h-24 md:h-32 w-auto object-contain brightness-125 contrast-125 drop-shadow-[0_0_20px_rgba(254,69,32,0.4)]" 
                />
              </div>
              <p className="text-base md:text-lg opacity-40 font-medium leading-relaxed max-w-xs text-white">
                Zaawansowana dermatologia i stomatologia dla Twojego pupila w sercu Olsztyna.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 md:gap-10 items-center lg:items-start text-center lg:text-left">
               <div className="w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6 md:mb-8">Newsletter</h4>
                  <div className="relative group">
                    <input 
                      type="email" 
                      placeholder="Twój e-mail..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:border-accent/50 transition-all text-sm font-medium pr-32"
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-accent text-white px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                      Zapisz
                    </button>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                   <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Social Media</h4>
                    <div className="flex gap-6 items-center">
                       <a 
                         href="https://www.facebook.com/vetmedolsztyn/?locale=pl_PL" 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="flex items-center gap-2 group/social hover:text-accent transition-all duration-300"
                       >
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/social:bg-accent/20 group-hover/social:scale-110 transition-all duration-500">
                           <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                           </svg>
                         </div>
                         <span className="text-xs font-black uppercase tracking-widest opacity-40 group-hover/social:opacity-100">Facebook</span>
                       </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Lokalizacja</h4>
                    <p className="text-sm font-bold opacity-60">Olsztyn, ul. Pana Tadeusza 6</p>
                  </div>
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
