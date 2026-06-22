import { ExploreClient } from '@/features/explore/components/ExploreClient';

export const metadata = {
  title: 'Explore Careers | CareerPilot AI',
  description: 'Search and filter thousands of AI-analyzed career paths.',
};

export default function ExplorePage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Career Paths</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Discover roles, analyze salaries, and see exactly what it takes to land your dream job with AI-powered roadmaps.</p>
      </div>
      <ExploreClient />
    </div>
  );
}
