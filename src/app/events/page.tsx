"use client";

import { useState , useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import EventCard from "../components/EventCard";
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
  highlights_url?: string; // for past events later
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const searchParams = useSearchParams();
const eventIdFromUrl = searchParams.get("id");


  useEffect(() => {
    const loadEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });

      setEvents(data || []);
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
    const found = events.find(e => e.id === eventIdFromUrl);
    if (found) setSelectedEvent(found);
  }
}, [eventIdFromUrl, events]);


  return (
    <section className="w-full min-h-screen bg-black text-white py-20 px-6">
      <h1 className="font-orbitron text-5xl mb-10 uppercase">Events</h1>

      <h2 className="font-orbitron text-3xl mb-6">Live & Upcoming</h2>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {upcomingAndLive.map((event) => (
          <div key={event.id} onClick={() => setSelectedEvent(event)}>
            <EventCard {...event} />
          </div>
        ))}
      </div>

      <h2 className="font-orbitron text-3xl mt-20 mb-6">Past Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pastEvents.map((event) => (
          <div key={event.id} onClick={() => setSelectedEvent(event)}>
            <EventCard {...event} />
          </div>
        ))}
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
