import React from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Address } from '../../../types/address';

interface AddressEditProps {
  formId: string;
  address: Address;
  onUpdate: (field: keyof Address, value: string) => void;
}

export function AddressEdit({ formId, address, onUpdate }: AddressEditProps) {
  const handleSave = (field: keyof Address) => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      [`address.${field}`]: value
    });
    onUpdate(field, value);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Street Address</p>
        <EditableField
          value={address.street1}
          onSave={handleSave('street1')}
          label="Street Address"
        />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Street Address Line 2</p>
        <EditableField
          value={address.street2}
          onSave={handleSave('street2')}
          label="Street Address Line 2"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">City</p>
          <EditableField
            value={address.city}
            onSave={handleSave('city')}
            label="City"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">State</p>
          <EditableField
            value={address.state}
            onSave={handleSave('state')}
            label="State"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">ZIP Code</p>
          <EditableField
            value={address.zipCode}
            onSave={handleSave('zipCode')}
            label="ZIP Code"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Country</p>
          <EditableField
            value={address.country}
            onSave={handleSave('country')}
            label="Country"
          />
        </div>
      </div>
    </div>
  );
}