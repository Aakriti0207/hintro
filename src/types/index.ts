// User types
export type UserId = 'u1' | 'u2';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

// Dashboard
export interface UsageKbFiles {
  used: number;
  limit: number;
  percentage: number;
}

export interface DashboardUsage {
  kb_files: UsageKbFiles;
  vocab_terms: number;
  notes: number;
}

export interface Subscription {
  plan: string;
  billing_cycle: string;
  status: string;
}

export interface DashboardData {
  user: UserProfile;
  subscription: Subscription | null;
  usage: DashboardUsage;
}

// Call Session Stats
export interface CallSessionStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

// Call Session
export interface Participant {
  name: string;
  isUser: boolean;
}

export interface CallSession {
  _id: string;
  user_id: string;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  auto_gen_ai_response: boolean;
  save_transcript: boolean;
  transcript: null | string;
  transcript_final: boolean;
  ai_interactions: number;
  call_framework_id: null | string;
  participants: Participant[];
  ended_reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CallSessionsResponse {
  callSessions: CallSession[];
  pagination: Pagination;
}

// Feedback
export interface FeedbackEntry {
  id: string;
  message: string;
  rating: number;
  timestamp: string;
}

// Grouped calls
export interface GroupedCallSessions {
  [date: string]: CallSession[];
}
