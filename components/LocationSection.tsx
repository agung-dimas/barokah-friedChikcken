import React from 'react';
import Image from 'next/image';

const LocationSection = () => {
  return (
    <section id="location" className="py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-6">Lokasi & Jam Operasional</h2>
            <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
              Kunjungi outlet kami atau pesan sekarang untuk dinikmati di rumah. Kami menjamin kesegaran produk hingga ke tangan Anda.
            </p>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant shadow-sm mb-6">
              <h3 className="font-display text-2xl font-bold text-on-surface mb-4">Jam Buka</h3>
              <table className="w-full text-left font-body text-on-surface-variant">
                <tbody>
                  <tr className="border-b border-surface-variant">
                    <td className="py-3">Senin - Jumat</td>
                    <td className="py-3 text-right font-bold">10:00 - 22:00 WIB</td>
                  </tr>
                  <tr className="border-b border-surface-variant">
                    <td className="py-3">Sabtu - Minggu</td>
                    <td className="py-3 text-right font-bold">09:00 - 23:00 WIB</td>
                  </tr>
                  <tr>
                    <td className="py-3">Hari Libur Nasional</td>
                    <td className="py-3 text-right font-bold">10:00 - 22:00 WIB</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined mt-1 text-primary-container">location_on</span>
              <p className="font-body font-bold">Jl. Mayor Zen, Kec. Kalidoni, Palembang, Sumatera Selatan</p>
            </div>
          </div>
          <a 
            href="https://maps.app.goo.gl/nzfT4p7YxfX58SuX6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-[400px] bg-surface-container rounded-xl overflow-hidden shadow-sm relative block group cursor-pointer"
          >
            <Image 
              src="/map_preview.png"
              alt="Peta Lokasi Barokah Fried Chicken Kalidoni Palembang"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="bg-white/95 px-5 py-3 rounded-xl shadow-lg font-bold text-primary-container flex items-center gap-2 transform transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined animate-bounce">location_on</span>
                Buka di Google Maps
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
