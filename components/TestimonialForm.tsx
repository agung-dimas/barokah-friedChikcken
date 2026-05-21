'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Button from './Button';
import Image from 'next/image';

const TestimonialForm = () => {
  const { user, login } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment) return;

    setIsSubmitting(true);
    try {
      // Menggunakan timeout 10 detik agar tidak loading selamanya
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Waktu pengiriman habis. Periksa koneksi internet Anda.")), 10000)
      );

      const submitPromise = addDoc(collection(db, 'testimonials'), {
        name: user.displayName,
        photo: user.photoURL,
        comment: comment.trim(),
        rating,
        createdAt: new Date(), // Menggunakan Date lokal agar lebih instan
        status: "approved",
        uid: user.uid
      });

      await Promise.race([submitPromise, timeoutPromise]);
      
      setSubmitted(true);
      setComment('');
    } catch (error: any) {
      console.error("Error submitting testimonial", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showAgreement, setShowAgreement] = useState(false);

  const handleStartLogin = () => {
    setShowAgreement(true);
  };

  const handleAgreeAndLogin = () => {
    setShowAgreement(false);
    login();
  };

  if (!user) {
    if (showAgreement) {
      return (
        <div className="bg-surface-container-low p-8 rounded-xl border-2 border-primary-container/30 max-w-lg mx-auto shadow-xl animate-in zoom-in duration-300">
          <div className="flex items-center gap-3 mb-6 text-primary-container">
            <span className="material-symbols-outlined text-4xl">gavel</span>
            <h3 className="font-display text-2xl font-bold">Pernyataan Kejujuran</h3>
          </div>
          
          <div className="space-y-4 mb-8 text-on-surface text-sm md:text-base leading-relaxed">
            <p className="font-bold text-primary-container italic">"Wahai orang-orang yang beriman, bertakwalah kepada Allah dan bersamalah kamu dengan orang-orang yang benar." (QS. At-Taubah: 119)</p>
            
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
              <p>Saya menyatakan akan memberikan ulasan yang **jujur** dan objektif sesuai pengalaman nyata.</p>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
              <p>Saya tidak akan mengandung unsur fitnah, kata-kata kasar, atau menjatuhkan pihak manapun.</p>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
              <p>Saya menyadari bahwa setiap kata akan dipertanggungjawabkan secara moral dan agama.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleAgreeAndLogin} className="w-full py-4">Saya Setuju & Lanjutkan Login</Button>
            <button onClick={() => setShowAgreement(false)} className="text-sm text-on-surface-variant hover:underline">Batalkan</button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-surface-container-low p-8 rounded-xl border border-surface-variant text-center max-w-lg mx-auto">
        <h3 className="font-display text-2xl font-bold mb-4">Bagikan Pengalaman Anda</h3>
        <p className="text-on-surface-variant mb-6">
          Silakan masuk dengan akun Google untuk memberikan testimoni yang jujur dan terverifikasi.
        </p>
        <Button onClick={handleStartLogin} className="flex items-center gap-3 mx-auto">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Masuk dengan Google
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-surface-container-low p-8 rounded-xl border border-surface-variant text-center max-w-lg mx-auto">
        <span className="material-symbols-outlined text-5xl text-primary-container mb-4">check_circle</span>
        <h3 className="font-display text-2xl font-bold mb-2">Terima Kasih!</h3>
        <p className="text-on-surface-variant">
          Testimoni Anda telah terkirim dan sedang menunggu moderasi. InshaAllah Berkat.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>Kirim Lainnya</Button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-surface-variant max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={user.photoURL || ''} alt={user.displayName || ''} fill className="object-cover" />
        </div>
        <div>
          <p className="font-bold">{user.displayName}</p>
          <p className="text-sm text-on-surface-variant">Memberikan Testimoni</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors ${rating >= star ? 'text-secondary-container' : 'text-surface-variant'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Komentar</label>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 rounded-lg bg-surface border border-surface-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all h-32 resize-none"
            placeholder="Tuliskan pengalaman Anda menikmati Barokah Fried Chicken..."
          ></textarea>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : 'Kirim Testimoni'}
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;
