import React from 'react';
import { HeroContent } from './HeroContent';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <HeroContent />
          
          <div className="relative">
            <div 
              className="hero-img-container relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(254,69,32,0.15)] border-[12px] md:border-[20px] border-secondary group isolate"
            >
              <img 
                src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=800&output=webp&q=55" 
                srcSet="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=390&output=webp&q=40 390w,
                        https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=600&output=webp&q=45 600w,
                        https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/hero-emotional.jpg&w=900&output=webp&q=55 900w"
                sizes="(max-width: 480px) 390px, (max-width: 768px) 600px, 900px"
                alt="VETMED – weterynarz Olsztyn" 
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                width="900"
                height="600"
                className="w-full h-[380px] md:h-[580px] object-cover transition-transform duration-[4s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-background/20 lg:backdrop-blur-xl px-4 md:px-8 py-2 md:py-4 rounded-full border border-background/30 text-foreground font-black text-[8px] md:text-xs uppercase tracking-widest">
                 Premium Care
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
