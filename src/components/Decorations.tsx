'use client';
import { useEffect, useState } from 'react';

export const PawBackground = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
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
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute"
          style={{ 
            left: paw.left, 
            top: paw.top, 
            color: '#FE4520',
            transform: `rotate(${paw.rotate}deg) scale(${paw.scale})`
          }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
            <path d="M30,40 C35,40 40,35 40,30 C40,25 35,20 30,20 C25,20 20,25 20,30 C20,35 25,40 30,40 Z M50,30 C55,30 60,25 60,20 C60,15 55,10 50,10 C45,10 40,15 40,20 C40,25 45,30 50,30 Z M70,40 C75,40 80,35 80,30 C80,25 75,20 70,20 C65,20 60,25 60,30 C60,35 65,40 70,40 Z M50,70 C60,70 70,60 70,50 C70,40 60,35 50,35 C40,35 30,40 30,50 C30,60 40,70 50,70 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
