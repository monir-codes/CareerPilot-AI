import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-full mb-8">
        <Compass className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h1 className="text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        We couldn't find the page you're looking for. The route might have been removed, or the link is incorrect.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
