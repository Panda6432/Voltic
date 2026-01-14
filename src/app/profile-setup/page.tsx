'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Camera, User, MapPin, Phone, Globe, Building } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

const ProfileSetupPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    pincode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.fullName) {
      alert("Full Name is required");
      setIsLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }

    let avatarUrl: string | null = null;

    if (imageFile) {
      const filePath = `avatar-${user.id}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, imageFile, { upsert: true });

      if (!uploadError) {
        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        avatarUrl = data.publicUrl;
      }
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: formData.fullName,
      phone: formData.mobile,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      country: formData.country,
      avatar_url: avatarUrl
    });

    if (!error) {
      router.push('/');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 md:py-10">
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3131] opacity-10 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-[#FF3131]/30 p-8 shadow-[0_0_50px_rgba(255,49,49,0.1)]">
        
        <div className="text-center mb-8">
            <h1 className="font-black text-3xl md:text-4xl text-[#FF3131] italic tracking-tighter uppercase">
                COMPLETE PROFILE
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">
                Setup your faction identity
            </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="flex flex-col items-center mb-4">
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-32 h-32 rounded-full border-2 border-dashed border-[#FF3131]/50 cursor-pointer hover:border-[#FF3131] hover:bg-[#FF3131]/10 transition-all group overflow-hidden flex items-center justify-center bg-black"
                >
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Profile" fill className="object-cover" />
                    ) : (
                        <Camera className="text-white/30 group-hover:text-[#FF3131] transition-colors" size={40} />
                    )}
                    
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        className="hidden" 
                        accept="image/*"
                    />
                </div>
                <p className="text-xs text-white/40 mt-3 uppercase font-bold">Upload Photo (Optional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2 relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={18} />
                    <input
                        required
                        type="text"
                        name="fullName"
                        placeholder="FULL NAME *"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium uppercase"
                    />
                </div>

                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={18} />
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="MOBILE NUMBER"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium"
                    />
                </div>

                <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={18} />
                    <input
                        type="text"
                        name="country"
                        placeholder="COUNTRY"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium uppercase"
                    />
                </div>

                <div className="md:col-span-2 relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={18} />
                    <input
                        type="text"
                        name="address"
                        placeholder="FULL ADDRESS"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium uppercase"
                    />
                </div>

                <div className="relative group">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={18} />
                    <input
                        type="text"
                        name="city"
                        placeholder="CITY"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium uppercase"
                    />
                </div>

                <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={18} />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="PINCODE"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium"
                    />
                </div>

            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF3131] text-white font-black uppercase tracking-widest py-4 hover:bg-red-600 transition-colors disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Saving Profile...
                    </>
                ) : (
                    "SAVE & CONTINUE"
                )}
            </button>

        </form>

      </div>
    </div>
  );
};

export default ProfileSetupPage;
