'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const VolticSection3 = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden border-b-[3px] border-black bg-black">
      
      {/* === MOBILE BACKGROUND === */}
      <div className="absolute inset-0 lg:hidden z-0 ">
        <img 
          src="/yellowvoltic.webp" 
          alt="Voltic Electric Citrus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* === DESKTOP GRID === */}
      <div className="relative z-10 w-full h-full lg:grid lg:grid-cols-[40%_60%]">

        {/* === LEFT COLUMN (Desktop Image + Button) === */}
        <div className="hidden lg:block relative w-full h-full border-r-[3px] border-black bg-[#CCFF00] overflow-hidden">
           <img 
             src="/yellowvoltic.webp" 
             alt="Voltic Electric Citrus"
             className="w-full h-full object-cover object-[center_30%]"
           />
           
           {/* === DESKTOP OVERLAY: BUTTON & PRODUCT NAME === */}
           <div className="absolute bottom-12 right-10 flex flex-col items-end gap-2 z-20">
              
              {/* METALLIC YELLOW TEXT EFFECT */}
              {/* Note: pr-6 is here to prevent italic cutoff */}
              <h3 className="text-6xl font-black italic uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,20)] pr-6 pb-1 text-transparent bg-clip-text bg-gradient-to-t from-[#B8860B] via-[#FFD700] to-[#FFFF00] text-right">
                YELLOW VOLTAGE
              </h3>
              
              {/* === BUTTON GROUP === */}
              {/* ADDED 'pr-6' HERE to match the text alignment above */}
              <div className="flex items-center gap-4 pr-6">
                 {/* 1. TEXT (Left) */}
                 <span className="font-bold text-black uppercase tracking-widest text-sm bg-white/50 px-2 py-1 backdrop-blur-sm">
                    buy Now
                 </span>

                 {/* 2. SQUARE BUY BUTTON (Right) */}
                  <Link href="/products">
                 <button className="w-16 h-16 bg-[#9A1F1F] hover:bg-white text-white hover:text-black border-2 border-black flex items-center justify-center transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
                    <ShoppingBag size={28} strokeWidth={2.5} />
                 </button>
                 </Link>
              </div>
           </div>
        </div>

        {/* === RIGHT COLUMN (Text Content) === */}
        <article className="relative w-full h-full flex flex-col justify-start items-start pt-20 lg:pt-40 pl-6 pr-8 lg:bg-[#CCFF00]">
          
          {/* TOP LEFT QUOTE - Hidden on Mobile */}
          <div className="hidden lg:block absolute top-8 left-6 text-white lg:text-white font-black text-[100px] md:text-[140px] leading-none opacity-50 select-none font-serif">
            “
          </div>

          {/* TEXT CONTENT */}
          <div className="z-20 max-w-4xl relative">
             <p className="text-white lg:text-[#9A1F1F] font-black uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.9] text-left tracking-tighter shadow-black drop-shadow-lg lg:drop-shadow-none">
                Greatness is not some rare DNA strand. It is not a thing required for us. It is an unstoppable force we all possess.
             </p>
             <p className="mt-6 text-white lg:text-[#9A1F1F] font-bold text-lg md:text-xl uppercase tracking-wider text-left">
                — Unstoppable Force
             </p>
          </div>

          {/* BOTTOM RIGHT QUOTE - Hidden on Mobile */}
          <div className="hidden lg:block absolute top-[85%] md:top-[80%] lg:top-[80%] right-6 text-white lg:text-white font-black text-[100px] md:text-[140px] leading-none opacity-50 select-none font-serif">
            ”
          </div>

          <p className="sr-only">
             Voltic Electric Citrus energy drink.
          </p>

        </article>

      </div>

      {/* === MOBILE: BUTTON & PRODUCT NAME === */}
      {/* Right-aligned with extra padding to prevent italic text cutoff */}
      <div className="absolute bottom-12 right-0 pr-10 flex flex-col items-end gap-4 z-30 lg:hidden">
          
          {/* METALLIC YELLOW TEXT (Mobile) - Right aligned with padding to prevent cutoff */}
          <h3 className="text-5xl font-black italic uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,20)] pr-2 pb-1 text-transparent bg-clip-text bg-gradient-to-t from-[#B8860B] via-[#FFD700] to-[#FFFF00] text-right">
            YELLOW VOLTAGE
          </h3>
          
          {/* BUY NOW BUTTON (MOBILE) - Yellow theme, right-aligned */}
          <Link href="/products">
          <button className="px-8 py-4 bg-[#CCFF00] hover:bg-[#FFD700] text-[#B8860B] font-black uppercase tracking-wider text-lg border-2 border-black shadow-[0_0_20px_rgba(255,215,0,0.4)] active:scale-95 transition-all">
            BUY NOW
          </button>
          </Link>
      </div>

    </section>
  );
};

export default VolticSection3;