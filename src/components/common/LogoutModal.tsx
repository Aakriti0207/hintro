import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store';

export const LogoutModal: React.FC = () => {
  const { logoutModalOpen, setLogoutModalOpen } = useAppStore();

  const handleLogout = () => {
    setLogoutModalOpen(false);
    // In a real app, clear auth tokens, redirect to login
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Modal
      open={logoutModalOpen}
      onClose={() => setLogoutModalOpen(false)}
      className="w-full max-w-sm p-7"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
        Leaving already?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        You can log back in anytime to continue your meetings with Hintro.
      </p>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setLogoutModalOpen(false)}
          aria-label="Cancel logout"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1 bg-gray-900 hover:bg-gray-800"
          onClick={handleLogout}
          aria-label="Confirm logout"
        >
          Log out
        </Button>
      </div>
    </Modal>
  );
};
