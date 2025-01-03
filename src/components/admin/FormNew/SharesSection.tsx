import React, { useState } from 'react';
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

const formatNumber = (value: string | number) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export function SharesSection({ shares, onChange }: SharesSectionProps) {
 
   const [formattedShares, setFormattedShares] = useState<Shares>({
     authorizedCommon: formatNumber(shares.authorizedCommon),
     authorizedPreferred: formatNumber(shares.authorizedPreferred),
     issuedCommon: formatNumber(shares.issuedCommon),
     issuedPreferred: formatNumber(shares.issuedPreferred),
   });
   
    const handleChange = (field: keyof Shares) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
      const formattedValue = formatNumber(rawValue); 
      onChange({ ...shares, [field]: rawValue }); // Update raw value in parent component
      setFormattedShares({ ...formattedShares, [field]: formattedValue }); // Update formatted value locally
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
                value={formattedShares.authorizedCommon}
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
                value={formattedShares.authorizedPreferred}
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
                value={formattedShares.issuedCommon}
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
                value={formattedShares.issuedPreferred}
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