import React from 'react';
import { Phone, Clock, Cpu, CalendarClock } from 'lucide-react';
import { StatCard } from './StatCard';
import { useAppStore } from '@/store';
import { formatDuration, formatLastSession } from '@/utils';

export const StatsGrid: React.FC = () => {
  const { stats, statsLoading } = useAppStore();

  const cards = [
    {
      label: 'Total Sessions',
      value: statsLoading ? '' : (stats?.totalSessions ?? 0).toString(),
      icon: <Phone size={16} />,
      iconBg: '#FDECEA',
      iconColor: '#E5534B',
    },
    {
      label: 'Average Duration',
      value: statsLoading ? '' : formatDuration(stats?.averageDuration ?? 0),
      icon: <Clock size={16} />,
      iconBg: '#E8F4FD',
      iconColor: '#3B82F6',
    },
    {
      label: 'AI Used',
      value: statsLoading
        ? ''
        : stats?.totalAIInteractions
        ? `${stats.totalAIInteractions} times`
        : '0',
      icon: <Cpu size={16} />,
      iconBg: '#E8FAF0',
      iconColor: '#22C55E',
    },
    {
      label: 'Last Session',
      value: statsLoading ? '' : formatLastSession(stats?.lastSession ?? []),
      icon: <CalendarClock size={16} />,
      iconBg: '#EEE9FE',
      iconColor: '#7C3AED',
    },
  ];

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      role="region"
      aria-label="Call statistics"
    >
      {cards.map((card, i) => (
        <StatCard key={i} {...card} loading={statsLoading} />
      ))}
    </div>
  );
};
