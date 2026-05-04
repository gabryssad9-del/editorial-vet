'use client';

import { LazyMotion, domMax } from 'framer-motion';

const loadFeatures = () => import('framer-motion').then(mod => mod.domMax);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
