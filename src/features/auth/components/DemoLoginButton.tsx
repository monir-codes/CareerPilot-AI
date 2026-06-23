"use client";

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const DemoLoginButton = () => {
  const { isLoaded, signIn, setActive } = useSignIn() as any;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDemoLogin = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: 'demo@careerpilot.ai',
        password: 'Password123!',
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Demo login failed', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDemoLogin} 
      disabled={isLoading}
      className="w-full bg-[#4F46E5] text-white py-2 rounded-md hover:bg-indigo-700 transition"
    >
      {isLoading ? 'Logging in...' : 'Login as Demo User'}
    </button>
  );
};
