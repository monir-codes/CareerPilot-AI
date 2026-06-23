import Link from 'next/link';

export const Logo = ({ href = "/" }: { href?: string }) => {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-full h-full text-indigo-600 dark:text-indigo-500 drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-105 transition-all duration-300">
          <path fill="currentColor" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        CareerPilot<span className="text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 align-top ml-0.5 font-black">AI</span>
      </span>
    </Link>
  );
};
