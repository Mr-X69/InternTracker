import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';

const STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function Board({ jobs, setJobs, searchQuery = '' }) {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Local Storage state update via props
    // Support either string ID or number ID from draggableId
    const jobIndex = jobs.findIndex(j => String(j.id) === String(draggableId));
    if (jobIndex === -1) return;

    const newJobs = [...jobs];
    newJobs[jobIndex] = { ...newJobs[jobIndex], status: destination.droppableId };
    
    setJobs(newJobs);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-3.5 overflow-x-auto pb-4 h-[calc(100vh-280px)] scrollbar-thin">
        {STATUSES.map(status => {
           let colJobs = jobs.filter(job => job.status === status);
           if (searchQuery) {
              colJobs = colJobs.filter(j => 
                 (j.company || '').toLowerCase().includes(searchQuery) ||
                 (j.role || '').toLowerCase().includes(searchQuery)
              );
           }
           return (
             <Column 
               key={status} 
               status={status} 
               jobs={colJobs} 
             />
           );
        })}
      </div>
    </DragDropContext>
  );
}
