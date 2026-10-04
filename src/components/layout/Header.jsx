import { Bell, Plus, Search, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import SmartAddModal from '../modals/SmartAddModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../../utils/mockData';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [jobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);

  const notifications = jobs.filter(j => j.status === 'Interview');

  // Initialize theme robustly
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-[58px] bg-surface/80 backdrop-blur-xl border-b border-border px-7 flex items-center justify-between">
      {/* Title / Breadcrumb Placeholder */}
      <div className="font-head text-[17px] font-bold text-text">
        {/* We can make this dynamic via React Router later */}
        Dashboard
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <div className="relative mr-2 hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted">
            <Search size={14} />
          </div>
          <input 
            type="text" 
            placeholder="Search jobs..." 
             onChange={(e) => {
               window.dispatchEvent(new CustomEvent('internSearch', { detail: e.target.value }));
            }}
            className="h-8 pl-8 pr-3 rounded-[var(--radius-sm)] bg-surface2 border border-border text-[12px] font-body focus:outline-none focus:border-accent3 transition-colors w-40 md:w-60"
          />
        </div>

        <button 
          onClick={toggleTheme}
          className="btn btn-ghost !p-1.5 rounded-full hover:bg-surface2"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-ghost !p-1.5 rounded-full hover:bg-surface2 relative"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border border-surface"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-surface border border-border rounded-[var(--radius)] shadow-lg z-[200] overflow-hidden">
               <div className="px-4 py-3 border-b border-border bg-surface2">
                 <h4 className="text-[13px] font-bold text-text">Upcoming Interviews</h4>
               </div>
               <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? notifications.map(n => (
                    <div key={n.id} className="p-4 border-b border-border last:border-0 hover:bg-surface2/50 transition-colors">
                       <div className="text-[12px] font-bold text-text mb-0.5">{n.company}</div>
                       <div className="text-[11px] text-muted">{n.role}</div>
                       <div className="text-[10px] text-accent font-semibold mt-1">📅 {n.deadline || 'TBA'}</div>
                    </div>
                  )) : (
                    <div className="p-4 text-center text-[12px] text-muted font-medium">No upcoming deadlines or interviews.</div>
                  )}
               </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary ml-2"
        >
          <Plus size={16} /> Add Internship
        </button>
      </div>

      <SmartAddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
