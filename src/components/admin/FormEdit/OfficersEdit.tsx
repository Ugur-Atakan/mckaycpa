import React from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Officer } from '../../../types/officer';

interface OfficersEditProps {
  formId: string;
  officers: Officer[];
  onUpdate: (index: number, field: keyof Officer | 'address', value: any) => void;
}

export function OfficersEdit({ formId, officers, onUpdate }: OfficersEditProps) {
  const handleSave = (index: number, field: keyof Officer | keyof Officer['address'], parentField?: 'address') => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    const path = parentField 
      ? `officers.${index}.${parentField}.${field}`
      : `officers.${index}.${field}`;
    
    await updateDoc(formRef, {
      [path]: value
    });

    if (parentField) {
      onUpdate(index, parentField, { ...officers[index][parentField], [field]: value });
    } else {
      onUpdate(index, field as keyof Officer, value);
    }
  };

  return (
    <div className="space-y-6">
      {officers.map((officer, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <EditableField
                value={officer.name}
                onSave={handleSave(index, 'name')}
                label="Officer Name"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Title</p>
              <EditableField
                value={officer.title}
                onSave={handleSave(index, 'title')}
                label="Officer Title"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Street Address</p>
              <EditableField
                value={officer.address.street1}
                onSave={handleSave(index, 'street1', 'address')}
                label="Street Address"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Street Address Line 2</p>
              <EditableField
                value={officer.address.street2}
                onSave={handleSave(index, 'street2', 'address')}
                label="Street Address Line 2"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">City</p>
                <EditableField
                  value={officer.address.city}
                  onSave={handleSave(index, 'city', 'address')}
                  label="City"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">State</p>
                <EditableField
                  value={officer.address.state}
                  onSave={handleSave(index, 'state', 'address')}
                  label="State"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">ZIP Code</p>
                <EditableField
                  value={officer.address.zipCode}
                  onSave={handleSave(index, 'zipCode', 'address')}
                  label="ZIP Code"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Country</p>
                <EditableField
                  value={officer.address.country}
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