'use client';
import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PhoneCardTooltipProps {
  children: React.ReactNode;
  className?: string;
  phone?: string;
  displayPhone?: string;
  align?: 'left' | 'right';
}

export const PhoneCardTooltip = ({ 
  children, 
  className, 
  phone = "519 619 141", 
  displayPhone = "519 619 141",
  align = 'right'
}: PhoneCardTooltipProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(prev => !prev)}
        className={cn("cursor-pointer", className)}
        aria-label="Pokaż numer telefonu"
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={cn(
              "absolute top-full mt-4 w-72 bg-card-bg/95 backdrop-blur-2xl border border-accent/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-6 z-[200]",
              align === 'right' 
                ? "left-1/2 -translate-x-1/2 md:left-auto md:right-0" 
                : "left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
            )}
          >
            {/* Arrow */}
            <div className={cn(
              "absolute -top-2 w-4 h-4 bg-card-bg border-l border-t border-accent/20 rotate-45 rounded-sm",
              align === 'right'
                ? "left-1/2 -translate-x-1/2 md:left-auto md:right-4"
                : "left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0"
            )} />

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-1">
                <Phone size={22} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Recepcja VETMED</p>
              <p className="text-3xl font-black font-outfit tracking-tight text-foreground leading-none">{displayPhone}</p>
              <p className="text-xs text-text-gray font-medium opacity-70 leading-relaxed">
                Zapraszamy do kontaktu.<br />Pon–Pt: 8:00–18:00
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
