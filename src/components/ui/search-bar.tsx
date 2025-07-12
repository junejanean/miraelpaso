"use client";

import { useState, useEffect } from "react";
import { CustomIcon } from "./custom-icon";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  iconSize?: number;
  onFilterClick?: () => void;
  showFilter?: boolean;
  filtersActive?: boolean;
}

export function SearchBar({
  placeholder = "WHAT'S HAPPENING IN EL PASO",
  value = "",
  onChange,
  onSearch,
  className = "",
  iconSize = 24,
  onFilterClick,
  showFilter = true,
  filtersActive = false
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(value);

  // Update internal state when external value changes
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex items-center">
        {showFilter && (
          <button 
            onClick={onFilterClick}
            className="mr-3 flex items-center justify-center bg-black rounded-md p-1.5"
            style={{ borderRadius: '6px' }}
            aria-label="Open filters"
          >
            <CustomIcon 
              name="filterWhite" 
              size={iconSize}
            />
          </button>
        )}
        <div className="relative w-full" style={{ borderBottom: '3px solid black' }}>
          <input
            type="text"
            placeholder={placeholder}
            className="w-full py-2 pl-0 pr-10 bg-transparent border-none outline-none font-source-code uppercase text-black text-xs placeholder-black"
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-0 bottom-1.5">
            <CustomIcon 
              name="search" 
              size={iconSize} 
              className="text-black" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
