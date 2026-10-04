import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import SmartAddModal from '../modals/SmartAddModal';

export default function Card({ job, index }) {
  const [isEditing, setIsEditing] = React.useState(false);
  
  // Score class logic
  let scoreClass = 'bg-danger/15 text-danger';
  if (job.score >= 75) scoreClass = 'bg-accent2/20 text-accent2';
  else if (job.score >= 50) scoreClass = 'bg-accent/20 text-accent';

  // Deadline warn logic
  const daysLeft = Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  let deadlineWarn = null;
  if (daysLeft <= 3 && daysLeft >= 0) {
    deadlineWarn = <div className="text-[10px] text-danger mt-1.5 font-semibold flex items-center gap-1">⚠️ {daysLeft}d left</div>;
  } else if (daysLeft <= 7 && daysLeft >= 0) {
    deadlineWarn = <div className="text-[10px] text-accent mt-1.5 font-semibold flex items-center gap-1">⏰ {daysLeft}d left</div>;
  }

  return (
    <>
    <Draggable draggableId={String(job.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={twMerge(
            clsx(
              "bg-surface2 border border-border rounded-[var(--radius-sm)] p-3 cursor-pointer relative select-none group/card",
              "transition-all duration-200 hover:border-accent3 hover:-translate-y-[1px] hover:shadow-custom",
              snapshot.isDragging && "border-accent3 shadow-custom rotate-2 z-50 bg-surface/90 backdrop-blur-md"
            )
          )}
          style={provided.draggableProps.style}
        >
          {job.score > 0 && (
            <div className={clsx("absolute top-2.5 right-6 text-[10px] font-extrabold px-1.5 py-[2px] rounded-full", scoreClass)}>
              {job.score}%
            </div>
          )}
          
          <button 
             onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
             className="absolute top-2 right-1.5 p-1 text-muted hover:text-text opacity-0 group-hover/card:opacity-100 transition-opacity"
             title="Edit"
          >
             ✏️
          </button>

          <div className="text-[11px] text-muted font-semibold uppercase tracking-wide mb-0.5 pr-8 truncate">
            {job.company}
          </div>
          <div className="text-[13px] font-semibold text-text mb-1.5 pr-4 truncate">
            {job.role}
          </div>

          <div className="flex flex-wrap gap-1 mb-1.5">
            {job.location && (
              <span className="tag tag-blue">{job.location}</span>
            )}
            {job.stipend && (
               <span className="tag tag-green">₹{Number(job.stipend).toLocaleString()}</span>
            )}
          </div>

          <div className="text-[10px] text-muted font-medium mt-1.5 flex items-center gap-1 flex-wrap">
             📅 {job.deadline}
             <span className="opacity-50 mx-1">|</span>
             <span className="font-bold uppercase tracking-wider">{job.status}</span>
          </div>
          {deadlineWarn}
        </div>
      )}
    </Draggable>
    {isEditing && (
       <SmartAddModal isOpen={true} onClose={() => setIsEditing(false)} jobToEdit={job} />
    )}
    </>
  );
}
