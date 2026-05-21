'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAvatarUrl } from '@/lib/avatar';
import Button from './Button';

const TestimonialForm = () => {
  const { user, login } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi kompresi gambar client-side ke Base64 (100% gratis, tanpa Firebase Storage)
  const compressImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600; // Ukuran optimal untuk Testimonial Card
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string); // Fallback ke base64 asli jika canvas gagal
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          
          // Kompresi sebagai JPEG berkualitas 0.5 (menghasilkan file super kecil, sekitar 15KB - 30KB)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
          resolve(compressedBase64);
        };
        img.onerror = (err) => {
          reject(err);
        };
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate if it is an image
    if (!selectedFile.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!');
      return;
    }

    // Limit file size to 5MB (akan dikompresi menjadi sangat kecil)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar tidak boleh melebihi 5MB!');
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (!comment.trim()) {
      alert('Komentar/ulasan wajib diisi!');
      return;
    }
    if (rating < 1 || rating > 5) {
      alert('Rating bintang harus bernilai antara 1 dan 5!');
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedImageURL = '';

      if (file) {
        try {
          // Kompresi gambar langsung di browser menjadi Base64 (100% GRATIS & INSTAN)
          uploadedImageURL = await compressImageToBase64(file);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (compressError: any) {
          console.error("Compression failed, using preview fallback", compressError);
          uploadedImageURL = imagePreview || '';
        }
      }

      const submitPromise = addDoc(collection(db, 'testimonials'), {
        uid: user.uid,
        name: user.displayName || 'Pelanggan Barokah',
        userPhotoURL: user.photoURL || '',
        photo: user.photoURL || '', // Keep this for backward compatibility
        rating: rating,
        comment: comment.trim(),
        imageURL: uploadedImageURL,
        createdAt: new Date(),
        status: "approved" // Directly approved
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Waktu pengiriman ulasan habis. Periksa koneksi internet Anda.")), 20000)
      );

      await Promise.race([submitPromise, timeoutPromise]);
      
      setSubmitted(true);
      setComment('');
      setFile(null);
      setImagePreview(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error submitting testimonial", error);
      alert(error.message || 'Gagal mengirimkan testimoni. Silakan coba lagi.');
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
        <div className="bg-white p-8 rounded-2xl border border-amber-100 max-w-lg mx-auto shadow-[0_8px_30px_rgba(183,0,17,0.05)] animate-in zoom-in duration-300">
          <div className="flex items-center gap-3 mb-6 text-primary">
            <span className="material-symbols-outlined text-4xl">gavel</span>
            <h3 className="font-display text-2xl font-bold text-on-surface">Pernyataan Kejujuran</h3>
          </div>
          
          <div className="space-y-4 mb-8 text-on-surface-variant text-sm md:text-base leading-relaxed">
            <p className="font-bold text-primary italic">&quot;Wahai orang-orang yang beriman, bertakwalah kepada Allah dan bersamalah kamu dengan orang-orang yang benar.&quot; (QS. At-Taubah: 119)</p>
            
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
              <p>Saya menyatakan akan memberikan ulasan yang **jujur** dan objektif sesuai pengalaman nyata menikmati sajian Barokah Fried Chicken.</p>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
              <p>Saya tidak akan mengandung unsur fitnah, kata-kata kasar, atau menjatuhkan pihak manapun secara tidak adil.</p>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
              <p>Saya menyadari bahwa setiap kata yang saya sampaikan akan dipertanggungjawabkan secara moral dan agama.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleAgreeAndLogin} className="w-full py-4 bg-primary hover:bg-primary-container text-white">Saya Setuju & Lanjutkan Login</Button>
            <button onClick={() => setShowAgreement(false)} className="text-sm text-on-surface-variant/70 hover:text-primary transition-colors hover:underline">Batalkan</button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white p-8 rounded-2xl border border-amber-100 text-center max-w-lg mx-auto shadow-[0_8px_30px_rgba(183,0,17,0.04)]">
        <h3 className="font-display text-2xl font-bold mb-4 text-on-surface">Bagikan Pengalaman Anda</h3>
        <p className="text-on-surface-variant mb-6 leading-relaxed">
          Silakan masuk menggunakan akun Google Anda untuk memberikan ulasan makanan yang jujur, lezat, dan terverifikasi di Barokah Fried Chicken.
        </p>
        <Button onClick={handleStartLogin} className="flex items-center gap-3 mx-auto bg-primary hover:bg-primary-container text-white px-8 py-3.5">
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
      <div className="bg-white p-8 rounded-2xl border border-amber-100 text-center max-w-lg mx-auto shadow-[0_8px_30px_rgba(183,0,17,0.05)]">
        <span className="material-symbols-outlined text-6xl text-green-500 mb-4 animate-bounce">check_circle</span>
        <h3 className="font-display text-2xl font-bold mb-2 text-on-surface">Terima Kasih Banyak!</h3>
        <p className="text-on-surface-variant leading-relaxed mb-6">
          Testimoni Anda telah berhasil terkirim dan langsung muncul di carousel testimoni utama kami. Semoga ulasan Anda membawa berkah bagi sesama.
        </p>
        <p className="text-primary font-bold italic mb-6">&quot;InshaAllah Berkat, Terima kasih!&quot;</p>
        <Button className="bg-primary hover:bg-primary-container text-white px-8 py-3" onClick={() => setSubmitted(false)}>Kirim Ulasan Lain</Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-amber-100 max-w-lg mx-auto shadow-[0_8px_30px_rgba(183,0,17,0.03)] hover:shadow-[0_12px_40px_rgba(183,0,17,0.06)] transition-all duration-300">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-amber-50">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-amber-50">
          <img src={getAvatarUrl(user.displayName || '', user.uid)} alt={user.displayName || ''} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-on-surface text-base leading-tight">{user.displayName}</p>
          <p className="text-xs text-on-surface-variant/70">Memberikan Testimoni Ulasan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Rating Kelezatan & Pelayanan</label>
          <div className="flex gap-2.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="group transition-transform hover:scale-110 active:scale-95 outline-none"
              >
                <span 
                  className={`material-symbols-outlined text-3xl transition-colors duration-200 ${rating >= star ? 'text-[#fdc425]' : 'text-amber-100'}`}
                  style={{ fontVariationSettings: `'FILL' ${rating >= star ? 1 : 0}` }}
                >
                  star
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-on-surface-variant/60 mt-1">
            {rating === 5 && 'Luar Biasa Lezat (5/5)'}
            {rating === 4 && 'Sangat Enak (4/5)'}
            {rating === 3 && 'Cukup Enak (3/5)'}
            {rating === 2 && 'Biasa Saja (2/5)'}
            {rating === 1 && 'Perlu Peningkatan (1/5)'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Ulasan / Komentar</label>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 rounded-xl bg-amber-50/20 border border-amber-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-32 resize-none text-sm md:text-base text-on-surface placeholder:text-on-surface-variant/40"
            placeholder="Bagikan rasa gurih renyah ayam crispy, kehangatan pelayanan, atau nasi hangat kami di sini..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Foto Hidangan / Pengalaman (Opsional)</label>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
            id="testimonial-image-upload"
          />

          {!imagePreview ? (
            <label
              htmlFor="testimonial-image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-200 rounded-xl cursor-pointer bg-amber-50/10 hover:bg-amber-50/30 hover:border-primary/40 transition-all group"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 group-hover:text-primary transition-colors mb-2">
                  add_a_photo
                </span>
                <p className="text-xs font-semibold text-on-surface-variant/60 group-hover:text-primary transition-colors">
                  Klik untuk pilih atau unggah foto ulasan
                </p>
                <p className="text-[10px] text-on-surface-variant/40 mt-1">
                  PNG, JPG, JPEG (Maks. 5MB)
                </p>
              </div>
            </label>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-amber-200 bg-amber-50/10 p-2">
              <div className="relative w-full h-44 rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Pratinjau foto ulasan"
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-4 right-4 bg-primary hover:bg-primary-container text-white rounded-full p-1.5 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                title="Hapus foto"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-container text-white py-3.5 mt-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Mengirimkan Berkat...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">send</span>
              <span>Kirim Testimoni</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;

