import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      className="
        bg-white text-[#FF3131] w-full overflow-hidden md:fixed md:bottom-0 md:h-[400px] md:z-0 md:py-0 flex flex-col justify-between"
    >
      {/* Top Border Line - Now sits at the absolute top */}
      <div className="w-full h-1 bg-[#FF3131]"></div>

      <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
        
        {/* Main Links Section */}
        {/* We keep py-10 here to give spacing INSIDE the footer, below the red line */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start md:items-center w-full py-10 md:py-0">
            
            {/* Column 1: Brand / Slogan */}
            <div className="flex flex-col gap-2">
                <h2 className="font-black text-4xl md:text-6xl uppercase italic tracking-tighter">
                    VOLTIC
                </h2>
                
            </div>

            {/* Column 2: Navigation Links */}
            <div className="flex flex-col gap-4 text-xl md:text-2xl font-black uppercase tracking-wider">
                <Link href="/events" className="hover:text-black transition-all duration-300 w-fit">
                    Events
                </Link>
                <div className="h-[2px] w-12 bg-[#FF3131]/30"></div>
                <Link href="/promotion" className="hover:text-black transition-all duration-300 w-fit">
                    Promotions
                </Link>
                <div className="h-[2px] w-12 bg-[#FF3131]/30"></div>
                <Link href="/#" className="hover:text-black transition-all duration-300 w-fit">
                    Contact Us
                </Link>
            </div>

            {/* Column 3: Newsletter / Socials */}
            <div className="flex flex-col gap-6">
                
                
                <div className="flex gap-4">
                    <div className="p-3 border-2 border-[#FF3131] rounded-full hover:bg-[#FF3131] hover:text-white transition-colors cursor-pointer">
                        <Instagram size={20} />
                    </div>
                    <div className="p-3 border-2 border-[#FF3131] rounded-full hover:bg-[#FF3131] hover:text-white transition-colors cursor-pointer">
                        <Twitter size={20} />
                    </div>
                    <div className="p-3 border-2 border-[#FF3131] rounded-full hover:bg-[#FF3131] hover:text-white transition-colors cursor-pointer">
                        <Youtube size={20} />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="w-full border-t border-[#FF3131]/20 py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest mb-4 md:mb-0">
        <p>&copy; 2026 Voltic Energy. All Rights Reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="/#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/#" className="hover:text-black transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;