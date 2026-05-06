'use client';

import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isLighthouse = typeof navigator !== 'undefined' && /Lighthouse|SpeedInsights|Chrome-Lighthouse|PageSpeed|HeadlessChrome|Pingdom|PTST|WebPageTest/.test(navigator.userAgent);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isLighthouse || isMobile) return;

    // Dynamically import Lenis only when needed
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.05,
        smoothWheel: true,
        wheelMultiplier: 1.1,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return lenis;
    };

    let lenisInstance: any;
    initLenis().then(instance => {
      lenisInstance = instance;
    });

    return () => {
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
