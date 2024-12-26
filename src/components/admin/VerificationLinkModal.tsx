import React, { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';

interface VerificationLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  verificationLink: string;
}

export function VerificationLinkModal({ isOpen, onClose, verificationLink }: VerificationLinkModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(verificationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#002F49]">Client Verification Link</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Share this link with your client to verify their information. The link will expire in 24 hours.
        </p>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={verificationLink}
            readOnly
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#002F49] text-white"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Note: This link contains sensitive information and should only be shared with the client.
        </div>
      </div>
    </div>
  );
}