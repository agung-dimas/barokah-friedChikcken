'use client';

import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full h-[819px] min-h-[600px] flex items-center bg-surface-container-lowest overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkKBAw_w6IkgM60ej89rre4gyLPv36_Lus8DFjH4POHRbJMnleAhD7OH6xfyzItXMSjdFMhw2GQIFNJ9dR7htNWy306HTbQOpz1E0EeoJdZhfgLn9wQUTtOP6ZYQOeawpzVLaAXdfWot8hQovGsx_UrLLyQEAgcAiUk_8adWW5O8wObm0TY6a1ODFrPiuvscwI1uWFGXAUavEOdpQCZq8B7Apc8pf_J3iokbtxQvfEP7UzYQaNrc5d9pguScPICnOz8CNC7wFXtYQ"
          alt="Barokah Fried Chicken Hero"
          fill
          className="object-cover opacity-90 object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-on-surface mb-6 leading-tight">
            Nikmatnya <br/>
            <span className="text-primary-container">Sampai ke Hati</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant mb-8 max-w-xl">
            Ayam goreng renyah bumbu meresap, diolah dengan standar halal dan thayyib. Kualitas premium untuk keluarga Anda.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="px-8 py-4">Lihat Menu</Button>
            <Button variant="outline" className="px-8 py-4">Lokasi Outlet</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
