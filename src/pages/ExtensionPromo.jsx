import React from 'react';
import { Globe, Target, MousePointerClick, Zap } from 'lucide-react';

export default function ExtensionPromo() {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between bg-surface border border-border rounded-[var(--radius)] p-8 shadow-sm">
        <div className="flex-1 text-center md:text-left">
           <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-accent3/10 text-accent3 text-[11px] font-bold uppercase tracking-widest">
              <SparklesIcon /> Private Beta
           </div>
           <h2 className="font-head text-[32px] md:text-[40px] font-extrabold text-text mb-4 leading-tight">Clip jobs from LinkedIn in <span className="text-accent3">one click.</span></h2>
           <p className="text-[14px] text-muted max-w-lg mb-6 leading-relaxed">
             Stop copy-pasting everything. InternTracker's smart browser extension sits contextually on LinkedIn, Indeed, and Google Careers to automatically sync metadata directly to your pipeline.
           </p>
           <button className="btn btn-primary px-6 py-3 text-[14px] shadow-lg shadow-accent/20 flex gap-2" onClick={() => alert('Redirecting to Chrome Web Store mock...')}>
              <Globe size={18} /> Connect Extension
           </button>
        </div>
        <div className="mt-8 md:mt-0 md:ml-12 w-full max-w-sm flex-shrink-0 relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-accent3 to-accent4 rounded-2xl blur-2xl opacity-20 -z-10"></div>
           <div className="bg-surface2 border border-border rounded-xl p-4 shadow-xl translate-y-2 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-accent text-black flex items-center justify-center font-bold">🎯</div>
                    <div>
                       <div className="text-[12px] font-bold">Save to Pipeline</div>
                       <div className="text-[10px] text-muted">InternTracker Extension</div>
                    </div>
                 </div>
                 <div className="w-4 h-4 rounded-full bg-accent2/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-accent2"></div></div>
              </div>
              <div className="flex flex-col gap-2">
                 <div className="h-4 bg-border/50 rounded w-3/4"></div>
                 <div className="h-4 bg-border/50 rounded w-1/2"></div>
                 <div className="h-8 bg-accent3/20 border border-accent3/30 rounded mt-2 flex items-center justify-center text-accent3 text-[11px] font-bold uppercase tracking-wider">
                    Synced Successfully
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-surface border border-border rounded-[var(--radius)] p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-accent3/10 text-accent3 rounded-full flex items-center justify-center mb-4"><MousePointerClick size={24} /></div>
            <h3 className="font-head font-bold text-[15px] mb-2">1-Click Capture</h3>
            <p className="text-[13px] text-muted">Automatically scrapes the Company Name, Role, Link, and Job Description.</p>
         </div>
         <div className="bg-surface border border-border rounded-[var(--radius)] p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-accent2/10 text-accent2 rounded-full flex items-center justify-center mb-4"><Zap size={24} /></div>
            <h3 className="font-head font-bold text-[15px] mb-2">Instant Analyzer</h3>
            <p className="text-[13px] text-muted">Cross-references the clipped role with your default resume to give an on-page probability score.</p>
         </div>
         <div className="bg-surface border border-border rounded-[var(--radius)] p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-accent4/10 text-accent4 rounded-full flex items-center justify-center mb-4"><Target size={24} /></div>
            <h3 className="font-head font-bold text-[15px] mb-2">Status Sync</h3>
            <p className="text-[13px] text-muted">Changes made on the main dashboard reflect on the extension icon overlay natively in LinkedIn.</p>
         </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C12 22 12 16 6 16C12 16 12 10 12 10C12 10 12 16 18 16C12 16 12 22 12 22ZM21 8C21 8 21 5 18 5C21 5 21 2 21 2C21 2 21 5 24 5C21 5 21 8 21 8ZM5 8C5 8 5 4 1 4C5 4 5 0 5 0C5 0 5 4 9 4C5 4 5 8 5 8Z"/>
    </svg>
  );
}
