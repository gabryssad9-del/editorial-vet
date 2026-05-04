'use client';

import dynamic from 'next/dynamic';

const PawBackground = dynamic(() => import('./Decorations').then(mod => mod.PawBackground), { ssr: false });

export function ClientDecorations() {
  return (
    <>
      <PawBackground />
    </>
  );
}
