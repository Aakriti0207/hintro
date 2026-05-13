import { useEffect, useCallback } from 'react';
import { api } from '@/api';
import { useAppStore } from '@/store';

export function useDashboardData() {
  const {
    userId,
    setProfile, setProfileLoading, setProfileError,
    setDashboard, setDashboardLoading, setDashboardError,
    setStats, setStatsLoading, setStatsError,
    setCallSessions, setCallSessionsLoading, setCallSessionsError,
  } = useAppStore();

  const fetchAll = useCallback(async () => {
    // Profile
    setProfileLoading(true);
    setProfileError(null);
    try {
      const profile = await api.getProfile();
      setProfile(profile);
    } catch {
      setProfileError('Failed to load profile');
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }

    // Dashboard
    setDashboardLoading(true);
    setDashboardError(null);
    try {
      const dashboard = await api.getDashboard();
      setDashboard(dashboard);
    } catch {
      setDashboardError('Failed to load dashboard');
      setDashboard(null);
    } finally {
      setDashboardLoading(false);
    }

    // Stats
    setStatsLoading(true);
    setStatsError(null);
    try {
      const stats = await api.getStats();
      setStats(stats);
    } catch {
      setStatsError('Failed to load stats');
      setStats(null);
    } finally {
      setStatsLoading(false);
    }

    // Call Sessions
    setCallSessionsLoading(true);
    setCallSessionsError(null);
    try {
      const sessions = await api.getCallSessions(10);
      setCallSessions(sessions);
    } catch {
      setCallSessionsError('Failed to load call sessions');
      setCallSessions(null);
    } finally {
      setCallSessionsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { refetch: fetchAll };
}
