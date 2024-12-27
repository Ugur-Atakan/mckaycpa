import { motion } from 'framer-motion';
import { CheckCircle} from 'lucide-react';
import { FormLayout } from '../FormLayout';

export function ThanksStep() {
  return (
    <FormLayout companyName="Thank You!">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 text-center"
    >
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#002F49]">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your information has been verified successfully.
        </p>
      </div>

  
      <div className="text-sm text-gray-600">
        <p>If you have any questions, please contact us at:</p>
        <a 
          href="mailto:help@mckaycpa.com" 
          className="text-[#002F49] hover:underline font-medium"
        >
          help@mckaycpa.com
        </a>
      </div>
    </motion.div>
    </FormLayout>
  );
}