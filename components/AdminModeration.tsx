'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc, orderBy, limit } from 'firebase/firestore';
import Button from './Button';
import Image from 'next/image';

interface PendingTestimonial {
  id: string;
  name: string;
  photo: string;
  comment: string;
  rating: number;
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
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PendingTestimonial[];
      setPending(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id: string) => {
    // Tidak lagi diperlukan karena sudah otomatis approved, 
    // tapi kita simpan fungsinya jika sewaktu-waktu ada yang manual pending
    try {
      await updateDoc(doc(db, 'testimonials', id), {
        status: 'approved'
      });
    } catch (error) {
      console.error("Error approving testimonial", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimoni ini?')) return;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      console.error("Error deleting testimonial", error);
    }
  };

  if (loading) return <div className="text-center py-4">Memuat data...</div>;
  if (pending.length === 0) return <div className="text-center py-4 text-on-surface-variant italic">Belum ada testimoni.</div>;

  return (
    <div className="space-y-4">
      <h4 className="font-display text-xl font-bold mb-4 text-primary-container text-center">Kelola Testimoni Terkini ({pending.length})</h4>
      <div className="grid gap-4">
        {pending.map((t) => (
          <div key={t.id} className="bg-surface-container p-4 rounded-xl border border-primary-container/20 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={t.photo} alt={t.name} fill className="object-cover" />
              </div>
              <div className="text-sm">
                <p className="font-bold">{t.name}</p>
                <div className="flex text-secondary-container">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xs">star</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="flex-grow text-sm italic">"{t.comment}"</p>
            <div className="flex gap-2 shrink-0">
              {t.status !== 'approved' && (
                <Button 
                  onClick={() => handleApprove(t.id)} 
                  className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700"
                >
                  Setujui
                </Button>
              )}
              <Button 
                onClick={() => handleDelete(t.id)} 
                variant="outline"
                className="px-3 py-1 text-xs border-red-600 text-red-600 hover:bg-red-50"
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
