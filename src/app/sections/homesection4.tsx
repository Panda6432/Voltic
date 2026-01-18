import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const VolticSection4 = () => {
  return (
    <section className="w-full h-screen relative flex items-center justify-center bg-[#59A5EF] overflow-hidden">
      
    
      <div className="absolute inset-0 flex items-center justify-end pl-16 md:hidden z-0 pointer-events-none">
        <div className="relative w-full h-[70%]"> 
          <Image
            src="/bluevoltic.webp" 
            alt="Voltic Blue Frost"
            fill
            // Keeps image original size/aspect ratio
            className="object-contain opacity-60" 
            priority 
          />
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full px-6 relative z-10">
        
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6 text-white">
          
          <h3 className="font-orbitron text-2xl md:text-3xl tracking-widest uppercase opacity-90">
            #BEALIVE
          </h3>

          <h2 className="font-orbitron font-black text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none">
            BLUE <span className="block md:inline">FROST</span>
          </h2>

          <p className="font-orbitron text-sm md:text-lg tracking-wide max-w-md opacity-100 md:opacity-90 leading-relaxed font-medium md:font-normal">
            COOL BERRY FUSION WITH ELECTROLYTES FOR RAPID HYDRATION.
          </p>

          <div className="pt-6 pointer-events-auto">
            <Link href="/products">
            <button className="font-orbitron bg-white text-[#59A5EF] px-10 py-4 md:px-8 md:py-3 font-bold uppercase tracking-wider transition-transform duration-300 shadow-lg flex items-center gap-2">
               BUY NOW
            </button>
            </Link>
          </div>

        </div>


        <div className="hidden md:flex justify-end h-[80%] relative translate-x-16 lg:translate-x-32">
          <div className="relative w-full h-full">
            <Image
              src="/bluevoltic.webp" 
              alt="Voltic Blue Frost Energy Drink Can"
              fill
              className="object-contain"
              priority 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default VolticSection4;