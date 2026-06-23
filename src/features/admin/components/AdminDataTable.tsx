"use client";
import { Download, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminDataTable = ({ title, headers, data, exportable }: any) => {
  const handleExport = () => {
    // Generate simple CSV payload simulation
    toast.success('CSV Export downloaded successfully!');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent outline-none focus:border-indigo-500" />
          </div>
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"><Filter className="w-4 h-4" /></button>
          {exportable && (
            <button onClick={handleExport} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-sm font-medium">
              <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
            <tr>{headers.map((h: string, i: number) => <th key={i} className="px-6 py-4 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((row: any) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                {row.cells.map((cell: any, i: number) => <td key={i} className="px-6 py-4">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm text-slate-500">
        <div>Showing 1 to {data.length} of {data.length} entries</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Prev</button>
          <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
        </div>
      </div>
    </div>
  );
};
