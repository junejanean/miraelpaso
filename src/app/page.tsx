import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">MIRA El Paso</Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/events" className="text-sm font-medium hover:text-primary">Events</Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary">Categories</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
            <Link 
              href="/login" 
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Sign In
            </Link>
          </nav>
          <button className="md:hidden">Menu</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover What's Happening in El Paso</h1>
            <p className="text-lg mb-8 text-muted-foreground">Find local events, connect with your community, and never miss out on what El Paso has to offer.</p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center border-2 rounded-lg overflow-hidden bg-background">
                <div className="pl-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for events..." 
                  className="w-full p-4 outline-none bg-transparent"
                />
                <button className="bg-primary text-primary-foreground px-6 py-4 font-medium">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <Link href="/events" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Card 1 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">Music</span>
                </div>
                <div className="h-full w-full relative">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">El Paso Music Festival</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">Join us for a weekend of amazing music featuring local and national artists.</p>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>June 15-17, 2025</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Downtown El Paso</span>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">Food</span>
                </div>
                <div className="h-full w-full relative">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Taste of El Paso</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">Experience the diverse culinary scene of El Paso with food from over 30 local restaurants.</p>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>July 8-10, 2025</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Convention Center</span>
                </div>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">Art</span>
                </div>
                <div className="h-full w-full relative">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">El Paso Art Walk</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">Explore local galleries and street art with guided tours and artist meet-and-greets.</p>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>August 5, 2025</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Arts District</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/categories/music" className="bg-background p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-primary mb-2">🎵</div>
              <h3 className="font-medium">Music</h3>
            </Link>
            <Link href="/categories/food" className="bg-background p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-primary mb-2">🍔</div>
              <h3 className="font-medium">Food & Drink</h3>
            </Link>
            <Link href="/categories/arts" className="bg-background p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-primary mb-2">🎨</div>
              <h3 className="font-medium">Arts & Culture</h3>
            </Link>
            <Link href="/categories/sports" className="bg-background p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-primary mb-2">⚽</div>
              <h3 className="font-medium">Sports</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have an Event to Share?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Are you organizing an event in El Paso? List it on MIRA El Paso to reach thousands of locals.</p>
          <Link 
            href="/create-event" 
            className="inline-block bg-background text-foreground px-6 py-3 rounded-md font-medium hover:bg-background/90 transition-colors"
          >
            Add Your Event
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">MIRA El Paso</h3>
              <p className="text-sm text-muted-foreground">Discover what's happening in El Paso, Texas. Your guide to local events and community activities.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/events" className="text-sm text-muted-foreground hover:text-primary">All Events</Link></li>
                <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">Categories</Link></li>
                <li><Link href="/create-event" className="text-sm text-muted-foreground hover:text-primary">Add Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
                <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} MIRA El Paso. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
