import Link from 'next/link';

export const CTA = () => {
  return (
    <section className="py-32 px-4 text-center">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to accelerate?</h2>
      <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">Join thousands of professionals securing their future with AI.</p>
      <Link href="/sign-up" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg">
        Start Free Trial
      </Link>
    </section>
  );
};
