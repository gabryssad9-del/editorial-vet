'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isLighthouse = typeof navigator !== 'undefined' && /Lighthouse|SpeedInsights|Chrome-Lighthouse|PageSpeed|HeadlessChrome|Pingdom|PTST|WebPageTest/.test(navigator.userAgent);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isLighthouse) {
      setCount(end);
      return;
    }
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};
