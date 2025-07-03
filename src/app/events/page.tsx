"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/filters/EventFilters";
import FilterTags from "@/components/filters/FilterTags";

// This would be replaced with actual data fetching in a production app
const MOCK_EVENTS = [
  {
    id: "1",
    title: "El Paso Music Festival",
    description: "Join us for a weekend of amazing music featuring local and national artists.",
    location: "Downtown El Paso",
    date: new Date("2025-06-15"),
    category: "Music",
    imageUrl: null,
    likes: 42
  },
  {
    id: "2",
    title: "Taste of El Paso",
    description: "Experience the diverse culinary scene of El Paso with food from over 30 local restaurants.",
    location: "Convention Center",
    date: new Date("2025-07-08"),
    category: "Food",
    imageUrl: null,
    likes: 36
  },
  {
    id: "3",
    title: "El Paso Art Walk",
    description: "Explore local galleries and street art with guided tours and artist meet-and-greets.",
    location: "Arts District",
    date: new Date("2025-08-05"),
    category: "Art",
    imageUrl: null,
    likes: 28
  },
  {
    id: "4",
    title: "Downtown Street Market",
    description: "Shop local vendors, enjoy live music, and taste delicious food at this monthly market.",
    location: "San Jacinto Plaza",
    date: new Date("2025-06-20"),
    category: "Shopping",
    imageUrl: null,
    likes: 19
  },
  {
    id: "5",
    title: "El Paso Film Festival",
    description: "Celebrating independent filmmakers with screenings, panels, and workshops.",
    location: "Plaza Theatre",
    date: new Date("2025-09-12"),
    category: "Film",
    imageUrl: null,
    likes: 31
  }
];

// This would be replaced with actual data fetching in a production app
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

export default function EventsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState(MOCK_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);

  // Filter events based on selected criteria
  useEffect(() => {
    let filtered = [...events];
    
    if (selectedCategory) {
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      filtered = filtered.filter(event => 
        event.date.toDateString() === dateObj.toDateString()
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [events, selectedCategory, selectedDate, searchQuery]);

  // Set initial category from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  // Check if there are any active filters
  useEffect(() => {
    const hasCategory = searchParams.has("category") && searchParams.get("category") !== "";
    const hasDays = searchParams.has("days") && searchParams.get("days") !== "";
    const hasPriceRange = searchParams.has("priceRange") && searchParams.get("priceRange") !== "30";
    const hasIndoor = searchParams.has("indoor") && searchParams.get("indoor") === "true";
    const hasOutdoor = searchParams.has("outdoor") && searchParams.get("outdoor") === "true";
    const hasFamilyFriendly = searchParams.has("familyFriendly") && searchParams.get("familyFriendly") === "true";
    
    const hasActiveFilters = hasCategory || hasDays || hasPriceRange || hasIndoor || hasOutdoor || hasFamilyFriendly;
    
    setFiltersActive(hasActiveFilters);
  }, [searchParams]);

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
            
            <h1 className="text-2xl font-black font-source-code uppercase">EVENTS</h1>
            
            {/* Filters button with tags */}
            <div className="flex items-center">
              <button 
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${showFilters || filtersActive ? 'bg-mira-black text-white' : 'bg-mira-beige text-mira-black'}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-1" />
                <span className="font-source-code text-sm">FILTERS</span>
              </button>
              {!showFilters && <FilterTags inline />}
            </div>
            
            {/* Event Filters Component */}
            <EventFilters 
              isOpen={showFilters} 
              onClose={() => setShowFilters(false)} 
            />
          </div>
        </div>
      </header>

      {/* Event listings */}
      <main className="w-full">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold font-halogen mb-2">NO EVENTS FOUND</h2>
            <p className="font-source-code">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                likes={event.likes}
                isLiked={false}
                onLikeToggle={(id) => console.log(`Toggle like for event ${id}`)}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
