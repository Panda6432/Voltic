'use client'; 

import React, { useState, useRef, useEffect } from 'react';

const VolticSection1 = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
        });
    }
  };

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      startPlayback();
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* === BACKGROUND VIDEO === */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        loop
        muted
        playsInline
        poster="/poster.webp"
        onLoadedData={startPlayback} 
      >
        <source src="/volticad.mp4" type="video/mp4" />
      </video>

      {/* === THE "SYNCED" COVER === */}
      <img 
        src="/poster.webp" 
        alt="Loading Voltic Experience"
        className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-500 ease-out ${
          isVideoPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* === GRADIENT OVERLAY LAYER === */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />

      {/* === TEXT CONTENT (HEADER) === */}
      {/* Changed <div> to <header> for better Semantics/SEO */}
      <header className="absolute bottom-8 left-6 md:bottom-16 md:left-9 z-30 w-full pr-6">
        
        {/* HEADLINE */}
        {/* Mobile: text-4xl (Smaller, safer) */}
        {/* Tablet: text-7xl */}
        {/* Desktop: text-8xl (Reduced from 9xl) */}
        <h1 className="text-[#FF3131] font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tighter drop-shadow-[0_0_25px_rgba(255,49,49,0.6)]">
          PURE <br /> ADRENAL
        </h1>

        <span className="sr-only">
          Voltic Energy Drink – Bold Taste and Clean Energy for High Performance
        </span>

        {/* SUBTITLE */}
        {/* Mobile: text-base (16px) for better fit */}
        <p className="mt-3 md:mt-4 text-white text-base sm:text-lg md:text-2xl font-medium tracking-wide opacity-90 max-w-md">
          Fuel the chaos. Own the moment.
        </p>

      </header>
    </section>
  );
};

export default VolticSection1;