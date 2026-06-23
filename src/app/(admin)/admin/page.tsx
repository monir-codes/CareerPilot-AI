import { AdminCharts } from '@/features/admin/components/AdminCharts';
import { Users, FileText, Target, Activity } from 'lucide-react';

export const metadata = { title: 'Admin Overview | CareerPilot AI' };

export default function AdminDashboardPage() {
  const kpis = [
    { title: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-500' },
    { title: 'Resume Analyses', value: '45,210', icon: FileText, color: 'text-indigo-500' },
    { title: 'AI Usage Count', value: '1.2M', icon: Target, color: 'text-purple-500' },
    { title: 'Daily Active Users', value: '3,842', icon: Activity, color: 'text-emerald-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-slate-500 mt-2">High-level platform metrics and revenue KPIs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(k => (
          <div key={k.title} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-slate-500 text-sm font-medium mb-1">{k.title}</div>
              <div className="text-3xl font-bold">{k.value}</div>
            </div>
            <div className={`p-3 bg-slate-50 dark:bg-slate-950 rounded-lg ${k.color}`}>
              <k.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <AdminCharts />
    </div>
  );
}
