'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Heart, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Badge } from '@/components/Badge';

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15">
      {paws.map((paw) => (
        <m.div
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
          className="absolute"
          style={{ left: paw.left, top: paw.top, color: '#FE4520' }}
        >
          <svg width="70" height="70" viewBox="0 0 48.839 48.839" fill="currentColor">
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
        </m.div>
      ))}
    </div>
  );
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background font-inter selection:bg-accent selection:text-white pb-20 md:pb-32 relative">
      <Navbar />
      <PawBackground />

      {/* Brand Bloom Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <m.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px]" 
        />
        <m.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" 
        />
      </div>

      {/* Hero Header */}
      <header className="pt-40 md:pt-52 pb-16 md:pb-32 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-8 md:mb-10">
              Dokumentacja
            </Badge>
            <h1 className="text-5xl md:text-8xl font-outfit font-black tracking-tighter mb-8 md:mb-12 leading-[0.9]">
              Polityka <br className="sm:hidden" /> <span className="text-accent italic">Prywatności</span>.
            </h1>
            <p className="text-lg md:text-xl text-text-gray font-medium opacity-60">Ostatnia aktualizacja: 26 kwietnia 2026</p>
          </m.div>
        </div>
      </header>

      {/* Content */}
      <section className="px-4 md:px-8 relative z-10">
        <div className="container mx-auto max-w-4xl bg-card-bg/80 backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-32 shadow-premium border border-border/50">
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none space-y-12 md:space-y-16">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">1. Informacje Ogólne</h2>
              <p className="text-sm md:text-base text-text-gray leading-relaxed font-medium">
                Klinika Weterynaryjna VETMED z siedzibą w Olsztynie dba o Twoją prywatność. Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych zbieranych za pośrednictwem strony internetowej.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">2. Administrator Danych</h2>
              <p className="text-sm md:text-base text-text-gray leading-relaxed font-medium">
                Administratorem Twoich danych osobowych jest VETMED Sp. z o.o., ul. Pana Tadeusza 6, 10-001 Olsztyn. W sprawach dotyczących ochrony danych możesz skontaktować się z nami pod adresem: <span className="text-accent font-black">kontakt@vetmed.pl</span>.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">3. Cel i Podstawa Przetwarzania</h2>
              <p className="text-sm md:text-base text-text-gray leading-relaxed font-medium">
                Twoje dane przetwarzamy w celu:
              </p>
              <ul className="space-y-4 md:space-y-6 list-none pl-0 text-sm md:text-base">
                {[
                  'Realizacji umówionych wizyt weterynaryjnych', 
                  'Odpowiedzi na zapytania przez formularz kontaktowy', 
                  'Przesyłania ważnych informacji medycznych dotyczących Twoich pacjentów'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start font-medium text-text-gray">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-1"><ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 md:space-y-8 pt-12 md:pt-16 border-t border-border/50">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">4. Bezpieczeństwo</h2>
              <p className="text-sm md:text-base text-text-gray leading-relaxed font-medium">
                Stosujemy najnowocześniejsze zabezpieczenia techniczne i organizacyjne, aby chronić Twoje dane przed nieautoryzowanym dostępem. Wszystkie połączenia są szyfrowane certyfikatem SSL.
              </p>
            </div>
          </div>
          
          <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-border/50 flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-widest text-accent hover:opacity-70 transition-all">
              <ArrowLeft size={16} /> Wróć do strony głównej
            </Link>
          </div>
        </div>
      </section>

      <footer className="mt-20 md:mt-32 pt-16 md:pt-20 border-t border-border/50 px-4 md:px-8 text-center">
        <div className="container mx-auto">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
            &copy; 2026 VETMED. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </main>
  );
}
