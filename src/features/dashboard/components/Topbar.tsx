"use client";
import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const Topbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { getToken, userId } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let token = null;
        try { token = await getToken(); } catch (_) {}
        
        if (!token && !userId) return;

        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (userId) headers['x-test-user-id'] = userId;

        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/notifications', { headers });
        const data = await res.json();
        if (data.success && data.data) {
          setUnreadCount(data.data.unreadCount || 0);
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30s polling
    return () => clearInterval(interval);
  }, [getToken, userId]);

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumb = pathSegments.length > 1 ? pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1) : 'Overview';

  return (
    <div className="h-16 shrink-0 bg-white dark:bg-background border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
          <Menu className="w-6 h-6" />
        </button>
        <div className="font-semibold text-lg">{breadcrumb}</div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {mounted && (
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}
        <button className="hidden sm:block p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500 relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-background"></span>
          )}
        </button>
        <div className="pl-2 border-l border-slate-200 dark:border-slate-800">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
