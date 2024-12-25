import React from 'react';
import { User } from 'lucide-react';

interface Person {
  name: string;
  role: string;
  title?: string;
}

interface SubmitterSectionProps {
  officers: Array<{ name: string; title: string }>;
  directors: Array<{ name: string }>;
  submitter: string;
  onChange: (submitter: string) => void;
}

export function SubmitterSection({ officers, directors, submitter, onChange }: SubmitterSectionProps) {
  const allPeople: Person[] = [
    ...officers.map(o => ({ name: o.name, role: 'Officer', title: o.title })),
    ...directors.map(d => ({ name: d.name, role: 'Director' }))
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3 text-[#002F49]">
        <User className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Submitter Information</h2>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Submitter
        </label>
        <select
          value={submitter}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
          required
        >
          <option value="">Select a person</option>
          {allPeople.map((person, index) => (
            <option key={index} value={person.name}>
              {person.name} ({person.role}{person.title ? ` - ${person.title}` : ''})
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500">
          The submitter must be either an officer or director of the company.
        </p>
      </div>
    </div>
  );
}