"use client";
import { useCareerDetails } from '../hooks/useCareers';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const CareerDetailsClient = ({ id }: { id: string }) => {
  const { data: career, isLoading, isError } = useCareerDetails(id);

  if (isLoading) return <div className="flex justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
  if (isError || !career) return <div className="text-center text-red-500 py-32">Career not found.</div>;

  return (
    <div className="min-h-screen pb-32">
      <div className="bg-slate-900 text-white pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <Link href="/explore" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to explore
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{career.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl">{career.description}</p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/30 to-transparent blur-3xl -z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 -mt-16 relative z-20 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'System Design', 'Agile'].map(s => (
                <span key={s} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-4">AI Learning Roadmap</h2>
            <p className="text-slate-500 mb-4">Sign in to generate a personalized roadmap based on your current resume.</p>
            <div className="h-48 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
              <Link href="/sign-up" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700">Unlock Full Roadmap</Link>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-96 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-6">Salary Insights</h3>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Average Base</span>
                <span className="font-bold">${career.salary.min / 1000}k - ${career.salary.max / 1000}k</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Location</span>
                <span className="font-bold">{career.location}</span>
              </div>
            </div>
            <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition">
              Apply via CareerPilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
