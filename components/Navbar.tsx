'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveLink(window.location.hash || '#');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    const sections = ['menu', 'about', 'location'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveLink('#');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#' },
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
        <Link href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-primary/20 bg-white p-0.5 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Logo Barokah Fried Chicken" 
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <span className="font-display text-lg md:text-2xl font-bold text-primary tracking-wide">
            Barokah Fried Chicken
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 font-body font-bold text-sm">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`${
                  isActive 
                    ? "text-primary border-b-2 border-primary pb-1" 
                    : "text-on-surface-variant hover:text-primary transition-colors"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
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
            <Link href="https://wa.me/6285609098845" target="_blank" rel="noopener noreferrer">
              <Button className="px-6">Pesan Sekarang</Button>
            </Link>
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
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href}
                  className={`${
                    isActive 
                      ? "text-primary border-l-4 border-primary pl-2 font-black bg-primary-container/10" 
                      : "text-on-surface-variant hover:text-primary pl-2 transition-all"
                  } font-bold py-2`}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            {!user && (
              <Link href="https://wa.me/6285609098845" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full">Pesan Sekarang</Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
