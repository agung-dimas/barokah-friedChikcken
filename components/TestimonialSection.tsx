'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { getAvatarUrl } from '@/lib/avatar';
import AdminModeration from './AdminModeration';
import TestimonialCard from './TestimonialCard';
import TestimonialForm from './TestimonialForm';

interface Testimonial {
  id: string;
  uid: string;
  name: string;
  userPhotoURL: string;
  rating: number;
  comment: string;
  imageURL?: string;
  createdAt: any;
}

const TestimonialSection = () => {
  const { user, isAdmin, logout } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Menampilkan testimoni terbaru secara langsung tanpa filter status (real-time instant)
    const q = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          uid: d.uid || '',
          name: d.name || 'Pelanggan Barokah',
          // Selalu gunakan avatar kartun minimalis ala Canva (tanpa wajah manusia)
          userPhotoURL: getAvatarUrl(d.name || '', d.uid || doc.id),
          rating: Number(d.rating) || 5,
          comment: d.comment || '',
          imageURL: d.imageURL || '',
          createdAt: d.createdAt
        };
      }) as Testimonial[];
      setTestimonials(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching real-time testimonials:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Memastikan item yang di-loop cukup panjang untuk scrolling murni tanpa patah
  const getMarqueeItems = (items: Testimonial[]) => {
    if (items.length === 0) return [];
    let repeated = [...items];
    while (repeated.length < 8) {
      repeated = [...repeated, ...items];
    }
    return repeated;
  };

  const marqueeItems = getMarqueeItems(testimonials);

  return (
    <section className="py-section-gap bg-surface overflow-hidden relative">
      {/* CSS Keyframes for Infinite Marquee */}
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 35s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">Testimoni & Keberkahan</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Apa kata pelanggan setia tentang rasa nikmat legendaris dan keberkahan hidangan Barokah Fried Chicken.
          </p>
          
          {user && (
            <div className="mt-4 flex flex-col items-center gap-2 animate-in fade-in duration-300">
              <p className="text-sm text-on-surface">
                Halo, <span className="font-bold text-primary">{user.displayName}</span> 
                {isAdmin && <span className="text-amber-500 font-bold ml-1.5">(Admin)</span>}
              </p>
              <button onClick={logout} className="text-xs text-primary hover:text-primary-container hover:underline font-bold transition-colors">
                Keluar Akun
              </button>
            </div>
          )}
        </div>

        {/* Admin Moderation Panel */}
        {isAdmin && (
          <div className="mb-16 p-6 bg-white rounded-2xl border-2 border-primary/10 shadow-[0_4px_20px_rgba(183,0,17,0.03)] animate-in slide-in-from-top-4 duration-300">
            <AdminModeration />
          </div>
        )}

        {/* Autoscroll Carousel */}
        <div className="relative mb-16 select-none">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="flex overflow-hidden py-4 w-full relative">
              {/* First scrolling container */}
              <div className="animate-marquee-scroll flex gap-6 shrink-0 pr-6">
                {marqueeItems.map((testimonial, i) => (
                  <div key={`track1-${testimonial.id}-${i}`} className="w-[320px] md:w-[400px] shrink-0 whitespace-normal">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
              
              {/* Second identical scrolling container for seamless loop */}
              <div className="animate-marquee-scroll flex gap-6 shrink-0 pr-6" aria-hidden="true">
                {marqueeItems.map((testimonial, i) => (
                  <div key={`track2-${testimonial.id}-${i}`} className="w-[320px] md:w-[400px] shrink-0 whitespace-normal">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-amber-100 p-6 text-on-surface-variant italic shadow-[0_4px_20px_rgba(183,0,17,0.02)]">
              Belum ada testimoni. Jadilah yang pertama memberikan ulasan berkah!
            </div>
          )}
          
          {/* Gradients for fading/feathering effect */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Form Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl font-bold mb-2 text-on-surface">Punya Pengalaman Kuliner Menarik?</h3>
            <p className="text-on-surface-variant">Bagikan ulasan lezat Anda secara jujur sebagai masukan keberkahan bagi kami.</p>
          </div>
          <TestimonialForm />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
