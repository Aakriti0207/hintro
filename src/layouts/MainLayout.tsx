import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { LogoutModal } from '@/components/common/LogoutModal';
import { FeedbackModal } from '@/components/feedback/FeedbackModal';
import { UserSwitcher } from '@/components/common/UserSwitcher';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Dashboard',
}) => {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar title={title} />
        <main
          className="flex-1 overflow-y-auto"
          id="main-content"
          tabIndex={-1}
          aria-label="Main content"
        >
          {children}
        </main>
      </div>

      {/* Global modals */}
      <LogoutModal />
      <FeedbackModal />

      {/* Dev toggle */}
      <UserSwitcher />
    </div>
  );
};
