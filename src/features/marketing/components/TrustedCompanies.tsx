export const TrustedCompanies = () => {
  return (
    <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-8">Trusted by professionals at</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale dark:invert transition hover:grayscale-0 hover:opacity-100 duration-500">
          {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map((company) => (
            <div key={company} className="text-xl font-bold tracking-tighter">{company}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
