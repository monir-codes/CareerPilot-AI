export const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">Loved By Many</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl text-left border border-slate-200 dark:border-slate-800">
            <p className="italic text-slate-600 dark:text-slate-300">&quot;CareerPilot AI completely transformed how I approached my job search. The mock interviews were incredibly realistic.&quot;</p>
            <div className="mt-4 font-bold">- Sarah J., UX Designer</div>
          </div>
          <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl text-left border border-slate-200 dark:border-slate-800">
            <p className="italic text-slate-600 dark:text-slate-300">&quot;The resume ATS scanner caught issues I never would have noticed. Landed a FAANG role in 2 months!&quot;</p>
            <div className="mt-4 font-bold">- Mark T., Software Engineer</div>
          </div>
        </div>
      </div>
    </section>
  );
};
