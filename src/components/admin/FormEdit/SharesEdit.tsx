import React, { useState } from 'react';
import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Shares } from '../../../types/shares';

interface SharesEditProps {
  formId: string;
  shares: Shares;
  onUpdate: (field: keyof Shares, value: string) => void;
}

 const formatNumber = (value: string | number) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export function SharesEdit({ formId, shares, onUpdate }: SharesEditProps) {

  const [formattedShares, setFormattedShares] = useState<Shares>({
    authorizedCommon: formatNumber(shares.authorizedCommon),
    authorizedPreferred: formatNumber(shares.authorizedPreferred),
    issuedCommon: formatNumber(shares.issuedCommon),
    issuedPreferred: formatNumber(shares.issuedPreferred),
  });


  const handleChange = (field: keyof Shares) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = formatNumber(rawValue);
    setFormattedShares({ ...formattedShares, [field]: formattedValue }); // Update formatted value locally
  };
  

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
                type='universal-number'
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Preferred Shares</p>
              <EditableField
                value={shares.authorizedPreferred}
                onSave={handleSave('authorizedPreferred')}
                label="Authorized Preferred Shares"
                type='universal-number'
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
                type='universal-number'
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Preferred Shares</p>
              <EditableField
                value={shares.issuedPreferred}
                onSave={handleSave('issuedPreferred')}
                label="Issued Preferred Shares"
                type='universal-number'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}