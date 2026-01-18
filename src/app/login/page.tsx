'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Loader2, AlertCircle, Mail, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const redirectAfterLogin = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (data) {
      router.push('/'); // existing user
    } else {
      router.push('/profile-setup'); // new user
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login`
      }
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    });

    if (error || !data.user) {
      setError(error?.message || 'Login failed');
      setIsLoading(false);
      return;
    }

    await redirectAfterLogin(data.user.id);
    setIsLoading(false);
  };

  React.useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        await redirectAfterLogin(data.session.user.id);
      }
    };
    checkSession();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3131] opacity-10 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-[#FF3131]/30 p-8 md:p-10 shadow-[0_0_50px_rgba(255,49,49,0.1)]">
        
        {/* BRAND LOGO - */}
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

        {/* Google Login Button with Icon */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black font-bold uppercase tracking-wider py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors mb-6"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.8055 10.2292C19.8055 9.55056 19.7503 8.86667 19.6303 8.19792H10.2002V12.0492H15.6014C15.3771 13.2911 14.6571 14.3898 13.6026 15.0879V17.5866H16.8251C18.7175 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
            <path d="M10.2002 20.0008C12.9517 20.0008 15.2725 19.1152 16.8298 17.5867L13.6073 15.088C12.7077 15.698 11.5517 16.0431 10.2049 16.0431C7.54195 16.0431 5.28093 14.2828 4.48686 11.917H1.16406V14.4927C2.76499 17.7602 6.30893 20.0008 10.2002 20.0008Z" fill="#34A853"/>
            <path d="M4.48217 11.9169C4.05217 10.6749 4.05217 9.32975 4.48217 8.08775V5.51196H1.16404C-0.388021 8.60025 -0.388021 12.404 1.16404 15.4923L4.48217 11.9169Z" fill="#FBBC04"/>
            <path d="M10.2002 3.95805C11.6247 3.936 13.0001 4.47008 14.0408 5.45674L16.8969 2.60074C15.1814 0.990734 12.9319 0.107983 10.2002 0.135817C6.30893 0.135817 2.76499 2.37641 1.16406 5.64891L4.48217 8.22471C5.27155 5.85388 7.53726 3.95805 10.2002 3.95805Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] bg-white/10 flex-1"></div>
          <span className="text-white/40 text-xs font-bold uppercase">OR</span>
          <div className="h-[1px] bg-white/10 flex-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input - DISABLED */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 cursor-not-allowed opacity-50"
            />
          </div>

          {/* Password Input - DISABLED */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              disabled
              className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3 cursor-not-allowed opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF3131] text-white font-black uppercase tracking-widest py-3"
          >
            {isLoading ? "Processing..." : "LOGIN TO ACCOUNT"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#FF3131] font-bold uppercase">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;