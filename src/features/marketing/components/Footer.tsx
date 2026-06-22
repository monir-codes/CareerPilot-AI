import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Product</h3>
          <ul className="space-y-2 text-slate-500 dark:text-slate-400">
            <li><Link href="/explore" className="hover:text-indigo-600 transition">Explore Paths</Link></li>
            <li><Link href="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link></li>
            <li><Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Company</h3>
          <ul className="space-y-2 text-slate-500 dark:text-slate-400">
            <li><Link href="/about" className="hover:text-indigo-600 transition">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-indigo-600 transition">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Legal</h3>
          <ul className="space-y-2 text-slate-500 dark:text-slate-400">
            <li><Link href="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-bold tracking-tight text-slate-900 dark:text-white">CareerPilot AI</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">Empowering your career journey with AI-driven insights.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} CareerPilot AI. All rights reserved.
      </div>
    </footer>
  );
};
