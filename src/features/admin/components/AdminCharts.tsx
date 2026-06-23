"use client";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [{name: 'Mon', value: 400}, {name: 'Tue', value: 300}, {name: 'Wed', value: 550}, {name: 'Thu', value: 450}, {name: 'Fri', value: 700}];
const pieData = [{name: 'Free', value: 400}, {name: 'Pro', value: 300}, {name: 'Enterprise', value: 100}];
const COLORS = ['#4F46E5', '#06B6D4', '#10B981'];

export const AdminCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold mb-6">Daily Active Users (Area)</h3>
        <div className="h-64"><ResponsiveContainer><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.2} /><XAxis dataKey="name" opacity={0.5} /><Tooltip /><Area type="monotone" dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} /></AreaChart></ResponsiveContainer></div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold mb-6">Revenue Growth (Bar)</h3>
        <div className="h-64"><ResponsiveContainer><BarChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.2} /><XAxis dataKey="name" opacity={0.5} /><Tooltip cursor={{fill: 'transparent'}} /><Bar dataKey="value" fill="#10B981" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold mb-6">AI Token Usage (Line)</h3>
        <div className="h-64"><ResponsiveContainer><LineChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.2} /><XAxis dataKey="name" opacity={0.5} /><Tooltip /><Line type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={3} dot={{r: 4}} /></LineChart></ResponsiveContainer></div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold mb-6">Subscription Tier Breakdown (Pie)</h3>
        <div className="h-64"><ResponsiveContainer><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{pieData.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
      </div>
    </div>
  );
};
