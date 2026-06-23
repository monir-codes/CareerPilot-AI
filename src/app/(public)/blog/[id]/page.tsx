import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Reusing same hardcoded posts for consistency
const blogPosts = [
  { id: '1', title: 'How to Beat the ATS: 5 Keyword Strategies', category: 'Resumes', author: 'Dr. Jane Smith', date: 'Jun 20, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'System Design Interview Prep Guide', category: 'Interviews', author: 'Mark T.', date: 'Jun 18, 2026', readTime: '12 min read', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Transitioning from Marketing to Data Science', category: 'Career Pivot', author: 'Elena R.', date: 'Jun 15, 2026', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'The Future of AI in Hiring', category: 'Industry Trends', author: 'Alex W.', date: 'Jun 10, 2026', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80' },
  { id: '5', title: 'Writing Cover Letters that Actually Get Read', category: 'Cover Letters', author: 'Sarah J.', date: 'Jun 05, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=800&q=80' },
  { id: '6', title: 'Top 10 Soft Skills for Engineering Leaders', category: 'Leadership', author: 'Chris B.', date: 'Jun 01, 2026', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1515161318750-781d686f03cb?auto=format&fit=crop&w=800&q=80' },
];

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === id) || blogPosts[0];

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/blog" className="text-slate-500 hover:text-primary flex items-center gap-2 mb-8 transition-colors font-semibold w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">{post.category}</div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium mb-12 py-6 border-y border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2"><User className="w-5 h-5"/> {post.author}</div>
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5"/> {post.date}</div>
          <div className="flex items-center gap-2"><Clock className="w-5 h-5"/> {post.readTime}</div>
        </div>

        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-lg dark:prose-invert prose-indigo max-w-none text-slate-600 dark:text-slate-400 leading-loose">
          <p className="lead text-xl font-medium text-slate-700 dark:text-slate-300">
            Navigating the modern job market requires more than just a strong resume; it requires an understanding of how automated systems and human recruiters interact. In this comprehensive guide, we'll break down the exact strategies you need to succeed.
          </p>
          
          <h2>The Problem with Traditional Approaches</h2>
          <p>
            For decades, job seekers have relied on a "spray and pray" approach, sending out hundreds of identical resumes to various companies. However, with the rise of Applicant Tracking Systems (ATS), this method is no longer effective. Over 75% of resumes are rejected by an ATS before a human ever sees them.
          </p>
          
          <h2>Actionable Strategies</h2>
          <ol>
            <li><strong>Keyword Optimization:</strong> Tailor your resume to match the specific keywords found in the job description.</li>
            <li><strong>Formatting Matters:</strong> Avoid complex layouts, tables, or graphics that can confuse the parsing algorithms.</li>
            <li><strong>Quantify Your Impact:</strong> Don't just list responsibilities; highlight your achievements with hard numbers and metrics.</li>
          </ol>

          <blockquote>
            "The key is not to write for the machine, but to format for the machine so you can write for the human." - {post.author}
          </blockquote>

          <h2>Conclusion</h2>
          <p>
            By adapting your strategy to account for both automated filters and human readers, you significantly increase your chances of landing that crucial first interview. Remember, your resume is a living document that should evolve with your career.
          </p>
        </article>

        <div className="mt-16 p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800/50 text-center">
          <h3 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-100">Ready to put this into practice?</h3>
          <p className="text-indigo-700 dark:text-indigo-300 mb-8 max-w-xl mx-auto">Use CareerPilot AI to automatically analyze your resume against these exact criteria and get an instant ATS score.</p>
          <Button href="/dashboard/resume">Analyze My Resume</Button>
        </div>
      </div>
    </div>
  );
}
