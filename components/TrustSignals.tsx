'use client';

import React from 'react';
import { motion } from 'framer-motion';

const signals = [
  { icon: 'verified', text: 'Jaminan Halal' },
  { icon: 'health_and_safety', text: 'Higienis' },
  { icon: 'payments', text: 'Harga Sahabat' },
  { icon: 'favorite', text: 'Kenyang & Berkat' },
];

const TrustSignals = () => {
  return (
    <section className="py-12 bg-surface border-b border-surface-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {signals.map((signal) => (
            <motion.div 
              key={signal.text}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-3xl text-secondary-container">{signal.icon}</span>
              <span className="font-body font-bold text-on-surface">{signal.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;
