import React from 'react';
import { useAppStore } from '@/store';

export const UserSwitcher: React.FC = () => {
  const {
    userId,
    setUserId,
    setProfile,
    setDashboard,
    setStats,
    setCallSessions,
  } = useAppStore();

  const handleSwitch = (id: 'u1' | 'u2') => {
    if (id === userId) return;
    setUserId(id);
    setProfile(null);
    setDashboard(null);
    setStats(null);
    setCallSessions(null);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 bg-gray-900 rounded-full px-1 py-1 shadow-lg border border-gray-700"
      title="Dev: Switch User"
      aria-label="User switcher"
    >
      <span className="text-gray-500 text-[10px] font-mono px-2">DEV</span>
      {(['u1', 'u2'] as const).map((id) => (
        <button
          key={id}
          onClick={() => handleSwitch(id)}
          className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all ${
            userId === id
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          aria-pressed={userId === id}
          aria-label={`Switch to user ${id}`}
        >
          {id}
        </button>
      ))}
    </div>
  );
};
