'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc, orderBy, limit } from 'firebase/firestore';
import { getAvatarUrl } from '@/lib/avatar';
import Button from './Button';
import Image from 'next/image';

interface PendingTestimonial {
  id: string;
  uid: string;
  name: string;
  photo?: string;
  userPhotoURL?: string;
  comment: string;
  rating: number;
  imageURL?: string;
  status: string;
}

const AdminModeration = () => {
  const [pending, setPending] = useState<PendingTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Menampilkan semua testimoni agar admin bisa menghapus yang jelek
    const q = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc'),
      limit(25)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          uid: d.uid || '',
          name: d.name || 'Pelanggan Barokah',
          photo: d.photo || '',
          userPhotoURL: d.userPhotoURL || '',
          comment: d.comment || '',
          rating: Number(d.rating) || 5,
          imageURL: d.imageURL || '',
          status: d.status || 'approved'
        };
      }) as PendingTestimonial[];
      setPending(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching testimonials for admin:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateDoc(doc(db, 'testimonials', id), {
        status: 'approved'
      });
    } catch (error) {
      console.error("Error approving testimonial", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimoni ini secara permanen dari database?')) return;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      console.error("Error deleting testimonial", error);
    }
  };

  if (loading) return <div className="text-center py-6 text-on-surface-variant">Memuat data panel admin...</div>;
  if (pending.length === 0) return <div className="text-center py-6 text-on-surface-variant italic">Belum ada data ulasan masuk.</div>;

  return (
    <div className="space-y-4">
      <h4 className="font-display text-xl font-bold mb-4 text-primary text-center">Kelola Testimoni Terkini ({pending.length})</h4>
      <div className="grid gap-4">
        {pending.map((t) => (
          <div key={t.id} className="bg-amber-50/10 p-4 rounded-xl border border-amber-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-200 bg-amber-50">
                <img 
                  src={getAvatarUrl(t.name, t.uid || t.id)} 
                  alt={t.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-sm">
                <p className="font-bold text-on-surface">{t.name}</p>
                <div className="flex text-[#fdc425]">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col gap-2 min-w-0">
              <p className="text-sm italic text-on-surface-variant break-words">"{t.comment}"</p>
              {t.imageURL && (
                <div className="relative w-20 h-12 rounded-lg overflow-hidden border border-amber-100 bg-amber-50">
                  <a href={t.imageURL} target="_blank" rel="noopener noreferrer" title="Klik untuk lihat ukuran penuh">
                    <Image src={t.imageURL} alt="Foto hidangan ulasan" fill className="object-cover hover:scale-105 transition-transform" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-2 shrink-0">
              {t.status !== 'approved' && (
                <Button 
                  onClick={() => handleApprove(t.id)} 
                  className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white"
                >
                  Setujui
                </Button>
              )}
              <Button 
                onClick={() => handleDelete(t.id)} 
                variant="outline"
                className="px-3 py-1.5 text-xs border-primary text-primary hover:bg-red-50/50"
              >
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminModeration;
