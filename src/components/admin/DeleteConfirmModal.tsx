import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  companyName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, companyName, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-4 text-red-600 mb-4">
          <AlertTriangle className="w-8 h-8" />
          <h2 className="text-xl font-semibold">Delete Confirmation</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the form submission for <span className="font-semibold">{companyName}</span>? 
          This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 
                     transition-colors font-medium"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 
                     transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}