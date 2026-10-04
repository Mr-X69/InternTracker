import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../utils/mockData';

export default function ResumeBuilder() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [preview, setPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [jobs, setJobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);

  const handleBuild = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      setPreview(true);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    // Simulated Resume Parsing + Heuristic ATS match map
    setTimeout(() => {
       const mockKeywords = ['react', 'node', 'frontend', 'software', 'engineer', 'api', 'ui', 'design', 'python'];
       const updatedJobs = jobs.map(job => {
          const jobText = `${job.role} ${job.company} ${job.description || ''}`.toLowerCase();
          let baseScore = 40; 
          mockKeywords.forEach(kw => {
             if (jobText.includes(kw)) baseScore += 15;
          });
          let finalScore = baseScore + Math.floor(Math.random() * 10);
          if (finalScore > 98) finalScore = 98 - Math.floor(Math.random() * 5);
          return { ...job, score: finalScore };
       });

       setJobs(updatedJobs);
       setIsUploading(false);
       alert(`Successfully extracted keywords from ${file.name}.\nGlobal Job Match Scores updated!`);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="mb-2">
        <h2 className="font-head text-[17px] font-bold text-text mb-1">📄 Resume Builder</h2>
        <div className="text-[13px] text-muted max-w-2xl">Upload a resume to extract keywords and globally match against all your saved job roles natively!</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border p-5 rounded-[var(--radius)] flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-head text-[14px] font-bold">👤 ATS Analyzer Upload</h3>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer border-2 border-dashed border-border hover:border-accent3 bg-surface2 rounded text-center py-4 transition-colors">
                <input type="file" className="hidden" accept=".pdf,.txt,.doc" onChange={handleFileUpload} disabled={isUploading} />
                <span className="text-[12px] font-bold text-text">{isUploading ? 'Scanning Resume...' : 'Click to Upload Resume (PDF/TXT)'}</span>
              </label>
            </div>
          </div>
          
          <div className="bg-surface border border-border p-5 rounded-[var(--radius)] flex flex-col gap-4 shadow-sm">
            <h3 className="font-head text-[14px] font-bold">👤 Reference Details</h3>
            
            <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase">Full Name</label><input className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3" placeholder="Alex Rivera" /></div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase">Email</label><input className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3" placeholder="email@example.com" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase">Phone</label><input className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3" placeholder="+91 9999999999" /></div>
            </div>

            <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase">Skills (Comma Separated)</label><input className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3" placeholder="React, Node.js, Python" /></div>
            
            <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase">Summary</label>
              <textarea className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3 h-20 resize-y" placeholder="A passionate software engineer..."></textarea>
            </div>

            <div className="flex gap-3 mt-1">
              <button className="btn btn-ghost flex-1 justify-center py-2.5 bg-accent3/10 text-accent3 border-transparent" onClick={() => alert('Summary generated by Gemini!')}>✨ AI Summary</button>
              <button className="btn btn-primary flex-1 justify-center py-2.5" onClick={handleBuild} disabled={isBuilding}>{isBuilding ? 'Building...' : '📄 Build PDF'}</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-surface border border-border p-5 h-[500px] rounded-[var(--radius)] flex flex-col shadow-sm">
            <h3 className="font-head text-[14px] font-bold mb-4">👁️ Preview</h3>
            {!preview ? (
              <div className="flex-1 border-2 border-dashed border-border rounded-[var(--radius-sm)] flex flex-col items-center justify-center text-center text-muted p-6">
                <span className="text-4xl mb-3">📄</span>
                <span className="font-bold mb-1 text-text">No Template Generated</span>
                <span className="text-[12px]">Fill your details and click Build.</span>
              </div>
            ) : (
              <div className="flex-1 bg-white rounded border border-border p-8 overflow-y-auto animate-in zoom-in-95 shadow-inner">
                 <div className="text-center mb-6">
                    <h1 className="text-2xl font-serif text-black font-bold">ALEX RIVERA</h1>
                    <p className="text-xs text-gray-600 mt-1">email@example.com | +91 9999999999</p>
                 </div>
                 <h2 className="text-sm font-bold border-b border-black text-black pb-1 mb-2 uppercase">Summary</h2>
                 <p className="text-xs text-gray-800 leading-relaxed mb-4">A passionate software engineering intern with deep expertise in full-stack web development. Proficient in delivering high-fidelity interfaces and connecting rigorous algorithmic backend logic across massive systems.</p>
                 
                 <h2 className="text-sm font-bold border-b border-black text-black pb-1 mb-2 uppercase">Skills</h2>
                 <p className="text-xs text-gray-800 leading-relaxed mb-4">React, Node.js, Python, TypeScript, Architecture, AWS, Graphic Design, HTML/CSS.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
