import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_CONTACTS } from '../utils/mockData';

export default function ContactTracker() {
  const [contacts, setContacts] = useLocalStorage('intern_contacts', INITIAL_CONTACTS);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', role: '', company: '', linkedin: '', email: '', notes: '' });

  const handleSave = () => {
    if (!newContact.name || !newContact.company) return alert('Name and Company are required!');
    setContacts([{ id: Date.now(), ...newContact }, ...contacts]);
    setIsAdding(false);
    setNewContact({ name: '', role: '', company: '', linkedin: '', email: '', notes: '' });
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="font-head text-[17px] font-bold text-text mb-1">👥 Contact Tracker</h2>
           <div className="text-[13px] text-muted max-w-2xl">Keep tabs on recruiters and engineers for strategic pinging.</div>
        </div>
        <button className="btn btn-primary px-4 py-2 text-[12px]" onClick={() => setIsAdding(!isAdding)}>
           {isAdding ? 'Cancel' : '+ Add Contact'}
        </button>
      </div>
      
      {isAdding && (
         <div className="bg-surface border border-accent/30 rounded-[var(--radius)] p-5 shadow-sm animate-in slide-in-from-top-2">
            <h3 className="font-head text-[14px] font-bold mb-3 text-accent">New Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <input value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} placeholder="Name *" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent" />
               <input value={newContact.company} onChange={e => setNewContact({...newContact, company: e.target.value})} placeholder="Company *" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent" />
               <input value={newContact.role} onChange={e => setNewContact({...newContact, role: e.target.value})} placeholder="Role (e.g. Recruiter)" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent" />
               <input value={newContact.linkedin} onChange={e => setNewContact({...newContact, linkedin: e.target.value})} placeholder="LinkedIn URL" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent" />
               <input value={newContact.email} onChange={e => setNewContact({...newContact, email: e.target.value})} placeholder="Email Address" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent" />
               <input value={newContact.notes} onChange={e => setNewContact({...newContact, notes: e.target.value})} placeholder="Notes (e.g. Met at career fair)" className="min-w-0 bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent" />
            </div>
            <div className="flex justify-end gap-2">
               <button onClick={handleSave} className="btn btn-primary px-5 py-2 text-[12px]">Save into Pipeline</button>
            </div>
         </div>
      )}

      <div className="bg-surface border border-border rounded-[var(--radius)] overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse text-[13px] font-body">
          <thead>
            <tr className="bg-surface2 border-b border-border">
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Name</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Role</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Company</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">LinkedIn / Email</th>
              <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Notes</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id} className="border-b border-border last:border-b-0 hover:bg-surface2/50 transition-colors">
                <td className="py-3 px-4 font-bold text-text flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-accent3/20 border border-accent3/30 flex items-center justify-center text-accent3 font-head font-bold shadow-sm">{c.name.charAt(0)}</div>
                   {c.name}
                </td>
                <td className="py-3 px-4 font-medium">{c.role}</td>
                <td className="py-3 px-4"><span className="tag tag-orange font-bold text-[10px]">{c.company}</span></td>
                <td className="py-3 px-4 text-[12px] text-accent3 font-mono cursor-pointer hover:underline">{c.linkedin}<br/><span className="text-muted">{c.email}</span></td>
                <td className="py-3 px-4 text-[12px] max-w-[200px] truncate text-muted">{c.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
