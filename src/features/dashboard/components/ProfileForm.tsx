"use client";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name is too short').optional().or(z.literal('')),
  title: z.string().min(2, 'Job title is required').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio too long').optional().or(z.literal('')),
});

export const ProfileForm = () => {
  const { getToken, userId } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: '', title: '', bio: '' }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = null;
        try { token = await getToken(); } catch(e) {}
        
        if (!token && !userId) return;

        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (userId) headers['x-test-user-id'] = userId;

        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/users/profile', { headers });
        const data = await res.json();
        if (data.success && data.data) {
          reset({
            fullName: data.data.fullName || '',
            title: data.data.title || '',
            bio: data.data.bio || ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [getToken, userId, reset]);

  const onSubmit = async (formData: any) => {
    try {
      let token = null;
      try { token = await getToken(); } catch(e) {}

      if (!token && !userId) {
        toast.error('Authentication failed');
        return;
      }

      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (userId) headers['x-test-user-id'] = userId;

      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/users/profile', {
        method: 'PUT',
        headers,
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
          <input {...register('fullName')} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{String(errors.fullName.message)}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Job Title</label>
          <input {...register('title')} placeholder="e.g. Senior Product Manager" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{String(errors.title.message)}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Bio</label>
        <textarea {...register('bio')} rows={4} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500"></textarea>
        {errors.bio && <p className="text-red-500 text-xs mt-1">{String(errors.bio.message)}</p>}
      </div>
      <button disabled={isSubmitting} type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50">
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
};
