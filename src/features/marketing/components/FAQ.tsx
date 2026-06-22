export const FAQ = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h3 className="font-bold">Is it free to use?</h3>
            <p className="text-slate-500 mt-2">We offer a generous free tier with premium options available.</p>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <h3 className="font-bold">How does the mock interview work?</h3>
            <p className="text-slate-500 mt-2">You speak directly to our AI which analyzes your audio and answers in real-time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
