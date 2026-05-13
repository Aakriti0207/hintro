import React from 'react';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store';
import { Skeleton } from '@/components/ui/Skeleton';
import { Phone } from 'lucide-react';

export const WelcomeSection: React.FC = () => {
  const { profile, profileLoading } = useAppStore();

  const firstName = profile?.firstName || 'there';

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {profileLoading ? (
          <>
            <Skeleton className="h-6 w-56 mb-2 rounded-lg" />
            <Skeleton className="h-3.5 w-44 rounded" />
          </>
        ) : (
          <>
            <h2
              className="text-[20px] font-semibold tracking-[-0.03em] leading-[1.1] text-gray-900 leading-snug"
            >
              Hi, {firstName} 👋 Welcome to Hintro
            </h2>
            <p className="text-[12px] text-black-400 mt-1">
              Ready to make your next call smarter?
            </p>
          </>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="
          !bg-[#0F172A]
          hover:!bg-[#111827]
          !text-white
          rounded-[6px]
          px-4
        "
        aria-label="Start a new call"
      >
        Start New Call
      </Button>
    </div>
  );
};
