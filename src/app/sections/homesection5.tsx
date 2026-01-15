'use client';
import React, { useRef, useEffect, useState } from 'react';

const cards = [
  {
    id: 1,
    title: "160MG CHARGE",
    subtitle: "THE ENGINE",
    desc: "Fueled by organic Yerba Mate. No synthetic jitters, just raw power.",
    bg: "bg-neutral-900",
    text: "text-white"
  },
  {
    id: 2,
    title: "LASER FOCUS",
    subtitle: "MIND SURGE",
    desc: "L-Theanine and B-Vitamins to clear the fog and sharpen reaction time.",
    bg: "bg-[#59A5EF]", 
    text: "text-white"
  },
  {
    id: 3,
    title: "HYDRATION",
    subtitle: "HYDRO LOCK",
    desc: "Essential electrolytes to keep your system cool under pressure.",
    bg: "bg-neutral-200",
    text: "text-black"
  },
  {
    id: 4,
    title: "ZERO LAG",
    subtitle: "PURE FUEL",
    desc: "0g Sugar. 10 Calories. No crash. Energy that respects your body.",
    bg: "bg-black",
    text: "text-white"
  }
];

const VolticSection5 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pinState, setPinState] = useState<'top' | 'fixed' | 'bottom'>('top');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const sectionTop = rect.top; 
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Logic: Lock screen for scroll duration
      const startPoint = 0; 
      const endPoint = -(sectionHeight - windowHeight);

      if (sectionTop > startPoint) {
        // SCROLLING DOWN TOWARDS SECTION
        setPinState('top');
        setScrollProgress(0);
      } 
      else if (sectionTop <= startPoint && sectionTop >= endPoint) {
        // LOCKED STATE
        setPinState('fixed');
        
        const scrolled = Math.abs(sectionTop);
        const totalScrollable = sectionHeight - windowHeight;
        
        // Animation finishes at 90% scroll for smoother completion
        const bufferFactor = 0.9;
        let progress = (scrolled / (totalScrollable * bufferFactor)) * (cards.length - 1);
        
        // Clamp to max index (so it doesn't go past the last card)
        progress = Math.max(0, Math.min(progress, cards.length - 1));
        setScrollProgress(progress);
        
      } else {
        // PASSED SECTION
        setPinState('bottom');
        setScrollProgress(cards.length - 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Trigger initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    // 1. TALL SECTION (500vh)
    <section ref={containerRef} className="relative h-[500vh] w-full bg-white">
      
      {/* 2. THE VIEWPORT */}
      <div className={`
        w-full h-screen overflow-hidden flex items-center justify-center bg-white
        ${pinState === 'fixed' ? 'fixed top-0 left-0 z-20' : 'absolute'}
        ${pinState === 'bottom' ? 'bottom-0 left-0 z-0' : 'top-0 left-0 z-0'}
      `}>
        
        {/* HEADER */}
        <div className="absolute top-6 left-6 md:top-8 md:left-27 z-30 pointer-events-none">
          <h3 className="font-orbitron font-black text-2xl md:text-4xl uppercase tracking-tighter text-black">
            VOLTIC <span className="text-[#59A5EF]">POWER STATS</span>
          </h3>
        </div>

        {/* 3. CARD STACK */}
        <div className="relative w-full h-full max-w-[1920px] mx-auto flex items-center justify-center pt-32 md:pt-0">
          
          {cards.map((card, index) => {
            // Logic for positions
            const isActive = scrollProgress >= index && scrollProgress < index + 1;
            const isFuture = scrollProgress < index;
            const isPast = scrollProgress >= index + 1;
            const cardInternalProgress = scrollProgress - index;

            let style = {};

            if (isActive) {
              // Active: Moves Center to Left - NO ROTATION
              const translateX = -cardInternalProgress * 100; 
              const scale = 1 - (cardInternalProgress * 0.1); 
              style = {
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity: 1,
                zIndex: 40 - index,
              };
            } else if (isFuture) {
              // Future: Stacked Right
              const distance = index - scrollProgress; 
              const translateX = 40 + (distance * 10); 
              const scale = 1 - (distance * 0.1); 
              style = {
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity: 1 - (distance * 0.2), 
                zIndex: 40 - index, 
              };
            } else if (isPast) {
              // Past: Hidden Left
              style = {
                transform: `translateX(-150%)`,
                opacity: 0,
                zIndex: 0,
              };
            }

            return (
              <div
                key={card.id}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4 md:p-8 transition-all duration-300 ease-out will-change-transform"
                style={style}
              >
                {/* CARD DESIGN */}
                <div className={`
                  ${card.bg} ${card.text}
                  w-[95%] h-[80%] md:w-[90%] md:h-[85%]
                  rounded-[2rem] md:rounded-[3rem] 
                  flex flex-col justify-between 
                  p-6 md:p-16 relative shadow-2xl overflow-hidden
                `}>
                  
                  {/* Background Number */}
                  <div className="absolute -right-10 -bottom-20 text-[20rem] font-orbitron font-black opacity-10 select-none pointer-events-none">
                    0{card.id}
                  </div>

                  {/* Top Content */}
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <h4 className="font-orbitron text-sm md:text-xl opacity-80 tracking-[0.2em] mb-2 md:mb-4">
                        {card.subtitle}
                      </h4>
                      <h2 className="font-orbitron font-black text-4xl md:text-7xl lg:text-9xl uppercase leading-none break-words max-w-4xl">
                        {card.title}
                      </h2>
                    </div>
                    
                    <div className="font-orbitron text-xl md:text-3xl font-bold border border-current px-4 py-2 rounded-full hidden md:block">
                      {index + 1} / {cards.length}
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="z-10 mt-auto">
                    <div className="w-full h-[1px] bg-current opacity-30 mb-6 md:mb-10"></div>
                    <p className="font-orbitron text-lg md:text-3xl md:leading-normal font-medium max-w-2xl opacity-90">
                      {card.desc}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VolticSection5;