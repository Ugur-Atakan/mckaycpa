import React from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface CompanyEditProps {
  formId: string;
  companyName: string;
  onUpdate: (value: string) => void;
}

export function CompanyEdit({ formId, companyName, onUpdate }: CompanyEditProps) {
  const handleSave = async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      companyName: value
    });
    onUpdate(value);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Corporation Name</p>
      <EditableField
        value={companyName}
        onSave={handleSave}
        label="Corporation Name"
      />
    </div>
  );
}