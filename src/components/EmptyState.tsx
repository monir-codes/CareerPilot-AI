import { FileText, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export const EmptyState = ({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">{description}</p>
    {actionLabel && actionHref && (
      <Link href={actionHref} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors">
        {actionLabel}
      </Link>
    )}
  </div>
);
