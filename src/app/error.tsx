"use client";
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error('Captured by Next.js Error Boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <AlertTriangle className="w-16 h-16 text-rose-500 mb-6" />
      <h1 className="text-3xl font-bold tracking-tight mb-2">Something went wrong!</h1>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        We encountered an unexpected error while rendering this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => window.location.href = '/'} 
          className="px-6 py-3 border border-slate-200 dark:border-slate-800 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition"
        >
          Go Home
        </button>
        <button 
          onClick={() => reset()} 
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
