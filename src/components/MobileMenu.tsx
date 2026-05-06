'use client';
import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { LiquidButton } from './LiquidButton';
import { PhoneLink } from './PhoneDialog';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; href: string; isHash: boolean }>;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: any) => void;
}

export const MobileMenu = ({ isOpen, onClose, navLinks, onNavClick }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[110] bg-background lg:hidden flex flex-col p-6 pt-24 overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full text-accent"
            aria-label="Zamknij menu"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col gap-5 flex-1">
            {navLinks.map((item, i) => (
              <m.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link 
                  href={item.href}
                  onClick={(e) => {
                    onNavClick(e, item);
                    onClose();
                  }}
                  className="text-3xl font-black font-outfit tracking-tighter text-foreground hover:text-accent transition-colors flex items-center justify-between group"
                >
                  {item.name}
                  <ChevronRight size={32} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent" />
                </Link>
              </m.div>
            ))}
            
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="pt-6 border-t border-border mt-2 flex flex-col gap-3"
            >
              <LiquidButton href="https://vetmed.nakiedy.pl/" className="w-full text-sm py-4">
                Umów wizytę online
              </LiquidButton>
            </m.div>

            <div className="flex items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Heart size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-0.5">Recepcja</p>
                <PhoneLink
                  phone="+48519619141"
                  displayPhone="519 619 141"
                  className="text-xl font-black hover:text-accent transition-colors block leading-none"
                >519 619 141</PhoneLink>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
