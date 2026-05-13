import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => (
  <div className={`skeleton ${className}`} style={style} aria-hidden="true" />
);

export const StatCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
    <div className="flex items-center gap-3 mb-3">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <Skeleton className="h-3.5 w-24 rounded" />
    </div>
    <Skeleton className="h-7 w-16 rounded mt-1" />
  </div>
);

export const CallSessionSkeleton: React.FC = () => (
  <div className="flex items-center gap-3 py-3 px-3">
    <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <Skeleton className="h-3.5 w-28 rounded mb-1.5" />
      <div className="flex gap-1">
        <Skeleton className="w-1.5 h-1.5 rounded-full" />
        <Skeleton className="w-1.5 h-1.5 rounded-full" />
        <Skeleton className="w-1.5 h-1.5 rounded-full" />
      </div>
    </div>
    <Skeleton className="h-3.5 w-16 rounded" />
    <Skeleton className="w-6 h-6 rounded" />
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="flex items-center gap-2.5">
    <Skeleton className="w-8 h-8 rounded-full" />
    <Skeleton className="h-3.5 w-20 rounded hidden sm:block" />
    <Skeleton className="w-4 h-4 rounded hidden sm:block" />
  </div>
);
