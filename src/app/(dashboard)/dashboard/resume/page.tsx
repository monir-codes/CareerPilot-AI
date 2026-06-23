"use client";
import { useState } from 'react';
import { FileText, UploadCloud, CheckCircle2, AlertCircle, Loader2, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export default function ResumePage() {
  const { getToken, userId } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    setCoverLetter(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = await getToken();
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/ai/resume/analyze', {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'x-test-user-id': userId || ''
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        toast.success('Resume analyzed successfully!');
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
      toast.error(err.message || 'Network error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setIsGeneratingCL(true);
    try {
      const token = await getToken();
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/ai/cover-letter/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-test-user-id': userId || ''
        },
        body: JSON.stringify({ resumeSummary: result.summary, targetRole: 'General Application' }),
      });
      const data = await res.json();
      if (data.success) {
        setCoverLetter(data.data.coverLetter);
        toast.success('Cover letter generated!');
      } else {
        toast.error(data.message || 'Generation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate cover letter');
    } finally {
      setIsGeneratingCL(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">AI Resume Analyzer</h1>
      
      {!result ? (
        <div className="bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-16 text-center shadow-sm">
          <div className="max-w-xl mx-auto">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Upload your resume</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Upload your PDF or DOCX file. Our Gemini-powered AI will analyze your formatting, parse your experience, and generate a competitive ATS score.
            </p>
            
            <div className="flex flex-col gap-4 items-center">
              <label className="cursor-pointer relative group">
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <div className="px-8 py-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 group-hover:border-primary group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-all text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {file ? file.name : "Click to browse files"}
                </div>
              </label>
              
              <button 
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</> : 'Start Analysis'}
              </button>

              {error && <p className="text-red-500 mt-4 text-sm font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4"/> {error}</p>}
            </div>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-sm">
              <h3 className="text-lg font-bold text-slate-500 mb-4">ATS Match Score</h3>
              <div className="text-6xl font-black text-primary mb-2">{result.score || 85}</div>
              <p className="text-sm text-slate-400 font-medium">Out of 100</p>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-3xl p-6 text-center">
               <PenTool className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
               <h3 className="font-bold mb-2">Need a Cover Letter?</h3>
               <p className="text-xs text-slate-500 mb-4">Use your resume's parsed data to automatically generate a tailored cover letter.</p>
               <button 
                 onClick={handleGenerateCoverLetter} 
                 disabled={isGeneratingCL}
                 className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm"
               >
                 {isGeneratingCL ? <><Loader2 className="w-4 h-4 animate-spin"/> Generating</> : 'Auto-Generate'}
               </button>
            </div>

            <button onClick={() => {setResult(null); setFile(null); setCoverLetter(null);}} className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl font-bold transition-colors">
              Analyze Another Resume
            </button>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Executive Summary</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{result.summary || "Your resume demonstrates strong technical capabilities but lacks quantifiable metrics in recent roles."}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Strengths</h3>
                  <ul className="space-y-3">
                    {(result.strengths || []).map((s: string, i: number) => (
                      <li key={i} className="text-slate-600 dark:text-slate-400 text-sm font-medium p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg border border-emerald-100 dark:border-emerald-900/30">{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-amber-500"/> Areas for Improvement</h3>
                  <ul className="space-y-3">
                    {(result.weaknesses || result.missingSkills || []).map((s: string, i: number) => (
                      <li key={i} className="text-slate-600 dark:text-slate-400 text-sm font-medium p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {coverLetter && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                 <h2 className="text-2xl font-bold mb-6">Generated Cover Letter</h2>
                 <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed text-sm">
                   {coverLetter}
                 </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
