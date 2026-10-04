import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_INTERVIEWS } from '../utils/mockData';

export default function InterviewTracker() {
  const [interviews, setInterviews] = useLocalStorage('intern_interviews', INITIAL_INTERVIEWS);
  const [isAdding, setIsAdding] = useState(false);
  const [newInterview, setNewInterview] = useState({ company: '', round: '', datetime: '', mode: '', platform: '', notes: '' });

  const handleSave = () => {
    if (!newInterview.company || !newInterview.datetime) return alert('Company and Date/Time are required!');
    setInterviews([{ id: Date.now(), ...newInterview }, ...interviews]);
    setIsAdding(false);
    setNewInterview({ company: '', round: '', datetime: '', mode: '', platform: '', notes: '' });
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="font-head text-[17px] font-bold text-text mb-1">🎤 Interview Tracker</h2>
           <div className="text-[13px] text-muted max-w-2xl">Log and prep for upcoming technical, behavioral, and HR screens.</div>
        </div>
        <button className="btn btn-primary px-4 py-2 text-[12px]" onClick={() => setIsAdding(!isAdding)}>
           {isAdding ? 'Cancel' : '+ Schedule Interview'}
        </button>
      </div>

      {isAdding && (
         <div className="bg-surface border border-accent/20 rounded-[var(--radius)] p-5 shadow-sm animate-in slide-in-from-top-2">
            <h3 className="font-head text-[14px] font-bold mb-3 text-accent2">New Interview Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <input value={newInterview.company} onChange={e => setNewInterview({...newInterview, company: e.target.value})} placeholder="Company *" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent2" />
               <input value={newInterview.round} onChange={e => setNewInterview({...newInterview, round: e.target.value})} placeholder="Round (e.g. Technical 1)" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent2" />
               <input value={newInterview.datetime} onChange={e => setNewInterview({...newInterview, datetime: e.target.value})} type="datetime-local" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent2 invert-0 dark:invert-[0.8]" />
               <input value={newInterview.mode} onChange={e => setNewInterview({...newInterview, mode: e.target.value})} placeholder="Mode (e.g. Video Call)" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent2" />
               <input value={newInterview.platform} onChange={e => setNewInterview({...newInterview, platform: e.target.value})} placeholder="Platform (e.g. Google Meet)" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent2" />
               <input value={newInterview.notes} onChange={e => setNewInterview({...newInterview, notes: e.target.value})} placeholder="Preparation Notes" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent2" />
            </div>
            <div className="flex justify-end gap-2">
               <button onClick={handleSave} className="btn btn-primary px-5 py-2 text-[12px] !bg-accent2 border-accent2">Save Event</button>
            </div>
         </div>
      )}

      <div className="bg-surface border border-border rounded-[var(--radius)] overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse text-[13px] font-body">
          <thead>
            <tr className="bg-surface2 border-b border-border">
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Company</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Round</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Date & Time</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Mode / Details</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Preparation Notes</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map(i => {
               // Calculate countdown for visual flair
               const daysLeft = Math.ceil((new Date(i.datetime) - new Date()) / (1000 * 60 * 60 * 24));
               const isUpcoming = daysLeft > 0 && daysLeft < 365;
               return (
                 <tr key={i.id} className="border-b border-border last:border-b-0 hover:bg-surface2/50 transition-colors">
                   <td className="py-3 px-4 font-bold text-text text-[15px]">{i.company}</td>
                   <td className="py-3 px-4"><span className="tag tag-purple font-bold">{i.round}</span></td>
                   <td className="py-3 px-4 font-medium text-accent">
                      {new Date(i.datetime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'})}
                      {isUpcoming && <div className="text-[9px] text-danger uppercase font-bold mt-1 tracking-widest">{daysLeft} days away</div>}
                   </td>
                   <td className="py-3 px-4">
                      <div className="font-bold">{i.mode}</div>
                      <div className="text-muted text-[11px] uppercase">{i.platform}</div>
                   </td>
                   <td className="py-3 px-4 text-muted max-w-[200px] truncate">{i.notes}</td>
                 </tr>
               )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
