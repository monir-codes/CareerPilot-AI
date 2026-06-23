import { Bell, Lock, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Account Settings</h1>
      
      <div className="space-y-4">
        {/* Settings Block */}
        <div className="bg-white dark:bg-[#09090b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl"><Bell className="w-6 h-6 text-slate-600 dark:text-slate-400" /></div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">Email Notifications</h3>
            <p className="text-slate-500 text-sm mb-4">Manage alerts for new interview suggestions and roadmap updates.</p>
            <button className="text-sm font-semibold px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">Configure</button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#09090b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl"><Shield className="w-6 h-6 text-slate-600 dark:text-slate-400" /></div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">Security & RBAC</h3>
            <p className="text-slate-500 text-sm mb-4">Your account is secured via Clerk authentication protocols.</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">Active Secure Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
