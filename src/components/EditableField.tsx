import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  label: string;
  type?: 'text' | 'number' | 'currency';
}

export function EditableField({ value, onSave, label, type = 'text' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (type === 'currency') {
      // Allow only numbers and decimal point
      newValue = formatCurrency(newValue.replace(/[^0-9.]/g, ''));
    }
    setEditValue(newValue);
  };


  const formatCurrency = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    // Format as currency
    if (numbers) {
      const amount = parseInt(numbers);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
    return '';
  };

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <span className="text-gray-900">{value}</span>
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
          title={`Edit ${label}`}
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
        className="flex-1 px-2 py-1 border rounded-md focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      <button
        onClick={handleSave}
        className="text-green-600 hover:text-green-700"
        title="Save changes"
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        onClick={handleCancel}
        className="text-red-600 hover:text-red-700"
        title="Cancel editing"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}