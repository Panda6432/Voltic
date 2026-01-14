'use client'; 

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const redirectAfterVerify = async (userId: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });

    if (error || !data.user) {
      setError(error?.message || 'Invalid OTP');
      setIsLoading(false);
      return;
    }

    await redirectAfterVerify(data.user.id);
    setIsLoading(false);
  };

  const handleResend = async () => {
    setTimer(30);
    setOtp('');
    setError('');

    if (!email) return;

    await supabase.auth.resend({
      type: 'signup',
      email
    });
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3131] opacity-10 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-[#FF3131]/30 p-8 md:p-10 shadow-[0_0_50px_rgba(255,49,49,0.1)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF3131]/10 border border-[#FF3131] mb-4 text-[#FF3131]">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-black text-3xl text-white italic tracking-tighter uppercase">
            VERIFY IDENTITY
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-bold">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/50 p-3 flex items-center gap-3 text-red-200 text-sm">
            <AlertCircle size={18} className="text-[#FF3131]" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full bg-black border-2 border-white/20 text-white text-center text-4xl tracking-[0.5em] py-4 focus:outline-none focus:border-[#FF3131] focus:shadow-[0_0_20px_rgba(255,49,49,0.3)] transition-all placeholder:text-white/10 font-black"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF3131] text-white font-black uppercase tracking-widest py-3 hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              "VERIFY CODE"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          {timer > 0 ? (
            <p className="text-gray-500 text-sm font-bold">
              Resend code in <span className="text-[#FF3131]">{timer}s</span>
            </p>
          ) : (
            <button 
              onClick={handleResend}
              className="text-white hover:text-[#FF3131] text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <RefreshCw size={14} /> Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
