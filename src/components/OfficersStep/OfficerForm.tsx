import React from 'react';
import { usStates } from '../../utils/states';
import { Officer } from './types';

interface OfficerFormProps {
  index: number;
  officer: Officer;
  onChange: (index: number, field: keyof Officer | 'address', value: any) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}

export function OfficerForm({ index, officer, onChange, onRemove, showRemove }: OfficerFormProps) {
  const [isInternational, setIsInternational] = React.useState(officer.address.country !== 'United States');

  const handleAddressChange = (field: keyof Officer['address']) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(index, 'address', { ...officer.address, [field]: e.target.value });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#002F49]">
          Officer {index + 1}
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`officer-${index}-name`} className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id={`officer-${index}-name`}
            value={officer.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
            placeholder="Enter officer's full name"
            required
          />
        </div>

        <div>
          <label htmlFor={`officer-${index}-title`} className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id={`officer-${index}-title`}
            value={officer.title}
            onChange={(e) => onChange(index, 'title', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
            placeholder="Enter officer's title"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isInternational}
            onChange={(e) => {
              setIsInternational(e.target.checked);
              onChange(index, 'address', { 
                ...officer.address, 
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
            <label htmlFor={`officer-${index}-street1`} className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id={`officer-${index}-street1`}
              value={officer.address.street1}
              onChange={handleAddressChange('street1')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Enter street address"
              required
            />
          </div>

          <div>
            <label htmlFor={`officer-${index}-street2`} className="block text-sm font-medium text-gray-700 mb-1">
              Street Address Line 2 (Optional)
            </label>
            <input
              type="text"
              id={`officer-${index}-street2`}
              value={officer.address.street2}
              onChange={handleAddressChange('street2')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`officer-${index}-city`} className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id={`officer-${index}-city`}
                value={officer.address.city}
                onChange={handleAddressChange('city')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                placeholder="Enter city"
                required
              />
            </div>

            <div>
              <label htmlFor={`officer-${index}-state`} className="block text-sm font-medium text-gray-700 mb-1">
                {isInternational ? 'State/Province/Region' : 'State'}
              </label>
              {isInternational ? (
                <input
                  type="text"
                  id={`officer-${index}-state`}
                  value={officer.address.state}
                  onChange={handleAddressChange('state')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  placeholder="Enter state/province/region"
                  
                />
              ) : (
                <select
                  id={`officer-${index}-state`}
                  value={officer.address.state}
                  onChange={handleAddressChange('state')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  required
                >
                  <option value="">Select a state</option>
                  {usStates.map(state => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`officer-${index}-zipCode`} className="block text-sm font-medium text-gray-700 mb-1">
                {isInternational ? 'Postal Code' : 'ZIP Code'}
              </label>
              <input
                type="text"
                id={`officer-${index}-zipCode`}
                value={officer.address.zipCode}
                onChange={handleAddressChange('zipCode')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                placeholder={isInternational ? "Enter postal code" : "Enter ZIP code"}
                required
              />
            </div>

            {isInternational && (
              <div>
                <label htmlFor={`officer-${index}-country`} className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id={`officer-${index}-country`}
                  value={officer.address.country}
                  onChange={handleAddressChange('country')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  placeholder="Enter country name"
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