"use client";

import Link from "next/link";
import { useState } from "react";
import { Music, Utensils, Paintbrush, Film, ShoppingBag, GraduationCap, Heart, Trophy } from "lucide-react";

// Mock categories with icons
const CATEGORIES = [
  { id: "1", name: "Music", icon: Music, color: "bg-mira-beige-light text-mira-orange", count: 12 },
  { id: "2", name: "Food", icon: Utensils, color: "bg-mira-beige-light text-mira-orange", count: 8 },
  { id: "3", name: "Art", icon: Paintbrush, color: "bg-mira-beige-light text-mira-purple", count: 5 },
  { id: "4", name: "Sports", icon: Trophy, color: "bg-mira-beige-light text-mira-green", count: 7 },
  { id: "5", name: "Film", icon: Film, color: "bg-mira-beige-light text-mira-orange", count: 3 },
  { id: "6", name: "Shopping", icon: ShoppingBag, color: "bg-mira-beige-light text-mira-purple", count: 4 },
  { id: "7", name: "Education", icon: GraduationCap, color: "bg-mira-beige-light text-mira-green", count: 6 },
  { id: "8", name: "Charity", icon: Heart, color: "bg-mira-beige-light text-mira-orange", count: 2 }
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter categories based on search query
  const filteredCategories = CATEGORIES.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Browse Events by Category</h1>
        
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full p-3 pl-10 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No categories found</h2>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/events?category=${category.name}`}
                  className="block group"
                >
                  <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full ${category.color} mr-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-mira-orange transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {category.count} {category.count === 1 ? 'event' : 'events'}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Browse all {category.name.toLowerCase()} events in El Paso
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
