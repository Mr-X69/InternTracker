import React from 'react';
import Board from '../components/kanban/Board';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_JOBS } from '../utils/mockData';

export default function JobTracker() {
  const [jobs, setJobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
     const handler = (e) => setSearch(e.detail.toLowerCase());
     window.addEventListener('internSearch', handler);
     return () => window.removeEventListener('internSearch', handler);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-[17px] font-bold text-text">📋 Pipeline Board</h2>
      </div>
      <div className="flex-1 mt-2 w-full max-w-full overflow-x-hidden">
        <Board jobs={jobs} setJobs={setJobs} searchQuery={search} />
      </div>
    </div>
  );
}
