"use client";
import { UserButton } from '@clerk/nextjs';
import { Search } from 'lucide-react';

export const AdminTopbar = () => {
  return (
    <div className="h-16 shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shadow-sm">
      <div className="relative w-64 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Global Search..." className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-950 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm font-semibold hidden sm:inline-block">System Administrator</span>
        <UserButton />
      </div>
    </div>
  );
};
