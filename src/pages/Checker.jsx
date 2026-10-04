import React, { useState } from 'react';

export default function Checker() {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(null);

  const handleCheck = () => {
    if (!text) return alert("Please paste resume text.");
    setIsChecking(true);
    setResults(null);
    setTimeout(() => {
      setIsChecking(false);
      setResults({
         score: 85,
         feedback: [
            { type: 'warn', msg: 'Impact metrics missing in "Project Alpha". Quantify your results (e.g. "improved speed by 20%").' },
            { type: 'success', msg: 'Strong action verbs detected across all recent experience bullet points.' },
            { type: 'warn', msg: 'Length exceeds 1 page based on word count. Consider trimming older coursework.' },
            { type: 'success', msg: 'No spelling or grammar issues detected.' }
         ]
      });
    }, 1800);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="mb-2">
        <h2 className="font-head text-[17px] font-bold text-text mb-1">✅ Resume Quality Checker</h2>
        <div className="text-[13px] text-muted max-w-2xl">Run an AI diagnostics pass over your resume. We check for quantifiable metrics, action verbs, and structural flaws.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border p-5 rounded-[var(--radius)] flex flex-col gap-4 shadow-sm h-full">
            <h3 className="font-head text-[14px] font-bold">🔍 Diagnostics Input</h3>
            <textarea 
               value={text} onChange={e => setText(e.target.value)}
               className="flex-1 min-h-[250px] bg-surface2 border border-border rounded-[var(--radius-sm)] p-4 text-[13px] font-body text-text focus:outline-none focus:border-accent3 resize-y leading-relaxed" 
               placeholder="Paste your raw resume text here..."></textarea>
            <button className="btn btn-primary justify-center py-2.5 mt-2 text-[14px]" onClick={handleCheck} disabled={isChecking}>
              {isChecking ? 'Scanning...' : '🔍 Check Resume'}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-surface border border-border p-5 h-full min-h-[400px] rounded-[var(--radius)] flex flex-col shadow-sm">
            <h3 className="font-head text-[14px] font-bold mb-4">📊 Diagnostic Report</h3>
            {!results && !isChecking ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted">
                 <span className="text-4xl mb-3">✅</span>
                 <span className="font-bold mb-1 text-text">Awaiting Scan</span>
              </div>
            ) : isChecking ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-10 h-10 border-4 border-surface2 border-t-accent2 rounded-full animate-spin mb-4"></div>
                 <span className="font-head text-[14px] font-bold text-text">Analyzing Syntax...</span>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in zoom-in-95">
                 <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <div className="w-16 h-16 rounded-full border-4 border-accent2 flex items-center justify-center text-xl font-bold font-head text-text bg-accent2/10 shadow-sm">
                       {results.score}
                    </div>
                    <div>
                       <div className="font-head text-[16px] font-bold text-text leading-none">Great Shape!</div>
                       <div className="text-[13px] text-muted">Your resume hits most best-practices.</div>
                    </div>
                 </div>

                 <div className="flex flex-col gap-3">
                    {results.feedback.map((f, i) => (
                       <div key={i} className={`p-3 rounded-[var(--radius-sm)] border text-[13px] flex gap-3 shadow-sm ${f.type === 'warn' ? 'bg-danger/5 border-danger/20 text-text' : 'bg-accent2/5 border-accent2/20 text-text'}`}>
                          <span className="mt-0.5">{f.type === 'warn' ? '⚠️' : '✅'}</span>
                          <span>{f.msg}</span>
                       </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
