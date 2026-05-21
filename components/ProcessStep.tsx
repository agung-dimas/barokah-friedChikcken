'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant shadow-sm flex flex-col items-center text-center w-full md:w-1/3 z-10"
    >
      <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-white font-display text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="font-display text-2xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="font-body text-on-surface-variant leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ProcessStep;
