"use client";
import { useState } from 'react';
import { Video, Loader2, Send } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function InterviewsPage() {
  const { getToken, userId } = useAuth();
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!role.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/ai/interview/questions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-test-user-id': userId || ''
        },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if(data.success) {
        setQuestions(data.data.questions || []);
        toast.success('Interview questions generated successfully!');
      } else {
        throw new Error(data.message || 'Failed to generate questions');
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
      <h1 className="text-3xl font-bold tracking-tight">AI Mock Interviews</h1>
      
      {!questions ? (
        <div className="bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-16 text-center shadow-sm">
          <div className="max-w-xl mx-auto">
             <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Prepare for your next interview</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Enter the specific role you are applying for. Our AI will generate hyper-targeted technical and behavioral questions with expected key points.
            </p>
            
            <form onSubmit={generateQuestions} className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="text" 
                 value={role}
                 onChange={e => setRole(e.target.value)}
                 placeholder="e.g. Senior React Developer" 
                 className="flex-1 w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
               />
               <button 
                 type="submit"
                 disabled={isLoading || !role}
                 className="w-full sm:w-auto px-6 py-4 bg-primary text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 transition hover:bg-primary-hover sm:shrink-0"
               >
                 {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate'}
               </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold">Interview Questions for: <span className="text-primary break-all">{role}</span></h2>
              <button onClick={() => setQuestions(null)} className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">Start Over</button>
           </div>
           
           <div className="grid gap-6">
             {questions.map((q, idx) => (
                <div key={idx} className="bg-white dark:bg-[#09090b] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                   <h3 className="text-lg font-bold mb-4 flex items-start gap-3">
                     <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center shrink-0">{idx + 1}</span>
                     {q.question}
                   </h3>
                   <div className="pl-11">
                     <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Expected Key Points</p>
                     <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                        {q.expectedKeyPoints?.map((pt: string, i: number) => <li key={i}>{pt}</li>)}
                     </ul>
                   </div>
                </div>
             ))}
           </div>
        </motion.div>
      )}
    </div>
  );
}
