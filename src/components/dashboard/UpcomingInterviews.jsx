import React from 'react';
import { Calendar } from 'lucide-react';

export default function UpcomingInterviews() {
  const mockInterviews = [
    { id: 1, role: 'Product Designer Intern', company: 'Linear', team: 'Engineering Team', type: 'TECHNICAL', time: 'In 4 hours', color: 'bg-accent3/20 text-accent3' },
    { id: 2, role: 'Software Engineering Fellow', company: 'Vercel', team: 'Platform Team', type: 'BEHAVIORAL', time: 'Oct 24, 10:00 AM', color: 'bg-accent/20 text-accent' }
  ];

  return (
    <div className="bg-surface border border-border shadow-sm rounded-[var(--radius)] p-6 h-full flex flex-col">
      <h3 className="font-head text-[16px] font-bold text-text mb-5">Upcoming Interviews</h3>
      
      <div className="flex flex-col gap-4 flex-1">
        {mockInterviews.map((interview) => (
          <div key={interview.id} className="bg-surface2/50 border border-border/50 rounded-lg p-4 group hover:bg-surface2 transition-colors">
             <div className="flex items-center justify-between mb-2">
                <div className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${interview.color}`}>
                   {interview.type}
                </div>
                <div className="text-[10px] text-muted font-mono">{interview.time}</div>
             </div>
             <div className="font-bold text-[13.5px] text-text mb-0.5">{interview.role}</div>
             <div className="text-[12px] text-muted flex items-center gap-1.5">
                <span className="text-text font-medium">{interview.company}</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span>{interview.team}</span>
             </div>
             
             {interview.id === 1 && (
                <div className="mt-3 flex items-center gap-1.5 opacity-80">
                   {/* Mock avatars */}
                   <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-accent2 border border-surface text-[8px] flex items-center justify-center font-bold">JD</div>
                      <div className="w-5 h-5 rounded-full bg-accent4 border border-surface text-[8px] flex items-center justify-center font-bold text-black">AS</div>
                   </div>
                   <div className="text-[10px] text-muted font-medium ml-1">+2</div>
                </div>
             )}
          </div>
        ))}
      </div>

      <button className="w-full mt-5 py-2.5 text-[11px] font-bold text-muted border border-border rounded-[var(--radius-sm)] hover:bg-surface2 hover:text-text transition-colors tracking-widest uppercase">
         View All Events
      </button>
    </div>
  );
}
