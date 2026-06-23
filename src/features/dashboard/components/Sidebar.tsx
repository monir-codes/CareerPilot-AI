"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, User, Bot, MessageSquare, Compass, Users } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '@/components/Logo';

export const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  
  const links = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'My Resume', href: '/dashboard/resume', icon: FileText },
    { name: 'Career Roadmaps', href: '/dashboard/roadmaps', icon: Compass },
    { name: 'Mock Interviews', href: '/dashboard/interviews', icon: Users },
    { name: 'AI Chatbot', href: '/dashboard/ai-chat', icon: MessageSquare },
    { name: 'AI History', href: '/dashboard/ai-history', icon: Bot },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-full bg-white dark:bg-background border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <Logo href="/" />
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={onNavigate}
              className={clsx(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all",
                isActive 
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-primary dark:text-indigo-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" /> {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
