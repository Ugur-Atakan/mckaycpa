import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Mail } from 'lucide-react';

export function ThanksStep() {
  return (
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
        <p className="text-gray-600">
          Your Delaware Franchise Tax Report information has been successfully submitted.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#002F49]">What's Next?</h3>
          <p className="text-gray-600">
            Our team will review your submission and prepare your Delaware Franchise Tax Report.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-3 text-left">
            <Calendar className="w-5 h-5 text-[#002F49]" />
            <div>
              <p className="font-medium text-[#002F49]">Processing Time</p>
              <p className="text-sm text-gray-600">2-3 business days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <Mail className="w-5 h-5 text-[#002F49]" />
            <div>
              <p className="font-medium text-[#002F49]">Updates</p>
              <p className="text-sm text-gray-600">
                We'll send you email updates about your report status
              </p>
            </div>
          </div>
        </div>
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
  );
}