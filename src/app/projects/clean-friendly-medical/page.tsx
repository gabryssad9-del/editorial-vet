'use client';

import { motion } from 'framer-motion';
import { Phone, Clock, AlertCircle, Shield, Syringe, Activity, Microscope, HeartPulse, ChevronDown, MapPin, Mail, Share2 } from 'lucide-react';
import { useState } from 'react';

// --- Components ---

const TopInfoBar = () => (
  <div className="bg-accent text-white py-2 px-6 flex flex-col md:flex-row justify-between items-center text-sm font-medium">
    <div className="flex gap-4 items-center">
      <span className="flex items-center gap-2"><Phone size={14} /> +48 123 456 789</span>
      <span className="flex items-center gap-2"><Clock size={14} /> Pon-Pt: 8:00-20:00 | Sob: 9:00-15:00</span>
    </div>
    <button className="mt-2 md:mt-0 flex items-center gap-2 bg-accent-soft hover:bg-red-500 transition-colors px-4 py-1 rounded-full uppercase text-xs font-bold">
      <AlertCircle size={14} /> Pomoc Pilna 24H
    </button>
  </div>
);

const Navbar = () => (
  <header className="sticky top-0 z-50 glass shadow-premium">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-2xl text-accent">
        <HeartPulse />
        <span className="font-outfit">VetCare</span>
      </div>
      <ul className="hidden md:flex gap-8 font-medium">
        <li><a href="#services" className="hover:text-accent transition-colors">Usługi</a></li>
        <li><a href="#about" className="hover:text-accent transition-colors">O nas</a></li>
        <li><a href="#team" className="hover:text-accent transition-colors">Zespół</a></li>
        <li><a href="#contact" className="hover:text-accent transition-colors">Kontakt</a></li>
      </ul>
      <a href="#contact" className="bg-accent text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">Umów wizytę</a>
    </nav>
  </header>
);

