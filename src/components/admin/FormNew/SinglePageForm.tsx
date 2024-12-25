import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { validateShares } from '../../../utils/shareValidation';
import { AddressSection } from './AddressSection';
import { SharesSection } from './SharesSection';
import { TotalAssetsSection } from './TotalAssetsSection';
import { OfficerSection } from './OfficerSection';
import { DirectorSection } from './DirectorSection';
import { SubmitterSection } from './SubmitterSection';

interface FormData {
  companyName: string;
  shares: {
    authorizedCommon: string;
    authorizedPreferred: string;
    issuedCommon: string;
    issuedPreferred: string;
  };
  totalAssets: {
    value: string;
    preference: string;
  };
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  officers: Array<{
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
  }>;
  directors: Array<{
    name: string;
    address: {
      street1: string;
      street2: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  }>;
  submitter: string;
}

interface SinglePageFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

export function SinglePageForm({ onSubmit }: SinglePageFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    shares: {
      authorizedCommon: '',
      authorizedPreferred: '',
      issuedCommon: '',
      issuedPreferred: ''
    },
    totalAssets: {
      value: '',
      preference: 'provide'
    },
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    officers: [{
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
    }],
    directors: [{
      name: '',
      address: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    }],
    submitter: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shares
    const shareValidation = validateShares(formData.shares);
    if (!shareValidation.isValid) {
      setErrors(shareValidation.errors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(['An error occurred while submitting the form. Please try again.']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Validation Errors</h3>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Company Name */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 text-[#002F49]">
          <Building2 className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Corporation Information</h2>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Corporation Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Shares Section */}
      <SharesSection
        shares={formData.shares}
        onChange={(shares) => setFormData({ ...formData, shares })}
      />

      {/* Total Assets Section */}
      <TotalAssetsSection
        totalAssets={formData.totalAssets}
        onChange={(totalAssets) => setFormData({ ...formData, totalAssets })}
      />

      {/* Address Section */}
      <AddressSection
        address={formData.address}
        onChange={(address) => setFormData({ ...formData, address })}
      />

      {/* Officers Section */}
      <OfficerSection
        officers={formData.officers}
        onChange={(officers) => setFormData({ ...formData, officers })}
      />

      {/* Directors Section */}
      <DirectorSection
        directors={formData.directors}
        onChange={(directors) => setFormData({ ...formData, directors })}
      />

      {/* Submitter Section */}
      <SubmitterSection
        officers={formData.officers}
        directors={formData.directors}
        submitter={formData.submitter}
        onChange={(submitter) => setFormData({ ...formData, submitter })}
      />

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-[#002F49] text-white px-8 py-4 rounded-lg font-semibold 
                   hover:bg-[#003a5d] transition-colors shadow-lg hover:shadow-xl"
        >
          Submit Form
        </button>
      </div>
    </form>
  );
}