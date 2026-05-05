'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Badge } from '@/components/Badge';
import { m } from 'framer-motion';
import { CheckCircle2, Heart, Award, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LiquidButton } from '@/components/LiquidButton';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-52 md:pb-32 px-4 md:px-8 relative overflow-hidden">
        <div className="container mx-auto text-center">
          <Badge className="mb-8">
            <Heart size={14} fill="currentColor" /> O klinice
          </Badge>
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl lg:text-9xl font-outfit font-black tracking-tighter leading-[0.85] mb-8"
          >
            Nasza <br /> <span className="text-accent italic">historia</span>.
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-text-gray max-w-2xl mx-auto font-medium opacity-60 leading-relaxed"
          >
            Ponad 15 lat doświadczenia w sercu Olsztyna. Łączymy pasję do zwierząt z nowoczesną medycyną weterynaryjną.
          </m.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-24 md:mb-32">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[3rem] md:rounded-[5.5rem] overflow-hidden shadow-premium border-[12px] md:border-[20px] border-secondary group">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/history.jpg&w=800&output=webp&q=80"
                  alt="Historia kliniki VETMED"
                  className="w-full h-[450px] md:h-[600px] object-cover transition-transform duration-[5s] group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 bg-accent p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-glow text-white">
                <div className="text-4xl md:text-6xl font-outfit font-black mb-1">15</div>
                <p className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] opacity-80">lat w Olsztynie</p>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-6xl font-outfit font-black mb-8 tracking-tighter leading-tight">
                Profesjonalna opieka <span className="text-accent italic">weterynaryjna</span> w Olsztynie.
              </h2>
              <div className="space-y-6 text-lg text-text-gray leading-relaxed mb-12 font-medium opacity-80">
                <p>
                  Vet-Med to nowoczesny gabinet weterynaryjny, który od lat zapewnia kompleksową opiekę medyczną dla zwierząt towarzyszących. Naszą misją jest łączenie wieloletniego doświadczenia z najnowocześniejszymi metodami diagnostycznymi i terapeutycznymi.
                </p>
                <p>
                  Specjalizujemy się w zaawansowanej <strong>dermatologii oraz stomatologii</strong>, oferując pełen zakres usług – od profilaktyki, przez chirurgię miękką, aż po precyzyjną diagnostykę obrazową RTG i USG.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-12 text-left">
                {[
                  { icon: CheckCircle2, title: 'Dermatologia', desc: 'Leczenie chorób skóry i uszu.' },
                  { icon: CheckCircle2, title: 'Stomatologia', desc: 'RTG zębowe i chirurgia jamy ustnej.' },
                  { icon: CheckCircle2, title: 'Chirurgia', desc: 'Zabiegi w najwyższym standardzie.' },
                  { icon: CheckCircle2, title: 'Diagnostyka', desc: 'USG Doppler i badania krwi.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-black text-xs uppercase mb-1">{item.title}</p>
                      <p className="text-[10px] text-text-gray opacity-60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <LiquidButton href="https://vetmed.nakiedy.pl/" className="px-10 py-4">
                Umów wizytę online
              </LiquidButton>
            </m.div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-16 border-t border-border">
            {[
              { icon: Award, value: '15+', label: 'Lat doświadczenia' },
              { icon: Users, value: '50k+', label: 'Leczonych pacjentów' },
              { icon: Heart, value: '98%', label: 'Zadowolonych klientów' },
            ].map((stat, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-[2.5rem] bg-secondary border border-border"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6">
                  <stat.icon size={28} />
                </div>
                <div className="text-4xl md:text-5xl font-outfit font-black tracking-tighter mb-2">{stat.value}</div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-gray opacity-60">{stat.label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <img
            src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/vetmed1.png&w=120&output=webp&q=50"
            alt="VETMED Logo"
            className="h-16 w-auto object-contain"
          />
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-text-gray">
            <Link href="/uslugi" className="hover:text-accent transition-colors">Usługi</Link>
            <Link href="/" className="hover:text-accent transition-colors">Start</Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">
            &copy; 2026 VETMED. Premium Veterinary Care.
          </p>
        </div>
      </footer>
    </main>
  );
}
