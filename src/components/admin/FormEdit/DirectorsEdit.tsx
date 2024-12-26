import { EditableField } from './EditableField';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Director } from '../../../types/director';

interface DirectorsEditProps {
  formId: string;
  directors: Director[];
  onUpdate: (directors: Director[]) => void;
}

export function DirectorsEdit({ formId, directors, onUpdate }: DirectorsEditProps) {
  const handleSave = (index: number, field: keyof Director | keyof Director['address'], parentField?: 'address') => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    const path = parentField
      ? `directors.${index}.${parentField}.${field}`
      : `directors.${index}.${field}`;

    await updateDoc(formRef, {
      [path]: value,
    });

    const updatedDirectors = [...directors];
    if (parentField) {
      updatedDirectors[index] = {
        ...updatedDirectors[index],
        [parentField]: { ...updatedDirectors[index][parentField], [field]: value },
      };
    } else {
      updatedDirectors[index] = {
        ...updatedDirectors[index],
        [field]: value,
      };
    }
    onUpdate(updatedDirectors);
  };

  const handleAddDirector = () => {
    const newDirector: Director = {
      name: '',
      address: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
    };
    onUpdate([...directors, newDirector]);
  };

  const handleRemoveDirector = async (index: number) => {
    const formRef = doc(db, 'forms', formId);
    const updatedDirectors = directors.filter((_, i) => i !== index);
    await updateDoc(formRef, {
      directors: updatedDirectors,
    });
    onUpdate(updatedDirectors);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#002F49]">Company Directors</h2>
        <button
          type="button"
          onClick={handleAddDirector}
          className="text-[#002F49] hover:text-[#003a5d] font-medium flex items-center gap-2"
        >
          Add Director
        </button>
      </div>

      {directors && directors?.map((director, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Director {index + 1}</p>
            <button
              type="button"
              onClick={() => handleRemoveDirector(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

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
