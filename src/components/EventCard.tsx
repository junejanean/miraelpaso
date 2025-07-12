"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CustomIcon } from "./ui/custom-icon";
import EventDetailsPopover from "./EventDetailsPopover";

interface EventCardProps {
  id: string;
  title: string;
  date: Date;
  location: string;
  likes: number;
  isLiked?: boolean;
  onLikeToggle?: (id: string) => void;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  likes,
  isLiked = false,
  onLikeToggle,
  index = 0
}: EventCardProps & { index?: number }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const formattedDate = format(date, "MM/dd/yy");
  const formattedTime = format(date, "h:mmaa").toLowerCase();
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLikeToggle) {
      onLikeToggle(id);
    }
  };

  // Determine background color based on index and liked status
  const getBgColor = () => {
    if (isLiked) return 'bg-mira-beige-light';
    return index % 2 === 0 ? 'bg-white' : 'bg-mira-beige-light';
  };

  // Determine hover color based on index
  const getHoverColor = () => {
    const colorIndex = index % 3;
    if (colorIndex === 0) return 'hover:bg-mira-green-lightest';
    if (colorIndex === 1) return 'hover:bg-mira-purple-lightest';
    return 'hover:bg-mira-orange-lightest';
  };

  return (
    <div className={`w-full ${getBgColor()} ${getHoverColor()} transition-colors duration-200`}>
      <div className="w-full">
        <div className="container mx-auto px-4 py-6">
          <div onClick={() => setIsDetailsOpen(true)} className="cursor-pointer">
            <h2 className="text-2xl font-bold font-halogen uppercase mb-2">{title}</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-source-code flex items-center">
                {formattedDate} <span className="mx-2 border-t border-black w-16 inline-block"></span> {formattedTime}
              </div>
            </div>
            
            <div className="flex items-center mb-2">
              <CustomIcon name="location" size={16} className="mr-2" />
              <span className="text-sm font-source-code">{location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <a 
              href={`/events/${id}/website`} 
              className="text-xs font-source-code bg-mira-orange-lightest hover:bg-mira-orange-lighter transition-colors duration-200 px-3 py-1 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              EVENT WEBSITE
            </a>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLikeClick}
                className="flex items-center"
                aria-label={isLiked ? "Unlike event" : "Like event"}
              >
                {isLiked ? (
                  <CustomIcon name="heart" size={20} className="text-mira-orange" />
                ) : (
                  <CustomIcon name="heart" size={20} />
                )}
              </button>
              
              <div className="flex items-center">
                <CustomIcon name="eye" size={20} className="mr-1" />
                <span className="text-xs font-source-code">{likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details Popover */}
      <EventDetailsPopover 
        eventId={id} 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
      />
    </div>
  );
}
