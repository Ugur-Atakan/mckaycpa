import { useState } from 'react';
import { Check, X, Edit2 } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'universal-number';
}

const formatNumber = (value: string | number) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export function EditableField({ value, onSave, label, type = 'text' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, ''); // Remove all non-numeric characters
    if (numbers) {
      const amount = parseInt(numbers);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return '';
  };

  const parseCurrency = (value: string) => {
    return value.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let valueToSave = editValue;

      if (type === 'currency') {
        valueToSave = parseCurrency(editValue); // Save plain number for currency
      } else if (type === 'universal-number') {
        valueToSave = editValue.replace(/\D/g, ''); // Save plain number for universal-number
      }

      await onSave(valueToSave);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === 'currency') {
      setEditValue(formatCurrency(inputValue)); // Format as currency
    } else if (type === 'universal-number') {
      setEditValue(formatNumber(inputValue.replace(/\D/g, ''))); // Format as universal-number
    } else {
      setEditValue(inputValue); // Plain text or number
    }
  };

  if (!isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <span className="text-gray-900">
          {type === 'currency'
            ? formatCurrency(value)
            : type === 'universal-number'
            ? formatNumber(value)
            : value}
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={editValue}
        onChange={handleChange}
        className="px-2 py-1 border rounded-md focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
        disabled={isLoading}
      />
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="text-green-600 hover:text-green-700"
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        onClick={handleCancel}
        disabled={isLoading}
        className="text-red-600 hover:text-red-700"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
