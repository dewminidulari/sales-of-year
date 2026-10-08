import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Dashboard Page
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Empty dashboard initialized. Ready to assemble atomic components.
        </p>
      </div>
    </div>
  );
}
