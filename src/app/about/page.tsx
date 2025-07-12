"use client";

import Popover from "@/components/ui/popover";

export default function AboutPage() {
  return (
    <Popover title="ABOUT" backgroundColor="bg-mira-beige-light">
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-1">
          <h2 className="font-halogen text-3xl font-bold leading-tight mb-8">
            We are El Paso folks who want to see this city thrive.
          </h2>
          
          <p className="font-source-code text-sm">
            We created a platform for all of us to share and connect about the city's events.
          </p>
        </div>
        
        {/* Decorative Icon at the bottom */}
        <div className="flex justify-center pb-16">
          <img 
            src="/svgs/decorative_icons/Mira6.svg" 
            alt="Decorative glasses icon" 
            width="80" 
            height="80" 
          />
        </div>
      </div>
    </Popover>
  );
}
