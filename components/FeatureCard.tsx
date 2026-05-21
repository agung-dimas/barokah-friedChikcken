'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant shadow-sm hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-16 h-16 bg-secondary-container/20 rounded-full flex items-center justify-center text-secondary-container mb-6">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      <h3 className="font-display text-2xl font-bold text-on-surface mb-3">{title}</h3>
      <p className="font-body text-on-surface-variant leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
