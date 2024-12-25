import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { AddressSection } from './AddressSection';

interface Director {
  name: string;
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface DirectorSectionProps {
  directors: Director[];
  onChange: (directors: Director[]) => void;
}

export function DirectorSection({ directors, onChange }: DirectorSectionProps) {
  const handleAddDirector = () => {
    onChange([...directors, {
      name: '',
      address: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    }]);
  };

  const handleRemoveDirector = (index: number) => {
    onChange(directors.filter((_, i) => i !== index));
  };

  const handleDirectorChange = (index: number, field: keyof Director, value: any) => {
    const newDirectors = [...directors];
    if (field === 'address') {
      newDirectors[index] = { ...newDirectors[index], address: value };
    } else {
      newDirectors[index] = { ...newDirectors[index], [field]: value };
    }
    onChange(newDirectors);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#002F49]">
          <Users className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Company Directors</h2>
        </div>
        <button
          type="button"
          onClick={handleAddDirector}
          className="text-[#002F49] hover:text-[#003a5d] font-medium flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add Director
        </button>
      </div>

      <div className="space-y-6">
        {directors.map((director, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#002F49]">
                Director {index + 1}
              </h3>
              {directors.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDirector(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={director.name}
                onChange={(e) => handleDirectorChange(index, 'name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>

            <AddressSection
              address={director.address}
              onChange={(address) => handleDirectorChange(index, 'address', address)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}