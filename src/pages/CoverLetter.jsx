import React, { useState } from 'react';

export default function CoverLetter() {
  const [tone, setTone] = useState('Professional & Formal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    setOutput('');
    setTimeout(() => {
      setIsGenerating(false);
      setOutput(`Dear Hiring Manager,\n\nI am writing to express my strong interest in the Software Engineering Intern position. With a solid foundation in React and Node.js, and a proven ability to deliver high-quality code in fast-paced environments, I am confident in my capacity to contribute meaningfully to your team.\n\nMy academic background and hands-on projects have equipped me with the technical acumen and problem-solving skills required to tackle complex architectural challenges. I am particularly drawn to your company's commitment to innovation and look forward to the opportunity to discuss how my background aligns with your needs.\n\nSincerely,\nAlex Rivera`);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="mb-2">
        <h2 className="font-head text-[17px] font-bold text-text mb-1">✉️ AI Cover Letter Generator</h2>
        <div className="text-[13px] text-muted max-w-2xl">Effortlessly bypass writer's block. Select a target tone and let our AI draft a structured, keyword-optimized cover letter.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border p-5 rounded-[var(--radius)] flex flex-col gap-4 shadow-sm">
            <h3 className="font-head text-[14px] font-bold">🎯 Target Setup</h3>
            
            <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase tracking-wider">Your Name</label><input className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3" placeholder="Alex Rivera" /></div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase tracking-wider">Company</label><input className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3" placeholder="Google" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase tracking-wider">Role</label><input className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3" placeholder="SWE Intern" /></div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wider">Generation Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3 text-text">
                <option>Professional & Formal</option>
                <option>Enthusiastic & Energetic</option>
                <option>Concise & Direct</option>
                <option>Creative & Unique</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5"><label className="text-[11px] font-bold text-muted uppercase tracking-wider">Job Description (Optional Context)</label>
              <textarea className="bg-surface2 border border-border rounded-[var(--radius-sm)] px-3 py-2 text-[13px] focus:outline-none focus:border-accent3 h-20 resize-y" placeholder="Paste JD snippets to explicitly tailor the output..."></textarea>
            </div>

            <button className="btn btn-primary justify-center py-2.5 mt-2 text-[14px]" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? <><span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin mr-1"></span> Drafting...</> : '✨ Generate Cover Letter'}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-surface border border-border p-5 h-full min-h-[400px] rounded-[var(--radius)] flex flex-col shadow-sm">
            <h3 className="font-head text-[14px] font-bold mb-4">📝 Output View</h3>
            {!output && !isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted">
                 <span className="text-4xl mb-3">✉️</span>
                 <span className="font-bold mb-1 text-text">Awaiting Generation</span>
                 <span className="text-[12px] max-w-[200px]">Fill the parameters and generate your custom letter.</span>
              </div>
            ) : isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-10 h-10 border-4 border-surface2 border-t-accent rounded-full animate-spin mb-4"></div>
                 <span className="font-head text-[14px] font-bold text-text animate-pulse">Consulting LLM...</span>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in slide-in-from-right-2">
                 <div className="bg-surface2 border border-border rounded-[var(--radius-sm)] p-5 text-[13px] text-text whitespace-pre-wrap leading-relaxed flex-1 font-body shadow-inner">
                   {output}
                 </div>
                 <div className="flex gap-3 mt-4">
                   <button className="btn btn-ghost flex-1 justify-center" onClick={() => alert('Saved to Mock Storage!')}>💾 Save Draft</button>
                   <button className="btn btn-primary flex-1 justify-center" onClick={() => navigator.clipboard.writeText(output).then(()=>alert('Copied!'))}>📋 Copy Text</button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
