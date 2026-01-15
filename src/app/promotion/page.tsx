'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const PromotionsPage = () => {
  const [email, setEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsNotified(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 py-20 md:py-25 relative overflow-hidden">
      
      {/* === BACKGROUND GLOW === */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF3131] opacity-10 blur-[150px] pointer-events-none"></div>

      {/* === BIG RECTANGLE CARD === */}
      <div className="relative z-10 w-full max-w-7xl min-h-[600px] mt-20 bg-[#0a0a0a] border border-[#FF3131]/30 flex flex-col md:flex-row shadow-[0_0_60px_rgba(255,49,49,0.1)]">
        
        {/* === LEFT SIDE: EMPTY SPACE === */}
        <div className="hidden md:flex w-1/3 border-r border-[#FF3131]/20 relative bg-[url('/noise.png')]">
        </div>

        {/* === RIGHT SIDE: CONTENT === */}
        <div className="flex-1 p-6 md:p-20 flex flex-col justify-center items-start">

            <h2 className="text-[#FF3131] font-bold tracking-[0.2em] uppercase mb-4 text-xs md:text-lg">
                Incoming Transmission
            </h2>

            <h1 className="font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white italic tracking-tighter uppercase leading-[0.9] mb-6 md:mb-8 break-words">
                PROMOTIONS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                    LOCKED
                </span>
            </h1>

            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs sm:text-sm md:text-lg max-w-xl mb-8 md:mb-10 leading-relaxed">
                We are preparing exclusive drops, limited edition gear, and faction rewards. The grid is loading.
            </p>

            {/* NOTIFY FORM */}
            {!isNotified ? (
                <form onSubmit={handleNotify} className="w-full max-w-lg flex flex-col gap-3 md:gap-0 md:flex-row border-0 md:border border-white/20">
                    <input 
                        type="email" 
                        placeholder="ENTER YOUR EMAIL" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-black text-white px-4 md:px-6 py-4 md:py-5 focus:outline-none placeholder:text-white/30 font-medium uppercase tracking-wider text-sm md:text-base border border-white/20 md:border-0"
                    />
                    <button 
                        type="submit"
                        className="bg-[#FF3131] hover:bg-white hover:text-black text-white px-6 md:px-8 py-4 md:py-5 font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap text-sm md:text-base"
                    >
                        Notify Me
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            ) : (
                <div className="w-full max-w-lg bg-[#FF3131] p-4 md:p-5 flex items-center gap-3 md:gap-4 text-white font-black uppercase tracking-wider text-xs sm:text-sm md:text-base">
                    <div className="bg-black p-1 rounded-full flex-shrink-0">
                        <Check size={16} className="text-white" />
                    </div>
                    <span className="break-words">Transmission Received. You are on the list.</span>
                </div>
            )}

            <div className="mt-8 md:mt-auto pt-6 md:pt-10">
                <Link href="/" className="text-white/40 hover:text-[#FF3131] text-xs font-bold uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-[#FF3131]">
                    &lt; Return to Base
                </Link>
            </div>
        </div>

      </div>

    </div>
  );
};

export default PromotionsPage;