'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#', active: true },
    { name: 'Menu', href: '#menu' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Lokasi', href: '#location' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-surface shadow-sm"
    >
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="font-display text-2xl font-bold text-primary">
          Barokah Fried Chicken
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 font-body font-bold text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`${
                link.active 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-on-surface-variant hover:text-primary transition-colors"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-surface-variant">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary-container/20">
                <Image src={user.photoURL || ''} alt={user.displayName || ''} fill className="object-cover" />
              </div>
              <span className="text-sm font-bold truncate max-w-[100px]">{user.displayName?.split(' ')[0]}</span>
              <button 
                onClick={logout}
                className="material-symbols-outlined text-primary-container text-xl hover:scale-110 transition-transform"
                title="Keluar Akun"
              >
                logout
              </button>
            </div>
          ) : (
            <Button className="px-6">Pesan Sekarang</Button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-surface-variant p-4 flex flex-col gap-4 shadow-lg overflow-hidden"
          >
            {user && (
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl mb-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={user.photoURL || ''} alt={user.displayName || ''} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-sm">{user.displayName}</p>
                  <button onClick={logout} className="text-xs text-primary-container font-bold underline">Logout</button>
                </div>
              </div>
            )}
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-on-surface-variant font-bold hover:text-primary py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!user && <Button className="w-full">Pesan Sekarang</Button>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
