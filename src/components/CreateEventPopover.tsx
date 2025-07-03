"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { X, Star, Globe, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// Mock categories - in a real app, these would be fetched from an API
const MOCK_CATEGORIES = [
  { id: "1", name: "Music" },
  { id: "2", name: "Food" },
  { id: "3", name: "Art" },
  { id: "4", name: "Sports" },
  { id: "5", name: "Film" },
  { id: "6", name: "Shopping" },
  { id: "7", name: "Education" },
  { id: "8", name: "Charity" }
];

// Mock venues - in a real app, these would be fetched from an API
const MOCK_VENUES = [
  { id: "1", name: "THE LOWBROW" },
  { id: "2", name: "THE GARRISON" },
  { id: "3", name: "UNION HALL" },
  { id: "4", name: "TRICKY FALLS" },
  { id: "5", name: "MONARCH" }
];

interface CreateEventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventPopover({ isOpen, onClose }: CreateEventPopoverProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [animationClass, setAnimationClass] = useState("translate-y-full");
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [venue, setVenue] = useState("");
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Days of the week
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0-6)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  // Format month and year
  const formatMonthYear = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return currentMonth.toLocaleDateString('en-US', options).toUpperCase();
  };
  
  // Previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDay(null);
  };
  
  // Next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDay(null);
  };
  
  // Select a day
  const selectDay = (day: number) => {
    setSelectedDay(day);
    setDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };
  
  // Check if user is authenticated and is a business owner
  useEffect(() => {
    if (isOpen) {
      // Update URL without full page navigation
      window.history.pushState({}, "", "/create-event");
      
      // Animate in
      setTimeout(() => {
        setAnimationClass("translate-y-0");
      }, 10);
      
      if (status === "unauthenticated") {
        toast({
          title: "Authentication required",
          description: "Please sign in to create an event.",
        });
        onClose();
        router.push("/login");
        return;
      }

      if (status === "authenticated" && !session?.user?.isBusinessOwner) {
        toast({
          title: "Access denied",
          description: "Only business owners can create events.",
          variant: "destructive",
        });
        onClose();
        router.push("/");
      }
    } else {
      // Animate out
      setAnimationClass("translate-y-full");
      
      // Restore URL when closed
      if (window.location.pathname === "/create-event") {
        window.history.pushState({}, "", "/");
      }
    }
  }, [isOpen, session, status, router, toast, onClose]);

  const handleClose = () => {
    // Animate out
    setAnimationClass("translate-y-full");
    
    // Delay actual closing to allow animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
    
    // Restore URL
    window.history.pushState({}, "", "/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to create the event
      // const eventData = {
      //   title,
      //   description,
      //   url,
      //   venue,
      //   category,
      //   date: date.toISOString(),
      // };
      // await fetch('/api/events', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(eventData),
      // });
      
      // Mock successful creation
      setTimeout(() => {
        toast({
          title: "Event created",
          description: "Your event has been created successfully.",
        });
        
        console.log("Event data:", {
          title,
          description,
          url,
          venue,
          category,
          date: date.toISOString(),
        });
        
        handleClose();
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  if (status === "loading") {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end">
      <div 
        className={`bg-mira-beige-light rounded-t-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${animationClass}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <h1 className="text-3xl font-black font-source-code uppercase">CREATE EVENT</h1>
              <button 
                type="button"
                onClick={handleClose}
                className="p-1 hover:text-mira-orange transition-colors"
                aria-label="Close form"
              >
                <X className="h-6 w-6 text-black" />
              </button>
            </div>

            {/* Title Input */}
            <div className="mb-6 relative">
              <div className="flex items-center border-b border-black">
                <input
                  type="text"
                  placeholder="TITLE"
                  className="w-full p-2 bg-transparent border-none outline-none font-source-code uppercase text-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Star className="h-5 w-5 text-black" />
              </div>
            </div>

            {/* Description Input */}
            <div className="mb-6 relative">
              <div className="flex items-start border-b border-black">
                <textarea
                  placeholder="DESCRIPTION"
                  className="w-full p-2 bg-transparent border-none outline-none font-source-code uppercase text-black resize-none min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* URL Input */}
            <div className="mb-6 relative">
              <div className="flex items-center border-b border-black">
                <input
                  type="url"
                  placeholder="URL"
                  className="w-full p-2 bg-transparent border-none outline-none font-source-code uppercase text-black"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Globe className="h-5 w-5 text-black" />
              </div>
            </div>

            {/* Location Input with Dropdown */}
            <div className="mb-6 relative">
              <div 
                className="flex items-center border-b border-black cursor-pointer"
                onClick={() => setShowVenueDropdown(!showVenueDropdown)}
              >
                <input
                  type="text"
                  placeholder="LOCATION"
                  className="w-full p-2 bg-transparent border-none outline-none font-source-code uppercase text-black cursor-pointer"
                  value={venue}
                  readOnly
                  required
                />
                <MapPin className="h-5 w-5 text-black" />
              </div>
              
              {/* Venue Dropdown */}
              {showVenueDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-mira-beige z-10 border border-black shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="THE"
                      className="w-full p-2 bg-transparent border-b border-black outline-none font-source-code uppercase text-black mb-2"
                      autoFocus
                    />
                    {MOCK_VENUES.map((v) => (
                      <div 
                        key={v.id} 
                        className="p-2 hover:bg-mira-orange-lightest cursor-pointer font-source-code uppercase"
                        onClick={() => {
                          setVenue(v.name);
                          setShowVenueDropdown(false);
                        }}
                      >
                        {v.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="mb-6">
              <div 
                className="flex items-center justify-between p-2 bg-black text-white rounded-md cursor-pointer"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className="font-source-code uppercase">
                  {category || "CATEGORIES"}
                </span>
                <ChevronDown className="h-5 w-5" />
              </div>
              
              {showCategoryDropdown && (
                <div className="mt-2 bg-white border border-black shadow-lg">
                  {MOCK_CATEGORIES.map((cat) => (
                    <div 
                      key={cat.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer font-source-code uppercase"
                      onClick={() => {
                        setCategory(cat.name);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar */}
            <div className="mb-8">
              <div className="flex items-center justify-between p-2 bg-black text-white rounded-md mb-4">
                <button 
                  type="button"
                  onClick={goToPreviousMonth}
                  className="text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-source-code uppercase">{formatMonthYear()}</span>
                <button 
                  type="button"
                  onClick={goToNextMonth}
                  className="text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center font-source-code">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => (
                  <div key={index} className="text-center">
                    {day !== null ? (
                      <button
                        type="button"
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-source-code
                          ${selectedDay === day ? 'bg-mira-orange text-white' : 'bg-mira-beige hover:bg-mira-beige-dark'}
                        `}
                        onClick={() => selectDay(day)}
                      >
                        {day}
                      </button>
                    ) : (
                      <div className="w-10 h-10"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-32 bg-black text-white py-3 px-6 rounded-md font-source-code uppercase hover:bg-gray-800 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "CREATE"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
