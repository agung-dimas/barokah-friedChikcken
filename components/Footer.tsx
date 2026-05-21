import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-surface-container-highest mt-section-gap">
      <div className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="md:w-1/3">
            <div className="text-3xl font-display font-bold text-primary-container mb-6">
              Barokah Fried Chicken
            </div>
            <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
              Sajian ayam goreng krispy terbaik dengan standar halal dan thayyib. Menghadirkan keberkahan di setiap hidangan keluarga.
            </p>
            <p className="font-body text-on-surface-variant mb-6">
              Jl. Sudirman No. 123, Jakarta Pusat<br/>
              DKI Jakarta, 10220
            </p>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary-container">schedule</span>
              <span className="font-body font-bold">Buka Setiap Hari: 10:00 - 22:00 WIB</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="flex flex-col gap-4 font-body font-bold text-on-surface-variant">
              <h4 className="text-on-surface mb-2">Tautan Cepat</h4>
              <Link href="#" className="hover:text-primary-container transition-colors">Beranda</Link>
              <Link href="#menu" className="hover:text-primary-container transition-colors">Menu Pilihan</Link>
              <Link href="#about" className="hover:text-primary-container transition-colors">Tentang Kami</Link>
            </div>
            <div className="flex flex-col gap-4 font-body font-bold text-on-surface-variant">
              <h4 className="text-on-surface mb-2">Bantuan</h4>
              <Link href="#" className="hover:text-primary-container transition-colors">Hubungi Kami</Link>
              <Link href="#location" className="hover:text-primary-container transition-colors">Lokasi Outlet</Link>
              <Link href="#" className="hover:text-primary-container transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-variant/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-on-surface-variant text-sm">
            © 2024 Barokah Fried Chicken. InshaAllah Berkat.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-on-surface-variant hover:text-primary-container transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="text-on-surface-variant hover:text-primary-container transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
