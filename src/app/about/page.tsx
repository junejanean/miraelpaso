import Link from "next/link";
import { Calendar, Users, Building, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Mira El Paso</h1>
        
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Mira El Paso is dedicated to connecting the El Paso community with local events, 
            activities, and experiences. Our mission is to make it easier for residents and 
            visitors to discover what's happening in our vibrant city, while providing local 
            businesses and event organizers with a platform to reach their audience.
          </p>
          <p className="text-gray-700">
            Whether you're looking for a concert, food festival, art exhibition, or 
            community gathering, Mira El Paso is your go-to resource for staying connected 
            to the pulse of El Paso.
          </p>
        </section>
        
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Event Discovery</h3>
              </div>
              <p className="text-gray-700">
                Browse and search for events by category, date, or location. 
                Find exactly what you're looking for with our powerful filtering options.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Personalized Experience</h3>
              </div>
              <p className="text-gray-700">
                Create an account to save your favorite events, receive recommendations 
                based on your interests, and get notified about upcoming events.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Business Promotion</h3>
              </div>
              <p className="text-gray-700">
                Local businesses and event organizers can create and promote their events 
                to reach a wider audience in the El Paso community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Community Connection</h3>
              </div>
              <p className="text-gray-700">
                Connect with other attendees, share events with friends, and build a 
                stronger, more engaged El Paso community.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <p className="text-gray-700 mb-6">
            Mira El Paso was created by a team of passionate El Pasoans who love their city 
            and want to showcase all the amazing events and activities it has to offer. 
            We're dedicated to supporting local businesses and enriching our community 
            through better access to information about local events.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Join Our Team</h3>
            <p className="text-gray-700 mb-4">
              We're always looking for passionate individuals to join our mission of 
              connecting El Paso. If you're interested in working with us, please reach out!
            </p>
            <Link 
              href="mailto:contact@miraelpaso.com" 
              className="text-primary hover:underline"
            >
              contact@miraelpaso.com
            </Link>
          </div>
        </section>
        
        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-gray-700 mb-4">
              Have questions, suggestions, or feedback? We'd love to hear from you! 
              Reach out to us through any of the following channels:
            </p>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium">Email:</p>
                <Link 
                  href="mailto:info@miraelpaso.com" 
                  className="text-primary hover:underline"
                >
                  info@miraelpaso.com
                </Link>
              </div>
              
              <div>
                <p className="font-medium">Social Media:</p>
                <div className="flex space-x-4 mt-2">
                  <Link 
                    href="https://twitter.com/miraelpaso" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    Twitter
                  </Link>
                  <Link 
                    href="https://facebook.com/miraelpaso" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    Facebook
                  </Link>
                  <Link 
                    href="https://instagram.com/miraelpaso" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    Instagram
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
