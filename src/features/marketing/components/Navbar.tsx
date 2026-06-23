"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { UserButton, useUser } from '@clerk/nextjs';
import clsx from 'clsx';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className={clsx(
      "sticky top-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-white/80 dark:bg-background/80 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm" : "bg-transparent border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <ThemeToggle />
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Button href="/dashboard" variant="ghost" size="sm">Dashboard</Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/sign-in" className="text-sm font-medium hover:text-primary transition-colors">Log in</Link>
                <Button href="/sign-up" size="sm">Get Started</Button>
              </div>
            )}
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-background border-b border-slate-200 dark:border-slate-800 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
          {isSignedIn ? (
            <Link href="/dashboard" className="text-lg font-medium text-primary p-2">Go to Dashboard</Link>
          ) : (
            <div className="flex flex-col gap-2">
              <Button href="/sign-in" variant="outline" size="lg">Log in</Button>
              <Button href="/sign-up" size="lg">Get Started</Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
