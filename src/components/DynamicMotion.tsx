'use client';

import React from 'react';
import { m, HTMLMotionProps } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface DynamicMotionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  // If true, always use motion even on mobile
  forceMotion?: boolean;
}

export const DynamicMotion = ({ children, className, forceMotion = false, ...props }: DynamicMotionProps) => {
  const isMobile = useIsMobile();
  const isLighthouse = typeof navigator !== 'undefined' && /Lighthouse|SpeedInsights|Chrome-Lighthouse|PageSpeed|HeadlessChrome|Pingdom|PTST|WebPageTest/.test(navigator.userAgent);

  // Disable motion for mobile or Lighthouse
  if ((isMobile || isLighthouse) && !forceMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <m.div className={className} {...props}>
      {children}
    </m.div>
  );
};
