export const FeaturedCareerPaths = () => {
  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Popular Career Paths</h2>
        <p className="mt-4 text-slate-500 mb-12">See how others reached the top.</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {['Software Engineer', 'Product Manager', 'Data Scientist'].map((path) => (
            <div key={path} className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 transition cursor-pointer">
              <h3 className="font-bold text-lg">{path}</h3>
              <p className="text-sm text-slate-500 mt-2">View timeline & skills required →</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
