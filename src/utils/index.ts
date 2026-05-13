import { AVATAR_COLORS } from '@/constants';
import { GroupedCallSessions, CallSession } from '@/types';

/**
 * Format seconds into human-readable duration string
 * e.g. 2211 -> "36m 51s", 8000 -> "2h 13m"
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds === 0) return '—';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

/**
 * Format date relative to now
 * e.g. "2 days ago", "Just now"
 */
export function formatRelativeDate(dateStr: string): string {
  if (!dateStr) return '—';

  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 60) return '1 month ago';
  return `${Math.floor(diffDays / 30)} months ago`;
}

/**
 * Format date for call session group header
 * e.g. "April 29th"
 */
export function formatGroupDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const suffix = getDaySuffix(day);
  return `${month} ${day}${suffix}`;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/**
 * Format time from ISO string
 * e.g. "11:00 am"
 */
export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase();
}

/**
 * Group call sessions by date
 */
export function groupSessionsByDate(sessions: CallSession[]): GroupedCallSessions {
  return sessions.reduce((groups, session) => {
    const date = new Date(session.started_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as GroupedCallSessions);
}

/**
 * Get avatar color based on name
 */
export function getAvatarColor(name: string): { bg: string; text: string } {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Format last session date for stat card
 */
export function formatLastSession(dates: string[]): string {
  if (!dates || dates.length === 0) return '—';
  const latest = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
  return formatRelativeDate(latest);
}
