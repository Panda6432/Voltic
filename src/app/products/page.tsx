'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

// --- TYPES ---
type NutritionalInfo = {
  Energy: string;
  Sugar: string;
  Protein: string;
  Carbs: string;
  Caffeine: string;
  'L-Theanine': string;
  'B Vitamins': string;
};

type ProductData = {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  imgBgColor: string; // Custom background color field
  info: {
    brief: string;
    features: string[];
    usage: string;
  };
  nutritionalData: NutritionalInfo;
};

// --- DATA ---
const products: ProductData[] = [
  {
    id: 'red',
    name: 'RED INFERNO',
    image: '/redinferno-volticenergy.webp',
    basePrice: 3.99,
    imgBgColor: '#991F18', // Custom Red Background
    info: {
      brief: "A blazing blend of tart berries and intense energy designed for high-octane moments. Ignite your senses with immediate power deployment.",
      features: [
        "Rapid Thermal Output: Ingredients engineered for immediate heat and energy release.",
        "Physical Dominance: Enhanced with Creatine and Beta-Alanine for muscle endurance.",
        "Zero Crash Matrix: Sustained release caffeine prevents the mid-mission drop.",
        "Aggressive Flavor: Tart Cherry mixed with electrified Citrus."
      ],
      usage: "DEPLOYMENT PROTOCOL: Consume 15 minutes prior to heavy physical exertion, gym sessions, or competitive sports matches."
    },
    nutritionalData: { Energy: "160 kcal", Sugar: "0g", Protein: "0g", Carbs: "14g", Caffeine: "160mg", 'L-Theanine': "100mg", 'B Vitamins': "200% DV" }
  },
  {
    id: 'blue',
    name: 'BLUE FROST',
    image: '/bluefrost-volticenergy.webp',
    basePrice: 3.99,
    imgBgColor: '#5DA4E8', // Custom Blue Background
    info: {
      brief: "Cool, crisp, and refreshing. Blue Frost delivers sustainable energy with a sharp blueberry bite to keep you focused under pressure.",
      features: [
        "Cerebral Overclock: Nootropics stack (Alpha-GPC) for heightened mental processing.",
        "Zero Latency: Reduces reaction time during intense gaming or coding sessions.",
        "Cooling Effect: Contains a proprietary cooling agent to refresh the palate.",
        "Precision Flavor: Icy Blueberry with a hint of Menthol."
      ],
      usage: "DEPLOYMENT PROTOCOL: Ideal for tactical gaming, late-night development sprints, or complex problem-solving scenarios."
    },
    nutritionalData: { Energy: "150 kcal", Sugar: "0g", Protein: "0g", Carbs: "13g", Caffeine: "160mg", 'L-Theanine': "100mg", 'B Vitamins': "200% DV" }
  },
  {
    id: 'yellow',
    name: 'YELLOW VOLTAGE',
    image: '/yellowvoltage-volticenergy.webp',
    basePrice: 3.99,
    imgBgColor: '#CFD806', // Custom Yellow Background
    info: {
      brief: "Electric citrus surge. The ultimate wake-up call delivering shockingly fast reflexes and vibrant, tangy flavor.",
      features: [
        "System Reboot: High dose B-Vitamin complex to jumpstart metabolism.",
        "Voltage Spike: Maximum electrolyte load for hydration and nerve function.",
        "Morning Override: Designed to break brain fog instantly.",
        "High-Viz Flavor: Intense Lemon-Lime with a sour electric kick."
      ],
      usage: "DEPLOYMENT PROTOCOL: Use immediately upon waking or during mid-day slumps to restore operational capacity."
    },
    nutritionalData: { Energy: "170 kcal", Sugar: "0g", Protein: "0g", Carbs: "15g", Caffeine: "180mg", 'L-Theanine': "100mg", 'B Vitamins': "200% DV" }
  }
];

