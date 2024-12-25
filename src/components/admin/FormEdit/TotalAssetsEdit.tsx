import React from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface TotalAssetsEditProps {
  formId: string;
  totalAssets: {
    value: string;
    preference: string;
  };
  onUpdate: (field: 'value' | 'preference', value: string) => void;
}

export function TotalAssetsEdit({ formId, totalAssets, onUpdate }: TotalAssetsEditProps) {
  const handleSave = (field: 'value' | 'preference') => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      [`totalAssets.${field}`]: value
    });
    onUpdate(field, value);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Preference</p>
        <EditableField
          value={totalAssets.preference}
          onSave={handleSave('preference')}
          label="Total Assets Preference"
        />
      </div>
      {totalAssets.preference === 'provide' && (
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Assets Value</p>
          <EditableField
            value={totalAssets.value}
            onSave={handleSave('value')}
            label="Total Assets Value"
          />
        </div>
      )}
    </div>
  );
}