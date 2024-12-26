import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, HelpCircle } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { SupportFooter } from './SupportFooter';

interface TotalAssetsStepProps {
  totalAssets: {
    value: string;
    preference: string;
  };
  setTotalAssets: (totalAssets: { value: string; preference: string }) => void;
  onNext: () => void;
}

export function TotalAssetsStep({ totalAssets, setTotalAssets, onNext }: TotalAssetsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAssets.preference === 'provide' && !totalAssets.value) return;
    onNext();
  };

  const formatCurrency = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    // Format as currency
    if (numbers) {
      const amount = parseInt(numbers);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
    return '';
  };

  const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setTotalAssets({ ...totalAssets, value: formatted });
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#002F49]">Total Assets Information</h2>
        <p className="text-gray-600">
          The total assets information is crucial for calculating your Delaware Franchise Tax. 
          Please provide accurate information or let us help you prepare it.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl mb-6">
        <div className="absolute inset-0 bg-[#103D55] opacity-10 backdrop-blur-md"></div>
        <div className="relative p-6 text-[#103D55]">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            What are Total Assets?
            <Tooltip content="Total assets include all property owned by the corporation, such as cash, investments, equipment, real estate, and intellectual property.">
              <HelpCircle className="w-4 h-4" />
            </Tooltip>
          </h3>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li>Cash and bank accounts</li>
            <li>Accounts receivable</li>
            <li>Inventory</li>
            <li>Investments</li>
            <li>Property and equipment</li>
            <li>Intangible assets</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you like to proceed?
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="preference"
                value="provide"
                checked={totalAssets.preference === 'provide'}
                onChange={(e) => setTotalAssets({ ...totalAssets, preference: e.target.value })}
                className="w-4 h-4 text-[#002F49] focus:ring-[#002F49]"
              />
              <div>
                <span className="text-gray-700 font-medium">I will provide this information</span>
                <p className="text-sm text-gray-500 mt-1">
                  Select this if you have your total assets figure ready
                </p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="preference"
                value="help"
                checked={totalAssets.preference === 'help'}
                onChange={(e) => setTotalAssets({ ...totalAssets, preference: e.target.value })}
                className="w-4 h-4 text-[#002F49] focus:ring-[#002F49]"
              />
              <div>
                <span className="text-gray-700 font-medium">Please prepare this for me</span>
                <p className="text-sm text-gray-500 mt-1">
                  We'll help calculate your total assets based on your financial statements
                </p>
              </div>
            </label>
          </div>
        </div>

        {totalAssets.preference === 'provide' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <label htmlFor="totalAssets" className="block text-sm font-medium text-gray-700">
              Total Assets Value
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="totalAssets"
                value={totalAssets.value}
                onChange={handleAssetsChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                placeholder="Enter total assets amount"
                required={totalAssets.preference === 'provide'}
              />
            </div>
            <p className="text-sm text-gray-500">
              Enter the total value of all assets as of the end of the fiscal year
            </p>
          </motion.div>
        )}
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                   flex items-center justify-center gap-2 hover:bg-[#003a5d] transition-colors
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          disabled={totalAssets.preference === 'provide' && !totalAssets.value}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <SupportFooter pageName="Total Assets Information" />
    </motion.form>
  );
}