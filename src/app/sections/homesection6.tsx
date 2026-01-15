import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const events = [
  {
    id: 1,
    category: "ESPORTS",
    title: "VOLTIC CYBER LEAGUE",
    date: "AUG 24 . TOKYO",
    image: "/esports.webp",
    color: "from-blue-600 to-purple-600",
    link: "https://voltic-energy.vercel.app/events?id=d3f96b73-94c0-4455-8b92-0be6cb60a050"
  },
  {
    id: 2,
    category: "MUSIC",
    title: "NEON NIGHTS FESTIVAL",
    date: "SEP 10 . BERLIN",
    image: "/music.webp",
    color: "from-red-600 to-orange-600",
    link: "https://voltic-energy.vercel.app/events?id=d74f3d66-ddbf-4311-80ea-e6b91411d9ad"
  },
  {
    id: 3,
    category: "ACTION",
    title: "URBAN RUSH FINALS",
    date: "OCT 05 . NEVADA",
    image: "/race.webp",
    color: "from-green-500 to-emerald-700",
    link: "https://voltic-energy.vercel.app/events?id=37cf5b00-ebae-498d-b8c7-13603fd18102"
  }
];

const VolticSection6 = () => {
  return (
    <section className="w-full min-h-screen bg-black text-white py-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* === SECTION HEADER === */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
          
          {/* Title - Center on mobile, left on desktop */}
          <div className="flex flex-col items-center md:items-start w-full md:w-auto text-center md:text-left">
            
            <h2 className="font-orbitron font-black text-5xl md:text-8xl uppercase leading-none italic pr-6 pb-1">
              WORLD OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to to-white">VOLTIC</span>
            </h2>
          </div>
       
          {/* Desktop Button - Hidden on mobile */}
          <Link href="/events" className="hidden md:block">
            <button className="font-orbitron border border-white/20 hover:bg-white hover:text-black transition-colors px-10 py-4 uppercase tracking-widest text-sm">
              View All Events
            </button>
          </Link>
 
        </div>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          
          {events.map((item) => (
            <Link 
              key={item.id}
              href={item.link}
              className="group relative w-full h-[400px] md:h-full border border-white/10 overflow-hidden cursor-pointer bg-neutral-900 block"
            >
              
              {/* IMAGE PLACEHOLDER (Replace 'bg-gradient...' with <Image /> later) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
            
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" 
              />
              

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Category Badge */}
                <span className="font-orbitron text-xs font-bold bg-[#FF3131] text-white px-3 py-1 mb-4 uppercase tracking-wider">
                  {item.category}
                </span>

                {/* Date */}
                <p className="font-orbitron text-gray-400 text-sm tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.date}
                </p>

                {/* Title */}
                <h3 className="font-orbitron font-black text-2xl md:text-4xl leading-tight uppercase mb-4 group-hover:text-[#FF3131] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Arrow Icon */}
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* Mobile Button (Visible only on mobile) */}
        <div className="mt-12 text-center md:hidden">
          <Link href="/events">
            <button className="font-orbitron border border-white/20 hover:bg-white hover:text-black transition-colors px-10 py-4 uppercase tracking-widest text-sm w-full">
              View All Events
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default VolticSection6;