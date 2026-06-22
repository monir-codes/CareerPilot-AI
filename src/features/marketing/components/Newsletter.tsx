export const Newsletter = () => {
  return (
    <section className="py-24 px-4 bg-indigo-600 text-white">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Stay updated</h2>
        <p className="mb-8 text-indigo-100">Get the latest career tips and AI features delivered to your inbox.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input type="email" placeholder="Enter your email" className="px-4 py-3 rounded-lg text-slate-900 w-full sm:w-auto flex-1 focus:outline-none" />
          <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition">Subscribe</button>
        </form>
      </div>
    </section>
  );
};
