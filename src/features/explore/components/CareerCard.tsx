"use client";
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Star, Briefcase, DollarSign } from 'lucide-react';
import Link from 'next/link';

export const CareerCard = ({ career }: { career: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col h-full bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 w-full relative">
        <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm transition">
          <Bookmark className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{career.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
          {career.description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
            <DollarSign className="w-3 h-3" /> ${career.salary.min / 1000}k - ${career.salary.max / 1000}k
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
            <Briefcase className="w-3 h-3" /> {career.experienceLevel}
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
            <MapPin className="w-3 h-3" /> {career.isRemote ? 'Remote' : career.location}
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
            <Star className="w-3 h-3 text-yellow-500" /> {career.rating}
          </span>
        </div>
        <Link 
          href={`/career/${career._id}`}
          className="w-full text-center py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};
