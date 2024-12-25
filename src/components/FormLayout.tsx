import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormLayoutProps {
  children: React.ReactNode;
  companyName?: string;
}

export function FormLayout({ children, companyName }: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FEFDFC] flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-[200px] mb-8">
        <img
          src="https://mckaycpa.com/wp-content/uploads/2024/04/mckay-logo-1.png"
          alt="McKay CPA Logo"
          className="w-full h-auto"
        />
      </div>
      
      {companyName && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-[#002F49] text-xl font-semibold"
        >
          {companyName}
        </motion.div>
      )}

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </div>
    </div>
  );
}