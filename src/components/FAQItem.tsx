'use client';
import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronDown, LucideIcon } from 'lucide-react';

export const FAQItem = ({ question, answer, icon: Icon }: { question: string, answer: string, icon: LucideIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
             <Icon size={20} />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight">{question}</span>
        </div>
        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-accent"
        >
          <ChevronDown />
        </m.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg text-text-gray font-medium opacity-70 leading-relaxed max-w-3xl pl-[4.5rem]">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
