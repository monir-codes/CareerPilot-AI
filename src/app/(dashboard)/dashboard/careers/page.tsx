import { EmptyState } from '@/components/EmptyState';
import { Bookmark } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Saved Careers</h1>
      <EmptyState 
        icon={Bookmark} 
        title="No careers saved" 
        description="Explore the career database and bookmark roles you are interested in pursuing." 
        actionLabel="Explore Careers"
        actionHref="/explore"
      />
    </div>
  );
}
