"use client";

import Popover from "@/components/ui/popover";

export default function AboutPage() {
  return (
    <Popover title="ABOUT" backgroundColor="bg-mira-beige-light">
      <div className="space-y-8">
        <h2 className="font-halogen text-3xl font-bold leading-tight">
          We are El Paso folks who want to see this city thrive.
        </h2>
        
        <p className="font-source-code text-sm">
          We created a platform for all of us to share and connect about the city's events.
        </p>
        
        {/* Glasses Icon at the bottom */}
        <div className="flex justify-center mt-32">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3v14c0 1.1.9 2 2 2h3v-2H8V5h8v12h-3v2h3c1.1 0 2-.9 2-2V3H6z"/>
            <path d="M10 15.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"/>
          </svg>
        </div>
      </div>
    </Popover>
  );
}
