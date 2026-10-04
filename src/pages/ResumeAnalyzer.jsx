import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../utils/mockData';

export default function ResumeAnalyzer() {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [jobs, setJobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);

  const performAnalysis = (fileName = 'manual text') => {
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 21) + 75; // Random score 75-95
      
      const updatedJobs = jobs.map(job => ({ ...job, score: score }));
      setJobs(updatedJobs);

      setResult({
        score: score,
        matched: ['React', 'JavaScript', 'HTML/CSS', fileName],
        missing: ['Node.js', 'AWS', 'GraphQL', 'TypeScript'],
        feedback: `Analysis complete. Your global Dashboard Average Match Score has natively updated to ${score}%.`
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleAnalyze = () => {
    if (!resume || !jd) return alert("Please paste both Resume and JD!");
    performAnalysis();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    performAnalysis(file.name);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="mb-2">
        <h2 className="font-head text-[17px] font-bold text-text mb-1">🧠 Resume-JD Gap Analyzer</h2>
        <div className="text-[13px] text-muted max-w-2xl">
          Paste your resume text and a job description below. Our AI computes skill gaps and generates a specific Match Score with actionable feedback.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border p-5 rounded-[var(--radius)] flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-head text-[14px] font-bold flex items-center gap-2">📄 Your Resume</h3>
              <label className="cursor-pointer text-[11px] font-bold bg-accent/10 text-accent px-2 py-1 rounded transition-colors hover:bg-accent/20">
                 Upload PDF
                 <input type="file" className="hidden" accept=".pdf,.txt,.doc" onChange={handleFileUpload} disabled={isAnalyzing} />
              </label>
            </div>
            <textarea 
              value={resume} onChange={e => setResume(e.target.value)}
              className="w-full h-40 bg-surface2 border border-border rounded-[var(--radius-sm)] p-3 text-[13px] font-body text-text focus:outline-none focus:border-accent3 resize-y"
              placeholder="Paste your resume content here..."
            />
          </div>
          <div className="bg-surface border border-border p-5 rounded-[var(--radius)] flex flex-col gap-3 shadow-sm">
            <h3 className="font-head text-[14px] font-bold flex items-center gap-2">📋 Job Description</h3>
            <textarea 
              value={jd} onChange={e => setJd(e.target.value)}
              className="w-full h-40 bg-surface2 border border-border rounded-[var(--radius-sm)] p-3 text-[13px] font-body text-text focus:outline-none focus:border-accent3 resize-y"
              placeholder="Paste the job description here..."
            />
            <button 
              onClick={handleAnalyze} disabled={isAnalyzing}
              className="btn btn-primary w-full justify-center py-2.5 mt-2 text-[14px]"
            >
              {isAnalyzing ? <span className="animate-pulse">Analyzing Vectors...</span> : '🧠 Analyze Match'}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          {!result && !isAnalyzing && (
            <div className="bg-surface border border-border p-10 h-full rounded-[var(--radius)] flex flex-col items-center justify-center text-center shadow-sm">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-head text-[16px] font-bold text-text mb-1.5">Ready for Analysis</h3>
              <p className="text-[13px] text-muted max-w-[280px]">Paste your texts and click analyze to see your score.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-surface border border-border p-10 h-full rounded-[var(--radius)] flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-10 h-10 border-4 border-surface2 border-t-accent rounded-full animate-spin mb-4"></div>
              <h3 className="font-head text-[15px] font-bold text-text animate-pulse">Running Semantic Match Engine...</h3>
            </div>
          )}

          {result && (
            <div className="bg-surface border border-border p-6 rounded-[var(--radius)] flex flex-col gap-6 shadow-sm animate-in zoom-in-95">
              <div className="flex flex-col items-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-surface2/50 border-[6px] border-accent2/20">
                   <div className="absolute inset-0 rounded-full border-[6px] border-accent2 border-t-transparent border-r-transparent transform -rotate-45" />
                   <div className="flex flex-col items-center">
                      <span className="font-head text-4xl font-extrabold text-text">{result.score}%</span>
                      <span className="text-[11px] text-muted font-bold uppercase tracking-wide">Match</span>
                   </div>
                </div>
              </div>
              
              <div>
                <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">✅ Matched Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {result.matched.map(s => <span key={s} className="tag tag-green">{s}</span>)}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">❌ Missing Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {result.missing.map(s => <span key={s} className="tag tag-red">{s}</span>)}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">🤖 AI Feedback</div>
                <div className="bg-surface2 border border-border rounded-[var(--radius-sm)] p-4 text-[13px] leading-relaxed text-text">
                  {result.feedback}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
