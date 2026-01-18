'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, Mail, Lock, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-otp`
      }
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3131] opacity-10 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-[#FF3131]/30 p-8 md:p-10 shadow-[0_0_50px_rgba(255,49,49,0.1)]">
        
        <div className="flex items-center justify-center mb-8">
          <Link href="/">
            <h1 className="font-black text-5xl text-[#FF3131] italic tracking-tighter uppercase cursor-pointer transition-transform inline-block">
              VOLTIC
            </h1>
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/50 p-3 flex items-center gap-3 text-red-200 text-sm">
            <AlertCircle size={18} className="text-[#FF3131]" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={20} />
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium cursor-not-allowed opacity-50"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={20} />
            <input
              type="password"
              name="password"
              placeholder="CREATE PASSWORD"
              value={formData.password}
              onChange={handleChange}
              disabled
              className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium cursor-not-allowed opacity-50"
            />
          </div>


          <div className="relative group">
            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#FF3131] transition-colors" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled
              className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF3131] focus:ring-1 focus:ring-[#FF3131] transition-all placeholder:text-white/20 font-medium cursor-not-allowed opacity-50"
            />
          </div>


          <p className="text-xs text-white/50 text-center px-4">
             We will send a One Time Password (OTP) to your email to verify your identity.
          </p>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF3131] text-white font-black uppercase tracking-widest py-3 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending OTP...
              </>
            ) : (
              "CREATE ACCOUNT"
            )}
          </button>
        </form>


        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-[#FF3131] font-bold uppercase hover:underline tracking-wider">
              Login Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;