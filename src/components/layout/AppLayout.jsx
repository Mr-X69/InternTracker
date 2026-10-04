import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import DeadlineToast from '../common/DeadlineToast';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-bg text-text selection:bg-accent/20 overflow-x-hidden max-w-full">
      <DeadlineToast />
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen overflow-x-hidden min-w-0">
        <Header />
        <main className="flex-1 p-[1.75rem] flex flex-col overflow-x-hidden md:p-[2.5rem]">
          <div className="max-w-[1600px] mx-auto w-full flex flex-col flex-1 gap-6 overflow-x-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
