import React from 'react';
import { EmptyCalls } from './EmptyCalls';
import { CallSessionRow } from './CallSessionRow';
import { CallSessionSkeleton } from '@/components/ui/Skeleton';
import { useAppStore } from '@/store';
import { groupSessionsByDate, formatGroupDate } from '@/utils';

export const RecentCalls: React.FC = () => {
  const { callSessions, callSessionsLoading, callSessionsError } = useAppStore();

  const sessions = callSessions?.callSessions ?? [];
  const isEmpty = !callSessionsLoading && sessions.length === 0;
  const grouped = groupSessionsByDate(sessions);

  return (
    <div className="bg-white rounded-[16px] border-gray-100 shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-gray-50 text-center">
        <h2 className="text-[16px] font-medium text-gray-800">
          Recent calls
        </h2>
      </div>

      {/* Content */}
      <div className="px-3 py-1">
        {callSessionsLoading ? (
          <div>
            {[...Array(4)].map((_, i) => (
              <CallSessionSkeleton key={i} />
            ))}
          </div>
        ) : callSessionsError ? (
          <div className="py-10 text-center">
            <p className="text-sm text-red-500">Failed to load call sessions</p>
            <p className="text-xs text-gray-400 mt-1">Please try again later</p>
          </div>
        ) : isEmpty ? (
          <EmptyCalls />
        ) : (
          <div role="table" aria-label="Recent call sessions">
            {Object.entries(grouped).map(([dateKey, group], groupIndex) => (
              <div key={dateKey} className={groupIndex > 0 ? 'mt-1' : ''}>
                {/* Date header */}
                <div
                  className="px-3 py-2 text-[12px] tracking-[0.08em] font-semibold text-gray-400 uppercase tracking-wider"
                  role="rowgroup"
                >
                  {formatGroupDate(group[0].started_at)}
                </div>
                {/* Sessions */}
                {group.map((session, i) => (
                  <CallSessionRow
                    key={session._id}
                    session={session}
                    index={groupIndex * 10 + i}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
