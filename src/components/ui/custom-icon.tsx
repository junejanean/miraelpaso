"use client";

import React from 'react';

// Define the mapping of icon names to their SVG paths
const iconMap: Record<string, string> = {
  // Navigation icons
  menu: '/svgs/functional_icons/HamburgerMenu.svg',
  close: '/svgs/functional_icons/Close.svg',
  profile: '/svgs/functional_icons/Profile.svg',
  
  // Form and interaction icons
  eye: '/svgs/functional_icons/Eye.svg',
  eyeOff: '/svgs/functional_icons/NotVisible.svg',
  search: '/svgs/functional_icons/Search.svg',
  filter: '/svgs/functional_icons/Filter.svg',
  filterWhite: '/svgs/functional_icons/FilterWhite.svg',
  
  // Content icons
  location: '/svgs/functional_icons/Location.svg',
  heart: '/svgs/functional_icons/HeartEye.svg',
  share: '/svgs/functional_icons/Share.svg',
  email: '/svgs/functional_icons/Email.svg',
  website: '/svgs/functional_icons/Website.svg',
  price: '/svgs/functional_icons/Price.svg',
  title: '/svgs/functional_icons/Title.svg',
  wink: '/svgs/functional_icons/Wink.svg',
  
  // Navigation arrows
  arrowDown: '/svgs/functional_icons/ArrowDown.svg',
  arrowUp: '/svgs/functional_icons/ArrowUp.svg',
  arrowLeft: '/svgs/functional_icons/ArrowLeft.svg',
  arrowRight: '/svgs/functional_icons/ArrowRight.svg',
};

export interface CustomIconProps extends React.HTMLAttributes<HTMLImageElement> {
  name: keyof typeof iconMap;
  size?: number;
  className?: string;
}

export function CustomIcon({ 
  name, 
  size = 24, 
  className = "", 
  ...props 
}: CustomIconProps) {
  const iconPath = iconMap[name];
  
  if (!iconPath) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }
  
  return (
    <img
      src={iconPath}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}
