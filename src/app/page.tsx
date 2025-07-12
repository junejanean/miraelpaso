"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react"; // Keeping Calendar as there's no custom equivalent
import { CustomIcon } from "@/components/ui/custom-icon";
import { SearchBar } from "@/components/ui/search-bar";
import CreateEventButton from "@/components/CreateEventButton";
import EventFilters from "@/components/filters/EventFilters";
import FilterToggle from "@/components/filters/FilterToggle";
import FilterTags from "@/components/filters/FilterTags";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
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
  }
];

export default function Home() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(MOCK_EVENTS);
  
  // Filter events based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = MOCK_EVENTS.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(MOCK_EVENTS);
    }
  }, [searchQuery]);
  
  // Check if any filters are active
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
            {/* Search bar with filter */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onFilterClick={() => setIsFiltersOpen(true)}
              filtersActive={filtersActive}
            />
            
            {/* Filter Tags */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {!isFiltersOpen && <FilterTags inline />}
              </div>
              
              {/* Event Filters */}
              {isFiltersOpen && (
                <EventFilters 
                  isOpen={isFiltersOpen} 
                  onClose={() => setIsFiltersOpen(false)} 
                />
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Event listings */}
      <main className="w-full">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-halogen uppercase">TODAY'S EVENTS</h2>
            <Link href="/events" className="text-sm font-medium text-mira-orange hover:underline">View All</Link>
          </div>
          
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
        </div>
      </main>

      {/* Categories Section - Mobile Optimized */}
      <section className="py-6 bg-mira-beige-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-halogen uppercase">CATEGORIES</h2>
            <Link href="/categories" className="text-sm font-medium text-mira-orange hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Link href="/categories/music" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h3 className="font-medium text-xs font-source-code">MUSIC</h3>
            </Link>
            <Link href="/categories/food" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <path d="M17 9V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v4"></path>
                  <path d="M12 12V5"></path>
                  <path d="M7 19h10"></path>
                  <path d="M7 19a2 2 0 0 1-2-2v-6c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"></path>
                </svg>
              </div>
              <h3 className="font-medium text-xs font-source-code">FOOD</h3>
            </Link>
            <Link href="/categories/art" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="font-medium text-xs font-source-code">ART</h3>
            </Link>
            <Link href="/categories/sports" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                  <path d="M12 2v20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="font-medium text-xs font-source-code">SPORTS</h3>
            </Link>
            <Link href="/categories/film" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
              </div>
              <h3 className="font-medium text-xs font-source-code">FILM</h3>
            </Link>
            <Link href="/categories/shopping" className="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="font-medium text-xs font-source-code">SHOPPING</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-mira-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-2 font-halogen">CREATE YOUR OWN EVENT</h2>
          <p className="mb-4 font-source-code">Are you hosting an event in El Paso? List it on Mira El Paso!</p>
          <div className="inline-block bg-mira-black text-white py-2 px-6 rounded-full hover:bg-mira-orange transition-colors duration-300">
            <CreateEventButton className="font-bold text-white hover:text-white" />
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="border-t py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-center">
            <div className="flex justify-center mb-2">
              <img 
                src="/svgs/logo/Mira_ELP_PrimaryLogo.svg" 
                alt="Mira El Paso" 
                width="120" 
                height="40"
              />
            </div>
            <p className="text-xs text-gray-600 max-w-xs mx-auto">Your guide to local events in El Paso, Texas.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><Link href="/events" className="text-xs text-gray-600">All Events</Link></li>
                <li><Link href="/categories" className="text-xs text-gray-600">Categories</Link></li>
                <li><span className="text-xs text-gray-600 cursor-pointer"><CreateEventButton className="text-gray-600" /></span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">About</h4>
              <ul className="space-y-1">
                <li><Link href="/about" className="text-xs text-gray-600">About Us</Link></li>
                <li><Link href="/contact" className="text-xs text-gray-600">Contact</Link></li>
                <li><Link href="/privacy" className="text-xs text-gray-600">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-[#ff5722] hover:text-[#ff5722]/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="text-[#ff5722] hover:text-[#ff5722]/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="text-[#ff5722] hover:text-[#ff5722]/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
          
          <div className="text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} MIRA El Paso. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
