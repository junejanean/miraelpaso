"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, Filter } from "lucide-react";
import { format } from "date-fns";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Events in El Paso</h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full p-2 pl-10 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <button 
              className="md:hidden flex items-center gap-2 bg-gray-100 p-2 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
            
            <div className={`md:flex gap-4 ${showFilters ? 'block' : 'hidden'}`}>
              <div className="mt-4 md:mt-0">
                <select
                  className="w-full md:w-auto p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {MOCK_CATEGORIES.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mt-4 md:mt-0">
                <input
                  type="date"
                  className="w-full md:w-auto p-2 border rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Event listings */}
      <main className="container mx-auto px-4 py-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No events found</h2>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="relative h-48 w-full">
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
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(event.date, 'MMMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{event.likes} likes</span>
                    <button className="text-sm font-medium text-primary hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
