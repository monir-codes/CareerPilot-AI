import { DashboardLayoutClient } from '@/features/dashboard/components/DashboardLayoutClient';
import { Toaster } from 'react-hot-toast';

export const metadata = { title: 'Dashboard | CareerPilot AI' };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-background text-foreground">
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
      <Toaster position="bottom-right" />
    </div>
  );
}
