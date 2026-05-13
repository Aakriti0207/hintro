import React from 'react';
import { PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyCallsProps {
  onStartCall?: () => void;
}

export const EmptyCalls: React.FC<EmptyCallsProps> = ({ onStartCall }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in"
      role="status"
      aria-label="No recent calls"
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'var(--stat-blue-bg)' }}
        aria-hidden="true"
      >
        <PhoneOff size={22} style={{ color: 'var(--stat-blue)' }} />
      </div>

      <h3
        className="text-sm font-semibold text-gray-700 mb-1.5"
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        No Recent Calls
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed max-w-[220px] mb-5">
        Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onStartCall}
        aria-label="Start your first call"
      >
        Start a call
      </Button>
    </div>
  );
};
