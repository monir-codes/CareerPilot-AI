import { AdminDataTable } from '@/features/admin/components/AdminDataTable';

export const metadata = { title: 'Career Management | CareerPilot AI' };

export default function CareersPage() {
  const headers = ['Title', 'Category', 'Status', 'Featured', 'Actions'];
  const data = [
    { id: 1, cells: ['Software Engineer', 'Engineering', 'Published', 'Yes', 'Edit | Delete'] },
    { id: 2, cells: ['Product Manager', 'Product', 'Draft', 'No', 'Edit | Delete'] }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Paths</h1>
          <p className="text-slate-500 mt-2">Manage explore catalog and career taxonomy.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">Create New</button>
      </div>
      <AdminDataTable title="Careers" headers={headers} data={data} exportable />
    </div>
  );
}
