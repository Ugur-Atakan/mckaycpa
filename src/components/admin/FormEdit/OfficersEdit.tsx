import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Officer } from '../../../types/officer';

interface OfficersEditProps {
  formId: string;
  officers: Officer[];
  onUpdate: (officers: Officer[]) => void;
}

export function OfficersEdit({ formId, officers, onUpdate }: OfficersEditProps) {
  const handleSave = (index: number, field: keyof Officer | keyof Officer['address'], parentField?: 'address') => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    const path = parentField
      ? `officers.${index}.${parentField}.${field}`
      : `officers.${index}.${field}`;

    await updateDoc(formRef, {
      [path]: value,
    });

    const updatedOfficers = [...officers];
    if (parentField) {
      updatedOfficers[index] = {
        ...updatedOfficers[index],
        [parentField]: { ...updatedOfficers[index][parentField], [field]: value },
      };
    } else {
      updatedOfficers[index] = {
        ...updatedOfficers[index],
        [field]: value,
      };
    }
    onUpdate(updatedOfficers);
  };

  const handleAddOfficer = () => {
    const newOfficer: Officer = {
      name: '',
      title: '',
      address: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
    };
    onUpdate([...officers, newOfficer]);
  };

  const handleRemoveOfficer = async (index: number) => {
    const formRef = doc(db, 'forms', formId);
    const updatedOfficers = officers.filter((_, i) => i !== index);
    await updateDoc(formRef, {
      officers: updatedOfficers,
    });
    onUpdate(updatedOfficers);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#002F49]">Company Officers</h2>
        <button
          type="button"
          onClick={handleAddOfficer}
          className="text-[#002F49] hover:text-[#003a5d] font-medium flex items-center gap-2"
        >
          Add Officer
        </button>
      </div>

      {officers.map((officer, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Officer {index + 1}</p>
            <button
              type="button"
              onClick={() => handleRemoveOfficer(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

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
