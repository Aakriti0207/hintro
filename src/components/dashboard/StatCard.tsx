import React from 'react';
import { StatCardSkeleton } from '@/components/ui/Skeleton';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  loading = false,
}) => {
  if (loading) return <StatCardSkeleton />;

  return (
    <div
      className="bg-white rounded-[10px] px-5 py-4 border border-[#EAEAEA] shadow-sm min-h-[92px]"
      role="article"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center gap-4 h-full">
  
        <div
        className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
        >
          <span style={{ color: iconColor }}>
          {icon}
          </span>
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <span className="text-[14px] text-gray-500 font-medium">
          {label}
          </span>

          <p className="text-[16px] font-semibold text-[#111827] mt-1 leading-none">
          {value}
          </p>
        </div>
      </div>
    </div>
  );
};
