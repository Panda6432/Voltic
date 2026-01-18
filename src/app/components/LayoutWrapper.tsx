'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const noFooterRoutes = [
    '/login', 
    '/signup', 
    '/verify-otp', 
    '/profile-setup'
  ];

  const isNoFooterPage = noFooterRoutes.includes(pathname);

  return (
    <>
      <Navbar />

  
      <main 
        className={`relative z-10 bg-black min-h-screen shadow-2xl ${
          isNoFooterPage ? '' : 'md:mb-[400px]'
        }`}
      >
         {children}
      </main>

   
      {!isNoFooterPage && <Footer />}
    </>
  );
};

export default LayoutWrapper;