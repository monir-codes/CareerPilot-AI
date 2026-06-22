export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">401 - Unauthorized</h1>
      <p className="text-slate-600 dark:text-slate-400">You must be logged in to access this page.</p>
    </div>
  );
}
