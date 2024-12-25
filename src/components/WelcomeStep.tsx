import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SupportFooter } from './SupportFooter';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <h1 className="text-[#002F49] text-3xl md:text-4xl font-semibold text-center">
        Delaware Franchise Tax Report Form
      </h1>

      <div className="max-w-2xl mx-auto">
        <p className="text-lg leading-relaxed text-gray-700">
          Dear Valued Client,
        </p>
        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          We've prepared this form to help you provide the necessary information
          for completing your Delaware Franchise Tax Report accurately and efficiently. 
          By using this form, we can ensure a smooth and timely filing process.
        </p>
      </div>
      <div className="bg-[#FEFDFC] rounded-xl p-6">
        <h2 className="text-[#002F49] font-semibold text-xl mb-4">Please follow these simple steps:</h2>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Fill out the required fields accurately and completely.</li>
          <li>If you have any questions, feel free to contact us at any time.</li>
        </ol>
      </div>

      <div className="bg-[#002F49] text-white rounded-xl p-6">
        <h2 className="font-semibold text-xl mb-3">Why is This Important?</h2>
        <p>
          Submitting your Delaware Franchise Tax Report on time and accurately is crucial to ensuring
          your corporation remains compliant with legal requirements and avoids unnecessary penalties.
        </p>
      </div>

      <div className="border-l-4 border-[#002F49] pl-6">
        <h2 className="text-[#002F49] font-semibold text-xl mb-3">Our Privacy Commitment</h2>
        <p className="text-gray-700">
          All the information you provide will be kept strictly confidential and used solely for the
          purpose of preparing your Delaware Franchise Tax Report.
        </p>
      </div>

      <p className="text-center italic text-gray-700">
        Thank you for your cooperation in completing this form. We appreciate the opportunity to
        assist you and are always here to help.
      </p>

      <div className="flex justify-center pt-4">
        <button
          onClick={onNext}
          className="bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                   flex items-center gap-2 hover:bg-[#003a5d] transition-colors
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Begin Form
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <SupportFooter pageName="Welcome" />
    </motion.div>
  );
}