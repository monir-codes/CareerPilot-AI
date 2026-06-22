export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">403 - Forbidden</h1>
      <p className="text-slate-600 dark:text-slate-400">You do not have the necessary permissions to view this resource.</p>
    </div>
  );
}
