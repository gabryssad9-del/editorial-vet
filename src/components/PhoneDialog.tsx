'use client';

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';

interface PhoneDialogProps {
  phone: string;       // e.g. "+48519619141"
  displayPhone: string; // e.g. "519 619 141"
  children: React.ReactNode;
  className?: string;
}

export const PhoneLink = ({ phone, displayPhone, children, className }: PhoneDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect touch device
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setOpen(true);
    }
    // desktop: default tel: href works normally
  };

  return (
    <>
      <a
        href={`tel:${phone}`}
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Bottom Sheet */}
            <m.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-[210] bg-background rounded-t-[2.5rem] p-8 pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.3)]"
            >
              {/* Handle bar */}
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-8" />

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                  <Phone size={28} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1">Recepcja VETMED</p>
                <p className="text-3xl font-black font-outfit tracking-tighter">{displayPhone}</p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${phone}`}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-4 bg-accent text-white px-6 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(254,69,32,0.3)] active:scale-95 transition-transform"
                >
                  <Phone size={20} />
                  Zadzwoń teraz
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 text-text-gray font-bold uppercase tracking-widest text-xs"
                >
                  <X size={14} /> Anuluj
                </button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
