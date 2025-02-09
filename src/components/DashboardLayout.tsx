import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { DashboardLayoutProps } from '../interface/dashboardLayout.interface';

export default function DashboardLayout({
  children,
  appName,
  username,
  onLogout,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        appName={appName}
        username={username}
        onLogout={onLogout}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="flex flex-1 overflow-hidden">

        <div
          className={`
            fixed inset-0 z-40 bg-black/50 transition-opacity 
            ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            md:hidden
          `}
          onClick={handleToggleSidebar}
        ></div>

        <aside
          className={`
            fixed top-[3.6rem] bottom-0 left-0 z-50 w-64
            bg-white border-r border-gray-200 shadow-md
            transform transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:static md:translate-x-0
          `}
        >
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
