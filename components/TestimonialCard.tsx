'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  rating: number;
  content: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, content, author }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex text-secondary-container mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="material-symbols-outlined">star</span>
        ))}
      </div>
      <p className="font-body text-on-surface-variant mb-4 italic leading-relaxed">
        "{content}"
      </p>
      <p className="font-body font-bold text-on-surface">
        - {author}
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
