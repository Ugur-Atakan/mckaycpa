import  { useState } from 'react';
import { Check, X, Edit2 } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  label: string;
  type?: 'text' | 'number';
}

export function EditableField({ value, onSave, label, type = 'text' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await onSave(editValue);
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

  if (!isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <span className="text-gray-900">{value}</span>
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
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
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