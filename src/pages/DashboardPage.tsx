import React, { useEffect } from 'react';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { RecentCalls } from '@/components/dashboard/RecentCalls';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAppStore } from '@/store';

export const DashboardPage: React.FC = () => {
  useDashboardData();
  const { loadFeedbackFromStorage } = useAppStore();

  useEffect(() => {
    loadFeedbackFromStorage();
  }, [loadFeedbackFromStorage]);

  return (
    <div className="w-full max-w-[980px] mx-auto px-6 py-6 space-y-5">
      {/* Welcome */}
      <WelcomeSection />

      {/* Stats */}
      <StatsGrid />

      {/* Recent Calls */}
      <RecentCalls />
    </div>
  );
};
