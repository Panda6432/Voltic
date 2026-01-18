"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Share2 } from "lucide-react";


type EventModalProps = {
  event: any;
  onClose: () => void;
};

export default function EventModal({ event, onClose }: EventModalProps) {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Check if already registered
  useEffect(() => {
    const checkRegistration = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_id", event.id)
        .single();

      if (data) setRegistered(true);
    };

    checkRegistration();
  }, [event.id]);

  const handleRegister = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("event_registrations").insert({
      user_id: user.id,
      event_id: event.id,
    });

    if (!error) setRegistered(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* BACKDROP  */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 w-[95%] md:w-[85%] max-w-6xl max-h-[90vh] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">

        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide">

        
          <div className="relative h-[220px] md:h-[380px]">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

       
          <div className="p-6 md:p-10">
<div className="flex justify-end mb-2">
  <button
    onClick={() => {
      const url = `${window.location.origin}/events?id=${event.id}`;
      navigator.clipboard.writeText(url);
      alert("Event link copied!");
    }}
    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm uppercase tracking-widest"
  >
    <Share2 size={16} />
    Share
  </button>
</div>


            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#FF3131] text-white px-3 py-1 text-xs uppercase tracking-wider font-orbitron">
                {event.category}
              </span>

              <span className="border border-white/30 text-xs px-3 py-1 uppercase tracking-wider font-orbitron">
                {event.status}
              </span>
            </div>

            <h2 className="font-orbitron text-3xl md:text-5xl uppercase mb-2">
              {event.title}
            </h2>

            <p className="text-gray-400 tracking-widest mb-6">
              {new Date(event.event_date).toDateString()} • {event.location}
            </p>

            <div className="w-full h-px bg-white/10 mb-6" />

            <h3 className="font-orbitron text-xl uppercase mb-2">About Event</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              {event.description}
            </p>

            <div className="w-full h-px bg-white/10 mb-8" />

            {event.status === "past" && event.highlights_url ? (
              <>
                <h3 className="font-orbitron text-xl uppercase mb-4">Highlights</h3>
                <div className="relative w-full aspect-video">
                  <iframe
                    src={event.highlights_url}
                    className="absolute inset-0 w-full h-full rounded-xl"
                    allowFullScreen
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-end">
                <button
                  disabled={registered || loading}
                  onClick={handleRegister}
                  className={`px-10 py-3 uppercase tracking-widest font-orbitron transition-colors
                    ${registered 
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                      : "bg-[#FF3131] hover:bg-white hover:text-black"}`}
                >
                  {registered ? "Registered" : loading ? "Registering..." : "Register"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
