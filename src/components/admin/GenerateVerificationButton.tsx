import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { generateVerificationLink } from '../../services/verificationService';
import { VerificationLinkModal } from './VerificationLinkModal';

interface Props {
  formId: string;
  setFormStatus: () => void;
}

export function GenerateVerificationButton({ formId, setFormStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationLink, setVerificationLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const link = await generateVerificationLink(formId);
      setVerificationLink(link);
      setFormStatus();
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to generate link');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors
                 disabled:opacity-50"
      >
        <Link className="w-4 h-4" />
        {loading ? 'Generating...' : 'Generate Client Link'}
      </button>
      
      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}

      <VerificationLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        verificationLink={verificationLink}
      />
    </>
  );
}