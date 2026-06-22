import React from 'react';

export const AuthLoadingState = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>
    </div>
  );
};
