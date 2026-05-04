'use client';
import { motion as m, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useEffect, useState } from 'react';

export const CursorGlow = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Check if we're on desktop
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    let handleMouseMove: (e: MouseEvent) => void;
    
    if (window.innerWidth >= 1024) {
      handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  if (!isDesktop) return null;

  return (
    <m.div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-30 transform-gpu"
      style={{
        background: useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(254,69,32,0.15), transparent 80%)`,
        willChange: "background"
      }}
    />
  );
};

export const PawBackground = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  if (!isDesktop) return null;

  const paws = [
    { id: 1, left: "5%", top: "15%", rotate: 15, scale: 1.2 },
    { id: 2, left: "85%", top: "10%", rotate: -20, scale: 0.8 },
    { id: 3, left: "45%", top: "5%", rotate: 45, scale: 0.6 },
    { id: 4, left: "15%", top: "45%", rotate: 110, scale: 1.1 },
    { id: 5, left: "75%", top: "55%", rotate: -45, scale: 0.9 },
    { id: 6, left: "35%", top: "75%", rotate: 180, scale: 1.3 },
    { id: 7, left: "90%", top: "85%", rotate: 30, scale: 0.7 },
    { id: 8, left: "10%", top: "90%", rotate: -15, scale: 1.0 },
    { id: 9, left: "55%", top: "35%", rotate: 60, scale: 0.5 },
    { id: 10, left: "25%", top: "25%", rotate: -90, scale: 0.8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
      {paws.map((paw) => (
        <m.div
          key={paw.id}
          initial={{ rotate: paw.rotate, scale: paw.scale }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [paw.rotate, paw.rotate + 10, paw.rotate]
          }}
          transition={{ 
            duration: 8 + paw.id, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute will-change-transform transform-gpu"
          style={{ 
            left: paw.left, 
            top: paw.top, 
            color: '#FE4520',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <svg width="70" height="70" viewBox="0 0 48.839 48.839" fill="currentColor" style={{ display: 'block' }}>
            <path d="M39.041,36.843c2.054,3.234,3.022,4.951,3.022,6.742c0,3.537-2.627,5.252-6.166,5.252
              c-1.56,0-2.567-0.002-5.112-1.326c0,0-1.649-1.509-5.508-1.354c-3.895-0.154-5.545,1.373-5.545,1.373
              c-2.545,1.323-3.516,1.309-5.074,1.309c-3.539,0-6.168-1.713-6.168-5.252c0-1.791,0.971-3.506,3.024-6.742
              c0,0,3.881-6.445,7.244-9.477c2.43-2.188,5.973-2.18,5.973-2.18h1.093v-0.001c0,0,3.698-0.009,5.976,2.181
              C35.059,30.51,39.041,36.844,39.041,36.843z M16.631,20.878c3.7,0,6.699-4.674,6.699-10.439S20.331,0,16.631,0
              S9.932,4.674,9.932,10.439S12.931,20.878,16.631,20.878z M10.211,30.988c2.727-1.259,3.349-5.723,1.388-9.971
              s-5.761-6.672-8.488-5.414s-3.348,5.723-1.388,9.971C3.684,29.822,7.484,32.245,10.211,30.988z M32.206,20.878
              c3.7,0,6.7-4.674,6.7-10.439S35.906,0,32.206,0s-6.699,4.674-6.699,10.439C25.507,16.204,28.506,20.878,32.206,20.878z
               M45.727,15.602c-2.728-1.259-6.527,1.165-8.488,5.414s-1.339,8.713,1.389,9.972c2.728,1.258,6.527-1.166,8.488-5.414
              S48.455,16.861,45.727,15.602z"/>
          </svg>
        </m.div>
      ))}
    </div>
  );
};
