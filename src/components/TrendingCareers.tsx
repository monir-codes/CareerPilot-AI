"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, DollarSign, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export const TrendingCareers = () => {
  const [careers, setCareers] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/careers?limit=4');
        const data = await res.json();
        if (data.success) {
          setCareers(data.data.careers || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCareers();
  }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Trending Careers</h2>
              <p className="text-xl text-slate-500 max-w-2xl">Explore the most in-demand roles right now.</p>
            </div>
            <Link href="/explore" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col bg-white dark:bg-[#09090b] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 h-[450px] animate-pulse">
                <div className="h-48 bg-slate-200 dark:bg-slate-800" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-6" />
                  <div className="mt-auto space-y-3">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            careers.map((career, idx) => (
              <ScrollReveal key={career._id} delay={idx * 0.1}>
                <Link href={`/career/${career._id}`} className="flex flex-col bg-white dark:bg-[#09090b] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-[450px]">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-bold rounded-md uppercase tracking-wider">{career.category}</div>
                    <Image src={career.image || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2342'} alt={career.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{career.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{career.description}</p>
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"><Briefcase className="w-4 h-4 text-indigo-500"/> {career.exp}</div>
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"><DollarSign className="w-4 h-4 text-emerald-500"/> {career.salary}</div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-primary font-bold">
                      <span>View Details</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
