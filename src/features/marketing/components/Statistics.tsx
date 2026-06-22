export const Statistics = () => {
  return (
    <section className="py-20 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
        <div><div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">10k+</div><div className="text-slate-500 text-sm mt-2">Active Users</div></div>
        <div><div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">50k+</div><div className="text-slate-500 text-sm mt-2">Resumes Analyzed</div></div>
        <div><div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">95%</div><div className="text-slate-500 text-sm mt-2">Interview Success</div></div>
        <div><div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">24/7</div><div className="text-slate-500 text-sm mt-2">AI Availability</div></div>
      </div>
    </section>
  );
};
