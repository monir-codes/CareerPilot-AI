"use client";
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ children, variant = 'primary', size = 'md', href, onClick, className }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700",
    outline: "border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900",
    ghost: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
  };

  const sizes = {
    sm: "h-9 px-4 rounded-lg text-sm",
    md: "h-11 px-6 rounded-xl text-base",
    lg: "h-14 px-8 rounded-2xl text-lg"
  };

  const combinedClassName = clsx(baseStyles, variants[variant], sizes[size], className);

  const MotionWrapper = href ? motion.create(Link) : motion.button;

  return (
    <MotionWrapper
      href={href as string}
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </MotionWrapper>
  );
};
