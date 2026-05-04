'use client';

import { motion } from 'framer-motion';
import { Layout, CheckCircle, ArrowRight, Monitor, Smartphone, Globe } from 'lucide-react';
import Link from 'next/link';

const Hub = () => {
  const projects = [
    {
      id: 1,
      title: "Clean Friendly Medical",
      desc: "Nowoczesna i przyjazna klinika weterynaryjna z motywem psich łapek.",
      path: "/projects/clean-friendly-medical",
      status: "Ukończony",
      color: "bg-accent"
    },
    { id: 2, title: "Projekt 2", desc: "Oczekiwanie na prompt...", path: "#", status: "Wkrótce", color: "bg-gray-200" },
    { id: 3, title: "Projekt 3", desc: "Oczekiwanie na prompt...", path: "#", status: "Wkrótce", color: "bg-gray-200" },
    { id: 4, title: "Projekt 4", desc: "Oczekiwanie na prompt...", path: "#", status: "Wkrótce", color: "bg-gray-200" },
    { id: 5, title: "Projekt 5", desc: "Oczekiwanie na prompt...", path: "#", status: "Wkrótce", color: "bg-gray-200" },
    { id: 6, title: "Projekt 6", desc: "Oczekiwanie na prompt...", path: "#", status: "Wkrótce", color: "bg-gray-200" },
  ];

  return (
    <main className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-bold mb-6"
          >
            <Globe size={16} /> PORTFOLIO ANTIGRAVITY
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-outfit mb-6"
          >
            6 Projektów Premium
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-gray max-w-2xl mx-auto"
          >
            Eksperymentalna seria stron wizytówek zbudowana w oparciu o system designu Antigravity. Wybierz projekt, aby zobaczyć szczegóły.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-card overflow-hidden shadow-premium group flex flex-col h-full"
            >
              <div className={`h-48 ${p.color} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/5" />
                <Layout className="text-white/20 w-32 h-32 absolute -bottom-8 -right-8 rotate-12" />
                {p.status === "Ukończony" ? (
                   <Monitor className="text-white w-16 h-16 relative z-10" />
                ) : (
                   <Globe className="text-white/50 w-16 h-16 relative z-10" />
                )}
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.status === 'Ukończony' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {p.status}
                  </span>
                  <span className="text-gray-300 font-bold text-lg">0{p.id}</span>
                </div>
                <h3 className="text-2xl font-bold font-outfit mb-4 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="text-text-gray mb-8 flex-grow">{p.desc}</p>
                <Link 
                  href={p.path}
                  className={`flex items-center justify-between w-full p-4 rounded-xl font-bold transition-all ${p.status === 'Ukończony' ? 'bg-accent text-white hover:shadow-lg' : 'bg-gray-50 text-gray-400 pointer-events-none'}`}
                >
                  Zobacz projekt
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-32 text-center text-text-gray">
          <p className="flex items-center justify-center gap-2">
            Zbudowano z <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="text-accent-soft">❤</motion.span> przez Antigravity
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Hub;
