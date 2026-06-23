import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    Product: [
      {name: 'Explore Careers', href: '/explore'}, 
      {name: 'AI Resume Analyzer', href: '/dashboard/resume'}, 
      {name: 'AI Mock Interviews', href: '/dashboard'} // Removed old invalid routes, kept in dashboard root
    ],
    Company: [
      {name: 'About Us', href: '/about'}, 
      {name: 'Blog', href: '/blog'} // Removed /careers which was conflicting
    ],
    Legal: [
      {name: 'Privacy Policy', href: '/privacy'}, 
      {name: 'Terms of Service', href: '/terms'}, 
      {name: 'Help Center', href: '/help'}
    ]
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#09090b] border-t border-slate-200 dark:border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-slate-500 max-w-sm">
              Empowering professionals with AI-driven career insights, instant resume analysis, and dynamic learning roadmaps.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-slate-500 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© {currentYear} CareerPilot AI. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
