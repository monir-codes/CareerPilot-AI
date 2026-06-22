export const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 text-left relative">
          {[
            { step: '1', title: 'Sign Up', desc: 'Create your profile and state your goals.' },
            { step: '2', title: 'Upload Resume', desc: 'Our AI analyzes your current standing.' },
            { step: '3', title: 'Get Mentored', desc: 'Follow personalized steps and practice interviews.' }
          ].map((s) => (
            <div key={s.step} className="flex-1 relative z-10 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="h-10 w-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-4">{s.step}</div>
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
