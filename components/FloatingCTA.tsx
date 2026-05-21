import React from 'react';

const FloatingCTA = () => {
  return (
    <a 
      href="https://wa.me/6285609098845" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <span className="material-symbols-outlined text-3xl">chat</span>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
        Pesan Sekarang
      </span>
    </a>
  );
};

export default FloatingCTA;
