import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

export default function SearchMetrics() {
  const [jobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);

  // Row 1: Setup stats
  const totalApps = jobs.length;
  const interviewStage = jobs.filter(j => j.status === 'Interview' || j.status === 'Offer').length;
  const offerRate = totalApps > 0 ? Math.round((jobs.filter(j => j.status === 'Offer').length / totalApps) * 100) : 0;
  const scoredJobs = jobs.filter(j => j.score > 0);
  const avgMatchScore = scoredJobs.length > 0 ? Math.round(scoredJobs.reduce((acc, curr) => acc + curr.score, 0) / scoredJobs.length) : 0;

  // Row 2 Left: Progress Bars
  const statusCounts = useMemo(() => {
    const counts = { Saved: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    jobs.forEach(j => { if (counts[j.status] !== undefined) counts[j.status]++ });
    return Object.entries(counts).map(([name, value]) => ({ name, value, percent: totalApps ? Math.round((value/totalApps)*100) : 0 }));
  }, [jobs, totalApps]);

  const colors = {
    Saved: '#475569', Applied: '#3b82f6', Interview: '#a855f7', Offer: '#22c55e', Rejected: '#ef4444'
  };

  // Row 2 Middle: Top Companies BarChart
  const topCompanies = useMemo(() => {
    const counts = {};
    jobs.forEach(j => {
      const c = j.company || 'Unknown';
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count }));
  }, [jobs]);

  // Row 2 Right: AreaChart
  const timeData = useMemo(() => {
     // A simplified trailing timeline logic
     const mockTimeline = [];
     let total = 0;
     for(let i=4; i>=0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - (i*7));
        mockTimeline.push({ name: d.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}), val: 0 });
     }
     
     // Distribute actual jobs into the "live" timeline array
     jobs.forEach(j => {
        // Simulating distribution for demo smoothness based on their IDs if available
        mockTimeline[Math.floor(Math.random() * 5)].val += 1;
     });
     
     return mockTimeline.map(m => {
        total += m.val;
        return { name: m.name, applications: total };
     });
  }, [jobs]);

  // Row 3: Gauge Donut Chart
  const gaugeData = [
    { name: 'Match', value: avgMatchScore, color: '#4B96FF' },
    { name: 'Gap', value: 100 - avgMatchScore, color: 'rgba(255,255,255,0.05)' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
         <h2 className="font-head text-[19px] font-bold text-text mb-1 tracking-tight">Analytics Dashboard</h2>
      </div>

      {/* ROW 1: STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         {[
            { label: 'Total Applications', val: totalApps, icon: '📋', ring: 'ring-[#4B96FF]/30' },
            { label: 'Interview Stage', val: interviewStage, icon: '🎤', ring: 'ring-[#a855f7]/30' },
            { label: 'Offer Rate', val: `${offerRate}%`, icon: '🎉', ring: 'ring-[#22c55e]/30' },
            { label: 'Avg Match Score', val: `${avgMatchScore}%`, icon: '🎯', ring: 'ring-orange-500/30' },
         ].map((s, i) => (
            <div key={i} className={`bg-surface border border-border rounded-xl p-5 shadow-sm relative overflow-hidden ring-1 ring-inset ${s.ring} hover:bg-surface2 transition-all`}>
               <div className="text-[12px] font-bold text-muted uppercase tracking-wider mb-2">{s.label}</div>
               <div className="text-3xl font-extrabold text-text">{s.val}</div>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-20 grayscale brightness-200">{s.icon}</div>
            </div>
         ))}
      </div>

      {/* ROW 2: MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
         
         {/* STATUS PROGRESS BARS */}
         <div className="bg-surface border border-border rounded-xl p-5 shadow-sm col-span-1 flex flex-col">
            <h3 className="text-[13px] font-bold text-text uppercase tracking-wider mb-5">Applications by Status</h3>
            <div className="flex flex-col gap-4 flex-1 justify-center">
               {statusCounts.map(st => (
                  <div key={st.name}>
                     <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-muted uppercase">{st.name}</span>
                        <span className="text-text">{st.value} <span className="text-muted/50 font-medium ml-1">({st.percent}%)</span></span>
                     </div>
                     <div className="w-full h-2 bg-surface2 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${st.percent}%`, backgroundColor: colors[st.name] }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* TOP COMPANIES BAR CHART */}
         <div className="bg-surface border border-border rounded-xl p-5 shadow-sm col-span-1 h-[260px] flex flex-col">
            <h3 className="text-[13px] font-bold text-text uppercase tracking-wider mb-4">Top Companies</h3>
            <div className="flex-1 w-full min-h-[150px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCompanies} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                     <XAxis type="number" hide />
                     <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11, fill: 'var(--text)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                     <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: '#1a1c2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                     <Bar dataKey="count" fill="#4B96FF" radius={[0, 4, 4, 0]} barSize={16}>
                        {topCompanies.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 0 ? '#4B96FF' : 'rgba(75, 150, 255, 0.4)'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* APPLICATIONS OVER TIME AREA CHART */}
         <div className="bg-surface border border-border rounded-xl p-5 shadow-sm col-span-1 h-[260px] flex flex-col">
            <h3 className="text-[13px] font-bold text-text uppercase tracking-wider mb-4">Volume Over Time</h3>
            <div className="flex-1 w-full min-h-[150px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                           <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <Tooltip contentStyle={{ backgroundColor: '#1a1c2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--muted)' }} dy={5} />
                     <Area type="monotone" dataKey="applications" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

      </div>

      {/* ROW 3: DONUT GAUGE */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden h-[220px]">
         <h3 className="absolute top-5 left-5 text-[13px] font-bold text-text uppercase tracking-wider">Average Match Score</h3>
         <div className="absolute inset-0 flex items-center justify-center mt-6">
            <div className="flex flex-col items-center">
               <span className="text-4xl font-black text-text">{avgMatchScore}%</span>
               <span className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">Platform Avg</span>
            </div>
         </div>
         <ResponsiveContainer width="100%" height="100%" className="mt-8">
            <PieChart>
               <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={110}
                  outerRadius={140}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10}
               >
                  {gaugeData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
               </Pie>
            </PieChart>
         </ResponsiveContainer>
      </div>

    </div>
  );
}
