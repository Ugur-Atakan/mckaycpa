import React from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Director } from '../../../types/director';

interface DirectorsEditProps {
  formId: string;
  directors: Director[];
  onUpdate: (index: number, field: keyof Director | 'address', value: any) => void;
}

export function DirectorsEdit({ formId, directors, onUpdate }: DirectorsEditProps) {
  const handleSave = (index: number, field: keyof Director | keyof Director['address'], parentField?: 'address') => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    const path = parentField 
      ? `directors.${index}.${parentField}.${field}`
      : `directors.${index}.${field}`;
    
    await updateDoc(formRef, {
      [path]: value
    });

    if (parentField) {
      onUpdate(index, parentField, { ...directors[index][parentField], [field]: value });
    } else {
      onUpdate(index, field as keyof Director, value);
    }
  };

  return (
    <div className="space-y-6">
      {directors.map((director, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <EditableField
              value={director.name}
              onSave={handleSave(index, 'name')}
              label="Director Name"
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Street Address</p>
              <EditableField
                value={director.address.street1}
                onSave={handleSave(index, 'street1', 'address')}
                label="Street Address"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Street Address Line 2</p>
              <EditableField
                value={director.address.street2}
                onSave={handleSave(index, 'street2', 'address')}
                label="Street Address Line 2"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">City</p>
                <EditableField
                  value={director.address.city}
                  onSave={handleSave(index, 'city', 'address')}
                  label="City"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">State</p>
                <EditableField
                  value={director.address.state}
                  onSave={handleSave(index, 'state', 'address')}
                  label="State"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">ZIP Code</p>
                <EditableField
                  value={director.address.zipCode}
                  onSave={handleSave(index, 'zipCode', 'address')}
                  label="ZIP Code"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Country</p>
                <EditableField
                  value={director.address.country}
                  onSave={handleSave(index, 'country', 'address')}
                  label="Country"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}