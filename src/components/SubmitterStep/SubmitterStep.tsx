import React from 'react';
import { motion } from 'framer-motion';
import { Send, ChevronDown } from 'lucide-react';
import { SupportFooter } from '../SupportFooter';
import { Officer } from '../OfficersStep/types';
import { Director } from '../DirectorsStep/types';

interface SubmitterStepProps {
  officers: Officer[];
  directors: Director[];
  submitter: string;
  setSubmitter: (submitter: string) => void;
  onSubmit: () => void;
}

export function SubmitterStep({ 
  officers, 
  directors, 
  submitter,
  setSubmitter,
  onSubmit 
}: SubmitterStepProps) {
  const allPeople = [
    ...officers.map(o => ({ name: o.name, role: 'Officer', title: o.title })),
    ...directors.map(d => ({ name: d.name, role: 'Director' }))
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitter) {
      onSubmit();
    }
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
        <h2 className="text-2xl font-semibold text-[#002F49]">Submitter Information</h2>
        <p className="text-gray-600">
          Please select the person who will be submitting this report. The submitter must be either
          an officer or director of the company.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="submitter" className="block text-sm font-medium text-gray-700">
          Select Submitter
        </label>
        <div className="relative">
          <select
            id="submitter"
            value={submitter}
            onChange={(e) => setSubmitter(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent appearance-none"
            required
          >
            <option value="">Select a person</option>
            {allPeople.map((person, index) => (
              <option key={index} value={person.name}>
                {person.name} ({person.role}{person.title ? ` - ${person.title}` : ''})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                   flex items-center justify-center gap-2 hover:bg-[#003a5d] transition-colors
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          disabled={!submitter}
        >
          Submit Form
          <Send className="w-5 h-5" />
        </button>
      </div>

      <SupportFooter pageName="Submitter Information" />
    </motion.form>
  );
}