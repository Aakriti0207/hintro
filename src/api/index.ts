import axios from 'axios';
import { API_BASE_URL, LOCAL_STORAGE_KEYS, DEFAULT_USER_ID } from '@/constants';
import type {
  UserProfile,
  DashboardData,
  CallSessionStats,
  CallSessionsResponse,
} from '@/types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Attach x-user-id to every request
apiClient.interceptors.request.use((config) => {
  const userId =
    localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID) || DEFAULT_USER_ID;
  config.headers['x-user-id'] = userId;
  return config;
});

// Response error handling
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export const api = {
  getProfile: (): Promise<UserProfile> =>
    apiClient.get('/api/auth/profile').then((r) => r.data),

  getDashboard: (): Promise<DashboardData> =>
    apiClient.get('/api/auth/dashboard').then((r) => r.data),

  getStats: (): Promise<CallSessionStats> =>
    apiClient.get('/api/call-sessions/stats').then((r) => r.data),

  getCallSessions: (limit = 10): Promise<CallSessionsResponse> =>
    apiClient
      .get('/api/call-sessions', { params: { limit } })
      .then((r) => r.data),
};

export default apiClient;
