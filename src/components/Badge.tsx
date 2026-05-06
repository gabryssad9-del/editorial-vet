'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Sparkles } from 'lucide-react';
import { DynamicMotion } from './DynamicMotion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <DynamicMotion 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "inline-flex items-center gap-2 px-6 py-2.5 bg-accent/10 text-accent rounded-full text-xs font-black uppercase tracking-widest mb-10 shadow-sm border border-accent/20 lg:backdrop-blur-sm w-fit",
      className
    )}
  >
    <Sparkles size={14} fill="currentColor" /> {children}
  </DynamicMotion>
);
