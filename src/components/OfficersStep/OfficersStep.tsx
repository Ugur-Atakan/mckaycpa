import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus } from 'lucide-react';
import { SupportFooter } from '../SupportFooter';
import { OfficerForm } from './OfficerForm';
import { Officer, emptyOfficer } from './types';

interface OfficersStepProps {
  officers: Officer[];
  setOfficers:any;
  onNext: () => void;
  onPrev: () => void;
}


export function OfficersStep({ officers, setOfficers, onNext,onPrev }: OfficersStepProps) {
  const [localOfficers, setLocalOfficers] = useState<Officer[]>(
    officers.length > 0 ? officers : [{ ...emptyOfficer }]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOfficers(localOfficers);
    onNext();
  };

  const handleOfficerChange = (index: number, field: keyof Officer | 'address', value: any) => {
    const updatedOfficers = [...localOfficers];
    if (field === 'address') {
      updatedOfficers[index] = {
        ...updatedOfficers[index],
        address: value,
      };
    } else {
      updatedOfficers[index] = {
        ...updatedOfficers[index],
        [field]: value,
      };
    }
    setLocalOfficers(updatedOfficers);
  };

  const handleAddOfficer = () => {
    setLocalOfficers([...localOfficers, { ...emptyOfficer }]);
  };

  const handleRemoveOfficer = (index: number) => {
    setLocalOfficers(localOfficers.filter((_, i) => i !== index));
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
              <div className="text-gray-500 text-sm">Step 5 of 8</div>
            </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#002F49]">Company Officers</h2>
        <p className="text-gray-600">
          Please provide information about your company's officers. Include their full name, title, and address.
        </p>
      </div>

      <div className="space-y-6">
        {localOfficers.map((officer, index) => (
          <OfficerForm
            key={index}
            index={index}
            officer={officer}
            onChange={handleOfficerChange}
            onRemove={handleRemoveOfficer}
            showRemove={localOfficers.length > 1}
          />
        ))}

        <button
          type="button"
          onClick={handleAddOfficer}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl
                   text-gray-600 font-medium flex items-center justify-center gap-2
                   hover:border-[#002F49] hover:text-[#002F49] transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Add Another Officer
        </button>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                   flex items-center justify-center gap-2 hover:bg-[#003a5d] transition-colors
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <SupportFooter pageName="Company Officers" />
    </motion.form>
  );
}