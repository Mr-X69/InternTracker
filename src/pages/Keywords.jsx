import React, { useState } from 'react';

export default function Keywords() {
  const [text, setText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [tags, setTags] = useState([]);

  const handleExtract = () => {
    if (!text) return alert("Please paste Job Description text.");
    setIsExtracting(true);
    setTags([]);
    setTimeout(() => {
      setIsExtracting(false);
      setTags(['Kubernetes', 'CI/CD Pipelines', 'AWS Lambda', 'React.js', 'System Architecture', 'Golang', 'Data Structures', 'REST APIs', 'Agile']);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="mb-2">
        <h2 className="font-head text-[17px] font-bold text-text mb-1">🔑 Keyword Finder</h2>
        <div className="text-[13px] text-muted max-w-2xl">Instantly rip through massive JDs to isolate the specific ATS keywords hiring algorithms look for.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border p-5 rounded-[var(--radius)] flex flex-col gap-4 shadow-sm h-full">
            <h3 className="font-head text-[14px] font-bold">📋 Job Description Input</h3>
            <textarea 
               value={text} onChange={e => setText(e.target.value)}
               className="flex-1 min-h-[250px] bg-surface2 border border-border rounded-[var(--radius-sm)] p-4 text-[13px] font-body text-text focus:outline-none focus:border-accent3 resize-y leading-relaxed" 
               placeholder="Paste JD to extract buzzwords..."></textarea>
            <button className="btn btn-primary justify-center py-2.5 mt-2 text-[14px]" onClick={handleExtract} disabled={isExtracting}>
              {isExtracting ? 'Extracting Vector Nodes...' : '🔑 Extract Keywords'}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-surface border border-border p-5 h-full min-h-[400px] rounded-[var(--radius)] flex flex-col shadow-sm">
            <h3 className="font-head text-[14px] font-bold mb-4">📌 High-Value Keywords</h3>
            {tags.length === 0 && !isExtracting ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted">
                 <span className="text-4xl mb-3">🔑</span>
                 <span className="font-bold mb-1 text-text">No JD Provided</span>
              </div>
            ) : isExtracting ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-10 h-10 border-4 border-surface2 border-t-accent4 rounded-full animate-spin mb-4"></div>
                 <span className="font-head text-[14px] font-bold text-text">Parsing Text...</span>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in fade-in">
                 <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag, i) => (
                       <div key={i} className="bg-accent4/10 border border-accent4/20 text-accent4 font-bold text-[12.5px] px-3 py-1.5 rounded-full shadow-sm hover:bg-accent4/20 cursor-default transition-colors">
                          {tag}
                       </div>
                    ))}
                 </div>
                 <div className="mt-8 text-[12.5px] text-muted p-4 bg-surface2 rounded-[var(--radius-sm)] border border-border">
                   <strong>Pro-Tip:</strong> Inject these exact phrases naturally into your Resume Summary and Work Experience bullets to bypass ATS filters effortlessly.
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
