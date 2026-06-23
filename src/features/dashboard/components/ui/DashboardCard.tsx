export const DashboardCard = ({ title, icon, value, trend }: any) => {
  return (
    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-500 dark:text-slate-400 font-medium">{title}</h3>
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">{icon}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {trend && <div className="text-sm mt-2 text-emerald-500 font-medium">{trend}</div>}
    </div>
  );
};
