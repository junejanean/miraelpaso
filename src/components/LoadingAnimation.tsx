"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoadingAnimationProps {
  forceShow?: boolean;
}

export default function LoadingAnimation({ forceShow = false }: LoadingAnimationProps) {
  const [visible, setVisible] = useState(true);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const router = useRouter();
  
  // List of all decorative icons
  const icons = [
    "/svgs/decorative_icons/Mira1.svg",
    "/svgs/decorative_icons/Mira2.svg",
    "/svgs/decorative_icons/Mira3.svg",
    "/svgs/decorative_icons/Mira4.svg",
    "/svgs/decorative_icons/Mira5.svg",
    "/svgs/decorative_icons/Mira6.svg",
    "/svgs/decorative_icons/Mira7.svg",
    "/svgs/decorative_icons/Mira8.svg",
    "/svgs/decorative_icons/Mira9.svg",
    "/svgs/decorative_icons/Mira10.svg"
  ];

  useEffect(() => {
    // Check if we've already shown the animation in this session
    const hasShownAnimation = sessionStorage.getItem("hasShownAnimation");
    
    if (hasShownAnimation && !forceShow) {
      setVisible(false);
      return;
    }
    
    // Cycle through icons
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => {
        // If we've gone through all icons, show the logo
        if (prevIndex >= icons.length - 1) {
          clearInterval(iconInterval);
          setShowLogo(true);
          
          // Hide the animation after showing the logo for a moment
          setTimeout(() => {
            setVisible(false);
            // Mark that we've shown the animation
            sessionStorage.setItem("hasShownAnimation", "true");
          }, 1000);
          
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 200); // Change icon every 200ms - faster animation
    
    return () => {
      clearInterval(iconInterval);
    };
  }, []);

  // If not visible, don't render anything
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#b8b1ff]">
      <div className="flex flex-col h-screen w-full">
        <div className="flex-1"></div>
        <div className="flex justify-center pb-16">
          {!showLogo ? (
            <img
              src={icons[currentIconIndex]}
              alt="Loading"
              width="80"
              height="80"
              className="animate-pulse"
            />
          ) : (
            <img
              src="/svgs/logo/Mira_ELP_PrimaryLogo.svg"
              alt="Mira El Paso"
              width="120"
              height="40"
              className="animate-fade-in"
            />
          )}
        </div>
      </div>
    </div>
  );
}
