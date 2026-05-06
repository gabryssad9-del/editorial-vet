import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/HeroSection';
import { HomeSections } from '@/components/HomeSections';
import { ClientDecorations } from '@/components/ClientDecorations';

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

      <HomeSections />

      <footer className="py-24 md:py-32 text-center lg:text-left bg-[#0D0D0D] text-white px-4 md:px-0 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start mb-24 md:mb-32">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-4 font-outfit text-3xl md:text-4xl font-black tracking-tighter text-accent mb-8 md:mb-10">
                <img 
                  src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/vetmed1.png&w=400&output=webp" 
                  alt="VETMED Logo" 
                  width="400"
                  height="200"
                  loading="lazy"
                  decoding="async"
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
