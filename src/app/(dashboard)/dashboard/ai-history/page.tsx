"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { EmptyState } from '@/components/EmptyState';
import { Bot, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';

type HistoryItem = {
  id: string;
  title: string;
  type: string;
  topic?: string;
  details?: string;
  date: string;
  messageCount: number;
};

export default function AIHistoryPage() {
  const { getToken, userId } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let token = null;
        try { token = await getToken(); } catch(e) {}
        
        if (!token && !userId) return;

        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (userId) headers['x-test-user-id'] = userId;

        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/ai-history', { headers });
        const data = await res.json();
        if (data.success) {
          setHistory(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [getToken, userId]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading history...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">AI History</h1>
      
      {history.length === 0 ? (
        <EmptyState 
          icon={Bot} 
          title="No AI conversations yet" 
          description="All your interactions with the AI will be saved here." 
          actionLabel="Start a new chat"
          actionHref="/dashboard/ai-chat"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {history.map((item) => (
            <Link key={item.id} href="/dashboard/ai-chat" className="block p-6 bg-white dark:bg-[#09090b] border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                  {item.topic || item.type}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1 truncate">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{item.details}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(item.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {item.messageCount} msgs</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
