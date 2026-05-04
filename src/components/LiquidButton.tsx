'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Link from 'next/link';

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark";
  onClick?: () => void;
  href?: string;
}

export const LiquidButton = ({ children, className, variant = "primary", onClick, href }: LiquidButtonProps) => {
  const innerContent = (
    <>
      <span className={cn(
        "relative z-10 flex items-center justify-center gap-3 transition-colors duration-500",
        variant === "primary" || variant === "dark" ? "group-hover/btn:text-white" : "group-hover/btn:text-white"
      )}>
        {children}
      </span>
      <div className={cn(
        "absolute inset-0 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        variant === "primary" ? "bg-accent-hover" : "bg-accent"
      )} />
    </>
  );

  const baseClasses = cn(
    "relative group/btn px-10 py-5 rounded-full font-black overflow-hidden transition-all duration-500 inline-block",
    variant === "primary" ? "bg-accent text-white" : variant === "secondary" ? "bg-card-bg text-foreground border-2 border-foreground/10" : "bg-black dark:bg-white text-white dark:text-black",
    className
  );

  if (href) {
    if (href.startsWith('http') || href.startsWith('tel:')) {
      return (
        <a href={href} className={baseClasses} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}>
          {innerContent}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={baseClasses}
    >
      {innerContent}
    </button>
  );
};
