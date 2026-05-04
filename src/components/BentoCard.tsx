'use client';
import React from 'react';
import { motion as m } from 'framer-motion';

export const BentoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 overflow-hidden group transition-all duration-700 hover:shadow-premium border border-border ${className}`}
  >
    {children}
  </m.div>
);
