import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import JobTracker from './pages/JobTracker';
import DeadlineReminders from './pages/DeadlineReminders';
import SearchMetrics from './pages/SearchMetrics';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeBuilder from './pages/ResumeBuilder';
import CoverLetter from './pages/CoverLetter';
import Checker from './pages/Checker';
import Keywords from './pages/Keywords';
import ContactTracker from './pages/ContactTracker';
import InterviewTracker from './pages/InterviewTracker';
import ExtensionPromo from './pages/ExtensionPromo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_JOBS } from './utils/mockData';

function App() {
  const [jobs, setJobs] = useLocalStorage('intern_tracker_data', INITIAL_JOBS);

  // Global Deadline Sweeper
  useEffect(() => {
    let mutated = false;
    const now = new Date();
    now.setHours(0,0,0,0); // start of today
    
    const sweptJobs = jobs.map(job => {
      // Check if deadline is past (and it's not already logged as rejected/offer etc)
      if (job.deadline && !['Offer', 'Rejected', 'Expired'].includes(job.status)) {
         const dDate = new Date(job.deadline);
         if (dDate < now) {
            mutated = true;
            return { ...job, status: 'Expired' };
         }
      }
      return job;
    });

    if (mutated) {
      setJobs(sweptJobs);
    }
  }, [jobs, setJobs]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tracker" element={<JobTracker />} />
          <Route path="reminders" element={<DeadlineReminders />} />
          <Route path="metrics" element={<SearchMetrics />} />
          
          <Route path="tools/analyzer" element={<ResumeAnalyzer />} />
          <Route path="tools/resume-builder" element={<ResumeBuilder />} />
          <Route path="tools/cover-letters" element={<CoverLetter />} />
          <Route path="tools/resume-checker" element={<Checker />} />
          <Route path="tools/keywords" element={<Keywords />} />

          <Route path="manage/contacts" element={<ContactTracker />} />
          <Route path="manage/interviews" element={<InterviewTracker />} />
          
          <Route path="extension" element={<ExtensionPromo />} />
          
          <Route path="*" element={<div className="p-10 text-center text-muted animate-in fade-in zoom-in font-bold">Feature under construction!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
