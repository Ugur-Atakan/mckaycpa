import React from 'react';
import { Coins } from 'lucide-react';

interface Shares {
  authorizedCommon: string;
  authorizedPreferred: string;
  issuedCommon: string;
  issuedPreferred: string;
}

interface SharesSectionProps {
  shares: Shares;
  onChange: (shares: Shares) => void;
}

export function SharesSection({ shares, onChange }: SharesSectionProps) {
  const handleChange = (field: keyof Shares) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    onChange({ ...shares, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3 text-[#002F49]">
        <Coins className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Share Structure</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Authorized Shares</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Common Shares
              </label>
              <input
                type="text"
                value={shares.authorizedCommon}
                onChange={handleChange('authorizedCommon')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Shares
              </label>
              <input
                type="text"
                value={shares.authorizedPreferred}
                onChange={handleChange('authorizedPreferred')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Issued Shares</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Common Shares
              </label>
              <input
                type="text"
                value={shares.issuedCommon}
                onChange={handleChange('issuedCommon')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Shares
              </label>
              <input
                type="text"
                value={shares.issuedPreferred}
                onChange={handleChange('issuedPreferred')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}