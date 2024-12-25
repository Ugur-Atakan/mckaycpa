import React from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface SubmitterEditProps {
  formId: string;
  submitter: string;
  onUpdate: (value: string) => void;
}

export function SubmitterEdit({ formId, submitter, onUpdate }: SubmitterEditProps) {
  const handleSave = async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      submitter: value
    });
    onUpdate(value);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Submitter Name</p>
      <EditableField
        value={submitter}
        onSave={handleSave}
        label="Submitter Name"
      />
    </div>
  );
}