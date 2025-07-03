"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, UserCircle2, LogOut } from "lucide-react";
import CreateEventButton from "./CreateEventButton";

// Import this to make sure Tailwind is being processed
import "../app/globals.css";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-mira-beige shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold font-halogen">
            MIRA <span className="text-lg">EL PASO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/events"
              className={`text-sm font-medium font-source-code ${
                isActive("/events") ? "text-mira-orange" : "hover:text-white"
              }`}
            >
              EVENTS
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium font-source-code ${
                isActive("/categories") ? "text-mira-orange" : "hover:text-white"
              }`}
            >
              CATEGORIES
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium font-source-code ${
                isActive("/about") ? "text-mira-orange" : "hover:text-white"
              }`}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium font-source-code ${
                isActive("/contact") ? "text-mira-orange" : "hover:text-white"
              }`}
            >
              CONTACT
            </Link>
            {session?.user?.isBusinessOwner && (
              <CreateEventButton className="text-sm font-medium" />
            )}
          </nav>

          {/* User Profile - Desktop */}
          <div className="hidden md:block">
            {session ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-sm font-medium font-source-code hover:text-white px-4 py-2"
                >
                  <UserCircle2 className="h-5 w-5 mr-2 text-black" />
                  {session.user?.name || "ACCOUNT"}
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 border" style={{ backgroundColor: '#B0A1FF' }}>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm font-source-code text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      PROFILE
                    </Link>
                    {session.user?.isBusinessOwner && (
                      <div className="block px-4 py-2 text-sm font-source-code text-gray-700 hover:bg-gray-100">
                        <CreateEventButton 
                          className="w-full text-left text-sm" 
                        />
                      </div>
                    )}
                    <Link
                      href="/liked"
                      className="block px-4 py-2 text-sm font-source-code text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      LIKED EVENTS
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm font-source-code text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        SIGN OUT
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium font-source-code bg-mira-orange text-white px-4 py-2 rounded-full hover:bg-mira-orange/90"
              >
                SIGN IN
              </Link>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            {session && (
              <button
                onClick={toggleProfileMenu}
                className="p-2 hover:text-white transition-colors"
                aria-label="Profile menu"
              >
                <UserCircle2 className="h-5 w-5 text-black" />
              </button>
            )}
            <button
              className="p-2 hover:text-white transition-colors"
              onClick={toggleMenu}
              aria-label="Main menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-black" /> : <Menu className="h-5 w-5 text-black" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: '#B0A1FF' }}>
            <div className="container mx-auto px-8 py-8">
              <div className="flex justify-between items-center mb-8">
                <div className="font-bold text-2xl font-halogen">
                  MIRA<br />EL PASO
                </div>
                <button
                  className="text-black"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Added mt-24 (100px) margin top */}
              <nav className="flex flex-col space-y-6 mt-24">
                <Link
                  href="/events"
                  className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  EVENTS
                </Link>
                <Link
                  href="/categories"
                  className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CATEGORIES
                </Link>
                <Link
                  href="/about"
                  className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
                {!session && (
                  <Link
                    href="/login"
                    className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SIGN IN
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
        
        {/* Mobile Profile Menu Overlay */}
        {isProfileMenuOpen && session && (
          <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: '#B0A1FF' }}>
            <div className="container mx-auto px-8 py-8">
              <div className="flex justify-between items-center mb-8">
                <div className="font-bold text-2xl font-halogen">
                  MIRA<br />EL PASO
                </div>
                <button
                  className="text-black"
                  onClick={() => setIsProfileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* User greeting */}
              {session?.user?.name && (
                <div className="font-bold text-xl font-source-code mb-8 underline">
                  HI, {session.user.name.split(' ')[0].toUpperCase()}!
                </div>
              )}
              
              {/* Added mt-24 (100px) margin top */}
              <nav className="flex flex-col space-y-6 mt-24">
                <Link
                  href="/profile"
                  className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  MY PROFILE
                </Link>
                <Link
                  href="/liked"
                  className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  LIKED EVENTS
                </Link>
                {session.user?.isBusinessOwner && (
                  <Link
                    href="#"
                    className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      // We'll open the create event popover after closing this menu
                      setTimeout(() => {
                        document.getElementById('create-event-button')?.click();
                      }, 100);
                    }}
                  >
                    CREATE EVENT
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors text-left"
                >
                  SIGN OUT
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
