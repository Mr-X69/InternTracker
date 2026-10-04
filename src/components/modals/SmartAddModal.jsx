import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../../utils/mockData';

export default function SmartAddModal({ isOpen, onClose, jobToEdit }) {
  const [jobs, setJobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);

  // Clean pure form state supporting edit mode
  const [form, setForm] = useState({
    company: jobToEdit?.company || '', 
    role: jobToEdit?.role || '', 
    status: jobToEdit?.status || 'Saved', 
    location: jobToEdit?.location || 'Remote',
    deadline: jobToEdit?.deadline || '',
    stipend: jobToEdit?.stipend || '',
    url: jobToEdit?.url || '',
    description: jobToEdit?.description || '',
  });
  
  if (!isOpen) return null;

  const handleSave = () => {
    if (!form.company || !form.role) return alert('Company and Role are required');
    
    if (jobToEdit) {
       // Update logic
       setJobs(jobs.map(j => j.id === jobToEdit.id ? { ...j, ...form } : j));
    } else {
       // Create logic
       const newJob = {
         id: `job-${Date.now()}`,
         company: form.company,
         role: form.role,
         status: form.status,
         location: form.location,
         deadline: form.deadline,
         stipend: form.stipend,
         url: form.url,
         description: form.description,
         score: null,
       };
       setJobs([...jobs, newJob]);
    }
    
    setForm({ company: '', role: '', status: 'Saved', location: 'Remote', deadline: '', stipend: '', url: '', description: '' });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center min-h-screen bg-black/70 backdrop-blur-md p-4' onClick={onClose}>
      <div 
         className='bg-[#1a1c2e] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 border border-white/10 text-white relative'
         style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0 }}
         onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-head text-[22px] font-bold tracking-tight">{jobToEdit ? 'Update Application' : 'Add New Internship'}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"><X size={20} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Company *</label>
              <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-white focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none transition-all placeholder:text-white/20" placeholder="e.g. Google" />
           </div>
           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Role *</label>
              <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-white focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none transition-all placeholder:text-white/20" placeholder="e.g. Software Engineer Intern" />
           </div>
           
           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-white focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none appearance-none transition-all">
                 <option value="Saved" className="bg-[#1a1c2e]">Saved</option>
                 <option value="Applied" className="bg-[#1a1c2e]">Applied</option>
                 <option value="Interview" className="bg-[#1a1c2e]">Interview</option>
                 <option value="Offer" className="bg-[#1a1c2e]">Offer</option>
                 <option value="Rejected" className="bg-[#1a1c2e]">Rejected</option>
              </select>
           </div>
           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Location</label>
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-white focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none transition-all placeholder:text-white/20" placeholder="e.g. Mountain View / Remote" />
           </div>

           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Deadline / Applied Date</label>
              <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-white focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none transition-all invert-0 dark:invert-[0.8]" />
           </div>
           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Stipend / Salary (Optional)</label>
              <input value={form.stipend} onChange={e => setForm({...form, stipend: e.target.value})} type="number" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-white focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none transition-all placeholder:text-white/20" placeholder="e.g. 8500" />
           </div>
        </div>

        <div className="flex flex-col gap-5 mb-5">
           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Portal URL</label>
              <input value={form.url} onChange={e => setForm({...form, url: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-[#4B96FF] focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none transition-all placeholder:text-white/20 font-mono" placeholder="https://" />
           </div>
           <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Job Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="3" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-[13px] text-white focus:border-[#4B96FF] focus:ring-1 focus:ring-[#4B96FF]/30 outline-none transition-all resize-none placeholder:text-white/20" placeholder="Paste JD here for AI parsing later..."></textarea>
           </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 pt-5 border-t border-white/10">
           <button onClick={onClose} className="px-5 py-2.5 font-bold text-white/50 text-[13px] hover:text-white transition-colors rounded-lg hover:bg-white/5">Cancel</button>
           <button onClick={handleSave} className="bg-[#4B96FF] text-white font-bold text-[13px] px-8 py-2.5 rounded-lg shadow-lg shadow-[#4B96FF]/20 hover:bg-[#3A85EF] hover:-translate-y-[1px] transition-all">Save Internship</button>
        </div>
      </div>
    </div>
  );
}
