import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Target, LayoutDashboard, ListTodo, Bell, BarChart2, 
  Brain, FileText, Mail, CheckSquare, Key, 
  Users, Mic, User, Globe
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { id: 'tracker', label: 'Job Tracker', icon: ListTodo, path: '/tracker' },
      { id: 'reminders', label: 'Deadline Reminders', icon: Bell, path: '/reminders' },
      { id: 'metrics', label: 'Search Metrics', icon: BarChart2, path: '/metrics' },
    ]
  },
  {
    label: 'AI Tools',
    items: [
      { id: 'analyzer', label: 'Resume-JD Analyzer', icon: Brain, path: '/tools/analyzer' },
      { id: 'resume', label: 'Resume Builder', icon: FileText, path: '/tools/resume-builder' },
      { id: 'coverletter', label: 'AI Cover Letters', icon: Mail, path: '/tools/cover-letters' },
      { id: 'checker', label: 'Resume Checker', icon: CheckSquare, path: '/tools/resume-checker' },
      { id: 'keywords', label: 'Keyword Finder', icon: Key, path: '/tools/keywords' },
    ]
  },
  {
    label: 'Manage & Addons',
    items: [
      { id: 'contacts', label: 'Contact Tracker', icon: Users, path: '/manage/contacts' },
      { id: 'interviews', label: 'Interview Tracker', icon: Mic, path: '/manage/interviews' },
      { id: 'extension', label: 'Browser Extension', icon: Globe, path: '/extension' },
    ]
  }
];

export default function Sidebar() {
  const [showFounders, setShowFounders] = useState(false);
  const [userName, setUserName] = useLocalStorage('app_user_name', 'User');
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <aside className="w-[240px] min-w-[240px] max-w-[240px] shrink-0 min-h-screen bg-surface border-r border-border flex flex-col fixed top-0 left-0 z-40 transition-transform duration-300 shadow-sm">
      {/* Logo Area */}
      <div className="px-5 pt-6 pb-4 border-b border-border flex items-center gap-2.5">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white dark:text-gray-900">
          <Target size={20} strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-head text-[15px] font-extrabold text-text leading-tight">InternTracker</div>
          <div className="text-[10px] text-muted font-medium">by QudraQuorum</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {SECTIONS.map((section, idx) => (
          <div key={idx} className="mb-2">
            <div className="px-5 py-2 text-[10px] uppercase tracking-[1.2px] text-muted font-semibold">
              {section.label}
            </div>
            {section.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => twMerge(
                  clsx(
                    "flex items-center gap-2.5 px-5 py-2.5 font-body text-[13.5px] font-medium border-l-4 transition-all duration-200 select-none",
                    isActive 
                      ? "text-accent border-accent bg-accent/10" 
                      : "text-muted border-transparent hover:text-text hover:bg-surface2"
                  )
                )}
              >
                <item.icon size={16} strokeWidth={2} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer Area with User and subtle founders link */}
      <div className="p-4 border-t border-border flex flex-col gap-3">
        {showFounders && (
          <div className="text-[10px] text-muted p-2 rounded bg-surface2">
            <div className="font-bold mb-1">Founders:</div>
            Manthan K., Sarthak K., Saurabh G., Tanay D.
          </div>
        )}
        
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4B96FF] to-[#0A52D1] flex items-center justify-center text-[13px] font-bold text-white shrink-0">
            {userName && userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
             {isEditingName ? (
                <input 
                   autoFocus
                   value={userName}
                   onChange={(e) => setUserName(e.target.value)}
                   onBlur={() => setIsEditingName(false)}
                   onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingName(false); }}
                   className="w-[120px] text-[12.5px] font-semibold text-text bg-surface border-b border-accent focus:outline-none"
                />
             ) : (
                <div 
                   onClick={() => setIsEditingName(true)} 
                   className="text-[12.5px] font-semibold truncate text-text cursor-pointer hover:text-accent transition-colors"
                   title="Click to edit name"
                >
                   {userName || 'User'}
                </div>
             )}
             <button 
                onClick={() => setShowFounders(!showFounders)}
                className="text-[10px] text-muted font-semibold hover:underline"
             >
                Founders Info
             </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
