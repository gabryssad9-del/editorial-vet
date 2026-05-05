'use client';
import React, { useState } from 'react';
import { m } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { Badge } from './Badge';

export const ContactSection = () => {
  const [isMapActive, setIsMapActive] = useState(false);

  const contactInfo = [
    { 
      icon: MapPin, 
      label: "Adres", 
      value: "ul. Pana Tadeusza 6, 10-461 Olsztyn",
      action: "https://www.google.com/maps/dir/?api=1&destination=Vet-Med+Gabinet+Weterynaryjny+Pana+Tadeusza+6+Olsztyn",
      actionLabel: "Nawiguj"
    },
    { 
      icon: Phone, 
      label: "Telefon", 
      value: "519 619 141",
      action: "tel:+48519619141",
      actionLabel: "Zadzwoń"
    },
    { 
      icon: Mail, 
      label: "E-mail", 
      value: "kontakt@vetmed.pl",
      action: "mailto:kontakt@vetmed.pl",
      actionLabel: "Napisz"
    },
    { 
      icon: Clock, 
      label: "Godziny otwarcia", 
      value: "Pon - Pt: 08:00 - 18:00",
      subValue: "Soboty: Po ustaleniu telefonicznym"
    },
  ];

  return (
    <section id="kontakt" className="py-24 md:py-32 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-stretch">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <Badge>Kontakt</Badge>
              <h2 className="text-4xl md:text-6xl font-outfit font-black mb-10 md:mb-16 tracking-tighter leading-none">
                Jesteśmy tu dla <br /> <span className="text-accent italic">Twojego</span> pupila.
              </h2>
              
              <div className="space-y-8 md:space-y-10">
                {contactInfo.map((info, i) => (
                  <m.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-premium">
                      <info.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1">{info.label}</p>
                      <p className="text-xl md:text-2xl font-bold text-foreground mb-2">{info.value}</p>
                      {info.subValue && <p className="text-sm font-medium opacity-50">{info.subValue}</p>}
                      {info.action && (
                        <a 
                          href={info.action} 
                          target={info.action.startsWith('http') ? "_blank" : undefined}
                          rel={info.action.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent/60 hover:text-accent transition-colors"
                        >
                          {info.actionLabel} <ChevronRight size={14} />
                        </a>
                      )}
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Full Height Map */}
          <div className="lg:col-span-6 flex items-stretch">
            <m.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-full min-h-[380px] md:min-h-[500px] bg-secondary rounded-[2.5rem] md:rounded-[3.5rem] p-2 md:p-3 border border-accent/10 shadow-premium relative group overflow-hidden"
            >
              <div 
                className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-secondary relative z-10 cursor-pointer group/map"
                onClick={() => setIsMapActive(true)}
              >
                {isMapActive ? (
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2357.701168536125!2d20.503363977054665!3d53.77694887340026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e27ed29a4aabe7%3A0x25da1ccc94df0957!2sVet-Med%20Gabinet%20Weterynaryjny!5e0!3m2!1spl!2spl!4v1714866750000!5m2!1spl!2spl" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src="https://images.weserv.nl/?url=gabryssad9-del.github.io/editorial-vet/emotional-vet/map-placeholder.jpg&w=1000&output=webp&q=80" 
                      alt="Mapa lokalizacji VETMED"
                      className="w-full h-full object-cover brightness-90 group-hover/map:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-card-bg/95 backdrop-blur-md px-8 py-4 rounded-full shadow-premium text-[11px] font-black uppercase tracking-[0.2em] text-accent border border-accent/20 group-hover/map:scale-110 transition-transform">
                        Kliknij, aby otworzyć mapę
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
};
