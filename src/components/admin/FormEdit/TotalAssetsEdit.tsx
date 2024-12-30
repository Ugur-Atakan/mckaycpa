import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';


interface TotalAssetsEditProps {
  formId: string;
  totalAssets: {
    value: string;
    preference: string;
  };
  onUpdate: (field: 'value' | 'preference', value: string) => void;
  setTotalAssets: (totalAssets: { value: string; preference: string }) => void;
}

export function TotalAssetsEdit({ formId, totalAssets, setTotalAssets,onUpdate }: TotalAssetsEditProps) {
  const handleSave = (field: 'value' | 'preference') => async (value: string) => {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      [`totalAssets.${field}`]: value
    });
    onUpdate(field, value);
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
  
    const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCurrency(e.target.value);
      setTotalAssets({ ...totalAssets, value: formatted });
    };

  return (
    <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you like to proceed?
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="preference"
                value="provide"
                checked={totalAssets.preference === 'provide'}
                onChange={(e) => setTotalAssets({ ...totalAssets, preference: e.target.value })}
                className="w-4 h-4 text-[#002F49] focus:ring-[#002F49]"
              />
              <div>
                <span className="text-gray-700 font-medium">I will provide this information</span>
                <p className="text-sm text-gray-500 mt-1">
                  Select this if you have your total assets figure ready
                </p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="preference"
                value="help"
                checked={totalAssets.preference === 'help'}
                onChange={(e) => setTotalAssets({ ...totalAssets, preference: e.target.value })}
                className="w-4 h-4 text-[#002F49] focus:ring-[#002F49]"
              />
              <div>
                <span className="text-gray-700 font-medium">Please prepare this for me</span>
                <p className="text-sm text-gray-500 mt-1">
                  We'll help calculate your total assets based on your financial statements
                </p>
              </div>
            </label>
          </div>
        </div>

        {totalAssets.preference === 'provide' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <label htmlFor="totalAssets" className="block text-sm font-medium text-gray-700">
              Total Assets Value
            </label>
            <div className="relative flex items-center">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="totalAssets"
                value={totalAssets.value}
                onChange={(e) => handleAssetsChange(e)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
                placeholder="Enter total assets amount"
                required={totalAssets.preference === 'provide'}
              />

              <button
                onClick={() => handleSave('value')(totalAssets.value)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg bg-[#002F49] text-white font-medium hover:bg-[#003a5d] transition-colors"
              >
                Save
              </button>

              
            </div>
            <p className="text-sm text-gray-500">
              Enter the total value of all assets as of the end of the fiscal year
            </p>
          </motion.div>
        )}
      </div>
  );
}