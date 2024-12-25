import React from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Shares } from '../../../types/shares';

interface SharesEditProps {
  formId: string;
  shares: Shares;
  onUpdate: (field: keyof Shares, value: string) => void;
}

export function SharesEdit({ formId, shares, onUpdate }: SharesEditProps) {
  const handleSave = (field: keyof Shares) => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      [`shares.${field}`]: value
    });
    onUpdate(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Authorized Shares</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Common Shares</p>
              <EditableField
                value={shares.authorizedCommon}
                onSave={handleSave('authorizedCommon')}
                label="Authorized Common Shares"
                type="number"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Preferred Shares</p>
              <EditableField
                value={shares.authorizedPreferred}
                onSave={handleSave('authorizedPreferred')}
                label="Authorized Preferred Shares"
                type="number"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Issued Shares</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Common Shares</p>
              <EditableField
                value={shares.issuedCommon}
                onSave={handleSave('issuedCommon')}
                label="Issued Common Shares"
                type="number"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Preferred Shares</p>
              <EditableField
                value={shares.issuedPreferred}
                onSave={handleSave('issuedPreferred')}
                label="Issued Preferred Shares"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}