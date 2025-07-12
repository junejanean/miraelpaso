"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar, Clock, Users, ExternalLink } from "lucide-react"; // Keeping some Lucide icons without custom equivalents
import { CustomIcon } from "./ui/custom-icon";
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
    address: "510 N Oregon St, El Paso, TX 79901",
    date: new Date("2025-06-22"),
    startTime: "4:00 PM",
    endTime: "8:00 PM",
    category: "Art",
    organizer: "El Paso Arts Council",
    ticketPrice: "$15",
    ticketUrl: "https://example.com/tickets",
    imageUrl: null,
    likes: 28,
    attendees: 95
  }
];

interface EventDetailsPopoverProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailsPopover({ eventId, isOpen, onClose }: EventDetailsPopoverProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [animationClass, setAnimationClass] = useState("translate-y-full");

  useEffect(() => {
    if (isOpen) {
      // Update URL without full page navigation
      window.history.pushState({}, "", `/events/${eventId}`);
      
      // Animate in
      setTimeout(() => {
        setAnimationClass("translate-y-0");
      }, 10);
      
      // In a real app, this would be an API call
      const foundEvent = MOCK_EVENTS.find(e => e.id === eventId);
      
      if (foundEvent) {
        setEvent(foundEvent);
        setLikeCount(foundEvent.likes);
        // In a real app, we would check if the user has liked this event
        setIsLiked(false);
      }
      
      setIsLoading(false);
    } else {
      // Animate out
      setAnimationClass("translate-y-full");
      
      // Restore URL when closed
      if (window.location.pathname.includes(`/events/${eventId}`)) {
        window.history.pushState({}, "", "/events");
      }
    }
  }, [isOpen, eventId]);

  const handleClose = () => {
    // Animate out
    setAnimationClass("translate-y-full");
    
    // Delay actual closing to allow animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
    
    // Restore URL
    window.history.pushState({}, "", "/events");
  };

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

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        <div className="bg-mira-beige-light p-8 rounded-t-xl max-w-2xl w-full">
          <div className="text-center">
            <h1 className="text-2xl font-black mb-4 font-source-code">EVENT NOT FOUND</h1>
            <p className="mb-6 font-source-code">The event you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={handleClose}
              className="text-black hover:text-mira-orange font-source-code"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end">
      <div 
        className={`bg-mira-beige-light rounded-t-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${animationClass}`}
      >
        <div className="p-6">
          {/* Close button */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-black font-source-code uppercase">DETAILS</h1>
            <button 
              onClick={handleClose}
              className="p-1 hover:text-mira-orange transition-colors"
              aria-label="Close details"
            >
              <CustomIcon name="close" size={24} className="text-black" />
            </button>
          </div>

          {/* Event title */}
          <h2 className="text-4xl font-bold font-halogen uppercase mb-4">{event.title}</h2>
          
          {/* Date and time */}
          <div className="text-xl font-source-code mb-6">
            {format(event.date, "MM/dd/yy")} <span className="mx-2 border-t border-black w-16 inline-block"></span> {event.startTime}
          </div>
          
          {/* Description */}
          <p className="font-source-code mb-8">{event.description}</p>
          
          {/* Price */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <span className="font-source-code text-xl">{event.ticketPrice}</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-start mb-6">
            <CustomIcon name="location" size={20} className="mr-2 mt-1" />
            <div>
              <div className="font-source-code font-bold">{event.location}</div>
              <div className="font-source-code">{event.address}</div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mt-8 mb-4">
            <a 
              href={event.ticketUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center font-source-code bg-mira-orange-lightest hover:bg-mira-orange-lighter transition-colors px-4 py-2 rounded-full"
            >
              EVENT WEBSITE
            </a>
            
            <button 
              onClick={handleShare}
              className="flex items-center font-source-code hover:bg-mira-beige transition-colors px-4 py-2 rounded-full"
            >
              <CustomIcon name="share" size={16} className="mr-2" />
              SHARE
            </button>
            
            <button 
              onClick={handleLikeToggle}
              className="flex items-center font-source-code hover:bg-mira-beige transition-colors px-4 py-2 rounded-full"
            >
              <CustomIcon name="heart" size={16} className={`mr-2 ${isLiked ? 'text-red-500' : ''}`} />
              {isLiked ? 'LIKED' : 'LIKE'} ({likeCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
