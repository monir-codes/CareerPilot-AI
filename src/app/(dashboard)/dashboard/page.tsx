"use client";
import { DashboardCard } from '@/features/dashboard/components/ui/DashboardCard';
import { OverviewCharts } from '@/features/dashboard/components/OverviewCharts';
import { Bot, MessageSquare, FileText, Activity } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { getToken, userId } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = await getToken();
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/users/overview', {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-test-user-id': userId || ''
          }
        });
        const result = await res.json();
        if (result.success) setData(result.data);
      } catch (e) {
        console.error("Failed to fetch overview", e);
      }
    };
    fetchOverview();
  }, [getToken, userId]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back! Here is your career progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Resume Score" icon={<FileText className="w-5 h-5 text-indigo-500" />} value={data ? `${data.resumeScore} / 100` : '-'} />
        <DashboardCard title="Saved Careers" icon={<Activity className="w-5 h-5 text-rose-500" />} value={data ? data.savedCareers.toString() : '-'} />
        <DashboardCard title="Total AI Chats" icon={<Bot className="w-5 h-5 text-emerald-500" />} value={data ? data.totalChats.toString() : '-'} />
        <DashboardCard title="Total Messages" icon={<MessageSquare className="w-5 h-5 text-cyan-500" />} value={data ? data.totalMessages.toString() : '-'} />
      </div>

      <OverviewCharts chartData={data?.chartData} />
    </div>
  );
}
