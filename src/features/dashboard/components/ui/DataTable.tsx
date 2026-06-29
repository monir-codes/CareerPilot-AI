export const DataTable = ({ headers, data }: { headers: string[], data: { id: string | number, cells: React.ReactNode[] }[] }) => {
  if (data.length === 0) {
    return <div className="p-8 text-center bg-white dark:bg-slate-950 rounded-xl border border-dashed border-slate-300">No data available</div>;
  }
  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
          <tr>
            {headers.map((h: string, i: number) => <th key={i} className="px-6 py-4 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition">
              {row.cells.map((cell, i: number) => <td key={i} className="px-6 py-4">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
