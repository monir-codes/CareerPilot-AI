export const FilterSidebar = ({ filters, setFilters }: { filters: Record<string, any>, setFilters: (f: Record<string, any>) => void }) => {
  return (
    <div className="w-64 shrink-0 hidden lg:block border-r border-slate-200 dark:border-slate-800 pr-6 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto">
      <h3 className="font-bold text-lg mb-6">Filters</h3>
      <div className="mb-6">
        <label className="text-sm font-semibold mb-2 block text-slate-700 dark:text-slate-300">Category</label>
        <select 
          className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent rounded-lg px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          value={filters.category || ''}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Design">Design</option>
        </select>
      </div>
      {/* Additional filters (Experience, Salary, Location) would go here following the same pattern */}
      <button 
        onClick={() => setFilters({})}
        className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );
};
