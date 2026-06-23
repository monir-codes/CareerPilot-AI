"use client";
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { getToken, userId } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getHeaders = async () => {
    const headers: any = { 'Content-Type': 'application/json' };
    try {
      const token = await getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    } catch (e) {}
    if (userId) headers['x-test-user-id'] = userId;
    return headers;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const headers = await getHeaders();
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/users/profile', { headers });
        const data = await res.json();
        if (data.success && data.data) {
          const user = data.data;
          const names = (user.fullName || '').split(' ');
          setFirstName(names[0] || '');
          setLastName(names.slice(1).join(' ') || '');
          setTargetRole(user.title || '');
          setEmail(user.email || '');
        }
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const headers = await getHeaders();
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/users/profile', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          fullName: `${firstName} ${lastName}`.trim(),
          title: targetRole
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Profile updated successfully!');
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Profile Settings</h1>
      
      <div className="bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
            <User className="w-10 h-10 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">{firstName ? `${firstName} ${lastName}` : 'Standard User'}</h3>
            <p className="text-slate-500 mb-4">{email || 'user@careerpilot.ai'}</p>
            <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition">Change Avatar</button>
          </div>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-6 max-w-2xl">
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-32"></div>
          </div>
        ) : (
          <form className="space-y-6 max-w-2xl" onSubmit={handleSave}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary outline-none" placeholder="First Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary outline-none" placeholder="Last Name" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Target Role</label>
              <input type="text" value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="e.g. Senior Product Manager" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="pt-4">
              <button type="submit" disabled={isSaving} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
