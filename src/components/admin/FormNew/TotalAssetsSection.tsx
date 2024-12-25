import React from 'react';
import { Coins, DollarSign } from 'lucide-react';

interface TotalAssets {
  value: string;
  preference: string;
}

interface TotalAssetsSectionProps {
  totalAssets: TotalAssets;
  onChange: (totalAssets: TotalAssets) => void;
}

export function TotalAssetsSection({ totalAssets, onChange }: TotalAssetsSectionProps) {
  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers ? `$${parseInt(numbers).toLocaleString()}` : '';
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    onChange({ ...totalAssets, value: formatted });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3 text-[#002F49]">
        <Coins className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Total Assets</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preference
          </label>
          <select
            value={totalAssets.preference}
            onChange={(e) => onChange({ ...totalAssets, preference: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
            required
          >
            <option value="provide">Client provided information</option>
            <option value="help">Requested assistance with calculation</option>
          </select>
        </div>

        {totalAssets.preference === 'provide' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Assets Value
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={totalAssets.value}
                onChange={handleValueChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                placeholder="Enter total assets amount"
                required={totalAssets.preference === 'provide'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}