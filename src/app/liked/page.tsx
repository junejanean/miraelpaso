"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Heart } from "lucide-react";
import { format } from "date-fns";

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
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Liked Events</h1>
        
        {likedEvents.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No liked events yet</h2>
            <p className="text-gray-500 mb-6">
              When you find events you're interested in, click the heart icon to save them here.
            </p>
            <Link
              href="/events"
              className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {likedEvents.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                        {event.category}
                      </span>
                    </div>
                    <div className="h-full w-full relative">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                      <button
                        onClick={() => handleUnlike(event.id)}
                        className="text-red-500 hover:text-red-600"
                        aria-label="Unlike event"
                      >
                        <Heart className="h-5 w-5 fill-current" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{format(event.date, 'MMMM dd, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <Link
                      href={`/events/${event.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
