"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Briefcase, DollarSign, Filter, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const ExploreClient = () => {
  const [careers, setCareers] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedExp, setSelectedExp] = useState('All Levels');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['All Categories', 'Engineering', 'Design', 'Product', 'Data', 'Marketing'];
  const expLevels = ['All Levels', 'Entry', 'Mid', 'Senior'];

  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      try {
        let url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/careers';
        const params = new URLSearchParams();
        if (selectedCategory !== 'All Categories') params.append('category', selectedCategory);
        if (selectedExp !== 'All Levels') params.append('exp', selectedExp);
        if (searchQuery) params.append('search', searchQuery);
        params.append('sort', sortBy);
        params.append('page', page.toString());
        params.append('limit', '9');
        
        if (params.toString()) url += `?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success) {
          setCareers(data.data.careers);
          setTotalPages(data.data.totalPages || 1);
        } else {
          throw new Error('Failed to fetch careers');
        }
      } catch (_) {
        setError('Database connection error. Ensure backend is running.');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add small debounce for search
    const timer = setTimeout(() => {
      fetchCareers();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedExp, sortBy, page]);

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
            <Filter className="w-4 h-4" /> Category
          </div>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => { setSelectedCategory(cat); setPage(1); }}
              className={`px-5 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar mb-8">
          <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg shrink-0 mr-2 text-sm font-semibold">
            <Briefcase className="w-4 h-4" /> Experience
          </div>
          {expLevels.map((exp) => (
            <button 
              key={exp}
              onClick={() => { setSelectedExp(exp); setPage(1); }}
              className={`px-5 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${selectedExp === exp ? 'bg-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              {exp}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="text-sm font-semibold text-slate-500">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-sm font-semibold outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="latest">Latest</option>
              <option value="salary_desc">Highest Salary</option>
            </select>
          </div>
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
                  <Image src={career.image || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2342'} alt={career.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{career.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{career.description}</p>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"><Briefcase className="w-4 h-4 text-indigo-500"/> {career.exp || career.experienceLevel || 'All Levels'}</div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"><DollarSign className="w-4 h-4 text-emerald-500"/> ${career.salary?.min ? career.salary.min/1000 : 80}k - ${career.salary?.max ? career.salary.max/1000 : 120}k</div>
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

        {!isLoading && careers.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              Previous
            </button>
            <span className="text-slate-500 font-semibold text-sm">Page {page} of {totalPages}</span>
            <button 
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
