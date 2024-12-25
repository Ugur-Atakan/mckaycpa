import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 w-64 p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg -left-28 top-8"
          >
            <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 -top-1 left-[7.25rem]" />
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}