const Hero = () => (
  <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-black/40 z-10" />
    <div 
      className="absolute inset-0 bg-cover bg-center" 
      style={{ backgroundImage: 'url("/hero-vet.jpg")' }} // Placeholder for now, I'll update with the generated one
    />
    <div className="container mx-auto px-6 relative z-20 text-center text-white">
      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold font-outfit mb-6"
      >
        Profesjonalna Opieka Weterynaryjna z Sercem
      </motion.h1>
      <motion.p 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90"
      >
        Twoi pupile zasługują na to, co najlepsze. Nowoczesna diagnostyka i troskliwy zespół lekarzy dostępny dla Ciebie każdego dnia.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <a href="#contact" className="bg-accent text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform inline-block">
          Zarezerwuj wizytę
        </a>
      </motion.div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Nasze Usługi</h2>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <Syringe />, title: 'Szczepienia', desc: 'Pełen zakres szczepień ochronnych dla psów, kotów i królików.' },
          { icon: <Activity />, title: 'Chirurgia', desc: 'Zabiegi kastracji, sterylizacji oraz operacje tkanek miękkich.' },
          { icon: <Microscope />, title: 'Diagnostyka', desc: 'Badania krwi, USG, RTG - szybka diagnoza na miejscu.' },
          { icon: <AlertCircle />, title: 'Emergency', desc: 'Pomoc doraźna w nagłych wypadkach i stanach krytycznych.' },
        ].map((s, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 rounded-card glass shadow-premium border-t-4 border-accent hover:border-accent-soft transition-all"
          >
            <div className="text-accent mb-6 bg-accent/10 w-16 h-16 flex items-center justify-center rounded-2xl">
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 font-outfit">{s.title}</h3>
            <p className="text-text-gray">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main Page ---

export default function Home() {
  return (
    <main>
      <TopInfoBar />
      <Navbar />
      <Hero />
      <Services />
      
      {/* O nas */}
      <section id="about" className="py-24 bg-beige-light">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-card overflow-hidden shadow-2xl h-96 bg-gray-200">
            {/* Image Placeholder */}
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-6">Troska, Wiedza i Empatia</h2>
            <p className="text-lg text-text-gray mb-8">
              Od ponad 15 lat budujemy miejsce, w którym zdrowie zwierząt jest najwyższą wartością. Nasza klinika to zespół specjalistów, którzy kochają to, co robią.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="text-accent" />
                <span className="font-semibold">Bezpieczeństwo</span>
              </div>
              <div className="flex items-center gap-3">
                <HeartPulse className="text-accent" />
                <span className="font-semibold">Pełna Opieka</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zespół */}
      <section id="team" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-16">Nasz Zespół</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="group">
                        <div className="w-48 h-48 mx-auto rounded-full bg-gray-100 mb-6 border-4 border-beige-light group-hover:border-accent transition-colors overflow-hidden" />
                        <h3 className="text-xl font-bold font-outfit">dr Anna Kowalska</h3>
                        <p className="text-accent font-medium">Chirurg Weterynaryjny</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Opinie */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Opinie Właścicieli</h2>
            <p className="text-text-gray">Wasze zaufanie jest dla nas najważniejszą nagrodą.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Marta Nowak", pet: "Maja (Golden Retriever)", text: "Cudowne podejście do zwierząt! Pani Doktor z ogromną cierpliwością tłumaczyła przebieg leczenia. Polecam z całego serca." },
              { name: "Piotr Wiśniewski", pet: "Leon (Kot Brytyjski)", text: "Nowoczesny sprzęt i fachowa pomoc. Operacja Leona przebiegła bez komplikacji, a opieka pooperacyjna była wzorowa." },
              { name: "Katarzyna Kowal", pet: "Biały (Królik)", text: "Jedyna klinika w okolicy, która naprawdę zna się na zajęczakach. Profesjonalizm i ogromna wiedza." }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-card glass border border-beige-light shadow-sm"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map(star => <span key={star}>★</span>)}
                </div>
                <p className="italic text-foreground mb-6">"{t.text}"</p>
                <div>
                  <p className="font-bold font-outfit">{t.name}</p>
                  <p className="text-sm text-accent">{t.pet}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="gallery" className="py-24 bg-beige-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Nasi Pacjenci</h2>
            <p className="text-text-gray">Uśmiechnięte pyszczki to nasza misja.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <motion.div 
                key={n}
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Image Placeholder */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Często Zadawane Pytania</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Czy muszę umawiać się na wizytę?", a: "Zalecamy wcześniejszą rezerwację telefoniczną lub online, aby uniknąć kolejek. W stanach nagłych przyjmujemy pacjentów niezwłocznie." },
              { q: "Czy przyjmujecie nagłe przypadki?", a: "Tak, nasza klinika jest przygotowana na udzielenie pomocy doraźnej. Prosimy o kontakt telefoniczny w drodze do nas." },
              { q: "Jakie zwierzęta leczycie?", a: "Specjalizujemy się w leczeniu psów, kotów oraz małych ssaków (króliki, świnki morskie, chomiki)." }
            ].map((item, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-beige-light cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-lg list-none font-outfit">
                  {item.q}
                  <ChevronDown className="group-open:rotate-180 transition-transform text-accent" />
                </summary>
                <p className="mt-4 text-text-gray">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="py-24 bg-beige-light">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-8">Skontaktuj się z nami</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-accent"><MapPin /></div>
                  <p className="text-lg">ul. Weterynaryjna 12, 00-001 Warszawa</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-accent"><Phone /></div>
                  <p className="text-lg">+48 123 456 789</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-accent"><Mail /></div>
                  <p className="text-lg">kontakt@vetcare.pl</p>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <a href="#" className="p-3 bg-white rounded-xl hover:text-accent transition-colors"><Share2 /></a>
                <a href="#" className="p-3 bg-white rounded-xl hover:text-accent transition-colors"><Share2 /></a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-card shadow-premium">
              <form className="space-y-4">
                <input type="text" placeholder="Imię i nazwisko" className="w-full p-4 bg-beige-light rounded-xl outline-none focus:ring-2 ring-accent" />
                <input type="email" placeholder="E-mail" className="w-full p-4 bg-beige-light rounded-xl outline-none focus:ring-2 ring-accent" />
                <textarea placeholder="W czym możemy pomóc?" rows={4} className="w-full p-4 bg-beige-light rounded-xl outline-none focus:ring-2 ring-accent"></textarea>
                <button className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all">Wyślij wiadomość</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12 text-center border-t border-white/10">
        <p>&copy; 2026 VetCare Klinika Weterynaryjna. Strona stworzona przez Gabriela Sadowskiego.</p>
      </footer>
    </main>
  );
}
