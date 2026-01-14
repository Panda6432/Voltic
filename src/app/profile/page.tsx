'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Phone, MapPin, Globe, Building, LogOut, Edit } from 'lucide-react';

const ProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [myEvents, setMyEvents] = useState<any[]>([]);


  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setEmail(user.email || '');

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(data);
      const { data: registrations } = await supabase
  .from("event_registrations")
  .select(`
    events (
      id,
      title,
      category,
      event_date,
      location,
      image_url,
      status,
      highlights_url
    )
  `)
  .eq("user_id", user.id);

const events = registrations?.map((r: any) => r.events) || [];
setMyEvents(events);

      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF3131]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-start justify-center pt-40 px-4 md:pt-28 md:pb-10">


      
      {/* Red Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3131] opacity-10 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-[#FF3131]/30 p-8 shadow-[0_0_50px_rgba(255,49,49,0.1)]">
        
        <div className="text-center mb-8">
          <h1 className="font-black text-3xl md:text-4xl text-[#FF3131] italic tracking-tighter uppercase">
            MY PROFILE
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">
            Voltic Faction Identity
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#FF3131]">
            {profile?.avatar_url ? (
              <Image src={profile.avatar_url} alt="Avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#FF3131] text-white text-4xl font-black">
                {profile?.full_name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <h2 className="mt-4 text-xl text-white font-bold uppercase tracking-wider">
            {profile?.full_name}
          </h2>
          <p className="text-gray-400 text-sm">{email}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white text-sm">

          <div className="flex items-center gap-3 border border-white/10 p-3">
            <Phone className="text-[#FF3131]" size={18} />
            <span>{profile?.phone || 'Not added'}</span>
          </div>

          <div className="flex items-center gap-3 border border-white/10 p-3">
            <Globe className="text-[#FF3131]" size={18} />
            <span>{profile?.country || 'Not added'}</span>
          </div>

          <div className="md:col-span-2 flex items-center gap-3 border border-white/10 p-3">
            <MapPin className="text-[#FF3131]" size={18} />
            <span>{profile?.address || 'Not added'}</span>
          </div>

          <div className="flex items-center gap-3 border border-white/10 p-3">
            <Building className="text-[#FF3131]" size={18} />
            <span>{profile?.city || 'Not added'}</span>
          </div>

          <div className="flex items-center gap-3 border border-white/10 p-3">
            <MapPin className="text-[#FF3131]" size={18} />
            <span>{profile?.pincode || 'Not added'}</span>
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            onClick={() => router.push('/profile-setup')}
            className="flex-1 bg-[#FF3131] text-white font-black uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
          >
            <Edit size={18} /> Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 border-2 border-[#FF3131] text-[#FF3131] font-black uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-[#FF3131] hover:text-white transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* MY REGISTERED EVENTS */}
<div className="mt-14">
  <h2 className="font-orbitron text-2xl text-white mb-6 uppercase tracking-wider">
    My Events
  </h2>

  {/* Upcoming & Live */}
  <div className="mb-8">
    <h3 className="text-[#FF3131] uppercase text-sm mb-3 tracking-widest">
      Upcoming / Live
    </h3>
    <div className="space-y-3">
      {myEvents
        .filter(e => e.status !== "past")
        .map(event => (
          <div
            key={event.id}
            className="flex items-center gap-3 border border-white/10 p-3 cursor-pointer hover:bg-white/5"
            onClick={() => router.push(`/events?id=${event.id}`)}
          >
            <img src={event.image_url} className="w-16 h-12 object-cover" />
            <div>
              <p className="font-bold text-white">{event.title}</p>
              <p className="text-xs text-gray-400">
                {new Date(event.event_date).toDateString()} • {event.location}
              </p>
            </div>
          </div>
        ))}
    </div>
  </div>

  {/* Past Events */}
  <div>
    <h3 className="text-[#FF3131] uppercase text-sm mb-3 tracking-widest">
      Past Events
    </h3>
    <div className="space-y-3">
      {myEvents
        .filter(e => e.status === "past")
        .map(event => (
          <div
            key={event.id}
            className="flex items-center gap-3 border border-white/10 p-3 cursor-pointer hover:bg-white/5"
            onClick={() => router.push(`/events?id=${event.id}`)}
          >
            <img src={event.image_url} className="w-16 h-12 object-cover" />
            <div>
              <p className="font-bold text-white">{event.title}</p>
              <p className="text-xs text-gray-400">Watch Highlights</p>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default ProfilePage;
