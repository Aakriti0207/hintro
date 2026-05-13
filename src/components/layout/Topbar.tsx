import React, { useState, useRef, useEffect } from 'react';
import { Menu, Play, ChevronDown, LogOut } from 'lucide-react';
import { ProfileAvatar } from '@/components/ui/Avatar';
import { ProfileSkeleton } from '@/components/ui/Skeleton';
import { useAppStore } from '@/store';

interface TopbarProps {
  title: string;
}

export const Topbar: React.FC<TopbarProps> = ({ title }) => {
  const { profile, profileLoading, setSidebarOpen, setLogoutModalOpen } = useAppStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : 'User';

  return (
    <header
      className="flex items-center justify-between px-5 md:px-6 bg-white border-b border-gray-100 flex-shrink-0"
      style={{ height: 'var(--topbar-height)' }}
      role="banner"
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <h1
          className="text-[18px] font-semibold text-gray-900"
        >
          {title}
        </h1>
      </div>

      {/* Right: tutorial + profile */}
      <div className="flex items-center gap-3">
        {/* Watch Tutorial */}
        <button
          className="
            hidden sm:flex
            items-center
            gap-[6px]
            h-[32px]
            px-[12px]
            py-[6px]
            rounded-[6px]
            border
            border-black
            bg-white
            text-[11px]
            font-medium
            text-[#111827]
            hover:bg-[#F8F8F8]
            transition-all
          "
          aria-label="Watch tutorial"
        >
          <Play size={12} fill="currentColor" />
          Watch Tutorial
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          {profileLoading ? (
            <ProfileSkeleton />
          ) : (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-1.5 rounded-lg h-[36px] hover:bg-gray-100 transition-all"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-label="Profile menu"
            >
              <ProfileAvatar name={fullName} size={30} />
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
          )}

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-[220px] bg-white rounded-[14px] border border-gray-100 shadow-dropdown z-30 animate-scale-in py-1.5"
              role="menu"
            >
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setLogoutModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
                role="menuitem"
                aria-label="Log out"
              >
                <LogOut size={14} className="text-gray-400" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
