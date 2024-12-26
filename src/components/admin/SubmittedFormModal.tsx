import { X } from 'lucide-react';

interface SubmittedFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmittedFormModal({ isOpen, onClose }: SubmittedFormModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#002F49]">Client Verification Verified</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Thank you for submitting your information.
        </p>
        <div className="flex items-center gap-2 mb-4">
          <p>
            Your information has been successfully verified.
          </p>
        </div>
      </div>
    </div>
  );
}