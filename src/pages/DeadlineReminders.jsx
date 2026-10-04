import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../utils/mockData';
import { CalendarClock } from 'lucide-react';

export default function DeadlineReminders() {
  const [jobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);

  const upcomingList = useMemo(() => {
    const now = new Date();
    return jobs.filter(j => {
       if (!j.deadline) return false;
       if (['Offer', 'Rejected', 'Expired'].includes(j.status)) return false;
       return new Date(j.deadline) >= now;
    }).sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
  }, [jobs]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <h2 className="font-head text-[17px] font-bold text-text mb-1">⏰ Deadline Reminders</h2>
         <div className="text-[13px] text-muted">Jobs sorted by closest upcoming expiry.</div>
      </div>
      
      {upcomingList.length === 0 ? (
         <div className="bg-surface border border-border flex flex-col items-center justify-center p-20 rounded-[var(--radius)] text-center shadow-sm">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-head text-lg font-bold">No Urgent Deadlines</h3>
            <p className="text-[13px] text-muted max-w-sm mt-2">Your pipeline is clean. Nothing active is expiring soon.</p>
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingList.map(job => {
               const daysLeft = Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24));
               return (
                  <div key={job.id} className="bg-surface border border-danger/30 rounded-[var(--radius)] p-5 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-3 text-danger"><CalendarClock size={20} strokeWidth={2.5} /></div>
                     <div className="text-[11px] font-bold text-danger uppercase tracking-wider mb-2">{daysLeft === 0 ? 'Today' : `In ${daysLeft} days`}</div>
                     <h3 className="font-bold text-[15px] text-text leading-tight mb-1">{job.role}</h3>
                     <div className="text-[13px] text-muted mb-4">{job.company}</div>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-surface2 border border-border">{job.status}</span>
                     </div>
                  </div>
               )
            })}
         </div>
      )}
    </div>
  );
}
