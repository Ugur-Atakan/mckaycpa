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
  const [isInternational, setIsInternational] = React.useState(false);

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
              required
            />
          </div>

          <div>
            <label htmlFor={`officer-${index}-street2`} className="block text-sm font-medium text-gray-700 mb-1">
              Street Address Line 2
            </label>
            <input
              type="text"
              id={`officer-${index}-street2`}
              value={officer.address.street2}
              onChange={handleAddressChange('street2')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
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
                required
              />
            </div>

            {isInternational ? (
              <>
                <div>
                  <label htmlFor={`officer-${index}-state`} className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province/Region
                  </label>
                  <input
                    type="text"
                    id={`officer-${index}-state`}
                    value={officer.address.state}
                    onChange={handleAddressChange('state')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                    required
                  />
                </div>
              </>
            ) : (
              <div>
                <label htmlFor={`officer-${index}-state`} className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  id={`officer-${index}-state`}
                  value={officer.address.state}
                  onChange={handleAddressChange('state')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent
                           appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]
                           bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]"
                  required
                >
                  <option value="">Select a state</option>
                  {usStates.map(state => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
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