import { create } from 'zustand';
import { LOCAL_STORAGE_KEYS, DEFAULT_USER_ID } from '@/constants';
import type {
  UserId,
  UserProfile,
  DashboardData,
  CallSessionStats,
  CallSessionsResponse,
  FeedbackEntry,
} from '@/types';
import { generateId } from '@/utils';

interface AppState {
  // User
  userId: UserId;
  setUserId: (id: UserId) => void;

  // Profile
  profile: UserProfile | null;
  profileLoading: boolean;
  profileError: string | null;
  setProfile: (p: UserProfile | null) => void;
  setProfileLoading: (v: boolean) => void;
  setProfileError: (e: string | null) => void;

  // Dashboard
  dashboard: DashboardData | null;
  dashboardLoading: boolean;
  dashboardError: string | null;
  setDashboard: (d: DashboardData | null) => void;
  setDashboardLoading: (v: boolean) => void;
  setDashboardError: (e: string | null) => void;

  // Stats
  stats: CallSessionStats | null;
  statsLoading: boolean;
  statsError: string | null;
  setStats: (s: CallSessionStats | null) => void;
  setStatsLoading: (v: boolean) => void;
  setStatsError: (e: string | null) => void;

  // Call Sessions
  callSessions: CallSessionsResponse | null;
  callSessionsLoading: boolean;
  callSessionsError: string | null;
  setCallSessions: (cs: CallSessionsResponse | null) => void;
  setCallSessionsLoading: (v: boolean) => void;
  setCallSessionsError: (e: string | null) => void;

  // Feedback
  feedbackList: FeedbackEntry[];
  addFeedback: (message: string, rating: number) => void;
  loadFeedbackFromStorage: () => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  logoutModalOpen: boolean;
  setLogoutModalOpen: (v: boolean) => void;
  feedbackModalOpen: boolean;
  setFeedbackModalOpen: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // User
  userId: (localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID) as UserId) || DEFAULT_USER_ID,
  setUserId: (id) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, id);
    set({ userId: id });
  },

  // Profile
  profile: null,
  profileLoading: false,
  profileError: null,
  setProfile: (p) => set({ profile: p }),
  setProfileLoading: (v) => set({ profileLoading: v }),
  setProfileError: (e) => set({ profileError: e }),

  // Dashboard
  dashboard: null,
  dashboardLoading: false,
  dashboardError: null,
  setDashboard: (d) => set({ dashboard: d }),
  setDashboardLoading: (v) => set({ dashboardLoading: v }),
  setDashboardError: (e) => set({ dashboardError: e }),

  // Stats
  stats: null,
  statsLoading: false,
  statsError: null,
  setStats: (s) => set({ stats: s }),
  setStatsLoading: (v) => set({ statsLoading: v }),
  setStatsError: (e) => set({ statsError: e }),

  // Call Sessions
  callSessions: null,
  callSessionsLoading: false,
  callSessionsError: null,
  setCallSessions: (cs) => set({ callSessions: cs }),
  setCallSessionsLoading: (v) => set({ callSessionsLoading: v }),
  setCallSessionsError: (e) => set({ callSessionsError: e }),

  // Feedback
  feedbackList: [],
  addFeedback: (message, rating) => {
    const entry: FeedbackEntry = {
      id: generateId(),
      message,
      rating,
      timestamp: new Date().toISOString(),
    };
    const current = get().feedbackList;
    const updated = [entry, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEYS.FEEDBACK, JSON.stringify(updated));
    set({ feedbackList: updated });
  },
  loadFeedbackFromStorage: () => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.FEEDBACK);
      if (raw) {
        set({ feedbackList: JSON.parse(raw) });
      }
    } catch {
      set({ feedbackList: [] });
    }
  },

  // UI
  sidebarOpen: false,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  logoutModalOpen: false,
  setLogoutModalOpen: (v) => set({ logoutModalOpen: v }),
  feedbackModalOpen: false,
  setFeedbackModalOpen: (v) => set({ feedbackModalOpen: v }),
}));
