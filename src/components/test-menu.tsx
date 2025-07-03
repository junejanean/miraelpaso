"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function TestMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        className="p-3 rounded-full bg-mira-beige-light hover:bg-mira-orange hover:text-white transition-colors"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-mira-purple">
          <div className="container mx-auto px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <div className="font-bold text-2xl font-halogen">
                MIRA<br />EL PASO
              </div>
              <button
                className="text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              <Link
                href="/events"
                className="text-2xl font-bold font-halogen tracking-wider hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                EVENTS
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
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
