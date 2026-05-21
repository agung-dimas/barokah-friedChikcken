'use client';

import React from 'react';

interface TestimonialCardProps {
  testimonial: {
    id?: string;
    name: string;
    userPhotoURL: string;
    comment: string;
    rating: number;
    imageURL?: string;
    createdAt?: any;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, userPhotoURL, comment, rating, imageURL, createdAt } = testimonial;

  const formatDate = (dateInput: any) => {
    if (!dateInput) return '';
    let date: Date;
    if (dateInput.toDate) {
      date = dateInput.toDate();
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      date = new Date(dateInput);
    }
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="bg-white p-6 rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(183,0,17,0.03)] hover:shadow-[0_8px_30px_rgba(183,0,17,0.06)] hover:border-amber-200 transform hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col h-full justify-between"
    >
      <div>
        {/* Header: User Profile and Stars */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/10 flex-shrink-0 bg-amber-50">
            <img 
              src={userPhotoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h4 className="font-display font-bold text-on-surface text-base line-clamp-1">{name}</h4>
            <div className="flex text-[#fdc425]">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: `'FILL' ${i < rating ? 1 : 0}` }}
                >
                  star
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Text */}
        <p className="font-body text-on-surface-variant text-sm md:text-base mb-4 italic leading-relaxed line-clamp-4">
          "{comment}"
        </p>
      </div>

      {/* Review Image & Date */}
      <div className="mt-auto space-y-3">
        {imageURL && (
          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-amber-50/50 border border-amber-100 flex-shrink-0 group">
            <img 
              src={imageURL} 
              alt="Ulasan pelanggan Barokah" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}
        
        <div className="flex justify-between items-center text-xs text-on-surface-variant/70 pt-2 border-t border-amber-50">
          <span className="font-medium">Pembelian Terverifikasi</span>
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
