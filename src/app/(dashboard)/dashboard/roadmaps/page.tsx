"use client";
import { useState } from 'react';
import { Compass, Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function RoadmapsPage() {
  const { getToken, userId } = useAuth();
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const generateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!currentRole.trim() || !targetRole.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/ai/roadmap/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-test-user-id': userId || ''
        },
        body: JSON.stringify({ currentRole, targetRole }),
      });
      const data = await res.json();
      if(data.success) {
        setRoadmap(data.data);
        toast.success('Roadmap generated successfully!');
      } else {
        throw new Error(data.message || 'Failed to generate roadmap');
      }
    } catch(err: any) {
      setError(err.message || "An error occurred");
      toast.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Career Roadmaps</h1>
      
      {!roadmap ? (
        <div className="bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-16 text-center shadow-sm">
          <div className="max-w-xl mx-auto">
             <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Generate your path</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Define your starting point and destination. Gemini AI will construct a milestone-driven timeline to bridge your skills gap.
            </p>
            
            <form onSubmit={generateRoadmap} className="flex flex-col gap-4">
               <input 
                 type="text" 
                 value={currentRole}
                 onChange={e => setCurrentRole(e.target.value)}
                 placeholder="Current Role (e.g. Student, Junior Dev)" 
                 className="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
               />
               <input 
                 type="text" 
                 value={targetRole}
                 onChange={e => setTargetRole(e.target.value)}
                 placeholder="Target Role (e.g. Data Scientist)" 
                 className="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
               />
               <button 
                 type="submit"
                 disabled={isLoading || !currentRole || !targetRole}
                 className="w-full py-4 bg-primary text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 transition hover:bg-primary-hover"
               >
                 {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Build Roadmap'}
               </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
           <div className="flex justify-between items-center bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-500">From <span className="text-slate-900 dark:text-white">{currentRole}</span> to <span className="text-primary">{targetRole}</span></h2>
              </div>
              <button onClick={() => setRoadmap(null)} className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">Reset</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#09090b] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-lg mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Weekly & Monthly Goals</h3>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-indigo-500 uppercase">Short Term</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                     {(roadmap.weeklyGoals || []).map((g: string, i: number) => <li key={i}>{g}</li>)}
                  </ul>
                  <h4 className="text-sm font-bold text-indigo-500 uppercase mt-6">Long Term</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                     {(roadmap.monthlyGoals || []).map((g: string, i: number) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#09090b] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Key Projects</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                     {(roadmap.projects || []).map((g: string, i: number) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
                <div className="bg-white dark:bg-[#09090b] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Learning Resources</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                     {(roadmap.learningResources || []).map((g: string, i: number) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
              </div>
           </div>
        </motion.div>
      )}
    </div>
  );
}
