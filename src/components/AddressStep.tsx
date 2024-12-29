import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, HelpCircle } from 'lucide-react';
import { SupportFooter } from './SupportFooter';
import { Tooltip } from './Tooltip';
import { usStates } from '../utils/states';

interface AddressStepProps {
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  setAddress: (address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function AddressStep({ address, setAddress, onNext,onPrev }: AddressStepProps) {
  const [isInternational, setIsInternational] = React.useState(address.country !== 'United States');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (field: keyof typeof address) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAddress({ ...address, [field]: e.target.value });
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
              <div className="text-gray-500 text-sm">Step 4 of 8</div>
            </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#002F49]">Principal Place of Business</h2>
        <p className="text-gray-600">
          Please provide your company's principal place of business address.
          This cannot be your registered agent's address.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl mb-6">
        <div className="absolute inset-0 bg-[#103D55] opacity-10 backdrop-blur-md"></div>
        <div className="relative p-6 text-[#103D55] flex items-start gap-4">
          <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              What is a Principal Place of Business?
              <Tooltip content="The principal place of business is the primary location where your company's business is conducted. This address is used for tax and legal purposes.">
                <HelpCircle className="w-4 h-4" />
              </Tooltip>
            </h3>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Main office location where business activities are conducted</li>
              <li>Cannot be a P.O. Box or registered agent address</li>
              <li>Must be a physical street address</li>
              <li>Used for official correspondence and legal notices</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isInternational}
            onChange={(e) => {
              setIsInternational(e.target.checked);
              setAddress({
                ...address,
                country: e.target.checked ? '' : 'United States',
                state: ''
              });
            }}
            className="w-4 h-4 text-[#002F49] focus:ring-[#002F49]"
          />
          <span className="text-gray-700">This is an international address</span>
        </label>

        <div className="grid gap-6">
          <div>
            <label htmlFor="street1" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="street1"
              value={address.street1}
              onChange={handleChange('street1')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Enter your street address"
              required
            />
          </div>

          <div>
            <label htmlFor="street2" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address Line 2 (Optional)
            </label>
            <input
              type="text"
              id="street2"
              value={address.street2}
              onChange={handleChange('street2')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                value={address.city}
                onChange={handleChange('city')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                placeholder="Enter city name"
                required
              />
            </div>

            <div>
              {isInternational ? (
                <>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province/Region
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={address.state}
                    onChange={handleChange('state')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                    placeholder="Enter state, province, or region"
                  />
                </>
              ) : (
                <>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    id="state"
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
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                {isInternational ? 'Postal Code' : 'ZIP Code'}
              </label>
              <input
                type="text"
                id="zipCode"
                value={address.zipCode}
                onChange={handleChange('zipCode')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                placeholder={isInternational ? "Enter postal code" : "Enter ZIP code"}
                required
              />
            </div>

            {isInternational && (
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={address.country}
                  onChange={handleChange('country')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                  placeholder="Enter country name"
                  required
                />
              </div>
            )}
          </div>
        </div>
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

      <SupportFooter pageName="Principal Place of Business" />
    </motion.form>
  );
}