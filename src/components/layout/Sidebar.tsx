import React, { useState } from 'react';
import {
  LayoutDashboard,
  Phone,
  BookOpen,
  MessageSquare,
  Settings2,
  Info,
  MessageCircle,
  History,
  Zap,
  X,
  ChevronDown,
} from 'lucide-react';
import { useAppStore } from '@/store';
import { FeedbackModal, FeedbackHistoryModal } from '@/components/feedback/FeedbackModal';
import { color } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasInfo?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'call-insights', label: 'Call Insights', icon: <Phone size={16} /> },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: <BookOpen size={16} />, hasInfo: true },
  { id: 'prompts', label: 'Prompts', icon: <MessageSquare size={16} />, hasInfo: true },
  { id: 'boxy-controls', label: 'Boxy Controls', icon: <Settings2 size={16} />, hasInfo: true },
];

interface SidebarContentProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  onClose?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ activeNav, setActiveNav, onClose }) => {
  const { setFeedbackModalOpen } = useAppStore();
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-col h-full"
        style={{ background: 'white' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="text-[18px] font-semibold tracking-[-0.02em]">
              Hintro
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-black/10 transition-colors hover:text-black"
              aria-label="Close sidebar"
            >
              <X size={18}
                strokeWidth={1.8} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 overflow-y-auto sidebar-scroll" aria-label="Main navigation">
          <div className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  onClose?.();
                }}
                className={`sidebar-item w-full text-left ${activeNav === item.id ? 'active' : ''}`}
                aria-current={activeNav === item.id ? 'page' : undefined}
              >
                <span
                  className={`transition-colors ${
                    activeNav === item.id? 'text-[#635BFF]': 'text-[#000000]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.hasInfo && (
                  <Info
                    size={12}
                    className= "transition-colors flex-shrink-0"
                    aria-label={`Info about ${item.label}`}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4 flex-shrink-0 space-y-0.5 border-t border-[#F1F1F1] pt-3">
          <button
            onClick={() => setHistoryOpen(true)}
            className="sidebar-item w-full text-left"
            aria-label="View feedback history"
          >
            <History size={16} />
            <span>Feedback History</span>
          </button>
          <button
            className="sidebar-item w-full text-left"
            aria-label="Submit feedback"
          >
            <MessageCircle size={16} />
            <span>Feedback</span>
          </button>

          {/* Upgrade */}
          <div className="pt-2">
            <button className="
                      w-full
                      h-[30px]
                      rounded-[6px]
                      text-[11px]
                      font-medium
                      text-white
                      bg-[#8B8B8B]
                      hover:bg-[#7A7A7A]
                      transition-all
                    "
            >
            Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* <FeedbackHistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} /> */}
    </>
  );
};

interface SidebarProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeNav, setActiveNav }) => {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0"
        style={{
          width: 'var(--sidebar-width)',
          boxShadow: 'var(--shadow-sidebar)',
        }}
        aria-label="Sidebar navigation"
      >
        <SidebarContent activeNav={activeNav} setActiveNav={setActiveNav} />
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="overlay md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed inset-y-0 left-0 z-50 md:hidden animate-slide-in-left"
            style={{ width: 'var(--sidebar-width)' }}
            aria-label="Mobile navigation"
          >
            <SidebarContent
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              onClose={() => setSidebarOpen(false)}
            />
          </aside>
        </>
      )}
    </>
  );
};
