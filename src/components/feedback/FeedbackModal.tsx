import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store';
import toast from 'react-hot-toast';

export const FeedbackModal: React.FC = () => {
  const { feedbackModalOpen, setFeedbackModalOpen, addFeedback } = useAppStore();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // Simulate save
    addFeedback(message.trim(), rating);
    toast.success('Thanks for your feedback! 🎉');
    setMessage('');
    setRating(0);
    setHoverRating(0);
    setSubmitting(false);
    setFeedbackModalOpen(false);
  };

  const handleClose = () => {
    setFeedbackModalOpen(false);
    setMessage('');
    setRating(0);
    setHoverRating(0);
  };

  return (
    <Modal open={feedbackModalOpen} onClose={handleClose} className="w-full max-w-md p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-base font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
            Share Feedback
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Help us improve Hintro</p>
        </div>
        <button
          onClick={handleClose}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close feedback"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="px-6 py-5">
        {/* Rating */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2.5">
            How would you rate your experience?
          </label>
          <div className="flex gap-1.5" role="group" aria-label="Rating stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
                aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                aria-pressed={rating === star}
              >
                <Star
                  size={24}
                  className="transition-colors"
                  fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                  stroke={(hoverRating || rating) >= star ? '#f59e0b' : '#d1d5db'}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            htmlFor="feedback-message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your feedback
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you think, suggest improvements, or report issues..."
            rows={4}
            className="w-full px-3.5 py-3 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
            maxLength={500}
          />
          <div className="flex justify-end mt-1">
            <span className="text-[11px] text-gray-400">{message.length}/500</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSubmit}
            loading={submitting}
            disabled={!message.trim() || rating === 0}
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Feedback History Modal
export const FeedbackHistoryModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { feedbackList } = useAppStore();

  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-md p-0 overflow-hidden max-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
        <div>
          <h2 className="text-base font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
            Feedback History
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">{feedbackList.length} submission{feedbackList.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-6 py-4">
        {feedbackList.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-gray-400">No feedback submitted yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {feedbackList.map((entry) => (
              <div key={entry.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        fill={entry.rating >= s ? '#f59e0b' : 'none'}
                        stroke={entry.rating >= s ? '#f59e0b' : '#d1d5db'}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {new Date(entry.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{entry.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
