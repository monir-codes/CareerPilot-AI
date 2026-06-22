"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">C</div>
          <span className="text-xl font-bold tracking-tight">CareerPilot AI</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/explore" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Explore</Link>
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About</Link>
          <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/sign-in" className="text-sm font-medium hover:text-indigo-600 transition">Log in</Link>
              <Link href="/sign-up" className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition">Sign up</Link>
            </div>
          )}
          <button className="md:hidden p-2"><Menu className="h-6 w-6" /></button>
        </div>
      </div>
    </nav>
  );
};
