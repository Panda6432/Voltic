'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        setProfile(profileData);
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) loadUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) setScrolled(true);
      else setScrolled(false);

      if (currentScrollY > lastScrollY && currentScrollY > 50) setIsVisible(false);
      else setIsVisible(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const isWhiteMode = scrolled || isMobileMenuOpen;

  const desktopNavClass =
    "px-9 py-1 text-[#FF3131] font-bold uppercase tracking-wider text-sm border-2 border-[#FF3131] transition-all duration-300 hover:bg-[#FF3131] hover:text-white hover:shadow-[0_0_10px_#FF3131]";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out 
      ${isWhiteMode ? 'bg-white shadow-lg' : 'bg-transparent'} 
      ${scrolled ? 'py-2' : 'py-4'} 
      ${isVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="w-full px-4 md:px-8 flex justify-between items-center">
        
        <Link href="/" className="z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <h1 className={`font-black text-3xl tracking-tighter uppercase italic transition-colors ${isWhiteMode ? 'text-[#FF3131]' : 'text-white'}`}>
            VOLTIC
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/events" className={desktopNavClass}>Events</Link>
          <Link href="/promotion" className={desktopNavClass}>Promotion</Link>
          <Link href="/products" className={desktopNavClass}>Energy Drinks</Link>

          {!user ? (
            <Link href="/login" className={`${desktopNavClass} bg-[#FF3131] text-white hover:bg-black hover:border-black`}>
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FF3131] flex items-center justify-center"
              >
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#FF3131] text-white font-bold uppercase leading-none">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 bg-white border border-[#FF3131]/30 shadow-lg w-40">
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-[#FF3131]/10">
                    <User size={16} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#FF3131]">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`absolute top-full left-0 w-full bg-white border-b-4 border-[#FF3131] flex flex-col items-center gap-8 py-10 md:hidden transition-all duration-300 transform ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
        <Link href="/events" className="text-[#FF3131] font-bold uppercase tracking-wider text-xl" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
        <Link href="/promotion" className="text-[#FF3131] font-bold uppercase tracking-wider text-xl" onClick={() => setIsMobileMenuOpen(false)}>Promotion</Link>
        <Link href="/products" className="text-[#FF3131] font-bold uppercase tracking-wider text-xl" onClick={() => setIsMobileMenuOpen(false)}>Energy Drinks</Link>

        {!user ? (
          <Link href="/login" className="px-8 py-2 text-white bg-[#FF3131] font-bold uppercase tracking-wider text-lg border-2 border-[#FF3131] hover:bg-black hover:border-black" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </Link>
        ) : (
          <>
            <Link href="/profile" className="text-[#FF3131] font-bold uppercase tracking-wider text-lg" onClick={() => setIsMobileMenuOpen(false)}>
              My Profile
            </Link>
            <button onClick={handleLogout} className="text-red-600 font-bold uppercase tracking-wider text-lg">
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