// --- BIG CARD COMPONENT ---
const BigProductCard = ({ product }: { product: ProductData }) => {
  const [quantity, setQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'nutrition'>('info');

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(0, prev + delta));
  };

  const totalPrice = (product.basePrice * quantity).toFixed(2);

  return (
    // CARD WRAPPER:
    <article 
      className="w-full max-w-7xl mx-auto bg-white border-[4px] border-black h-[900px] md:h-[600px] flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)]"
      itemScope 
      itemType="https://schema.org/Product"
      role="listitem"
      aria-label={`${product.name} energy drink product`}
    >
      {/* Hidden structured data for SEO */}
      <meta itemProp="name" content={product.name} />
      <meta itemProp="description" content={product.info.brief} />
      <meta itemProp="image" content={product.image} />
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="price" content={product.basePrice.toString()} />
        <meta itemProp="priceCurrency" content="USD" />
        <meta itemProp="availability" content="https://schema.org/InStock" />
      </div>

      {/* GRID LAYOUT: 30% Image | 70% Content */}
      <div className="flex flex-col md:grid md:grid-cols-[30%_70%] flex-grow h-full overflow-hidden">

        {/* --- LEFT SIDE: IMAGE --- */}
        {/* Applied custom background color via inline style */}
        <div 
            className="relative h-[450px] md:h-full border-b-[4px] md:border-b-0 md:border-r-[4px] border-black flex items-center justify-center overflow-hidden p-0"
            style={{ backgroundColor: product.imgBgColor }}
            role="img"
            aria-label={`${product.name} product image`}
        >
           <div className="relative w-full h-full">
             {/* FIXED: Removed 'drop-shadow-2xl' so there is no shadow on the can */}
             <Image
               src={product.image}
               alt={`${product.name} - ${product.info.brief.split('.')[0]} energy drink can`}
               fill
               className="object-contain"
               priority
               itemProp="image"
             />
           </div>
        </div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="flex flex-col h-full overflow-hidden">

            {/* 1. TITLE HEADER */}
            <header className="flex-none border-b-[4px] border-black p-5 md:p-6 bg-white">
                <h3 className="font-black text-2xl md:text-4xl uppercase italic tracking-tighter text-black" itemProp="name">
                    {product.name}
                </h3>
            </header>

            {/* 2. TABS SELECTOR */}
            <nav className="flex-none grid grid-cols-2 border-b-[4px] border-black font-black text-sm md:text-lg uppercase tracking-wider" aria-label="Product information tabs">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`p-4 transition-colors ${activeTab === 'info' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                    aria-pressed={activeTab === 'info'}
                    aria-label="View product information"
                >
                    Product Info
                </button>
                <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`p-4 border-l-[4px] border-black transition-colors ${activeTab === 'nutrition' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                    aria-pressed={activeTab === 'nutrition'}
                    aria-label="View nutritional information"
                >
                    Nutritional Info
                </button>
            </nav>

            {/* 3. CONTENT AREA (Scrollable) */}
            <div className="flex-1 p-5 md:p-8 bg-white overflow-hidden relative">
                
                {/* Scroll container with hidden scrollbar */}
                <div className="h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-2" role="tabpanel" aria-label={activeTab === 'info' ? 'Product information' : 'Nutritional information'}>
                    
                    {activeTab === 'info' ? (
                        <div className="space-y-6 pb-4" itemProp="description">
                            {/* Mission Brief */}
                            <div>
                                <h4 className="font-black text-black uppercase tracking-widest text-xs md:text-sm mb-2 opacity-50">Mission Brief</h4>
                                <p className="font-bold text-black text-base md:text-lg leading-relaxed uppercase">
                                    {product.info.brief}
                                </p>
                            </div>

                            {/* Tactical Advantages */}
                            <div>
                                <h4 className="font-black text-black uppercase tracking-widest text-xs md:text-sm mb-2 opacity-50">Tactical Advantages</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    {product.info.features.map((feature, index) => (
                                        <li key={index} className="font-bold text-black text-sm md:text-lg uppercase">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Usage */}
                            <div>
                                <h4 className="font-black text-black uppercase tracking-widest text-xs md:text-sm mb-2 opacity-50">Usage</h4>
                                <p className="font-bold text-[#FF3131] text-sm md:text-lg leading-relaxed uppercase">
                                    {product.info.usage}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <table className="w-full text-base md:text-lg font-black uppercase" itemProp="nutrition" itemScope itemType="https://schema.org/NutritionInformation">
                            <caption className="sr-only">Nutritional information for {product.name}</caption>
                            <tbody>
                                {Object.entries(product.nutritionalData).map(([key, value]) => (
                                    <tr key={key} className="border-b-2 border-black/10 last:border-0">
                                        <th scope="row" className="py-3 text-black text-left font-black">{key}</th>
                                        <td className="py-3 text-right text-black">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* 4. BOTTOM FOOTER CONTROLS */}
            <footer className="flex-none border-t-[4px] border-black">
                
                <div className="grid grid-cols-[60%_40%] md:grid-cols-[1fr_250px] bg-white font-black uppercase">

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between p-3 md:p-4 border-r-[4px] border-black bg-white">
                        <label htmlFor={`quantity-${product.id}`} className="text-sm md:text-xl tracking-wider text-black">QTY</label>
                        <div className="flex items-center gap-2 md:gap-4" role="group" aria-label="Quantity selector">
                            <button 
                              onClick={() => handleQuantityChange(-1)} 
                              className="text-black hover:text-[#FF3131] active:scale-90 transition-transform"
                              aria-label="Decrease quantity"
                              disabled={quantity === 0}
                            >
                                <Minus size={20} strokeWidth={3} aria-hidden="true" />
                            </button>
                            <span 
                              className="text-xl md:text-3xl text-black w-6 md:w-8 text-center" 
                              id={`quantity-${product.id}`}
                              role="status"
                              aria-live="polite"
                              aria-label={`Quantity: ${quantity}`}
                            >
                              {quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(1)} 
                              className="text-black hover:text-[#FF3131] active:scale-90 transition-transform"
                              aria-label="Increase quantity"
                            >
                                <Plus size={20} strokeWidth={3} aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* Price Display */}
                    <div 
                      className="flex items-center justify-center p-3 md:p-4 text-xl md:text-3xl tracking-tighter text-black bg-white overflow-hidden whitespace-nowrap"
                      role="status"
                      aria-live="polite"
                      aria-label={`Total price: $${totalPrice}`}
                    >
                        <span itemProp="price">${totalPrice}</span>
                    </div>
                </div>

                {/* BUY NOW BUTTON */}
                <button 
                  className="w-full bg-[#FF3131] hover:bg-[#d41b1b] text-white py-5 md:py-6 font-black uppercase tracking-[0.2em] text-lg md:text-2xl transition-colors border-t-[4px] border-black"
                  aria-label={`Buy ${quantity} ${product.name} ${quantity === 1 ? 'can' : 'cans'} for $${totalPrice}`}
                  disabled={quantity === 0}
                >
                    BUY NOW
                </button>
            </footer>
        </div>
      </div>
    </article>
  );
};


// --- MAIN SECTION ---
const VolticSection4 = () => {
  return (
    <section className="relative w-full py-24 px-4 md:px-8" aria-label="Voltic Energy Drink Product Catalog">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001F4D] via-[#000d21] to-black z-0" aria-hidden="true"></div>

      <div className="relative z-10 w-full">
        {/* HEADER */}
        <h2 className="text-center text-white font-black uppercase text-4xl md:text-7xl italic tracking-tighter mb-16 md:mb-24 drop-shadow-xl">
            FACTION <span className="text-[#FF3131]">ARSENAL</span>
        </h2>

        {/* VERTICAL STACK OF CARDS */}
        <div className="flex flex-col gap-16 md:gap-24" role="list" aria-label="Energy drink products">
            {products.map((product) => (
                <BigProductCard key={product.id} product={product} />
            ))}
        </div>

      </div>
    </section>
  );
};

export default VolticSection4;