"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar, Clock, MapPin, Share2, Heart, Users, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

// Mock event data - in a real app, this would be fetched from an API
const MOCK_EVENTS = [
  {
    id: "1",
    title: "El Paso Music Festival",
    description: "Join us for a weekend of amazing music featuring local and national artists. The El Paso Music Festival brings together diverse musical talents across multiple stages in the heart of downtown El Paso. Enjoy food vendors, art installations, and activities for all ages. This year's lineup includes both emerging local talents and established national acts, representing genres from rock and indie to Latin and electronic music. Don't miss this celebration of music and community!",
    location: "Downtown El Paso",
    address: "125 W Mills Ave, El Paso, TX 79901",
    date: new Date("2025-06-15"),
    startTime: "12:00 PM",
    endTime: "10:00 PM",
    category: "Music",
    organizer: "El Paso Events Co.",
    ticketPrice: "$45",
    ticketUrl: "https://example.com/tickets",
    imageUrl: null,
    likes: 42,
    attendees: 156
  },
  {
    id: "2",
    title: "Taste of El Paso",
    description: "Experience the diverse culinary scene of El Paso with food from over 30 local restaurants. This annual food festival showcases the best of El Paso's vibrant food scene, from traditional Mexican cuisine to innovative fusion dishes. Participating restaurants offer sample-sized portions of their signature dishes, allowing attendees to experience a wide variety of flavors in one location. The event also features cooking demonstrations, chef meet-and-greets, and local beverage tastings. Come hungry and discover your new favorite El Paso eateries!",
    location: "Convention Center",
    address: "1 Civic Center Plaza, El Paso, TX 79901",
    date: new Date("2025-07-08"),
    startTime: "5:00 PM",
    endTime: "9:00 PM",
    category: "Food",
    organizer: "El Paso Restaurant Association",
    ticketPrice: "$25",
    ticketUrl: "https://example.com/tickets",
    imageUrl: null,
    likes: 36,
    attendees: 210
  },
  {
    id: "3",
    title: "El Paso Art Walk",
    description: "Explore local galleries and street art with guided tours and artist meet-and-greets. The El Paso Art Walk takes you through the city's vibrant arts district, showcasing both established galleries and emerging street art. Expert guides provide context and background on the works, and several participating artists will be available to discuss their creative process. The tour includes stops at murals, sculptures, and interactive installations throughout downtown. This is a perfect opportunity to connect with El Paso's thriving arts community and support local artists.",
    location: "Arts District",
    address: "400 W San Antonio Ave, El Paso, TX 79901",
    date: new Date("2025-08-05"),
    startTime: "4:00 PM",
    endTime: "8:00 PM",
    category: "Art",
    organizer: "El Paso Arts Council",
    ticketPrice: "Free",
    ticketUrl: "",
    imageUrl: null,
    likes: 28,
    attendees: 75
  },
  {
    id: "4",
    title: "Downtown Street Market",
    description: "Shop local vendors, enjoy live music, and taste delicious food at this monthly market. The Downtown Street Market transforms San Jacinto Plaza into a bustling marketplace featuring local artisans, craftspeople, and food vendors. Browse handmade jewelry, artwork, clothing, and home goods while enjoying performances by local musicians. Food trucks and stalls offer a variety of cuisines, from traditional Mexican street food to gourmet desserts. This family-friendly event occurs on the third Saturday of each month and has become a beloved El Paso tradition for both locals and visitors.",
    location: "San Jacinto Plaza",
    address: "114 W Mills Ave, El Paso, TX 79901",
    date: new Date("2025-06-20"),
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    category: "Shopping",
    organizer: "Downtown El Paso Business Association",
    ticketPrice: "Free",
    ticketUrl: "",
    imageUrl: null,
    likes: 19,
    attendees: 120
  },
  {
    id: "5",
    title: "El Paso Film Festival",
    description: "Celebrating independent filmmakers with screenings, panels, and workshops. The El Paso Film Festival showcases the work of independent filmmakers from the border region and beyond. The festival includes feature films, documentaries, and short film programs, with many screenings followed by Q&A sessions with the filmmakers. Industry panels and workshops provide opportunities for aspiring filmmakers to learn from established professionals. The festival's focus on border stories and Latinx filmmakers makes it a unique cultural event that highlights the diverse perspectives of our region.",
    location: "Plaza Theatre",
    address: "125 Pioneer Plaza, El Paso, TX 79901",
    date: new Date("2025-09-12"),
    startTime: "11:00 AM",
    endTime: "11:00 PM",
    category: "Film",
    organizer: "El Paso Film Society",
    ticketPrice: "$35",
    ticketUrl: "https://example.com/tickets",
    imageUrl: null,
    likes: 31,
    attendees: 95
  }
];

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    const eventId = params.id as string;
    const foundEvent = MOCK_EVENTS.find(e => e.id === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);
      setLikeCount(foundEvent.likes);
      // In a real app, we would check if the user has liked this event
      setIsLiked(false);
    } else {
      // Event not found
      router.push("/events");
    }
    
    setIsLoading(false);
  }, [params.id, router]);

  const handleLikeToggle = () => {
    if (!session) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    // Toggle like status
    setIsLiked(!isLiked);
    setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);

    // In a real app, this would be an API call to like/unlike the event
    toast({
      title: isLiked ? "Event unliked" : "Event liked",
      description: isLiked 
        ? "This event has been removed from your liked events" 
        : "This event has been added to your liked events",
    });
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy to clipboard
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link href="/events" className="text-primary hover:underline">
          Browse all events
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Event Header */}
        <div className="mb-8">
          <Link href="/events" className="text-primary hover:underline mb-4 inline-block">
            ← Back to events
          </Link>
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center text-gray-500 mb-4">
            <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
              {event.category}
            </span>
          </div>
        </div>

        {/* Event Image */}
        <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="h-full w-full relative">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
              <h2 className="text-xl font-semibold mb-4">About this event</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>

            {/* Organizer */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Organizer</h2>
              <p className="text-gray-700">{event.organizer}</p>
              <p className="text-sm text-gray-500 mt-2">
                Contact the organizer for any questions about this event.
              </p>
            </div>
          </div>

          <div>
            {/* Date, Time, Location */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{format(event.date, 'EEEE, MMMM dd, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{event.startTime} - {event.endTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-gray-500">{event.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <h3 className="font-semibold mb-2">Ticket Price</h3>
              <p className="text-lg font-bold mb-4">{event.ticketPrice}</p>
              
              {event.ticketUrl && (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get Tickets
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">{event.attendees} attending</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{likeCount} likes</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleLikeToggle}
                  className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md border ${
                    isLiked
                      ? "bg-red-50 text-red-600 border-red-200"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${isLiked ? "fill-red-600 text-red-600" : ""}`}
                  />
                  {isLiked ? "Liked" : "Like"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center flex-1 py-2 px-4 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
