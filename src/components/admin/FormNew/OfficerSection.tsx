import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { AddressSection } from './AddressSection';

interface Officer {
  name: string;
  title: string;
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface OfficerSectionProps {
  officers: Officer[];
  onChange: (officers: Officer[]) => void;
}

export function OfficerSection({ officers, onChange }: OfficerSectionProps) {
  const handleAddOfficer = () => {
    onChange([...officers, {
      name: '',
      title: '',
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

  const handleRemoveOfficer = (index: number) => {
    onChange(officers.filter((_, i) => i !== index));
  };

  const handleOfficerChange = (index: number, field: keyof Officer, value: any) => {
    const newOfficers = [...officers];
    if (field === 'address') {
      newOfficers[index] = { ...newOfficers[index], address: value };
    } else {
      newOfficers[index] = { ...newOfficers[index], [field]: value };
    }
    onChange(newOfficers);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#002F49]">
          <Users className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Company Officers</h2>
        </div>
        <button
          type="button"
          onClick={handleAddOfficer}
          className="text-[#002F49] hover:text-[#003a5d] font-medium flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add Officer
        </button>
      </div>

      <div className="space-y-6">
        {officers.length>0?(officers.map((officer, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#002F49]">
                Officer {index + 1}
              </h3>
              {officers.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOfficer(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={officer.name}
                  onChange={(e) => handleOfficerChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={officer.title}
                  onChange={(e) => handleOfficerChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <AddressSection
              address={officer.address}
              onChange={(address) => handleOfficerChange(index, 'address', address)}
            />
          </div>
        ))):(
          <div className="p-6 bg-gray-50 rounded-xl space-y-6">
            <p className="text-gray-600">No officer added yet</p>
          </  div>
        )}
      </div>
    </div>
  );
}