import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Board from '../components/kanban/Board';
import JobTable from '../components/kanban/JobTable';
import VelocityChart from '../components/dashboard/VelocityChart';
import UpcomingInterviews from '../components/dashboard/UpcomingInterviews';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../utils/mockData';

export default function Dashboard() {
  const [view, setView] = useState('kanban'); // kanban or table
  const [jobs, setJobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
     const handler = (e) => setSearch(e.detail);
     window.addEventListener('internSearch', handler);
     return () => window.removeEventListener('internSearch', handler);
  }, []);

  const handleDelete = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };
  const totalApplications = jobs.length;
  const appliedCount = jobs.filter(j => j.status === 'Applied').length;
  const interviewCount = jobs.filter(j => j.status === 'Interview').length;
  const offerCount = jobs.filter(j => j.status === 'Offer').length;
  // some mock jobs might not have scores if added manually, so filter those out for average
  const scoredJobs = jobs.filter(j => j.score != null);
  const avgMatch = scoredJobs.length > 0 ? Math.round(scoredJobs.reduce((acc, curr) => acc + curr.score, 0) / scoredJobs.length) : 0;

  const stats = [
    { label: 'Total Applications', colorClass: 'bg-accent3', value: totalApplications },
    { label: 'Applied', colorClass: 'bg-accent', value: appliedCount },
    { label: 'Interviews', colorClass: 'bg-accent2', value: interviewCount },
    { label: 'Offers', colorClass: 'bg-accent4', value: offerCount },
    { label: 'Avg Match Score', colorClass: 'bg-danger', value: `${avgMatch}%` },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard Top Row */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 md:gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-[var(--radius)] p-[18px] px-[20px] relative overflow-hidden group hover:border-accent3/50 transition-colors shadow-sm">
            <div className={`absolute top-0 left-0 right-0 h-[2px] ${stat.colorClass}`} />
            <div className="font-head text-[28px] font-extrabold leading-none mb-1 text-text mt-1">
              {stat.value}
            </div>
            <div className="text-[12.5px] text-muted font-semibold">{stat.label}</div>
            <div className="absolute right-[18px] top-[18px] text-[24px] opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
               {['📋', '📤', '🎤', '🎉', '🎯'][i]}
            </div>
          </div>
        ))}
      </div>
      
      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <VelocityChart />
        </div>
        <div className="lg:col-span-1">
           <UpcomingInterviews />
        </div>
      </div>

      {/* section header */}
      <div className="flex items-center justify-between">
        <h2 className="font-head text-[15px] font-bold text-text">Pipeline Overview</h2>
        <div className="flex bg-surface2 border border-border rounded-[var(--radius-sm)] overflow-hidden p-0.5 max-h-8">
          <button 
             onClick={() => setView('kanban')}
             className={twMerge(clsx("px-3.5 py-1 text-xs font-semibold transition-colors rounded-[var(--radius-sm)]", view === 'kanban' ? 'bg-surface text-text shadow-sm' : 'text-muted hover:text-text'))}
          >Kanban</button>
          <button 
             onClick={() => setView('table')}
             className={twMerge(clsx("px-3.5 py-1 text-xs font-semibold transition-colors rounded-[var(--radius-sm)]", view === 'table' ? 'bg-surface text-text shadow-sm' : 'text-muted hover:text-text'))}
          >Table</button>
        </div>
      </div>

      {/* Board or Table rendering */}
      <div className="flex-1 mt-2 w-full max-w-full overflow-x-hidden">
        {view === 'kanban' ? (
           <Board jobs={jobs} setJobs={setJobs} searchQuery={search} />
        ) : (
           <JobTable 
             jobs={jobs.filter(j => 
               !search || 
               (j.company || '').toLowerCase().includes(search.toLowerCase()) || 
               (j.role || '').toLowerCase().includes(search.toLowerCase())
             )} 
             onDelete={handleDelete} 
           />
        )}
      </div>
    </div>
  );
}
