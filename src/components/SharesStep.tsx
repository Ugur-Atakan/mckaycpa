import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, AlertTriangle } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { SupportFooter } from './SupportFooter';
import { validateShares } from '../utils/shareValidation';
import { Shares } from '../types/shares';

interface SharesStepProps {
  shares: Shares;
  setShares: (shares: Shares) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function SharesStep({ shares, setShares, onNext,onPrev }: SharesStepProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateShares(shares);
    
    if (validation.isValid) {
      setErrors([]);
      onNext();
    } else {
      setErrors(validation.errors);
    }
  };

  const handleChange = (field: keyof Shares) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setShares({ ...shares, [field]: value });
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const isFormValid = () => {
    return shares.authorizedCommon && shares.authorizedPreferred && 
           shares.issuedCommon && shares.issuedPreferred;
  };

  const tooltips = {
    authorizedCommon: "The maximum number of common shares that your corporation is permitted to issue according to its certificate of incorporation.",
    authorizedPreferred: "The maximum number of preferred shares that your corporation is permitted to issue according to its certificate of incorporation.",
    issuedCommon: "The actual number of common shares that have been issued to shareholders.",
    issuedPreferred: "The actual number of preferred shares that have been issued to shareholders."
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="text-[#002F49] font-medium flex items-center gap-2"
        >
          <ArrowRight className="transform rotate-180 w-5 h-5" />
          Back
        </button>
        <div className="text-gray-500 text-sm">Step 2 of 8</div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#002F49]">Share Structure Information</h2>
        <p className="text-gray-600">
          Please provide information about your corporation's share structure. This information can be 
          found in your certificate of incorporation and corporate records.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Validation Errors</h3>
              <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden rounded-xl mb-6">
        <div className="absolute inset-0 bg-[#103D55] opacity-10 backdrop-blur-md"></div>
        <div className="relative p-6 text-[#103D55]">
          <h3 className="font-medium mb-2">Important Note</h3>
          <p className="text-sm opacity-90">
            The number of issued shares must not exceed the number of authorized shares. Please verify 
            these numbers carefully as they directly affect your tax calculation.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[#002F49]">Authorized Shares</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label htmlFor="authorizedCommon" className="block text-sm font-medium text-gray-700">
                Common Shares
              </label>
              <Tooltip content={tooltips.authorizedCommon}>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="text"
              id="authorizedCommon"
              value={shares.authorizedCommon}
              onChange={handleChange('authorizedCommon')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Enter number"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label htmlFor="authorizedPreferred" className="block text-sm font-medium text-gray-700">
                Preferred Shares
              </label>
              <Tooltip content={tooltips.authorizedPreferred}>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="text"
              id="authorizedPreferred"
              value={shares.authorizedPreferred}
              onChange={handleChange('authorizedPreferred')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Enter number"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[#002F49]">Issued Shares</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label htmlFor="issuedCommon" className="block text-sm font-medium text-gray-700">
                Common Shares
              </label>
              <Tooltip content={tooltips.issuedCommon}>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="text"
              id="issuedCommon"
              value={shares.issuedCommon}
              onChange={handleChange('issuedCommon')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Enter number"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label htmlFor="issuedPreferred" className="block text-sm font-medium text-gray-700">
                Preferred Shares
              </label>
              <Tooltip content={tooltips.issuedPreferred}>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="text"
              id="issuedPreferred"
              value={shares.issuedPreferred}
              onChange={handleChange('issuedPreferred')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Enter number"
              required
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                   flex items-center justify-center gap-2 hover:bg-[#003a5d] transition-colors
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          disabled={!isFormValid()}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <SupportFooter pageName="Share Structure Information" />
    </motion.form>
  );
}