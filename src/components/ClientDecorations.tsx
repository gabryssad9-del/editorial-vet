'use client';

import dynamic from 'next/dynamic';

const CursorGlow = dynamic(() => import('./Decorations').then(mod => mod.CursorGlow), { ssr: false });
const PawBackground = dynamic(() => import('./Decorations').then(mod => mod.PawBackground), { ssr: false });

export function ClientDecorations() {
  return (
    <>
      <CursorGlow />
      <PawBackground />
    </>
  );
}
