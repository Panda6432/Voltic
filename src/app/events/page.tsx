"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "../../lib/supabaseClient";
import EventCard from "../components/EventCard";
import EventCardSkeleton from "../components/EventCardSkeleton"; // Import the skeleton
import EventModal from "../components/EventModal";
import { useSearchParams } from "next/navigation";

type Event = {
  id: string;
  title: string;
  category: string;
  event_date: string;
  location: string;
  image_url: string;
  status: "upcoming" | "live" | "past";
  description?: string;
  highlights_url?: string;
};

function EventsContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const searchParams = useSearchParams();
  const eventIdFromUrl = searchParams.get("id");

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });

      setEvents(data || []);
      setLoading(false); // Stop loading once data is fetched
    };

    loadEvents();
  }, []);

  const upcomingAndLive = events.filter(
    (e) => e.status === "upcoming" || e.status === "live"
  );

  const pastEvents = events
    .filter((e) => e.status === "past")
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );

  useEffect(() => {
    if (eventIdFromUrl && events.length) {
      const found = events.find((e) => e.id === eventIdFromUrl);
      if (found) setSelectedEvent(found);
    }
  }, [eventIdFromUrl, events]);

  return (
    <section className="w-full min-h-screen bg-black text-white py-20 px-6">
      <h1 className="font-orbitron text-5xl mb-10 uppercase">Events</h1>

      {/* --- LIVE & UPCOMING SECTION --- */}
      <h2 className="font-orbitron text-3xl mb-6">Live & Upcoming</h2>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {loading ? (
          // Show 3 skeletons horizontally while loading
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : (
          upcomingAndLive.map((event) => (
            <div key={event.id} onClick={() => setSelectedEvent(event)}>
              <EventCard {...event} />
            </div>
          ))
        )}
      </div>

      {/* --- PAST EVENTS SECTION --- */}
      <h2 className="font-orbitron text-3xl mt-20 mb-6">Past Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          // Show 3 skeletons in grid while loading
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : (
          pastEvents.map((event) => (
            <div key={event.id} onClick={() => setSelectedEvent(event)}>
              <EventCard {...event} />
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}

// Main component with Suspense boundary
export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-2xl font-orbitron">Loading...</div>
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}