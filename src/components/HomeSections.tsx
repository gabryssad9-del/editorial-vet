'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(() => import('@/components/ServicesSection').then(mod => mod.ServicesSection), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-secondary/20 animate-pulse rounded-[3rem] mx-4 my-8" />
});
const AboutSection = dynamic(() => import('@/components/AboutSection').then(mod => mod.AboutSection), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-background animate-pulse" />
});
const TeamSection = dynamic(() => import('@/components/TeamSection').then(mod => mod.TeamSection), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-background animate-pulse" />
});
const GroomingGallery = dynamic(() => import('@/components/GroomingGallery').then(mod => mod.GroomingGallery), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-secondary/10 animate-pulse" />
});
const InfinitePatients = dynamic(() => import('@/components/InfinitePatients').then(mod => mod.InfinitePatients), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-background animate-pulse" />
});
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection').then(mod => mod.ReviewsSection), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-secondary/5 animate-pulse" />
});
const ContactSection = dynamic(() => import('@/components/ContactSection').then(mod => mod.ContactSection), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-background animate-pulse" />
});
const BentoCard = dynamic(() => import('@/components/BentoCard').then(mod => mod.BentoCard), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection').then(mod => mod.FAQSection), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-background animate-pulse" />
});
const TrustBar = dynamic(() => import('@/components/TrustBar').then(mod => mod.TrustBar), { ssr: false });
const CountUp = dynamic(() => import('@/components/CountUp').then(mod => mod.CountUp), { ssr: false });

import { Zap, Heart, Star, Users } from 'lucide-react';

export const HomeSections = () => {
  return (
    <>
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
      <FAQSection />
    </>
  );
};
