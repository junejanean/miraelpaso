"use client";

import { useState } from "react";
import LoadingAnimation from "./LoadingAnimation";

export default function ReplayLoadingButton() {
  const [showAnimation, setShowAnimation] = useState(false);
  
  const handleReplayAnimation = () => {
    // Clear the session storage flag
    sessionStorage.removeItem("hasShownAnimation");
    // Trigger animation
    setShowAnimation(true);
    
    // Reset after animation completes
    setTimeout(() => {
      setShowAnimation(false);
    }, 5000); // Allow enough time for the animation to complete
  };
  
  return (
    <>
      {showAnimation && <LoadingAnimation forceShow={true} />}
      <button 
        onClick={handleReplayAnimation}
        className="fixed bottom-4 right-4 bg-mira-purple text-white px-4 py-2 rounded-md shadow-md hover:bg-mira-purple-light transition-colors"
      >
        Replay Loading Animation
      </button>
    </>
  );
}
