"use client";
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useCareers } from '../hooks/useCareers';
import { CareerCard } from './CareerCard';
import { FilterSidebar } from './FilterSidebar';
import { Search, Loader2 } from 'lucide-react';

export const ExploreClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [filters, setFilters] = useState({});

  const { data, isLoading, isError } = useCareers({ search: debouncedSearch, ...filters });

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      
      <div className="flex-1">
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search careers, skills, companies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
          </div>
          <select className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none">
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Highest Salary</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-12">Failed to load careers. Please try again.</div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-2">No careers found</h3>
            <p className="text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {data?.data?.map((career: any) => (
              <CareerCard key={career._id} career={career} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
