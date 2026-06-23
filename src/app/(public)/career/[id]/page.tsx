"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Briefcase, DollarSign, MapPin, AlertCircle, Loader2, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CareerDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [career, setCareer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchCareerAndBookmark = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        // Fetch Career
        const res = await fetch(`${url}/api/v1/careers/${id}`);
        const data = await res.json();
        if (data.success) {
          setCareer(data.data);
        } else {
          setError(true);
        }

        // Fetch Bookmark Status
        const tokenStr = localStorage.getItem('__clerk_db_jwt');
        if (tokenStr) {
           const bookmarkRes = await fetch(`${url}/api/v1/bookmarks/check/${id}`, {
             headers: { 'Authorization': `Bearer ${tokenStr}`, 'x-test-user-id': 'test_user_123' }
           });
           const bookmarkData = await bookmarkRes.json();
           if (bookmarkData.success) {
             setIsBookmarked(bookmarkData.data.bookmarked);
           }
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCareerAndBookmark();
  }, [id]);

  const toggleBookmark = async () => {
    try {
      setIsBookmarking(true);
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const tokenStr = localStorage.getItem('__clerk_db_jwt');
      
      const res = await fetch(`${url}/api/v1/bookmarks/toggle`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenStr}`, 
          'x-test-user-id': 'test_user_123' 
        },
        body: JSON.stringify({ careerId: id })
      });
      const data = await res.json();
      if (data.success) {
        setIsBookmarked(data.data.bookmarked);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBookmarking(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>;
  }

  if (error || !career) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Career Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">We couldn't find the career path you're looking for in the database.</p>
        <Button href="/explore">Return to Explore</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px]">
        <img src={career.image} alt={career.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Link href="/explore" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{career.title}</h1>
            <button 
              onClick={toggleBookmark}
              disabled={isBookmarking}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isBookmarked ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'}`}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              {isBookmarked ? 'Saved to Profile' : 'Save Career'}
            </button>
          </div>
          <div className="flex flex-wrap gap-3 text-white text-sm font-semibold tracking-wide">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg"><Briefcase className="w-4 h-4"/> {career.exp}</div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg"><DollarSign className="w-4 h-4"/> {career.salary}</div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg"><MapPin className="w-4 h-4"/> {career.location}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">About this Role</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{career.description}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Key Skills Required</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {career.skills.map((skill: string) => (
                <div key={skill} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#09090b]">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full md:w-80 shrink-0">
          <div className="sticky top-24 bg-slate-50 dark:bg-[#09090b] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center">
            <h3 className="font-bold text-2xl mb-4">Ready to start?</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">Generate a personalized weekly learning roadmap to achieve this exact role.</p>
            <Button href="/dashboard" className="w-full">
              Create Roadmap
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
