import React from 'react';
import { usStates } from '../../utils/states';
import { Director } from './types';
import { ChevronDown } from 'lucide-react';

interface DirectorFormProps {
  index: number;
  director: Director;
  onChange: (index: number, field: keyof Director | 'address', value: any) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}

export function DirectorForm({ index, director, onChange, onRemove, showRemove }: DirectorFormProps) {
  const [isInternational, setIsInternational] = React.useState(false);

  const handleAddressChange = (field: keyof Director['address']) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(index, 'address', { ...director.address, [field]: e.target.value });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#002F49]">
          Director {index + 1}
        </h3>
        {showRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        )}
      </div>

      <div>
        <label htmlFor={`director-${index}-name`} className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id={`director-${index}-name`}
          value={director.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isInternational}
            onChange={(e) => {
              setIsInternational(e.target.checked);
              onChange(index, 'address', { 
                ...director.address, 
                country: e.target.checked ? '' : 'United States',
                state: ''
              });
            }}
            className="w-4 h-4 text-[#002F49] focus:ring-[#002F49]"
          />
          <span className="text-gray-700">This is an international address</span>
        </label>

        <div className="space-y-4">
          <div>
            <label htmlFor={`director-${index}-street1`} className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id={`director-${index}-street1`}
              value={director.address.street1}
              onChange={handleAddressChange('street1')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor={`director-${index}-street2`} className="block text-sm font-medium text-gray-700 mb-1">
              Street Address Line 2
            </label>
            <input
              type="text"
              id={`director-${index}-street2`}
              value={director.address.street2}
              onChange={handleAddressChange('street2')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`director-${index}-city`} className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id={`director-${index}-city`}
                value={director.address.city}
                onChange={handleAddressChange('city')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>

            {isInternational ? (
              <div>
                <label htmlFor={`director-${index}-state`} className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province/Region
                </label>
                <input
                  type="text"
                  id={`director-${index}-state`}
                  value={director.address.state}
                  onChange={handleAddressChange('state')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                />
              </div>
            ) : (
              <div className="relative">
                <label htmlFor={`director-${index}-state`} className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <div className="relative">
                  <select
                    id={`director-${index}-state`}
                    value={director.address.state}
                    onChange={handleAddressChange('state')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select a state</option>
                    {usStates.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`director-${index}-zipCode`} className="block text-sm font-medium text-gray-700 mb-1">
                {isInternational ? 'Postal Code' : 'ZIP Code'}
              </label>
              <input
                type="text"
                id={`director-${index}-zipCode`}
                value={director.address.zipCode}
                onChange={handleAddressChange('zipCode')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>

            {isInternational && (
              <div>
                <label htmlFor={`director-${index}-country`} className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id={`director-${index}-country`}
                  value={director.address.country}
                  onChange={handleAddressChange('country')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  required
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}