'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import AdminModeration from './AdminModeration';
import Button from './Button';
import TestimonialCard from './TestimonialCard';
import TestimonialForm from './TestimonialForm';

interface Testimonial {
  id: string;
  name: string;
  photo: string;
  comment: string;
  rating: number;
}

const TestimonialSection = () => {
  const { user, isAdmin, logout } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'testimonials'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Testimonial[];
      setTestimonials(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-section-gap bg-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">Testimoni & Keberkahan</h2>
          <div className="w-24 h-1 bg-primary-container mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Apa kata pelanggan kami tentang rasa dan kualitas Barokah Fried Chicken.
          </p>
          
          {user && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-sm">Halo, <span className="font-bold">{user.displayName}</span> {isAdmin && <span className="text-primary-container font-bold">(Admin)</span>}</p>
              <button onClick={logout} className="text-xs text-primary-container hover:underline font-bold">Keluar Akun</button>
            </div>
          )}
        </div>

        {/* Admin Moderation Panel */}
        {isAdmin && (
          <div className="mb-16 p-6 bg-surface-bright rounded-2xl border-2 border-primary-container/20 shadow-sm">
            <AdminModeration />
          </div>
        )}

        {/* Autoscroll Carousel */}
        <div className="relative mb-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="flex gap-6 overflow-hidden py-4 group">
              <motion.div 
                animate={{
                  x: [0, -1035], // Adjusted for content width
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
                className="flex gap-6 whitespace-nowrap"
              >
                {/* Double the list for infinite scroll effect */}
                {[...testimonials, ...testimonials].map((testimonial, i) => (
                  <div key={`${testimonial.id}-${i}`} className="w-[320px] md:w-[400px] shrink-0 whitespace-normal">
                    <TestimonialCard 
                      rating={testimonial.rating}
                      content={testimonial.comment}
                      author={testimonial.name}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-10 text-on-surface-variant italic">
              Belum ada testimoni yang disetujui. Jadilah yang pertama!
            </div>
          )}
          
          {/* Gradients for fading effect */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Form Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl font-bold mb-2">Punya Pengalaman Menarik?</h3>
            <p className="text-on-surface-variant">Bagikan ulasan Anda secara jujur sebagai masukan bagi kami.</p>
          </div>
          <TestimonialForm />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
