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
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="font-black text-5xl text-[#FF3131] italic tracking-tighter uppercase cursor-pointer  transition-transform inline-block">
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

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black font-bold uppercase tracking-wider py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors mb-6"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] bg-white/10 flex-1"></div>
          <span className="text-white/40 text-xs font-bold uppercase">OR</span>
          <div className="h-[1px] bg-white/10 flex-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black border border-white/20 text-white pl-12 pr-4 py-3"
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
