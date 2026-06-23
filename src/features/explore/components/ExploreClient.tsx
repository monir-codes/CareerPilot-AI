"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, DollarSign, Filter, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ExploreClient = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = ['All Categories', 'Engineering', 'Design', 'Product', 'Data', 'Marketing'];

  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      try {
        let url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/careers';
        const params = new URLSearchParams();
        if (selectedCategory !== 'All Categories') params.append('category', selectedCategory);
        if (searchQuery) params.append('search', searchQuery);
        
        if (params.toString()) url += `?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success) {
          setCareers(data.data);
        } else {
          throw new Error('Failed to fetch careers');
        }
      } catch (err) {
        setError('Database connection error. Ensure backend is running.');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add small debounce for search
    const timer = setTimeout(() => {
      fetchCareers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-24 pb-20">
      <div className="bg-slate-900 dark:bg-[#09090b] pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Explore Your Next Career</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Discover high-growth career paths, required skills, and expected salaries to plan your future.</p>
          
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search careers, skills, or roles..." 
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition shadow-lg">Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar mb-8">
          <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg shrink-0 mr-2 text-sm font-semibold">
            <Filter className="w-4 h-4" /> Filters
          </div>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
             <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
             <p className="text-slate-500">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : careers.length === 0 ? (
          <div className="text-center py-32">
             <h3 className="text-xl font-bold mb-2">No Careers Found</h3>
             <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career) => (
              <Link key={career._id} href={`/career/${career._id}`} className="group flex flex-col bg-white dark:bg-[#09090b] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-bold rounded-md uppercase tracking-wider">{career.category}</div>
                  <img src={career.image} alt={career.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{career.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{career.description}</p>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"><Briefcase className="w-4 h-4 text-indigo-500"/> {career.exp}</div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"><DollarSign className="w-4 h-4 text-emerald-500"/> {career.salary}</div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-primary font-bold">
                    <span>View Full Path</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
