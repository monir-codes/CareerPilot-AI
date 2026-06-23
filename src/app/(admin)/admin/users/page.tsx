import { AdminDataTable } from '@/features/admin/components/AdminDataTable';

export const metadata = { title: 'User Management | CareerPilot AI' };

export default function UsersPage() {
  const headers = ['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'];
  const data = [
    { id: 1, cells: ['John Doe', 'john@example.com', 'User', 'Active', '2026-01-15', 'View | Suspend'] },
    { id: 2, cells: ['Jane Smith', 'jane@example.com', 'Admin', 'Active', '2026-02-10', 'View | Suspend'] }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-slate-500 mt-2">Search, filter, and manage platform users.</p>
      </div>
      <AdminDataTable title="All Users" headers={headers} data={data} exportable />
    </div>
  );
}
