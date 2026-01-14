'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // === CONFIGURATION ===
  // Add any new pages here if you want to hide the footer on them
  const noFooterRoutes = [
    '/login', 
    '/signup', 
    '/verify-otp', 
    '/profile-setup'
  ];

  // Check if current path is in the list above
  const isNoFooterPage = noFooterRoutes.includes(pathname);

  return (
    <>
      <Navbar />

      {/* === MAIN CONTENT WRAPPER ===
         Logic:
         1. 'relative z-10 bg-black': Ensures content sits ON TOP of the footer.
         2. 'md:mb-[400px]': Adds the empty space at the bottom so the footer can be revealed.
            -> We REMOVE this class if 'isNoFooterPage' is true, so there is no huge gap on login/signup pages.
      */}
      <main 
        className={`relative z-10 bg-black min-h-screen shadow-2xl ${
          isNoFooterPage ? '' : 'md:mb-[400px]'
        }`}
      >
         {children}
      </main>

      {/* === FOOTER RENDER LOGIC ===
         Only show the footer if we are NOT on a restricted page.
      */}
      {!isNoFooterPage && <Footer />}
    </>
  );
};

export default LayoutWrapper;