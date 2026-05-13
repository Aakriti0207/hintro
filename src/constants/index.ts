export const API_BASE_URL = 'https://mock-backend-hintro.vercel.app';

export const LOCAL_STORAGE_KEYS = {
  USER_ID: 'hintro_user_id',
  FEEDBACK: 'hintro_feedback',
} as const;

export const DEFAULT_USER_ID = 'u1';

export const AVATAR_COLORS = [
  { bg: '#6366f1', text: '#fff' }, // indigo
  { bg: '#8b5cf6', text: '#fff' }, // violet
  { bg: '#ec4899', text: '#fff' }, // pink
  { bg: '#f59e0b', text: '#fff' }, // amber
  { bg: '#10b981', text: '#fff' }, // emerald
  { bg: '#3b82f6', text: '#fff' }, // blue
  { bg: '#ef4444', text: '#fff' }, // red
  { bg: '#14b8a6', text: '#fff' }, // teal
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'call-insights', label: 'Call Insights', icon: 'Phone' },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: 'BookOpen', hasInfo: true },
  { id: 'prompts', label: 'Prompts', icon: 'MessageSquare', hasInfo: true },
  { id: 'boxy-controls', label: 'Boxy Controls', icon: 'Settings2', hasInfo: true },
] as const;
