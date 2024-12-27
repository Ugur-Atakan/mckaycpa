import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SupportFooter } from './SupportFooter';

interface CompanyNameStepProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  onNext: () => void;

}

export function CompanyNameStep({ companyName, setCompanyName, onNext }: CompanyNameStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim()) {
      onNext();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#002F49]">Corporation Information</h2>
        <p className="text-gray-600">Please enter your corporation's legal name as it appears on official documents.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Corporation Name
        </label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent
                   transition-colors bg-white text-gray-900 placeholder-gray-400"
          placeholder="Enter your corporation name"
          required
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                   flex items-center justify-center gap-2 hover:bg-[#003a5d] transition-colors
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          disabled={!companyName.trim()}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <SupportFooter pageName="Corporation Information" />
    </motion.form>
  );
}