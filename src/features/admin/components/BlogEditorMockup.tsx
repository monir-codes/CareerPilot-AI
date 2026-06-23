export const BlogEditorMockup = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Post Title</label>
        <input type="text" placeholder="Top 10 AI Interview Tips" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-transparent outline-none focus:border-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">SEO Meta Description</label>
        <textarea rows={2} placeholder="Brief summary for search engines..." className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-transparent outline-none focus:border-indigo-500"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Content (Rich Text Editor)</label>
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-950 p-2 border-b border-slate-200 dark:border-slate-700 flex gap-2">
            <button className="px-3 py-1 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 rounded">B</button>
            <button className="px-3 py-1 italic hover:bg-slate-200 dark:hover:bg-slate-800 rounded">I</button>
            <button className="px-3 py-1 underline hover:bg-slate-200 dark:hover:bg-slate-800 rounded">U</button>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
            <button className="px-3 py-1 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 rounded">Link</button>
            <button className="px-3 py-1 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 rounded">Image</button>
          </div>
          <textarea rows={12} placeholder="Write your amazing post here..." className="w-full p-4 bg-transparent outline-none resize-y"></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Save Draft</button>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">Publish Post</button>
      </div>
    </div>
  );
};
