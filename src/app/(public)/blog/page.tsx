import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata = { title: 'Blog | CareerPilot AI' };

const blogPosts = [
  { id: '1', title: 'How to Beat the ATS: 5 Keyword Strategies', category: 'Resumes', author: 'Dr. Jane Smith', date: 'Jun 20, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'System Design Interview Prep Guide', category: 'Interviews', author: 'Mark T.', date: 'Jun 18, 2026', readTime: '12 min read', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Transitioning from Marketing to Data Science', category: 'Career Pivot', author: 'Elena R.', date: 'Jun 15, 2026', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'The Future of AI in Hiring', category: 'Industry Trends', author: 'Alex W.', date: 'Jun 10, 2026', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80' },
  { id: '5', title: 'Writing Cover Letters that Actually Get Read', category: 'Cover Letters', author: 'Sarah J.', date: 'Jun 05, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=800&q=80' },
  { id: '6', title: 'Top 10 Soft Skills for Engineering Leaders', category: 'Leadership', author: 'Chris B.', date: 'Jun 01, 2026', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1515161318750-781d686f03cb?auto=format&fit=crop&w=800&q=80' },
];

export default function BlogPage() {
  const featured = blogPosts[0];
  const gridPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header & Categories */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Career Insights & Resources</h1>
          <div className="flex flex-wrap gap-2">
            {['All', 'Resumes', 'Interviews', 'Career Pivot', 'Industry Trends'].map((cat, i) => (
              <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${featured.id}`} className="block mb-16 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#09090b] flex flex-col md:flex-row group hover:shadow-xl transition-shadow cursor-pointer">
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">{featured.category}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{featured.title}</h2>
            <p className="text-slate-500 mb-8 text-lg">Learn the exact strategies to optimize your resume for applicant tracking systems and ensure human recruiters actually see your application.</p>
            <div className="flex items-center gap-6 text-sm text-slate-500 mt-auto font-medium">
              <div className="flex items-center gap-2"><User className="w-4 h-4"/> {featured.author}</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {featured.date}</div>
            </div>
          </div>
        </Link>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map(post => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group cursor-pointer flex flex-col">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{post.category}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-auto pt-4 font-medium">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
