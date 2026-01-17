'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const VolticSection2 = () => {
  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden border-y-[3px] border-black bg-black">
      
      {/* === MOBILE BACKGROUND === */}
      <div className="absolute inset-0 lg:hidden z-0">
        <img 
          src="/redvoltic.webp" 
          alt="Voltic Red Edition"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* === HEADER BAR === */}
      <div className="relative z-30 w-full px-8 py-4 border-b-[3px] border-black flex-none flex items-center bg-[#A61C1A]">
        <h2 className="text-2xl md:text-4xl lg:text-4xl font-black uppercase tracking-wider text-left">
          <span className="text-white">JOIN THE </span>
          <span className="text-black">FORCE</span>
        </h2>
      </div>

      {/* === MAIN CONTENT GRID === */}
      <div className="relative z-10 w-full flex-1 lg:grid lg:grid-cols-[40%_60%]">

        {/* === LEFT COLUMN (Text Content) === */}
        <article className="relative w-full h-full flex flex-col justify-start items-end pt-25 lg:pt-38 pr-6 pl-8 border-r-[3px] border-black lg:bg-[#A61C1A]">
          
          {/* TOP LEFT QUOTE - ADDED 'hidden lg:block' */}
          <div className="hidden lg:block absolute top-6 left-6 text-white font-black text-[80px] md:text-[120px] leading-none opacity-50 select-none font-serif">
            “
          </div>

          {/* TEXT CONTENT (Right Aligned) */}
          <div className="z-20 max-w-4xl relative text-right">
             <p className="text-white lg:text-[#CCFF00] font-black uppercase text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tighter shadow-black drop-shadow-lg lg:drop-shadow-none">
                Built for moments where speed, control, and unshakable focus decide everything.
             </p>
             <p className="mt-4 text-white lg:text-[#CCFF00] font-bold text-base md:text-lg uppercase tracking-wider">
                — Voltic Philosophy
             </p>
          </div>

          {/* BOTTOM RIGHT QUOTE - ADDED 'hidden lg:block' */}
          <div className="hidden lg:block absolute top-[80%] md:top-[70%] lg:top-[70%] right-6 text-white font-black text-[80px] md:text-[120px] leading-none opacity-50 select-none font-serif">
            ”
          </div>

        </article>

        {/* === RIGHT COLUMN (Desktop Image + Button) === */}
        <div className="hidden lg:block relative w-full h-full bg-black">
           <img 
             src="/redvoltic.webp" 
             alt="Voltic Red Edition"
             className="w-full h-full object-cover object-center"
             loading="lazy"
           />
           <div className="absolute inset-0 bg-[#A61C1A]/10 mix-blend-overlay" />

           {/* === DESKTOP: BUTTON & PRODUCT NAME === */}
           {/* MOVED UP: Changed bottom-12 to bottom-32 */}
           <div className="absolute bottom-32 left-12 flex flex-col gap-2 z-20">
              
              {/* METALLIC RED TEXT EFFECT */}
              <h3 className="text-6xl font-black italic uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,20)] pr-4 pb-1 text-transparent bg-clip-text bg-gradient-to-t from-[#8B0000] via-[#FF0000] to-[#FF4D4D]">
                RED INFERNO
              </h3>
              
              <div className="flex items-center gap-4">

                 {/* SQUARE BUY BUTTON */}
                 <Link href="/products">
                 <button className="w-16 h-16 bg-[#CCFF00] hover:bg-white text-black border-2 border-black flex items-center justify-center transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <ShoppingBag size={28} strokeWidth={2.5} />
                 </button>
                  </Link>
                 <span className="font-bold text-white uppercase tracking-widest text-sm bg-black/50 px-2 py-1 backdrop-blur-sm">
                    buy Now
                 </span>
              </div>
           </div>

        </div>

      </div>

      {/* === MOBILE: BUTTON & PRODUCT NAME === */}
      {/* MOVED DOWN: Changed bottom-24 to bottom-12 */}
      <div className="absolute bottom-12 left-8 w-full flex flex-col items-start gap-4 z-30 lg:hidden">
          
            {/* METALLIC RED TEXT EFFECT (Mobile) - Split into two lines */}
          <h3 className="text-5xl font-black italic uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,20)] pr-6 pb-1 text-transparent bg-clip-text bg-gradient-to-t from-[#8B0000] via-[#FF0000] to-[#FF4D4D]">
            <div>RED</div>
            <div>INFERNO</div>
          </h3>
          
          {/* BUY NOW BUTTON (MOBILE) */}
          <Link href="/products">
          <button className="px-8 py-4 bg-[#A61C1A] hover:bg-[#8B0000] text-[#FF0000] font-black uppercase tracking-wider text-lg border-2 border-black shadow-[0_0_20px_rgba(255,49,49,0.4)] active:scale-95 transition-all">
            BUY NOW
          </button>
          </Link>
      </div>

    </section>
  );
};

export default VolticSection2;