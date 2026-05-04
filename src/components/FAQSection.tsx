'use client';
import React from 'react';
import { Syringe, Clock, Phone, Microscope } from 'lucide-react';
import { FAQItem } from './FAQItem';
import { Badge } from './Badge';

export const FAQSection = () => {
  return (
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
  );
};
