"use client";
import { useCareerDetails } from '../hooks/useCareers';
import { Loader2, ArrowLeft, Star, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const CareerDetailsClient = ({ id }: { id: string }) => {
  const { data: career, isLoading, isError } = useCareerDetails(id);
  const [relatedCareers, setRelatedCareers] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (career?.category) {
      fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + `/api/v1/careers?category=${career.category}&limit=3`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setRelatedCareers(data.data.careers.filter((c: any) => c._id !== id).slice(0, 3));
          }
        })
        .catch(console.error);
    }
  }, [career, id]);

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
              {(career as any).skills?.length > 0 ? (career as any).skills.map((s: string) => (
                <span key={s} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full font-medium">{s}</span>
              )) : ['React', 'TypeScript', 'Node.js', 'System Design', 'Agile'].map((s: string) => (
                <span key={s} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Star className="w-6 h-6 text-yellow-500 fill-current" /> Reviews & Ratings</h2>
            <div className="space-y-6">
              {[
                { name: 'Alex Johnson', role: `Senior ${career.title}`, rating: 5, text: 'This path is highly rewarding, both intellectually and financially. The learning curve is steep but worth it.' },
                { name: 'Jamie Doe', role: `${career.title}`, rating: 4, text: 'Great work-life balance depending on the company. Keep your skills updated and you will never struggle to find a job.' }
              ].map((review, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                      <p className="text-sm text-slate-500">{review.role}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 italic flex items-start gap-2">
                    <Quote className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
                    {review.text}
                  </p>
                </div>
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

      {relatedCareers.length > 0 && (
        <div className="container mx-auto px-4 mt-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Related Careers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCareers.map((c) => (
              <Link key={c._id} href={`/career/${c._id}`} className="group flex flex-col bg-white dark:bg-[#09090b] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all h-[380px]">
                <div className="h-40 relative">
                  <Image src={c.image || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">{c.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{c.description}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-indigo-600 font-bold text-sm">
                    View Path <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
