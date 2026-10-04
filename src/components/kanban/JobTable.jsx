import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const STATUS_TAGS = { 
  Saved: 'tag-blue', 
  Applied: 'tag-orange', 
  Interview: 'tag-purple', 
  Offer: 'tag-green', 
  Rejected: 'tag-red' 
};

export default function JobTable({ jobs, onDelete }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-[var(--radius)] p-10 text-center text-muted font-body">
         No applications found. Click '+ Add Internship' to get started!
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-[var(--radius)] overflow-x-auto shadow-sm">
      <table className="w-full text-left border-collapse text-[13px] font-body">
        <thead>
          <tr className="bg-surface2 border-b border-border">
            <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Company</th>
            <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Role</th>
            <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Status</th>
            <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Match Score</th>
            <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Deadline</th>
            <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted">Location</th>
            <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-muted text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => {
            const scoreClass = job.score >= 75 ? 'bg-accent2/10 text-accent2' : job.score >= 50 ? 'bg-accent/10 text-accent' : 'bg-danger/10 text-danger';
            const daysLeft = Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24));
            const isUrgent = daysLeft <= 3 && job.status !== 'Rejected' && job.status !== 'Offer';

            return (
              <tr key={job.id} className="border-b border-border last:border-b-0 hover:bg-surface2/50 transition-colors">
                <td className="py-3 px-4 font-bold text-text">{job.company}</td>
                <td className="py-3 px-4 font-medium">{job.role}</td>
                <td className="py-3 px-4">
                  <span className={twMerge(clsx("tag", STATUS_TAGS[job.status] || "bg-surface2 text-muted"))}>
                    {job.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {job.score ? (
                    <span className={clsx("tag font-bold", scoreClass)}>{job.score}%</span>
                  ) : <span className="text-muted">—</span>}
                </td>
                <td className="py-3 px-4">
                  {isUrgent ? (
                    <span className="text-danger font-bold">{job.deadline} ({daysLeft}d!)</span>
                  ) : job.deadline || <span className="text-muted">—</span>}
                </td>
                <td className="py-3 px-4 font-medium">{job.location || <span className="text-muted">—</span>}</td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => onDelete(job.id)} className="p-1 text-muted hover:text-danger hover:bg-danger/10 rounded transition-colors" title="Delete">
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
