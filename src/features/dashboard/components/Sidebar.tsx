"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, User, Bot, MessageSquare, Compass, Users } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '@/components/Logo';

import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const { getToken, userId } = useAuth();
  const [role, setRole] = useState<string>('USER');
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = null;
        try { token = await getToken(); } catch (_) {}
        
        if (!token && !userId) return;

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (userId) headers['x-test-user-id'] = userId;

        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/users/profile', { headers });
        const data = await res.json();
        if (data.success && data.data) {
          setRole(data.data.role || 'USER');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [getToken, userId]);
  
  const userLinks = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'My Resume', href: '/dashboard/resume', icon: FileText },
    { name: 'Career Roadmaps', href: '/dashboard/roadmaps', icon: Compass },
    { name: 'Mock Interviews', href: '/dashboard/interviews', icon: Users },
    { name: 'AI Chatbot', href: '/dashboard/ai-chat', icon: MessageSquare },
    { name: 'AI History', href: '/dashboard/ai-history', icon: Bot },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Career Management', href: '/dashboard/admin/careers', icon: FileText },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: Compass },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const links = role === 'ADMIN' ? adminLinks : userLinks;

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
