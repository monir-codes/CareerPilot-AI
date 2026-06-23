import { BlogEditorMockup } from '@/features/admin/components/BlogEditorMockup';

export const metadata = { title: 'Blog Management | CareerPilot AI' };

export default function BlogsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
        <p className="text-slate-500 mt-2">Create and edit SEO-optimized content.</p>
      </div>
      <BlogEditorMockup />
    </div>
  );
}
