import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Trash2, Download } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { formatTime, getAvatarColor, getInitials } from '@/utils';
import type { CallSession } from '@/types';

interface CallSessionRowProps {
  session: CallSession;
  index: number;
}

export const CallSessionRow: React.FC<CallSessionRowProps> = ({ session, index }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const user = session.participants.find((p) => p.isUser);
  const participantName = user?.name || session.client || 'Unknown';
  const { bg, text } = getAvatarColor(participantName);

  // Participant dots (mini dots for participants)
  const participantDots = session.participants.slice(0, 3);

  return (
    <div
      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors group animate-slide-up"
      style={{ animationDelay: `${index * 40}ms` }}
      role="row"
      aria-label={`Call session: ${session.description}`}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold font-display flex-shrink-0"
        style={{ backgroundColor: '#7C3AED', color: '#fff' }}
        aria-hidden="true"
      >
        {getInitials(participantName)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-gray-800 truncate leading-tight">
          {session.description || 'Call Session'}
        </p>
        {/* Participant dots */}
        <div className="flex gap-1 mt-1" aria-label={`${session.participants.length} participant(s)`}>
          {participantDots.map((p, i) => {
            const c = getAvatarColor(p.name);
            return (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: c.bg }}
                title={p.name}
              />
            );
          })}
        </div>
      </div>

      {/* Time */}
      <span className="text-[13px] text-black flex-shrink-0 font-mono">
        {formatTime(session.started_at)}
      </span>

      {/* Three-dot menu */}
      <div className="relative flex-shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded-md text-black hover:text-gray-600 hover:bg-gray-100 transition-all"
          aria-label="Call options"
          aria-expanded={menuOpen}
          aria-haspopup="true"
        >
          <MoreVertical size={14} />
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-100 shadow-dropdown z-20 animate-scale-in py-1"
            role="menu"
          >
            <button
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-[#FAFAFA] transition-colors"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              <Eye size={13} className="text-gray-400" />
              View Details
            </button>
            <button
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-[#FAFAFA] transition-colors"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              <Download size={13} className="text-gray-400" />
              Download
            </button>
            <div className="border-t border-gray-50 my-1" />
            <button
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              <Trash2 size={13} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
