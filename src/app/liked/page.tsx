"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Heart } from "lucide-react";
import EventCard from "@/components/EventCard";

// Mock liked events - in a real app, these would be fetched from an API
const MOCK_LIKED_EVENTS = [
  {
    id: "1",
    title: "El Paso Music Festival",
    description: "Join us for a weekend of amazing music featuring local and national artists.",
    location: "Downtown El Paso",
    date: new Date("2025-06-15"),
    category: "Music",
    imageUrl: null,
  },
  {
    id: "2",
    title: "Taste of El Paso",
    description: "Experience the diverse culinary scene of El Paso with food from over 30 local restaurants.",
    location: "Convention Center",
    date: new Date("2025-07-08"),
    category: "Food",
    imageUrl: null,
  }
];

export default function LikedEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [likedEvents, setLikedEvents] = useState(MOCK_LIKED_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState(MOCK_LIKED_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Filter events based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = likedEvents.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(likedEvents);
    }
  }, [likedEvents, searchQuery]);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // In a real app, fetch liked events from API
    // const fetchLikedEvents = async () => {
    //   try {
    //     const response = await fetch("/api/user/liked-events");
    //     const data = await response.json();
    //     setLikedEvents(data);
    //     setFilteredEvents(data);
    //   } catch (error) {
    //     console.error("Error fetching liked events:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    
    // fetchLikedEvents();
    
    // Using mock data for now
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [session, status, router]);

  const handleUnlike = (eventId: string) => {
    // In a real app, make API call to unlike the event
    // For now, just update the UI
    setLikedEvents(likedEvents.filter(event => event.id !== eventId));
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mira-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with search */}
      <header className="bg-mira-beige">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="relative w-full">
              <div className="flex items-center border-b border-black">
                <div className="p-1 bg-black text-white rounded-full mr-2">
                  <Search className="h-3 w-3" />
                </div>
                <input
                  type="text"
                  placeholder="WHAT'S HAPPENING IN EL PASO"
                  className="w-full p-2 bg-transparent border-none outline-none font-source-code uppercase text-black text-xs placeholder-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <h1 className="text-2xl font-black font-source-code uppercase">LIKED EVENTS</h1>
          </div>
        </div>
      </header>

      {/* Event listings */}
      <main className="w-full">
        {likedEvents.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold font-halogen mb-2">NO LIKED EVENTS YET</h2>
            <p className="font-source-code mb-6">
              When you find events you're interested in, click the heart icon to save them here.
            </p>
            <Link
              href="/events"
              className="inline-block bg-mira-orange text-white px-4 py-2 rounded-full font-source-code hover:bg-mira-orange/90 transition-colors duration-300"
            >
              BROWSE EVENTS
            </Link>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold font-halogen mb-2">NO MATCHING EVENTS FOUND</h2>
            <p className="font-source-code mb-6">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={new Date(event.date)}
                location={event.location}
                likes={99} // Mock likes count
                isLiked={true}
                onLikeToggle={(id) => handleUnlike(id)}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
