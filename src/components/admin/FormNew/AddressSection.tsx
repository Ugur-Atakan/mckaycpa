import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { usStates } from '../../../utils/states';

interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressSectionProps {
  address: Address;
  onChange: (address: Address) => void;
}

export function AddressSection({ address, onChange }: AddressSectionProps) {
  const [isInternational, setIsInternational] = useState(address.country !== 'United States');

  const handleChange = (field: keyof Address) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ ...address, [field]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3 text-[#002F49]">
        <MapPin className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Principal Place of Business</h2>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isInternational}
            onChange={(e) => {
              setIsInternational(e.target.checked);
              onChange({
                ...address,
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              value={address.street1}
              onChange={handleChange('street1')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address Line 2
            </label>
            <input
              type="text"
              value={address.street2}
              onChange={handleChange('street2')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={address.city}
                onChange={handleChange('city')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isInternational ? 'State/Province/Region' : 'State'}
              </label>
              {isInternational ? (
                <input
                  type="text"
                  value={address.state}
                  onChange={handleChange('state')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  required
                />
              ) : (
                <select
                  value={address.state}
                  onChange={handleChange('state')}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isInternational ? 'Postal Code' : 'ZIP Code'}
              </label>
              <input
                type="text"
                value={address.zipCode}
                onChange={handleChange('zipCode')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                required
              />
            </div>

            {isInternational && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={address.country}
                  onChange={handleChange('country')}
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