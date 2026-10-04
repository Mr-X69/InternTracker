import React, { useState, useEffect } from 'react';
import { CalendarClock, X } from 'lucide-react';

export default function DeadlineToast() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // exactly 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="bg-surface border border-border shadow-2xl rounded-[var(--radius)] w-[320px] overflow-hidden group">
         <div className="p-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-danger/10 border border-danger/20 text-danger flex items-center justify-center shrink-0 mt-0.5">
               <CalendarClock size={16} strokeWidth={2.5} />
            </div>
            <div className="flex-1 pt-0.5">
               <div className="font-head text-[13px] font-bold text-text mb-0.5">Deadline Approaching</div>
               <div className="text-[11.5px] text-muted leading-tight">Datadog Distributed Systems Intern ends in <strong className="text-danger">18 hours</strong></div>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-muted hover:text-text p-1 translate-x-1 -translate-y-1 transition-colors">
               <X size={14} />
            </button>
         </div>
         {/* Descending Progress Bar */}
         <div className="h-[3px] bg-danger/20 w-full rounded-b-full">
            <div className="h-full bg-danger rounded-b-full origin-left animate-toast-progress" style={{ animationDuration: '5000ms', animationTimingFunction: 'linear', animationFillMode: 'forwards' }}></div>
         </div>
      </div>
    </div>
  );
}
