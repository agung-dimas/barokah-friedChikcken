'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface MenuCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  priceColor?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ image, title, description, price, priceColor = 'text-primary-container' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.05)] transition-all duration-300"
    >
      <div className="h-56 w-full bg-surface-container relative overflow-hidden">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display text-2xl font-bold text-on-surface mb-2">{title}</h3>
        <p className="font-body text-on-surface-variant mb-4 flex-grow">{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className={`font-display text-2xl font-bold ${priceColor}`}>
            {price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
