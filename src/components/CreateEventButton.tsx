"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CreateEventPopoverNew from "./CreateEventPopoverNew";


interface CreateEventButtonProps {
  className?: string;
}

export default function CreateEventButton({ className = "" }: CreateEventButtonProps) {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  
  return (
    <>
      <button
        id="create-event-button"
        onClick={() => setIsCreateEventOpen(true)}
        className={`font-source-code hover:text-mira-orange ${className}`}
      >
        CREATE EVENT
      </button>
      
      <CreateEventPopoverNew 
        isOpen={isCreateEventOpen} 
        onClose={() => setIsCreateEventOpen(false)} 
      />
    </>
  );
}
