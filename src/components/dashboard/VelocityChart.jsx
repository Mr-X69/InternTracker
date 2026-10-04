import React, { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../../utils/mockData';

export default function VelocityChart() {
  const [jobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);
  
  const data = useMemo(() => {
    const timeBins = {};
    const binKeys = [];
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Generate exactly 6 months trailing ending with the current month
    for (let i = 5; i >= 0; i--) {
       const targetMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
       const monthName = months[targetMonth.getMonth()];
       timeBins[monthName] = { a: 0, o: 0 };
       binKeys.push(monthName);
    }

    const nowMs = now.getTime();
    const mockCreatedTimes = {
      'job-1': nowMs - (120 * 24 * 60 * 60 * 1000), // 4 months ago
      'job-2': nowMs - (90 * 24 * 60 * 60 * 1000),  // 3 months ago
      'job-3': nowMs - (60 * 24 * 60 * 60 * 1000),  // 2 months ago 
      'job-4': nowMs - (30 * 24 * 60 * 60 * 1000),  // 1 month ago
      'job-5': nowMs - (10 * 24 * 60 * 60 * 1000),  // Recent
    };

    jobs.forEach(job => {
      let createdTime = mockCreatedTimes[job.id] || nowMs;
      if (typeof job.id === 'string' && job.id.includes('job-')) {
        const parts = job.id.split('-');
        if (parts.length > 1 && !isNaN(parts[1]) && !mockCreatedTimes[job.id]) {
           createdTime = parseInt(parts[1]); 
        }
      }

      const diffMs = nowMs - createdTime;
      const diffMonths = Math.floor(diffMs / (30.44 * 24 * 60 * 60 * 1000));
      let targetIndex = 5 - diffMonths;
      if (targetIndex < 0) targetIndex = 0; // Pile older than 6 months into the first bin to preserve cumulative totals
      if (targetIndex > 5) targetIndex = 5;

      const binType = (job.status === 'Applied' || job.status === 'Interview' || job.status === 'Offer' || job.status === 'Rejected') ? 'a' : null;
      const isOffer = job.status === 'Offer';

      if (binType) timeBins[binKeys[targetIndex]].a += 1;
      if (isOffer) timeBins[binKeys[targetIndex]].o += 1;
    });

    let cumA = 0; let cumO = 0;
    return binKeys.map(key => {
      cumA += timeBins[key].a;
      cumO += timeBins[key].o;
      return { 
        name: key, 
        applied: cumA, 
        offers: cumO
      };
    });
  }, [jobs]);

  return (
    <div className="bg-surface border border-border shadow-sm rounded-[var(--radius)] p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-8">
         <div>
            <h3 className="font-head text-[16px] font-bold text-text mb-0.5">Application Velocity</h3>
            <div className="text-[12px] text-muted">Applications sent vs. Offers received</div>
         </div>
         <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-muted">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white opacity-80"></div> Applied</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent2 opacity-50"></div> Offers</div>
         </div>
      </div>
      
      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(255, 255, 255, 0.15)" stopOpacity={1}/>
                <stop offset="95%" stopColor="rgba(255, 255, 255, 0)" stopOpacity={1}/>
              </linearGradient>
              <linearGradient id="colorInvites" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent2)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--accent2)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--surface2)', borderColor: 'var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}
              itemStyle={{ color: 'var(--text)' }}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'var(--muted)', fontWeight: 600, letterSpacing: '0.05em' }}
              dy={10}
            />
            <Area 
              type="monotone" 
              dataKey="applied" 
              stroke="rgba(255, 255, 255, 0.4)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSent)" 
            />
            <Area 
              type="monotone" 
              dataKey="offers" 
              stroke="var(--accent2)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorInvites)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
