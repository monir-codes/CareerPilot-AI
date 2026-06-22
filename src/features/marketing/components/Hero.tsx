"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 flex flex-col items-center text-center px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950"></div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400"
      >
        Navigate Your Career With <span className="text-indigo-600 dark:text-indigo-400">AI Precision</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl"
      >
        Get personalized career paths, AI resume analysis, and mock interviews tailored to your exact industry and goals.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <Link href="/sign-up" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-600/20">
          Get Started for Free
        </Link>
        <Link href="/explore" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          Explore Features
        </Link>
      </motion.div>
    </section>
  );
};
