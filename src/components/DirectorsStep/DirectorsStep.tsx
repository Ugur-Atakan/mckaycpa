import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus } from 'lucide-react';
import { SupportFooter } from '../SupportFooter';
import { DirectorForm } from './DirectorForm';
import { Director, emptyDirector } from './types';

interface DirectorsStepProps {
  directors: Director[];
  setDirectors: (directors: Director[]) => void;
  onNext: () => void;
}

export function DirectorsStep({ directors, setDirectors, onNext }: DirectorsStepProps) {
  const [localDirectors, setLocalDirectors] = useState<Director[]>(
    directors.length > 0 ? directors : [{ ...emptyDirector }]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDirectors(localDirectors);
    onNext();
  };

  const handleDirectorChange = (index: number, field: keyof Director | 'address', value: any) => {
    const updatedDirectors = [...localDirectors];
    if (field === 'address') {
      updatedDirectors[index] = {
        ...updatedDirectors[index],
        address: value,
      };
    } else {
      updatedDirectors[index] = {
        ...updatedDirectors[index],
        [field]: value,
      };
    }
    setLocalDirectors(updatedDirectors);
  };

  const handleAddDirector = () => {
    setLocalDirectors([...localDirectors, { ...emptyDirector }]);
  };

  const handleRemoveDirector = (index: number) => {
    setLocalDirectors(localDirectors.filter((_, i) => i !== index));
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
        <h2 className="text-2xl font-semibold text-[#002F49]">Company Directors</h2>
        <p className="text-gray-600">
          Please provide information about your company's directors. Include their full name and address.
        </p>
      </div>

      <div className="space-y-6">
        {localDirectors.map((director, index) => (
          <DirectorForm
            key={index}
            index={index}
            director={director}
            onChange={handleDirectorChange}
            onRemove={handleRemoveDirector}
            showRemove={localDirectors.length > 1}
          />
        ))}

        <button
          type="button"
          onClick={handleAddDirector}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl
                   text-gray-600 font-medium flex items-center justify-center gap-2
                   hover:border-[#002F49] hover:text-[#002F49] transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Add Another Director
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

      <SupportFooter pageName="Company Directors" />
    </motion.form>
  );
}