import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';

const STATUS_COLORS = { 
  Saved: '#4f46e5', // accent3
  Applied: '#2563EB', // accent
  Interview: '#9A3412', // accent4 mapped roughly
  Offer: '#059669', // accent2
  Rejected: '#DC2626' // danger
};

export default function Column({ status, jobs }) {
  const dotColor = STATUS_COLORS[status] || '#8b949e';

  return (
    <div className="min-w-[240px] w-[240px] bg-surface flex flex-col rounded-[var(--radius)] overflow-hidden shrink-0 border border-border">
      {/* Column Header */}
      <div className="px-3.5 py-3 border-b border-border flex items-center justify-between bg-surface/50">
        <div className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 text-text">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
          {status}
        </div>
        <div className="text-[11px] text-muted font-semibold bg-surface2 px-1.5 rounded">
          {jobs.length}
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto p-2.5 flex flex-col gap-2 min-h-[150px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-surface2/50' : ''
            }`}
          >
            {jobs.map((job, index) => (
              <Card key={job.id} job={job} index={index} />
            ))}
            {provided.placeholder}
            
            {jobs.length === 0 && !snapshot.isDraggingOver && (
              <div className="m-auto text-center py-4 text-muted text-xs font-medium">
                No applications
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
