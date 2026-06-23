"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Map, FileText, Video, BookOpen, Star, Bell, Target, FileBarChart, Settings } from 'lucide-react';
import clsx from 'clsx';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Career Paths', href: '/admin/careers', icon: Map },
    { name: 'Resume Analyses', href: '/admin/resumes', icon: FileText },
    { name: 'Interview Sessions', href: '/admin/interviews', icon: Video },
    { name: 'Blogs', href: '/admin/blogs', icon: BookOpen },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
    { name: 'AI Usage Analytics', href: '/admin/analytics', icon: Target },
    { name: 'Audit Logs', href: '/admin/audit-logs', icon: FileBarChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-64 shrink-0 bg-slate-900 text-slate-300 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0 bg-slate-950">
        <span className="text-xl font-bold text-white">Admin Console</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {links.map((link) => (
          <Link 
            key={link.name} href={link.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-slate-800 hover:text-white",
              pathname === link.href && "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            <link.icon className="w-5 h-5" /> {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
