"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Mock categories - in a real app, these would be fetched from the database
const CATEGORIES = [
  "ARTS & CULTURE",
  "MUSIC & CONCERTS",
  "SPORTS & FITNESS",
  "FOOD & DRINK",
  "FESTIVALS & FAIRS",
  "CONFERENCES & WORKSHOPS"
];

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EventFilters({ isOpen, onClose }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current date information
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Format the current month and year
  const formatMonthYear = (month: number, year: number, includeYear: boolean = false) => {
    const monthNames = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    return includeYear ? `${monthNames[month]}, ${year}` : `${monthNames[month]}`;
  };
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([currentDay]); // Default to today
  const [priceRange, setPriceRange] = useState<number>(30);
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [isIndoor, setIsIndoor] = useState(true);
  const [isFamilyFriendly, setIsFamilyFriendly] = useState(false);
  
  // Get days in the selected month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get the day of the week for the first day of the month (0-6, where 0 is Sunday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar days for the selected month
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  // Initialize filters from URL if present
  useEffect(() => {
    if (searchParams.has("category")) {
      setSelectedCategory(searchParams.get("category") || "");
    }
    if (searchParams.has("month")) {
      const monthParam = Number(searchParams.get("month"));
      if (monthParam >= 0 && monthParam <= 11) {
        setSelectedMonth(monthParam);
      }
    }
    if (searchParams.has("year")) {
      const yearParam = Number(searchParams.get("year"));
      if (yearParam >= 2020 && yearParam <= 2030) { // Reasonable range check
        setSelectedYear(yearParam);
      }
    }
    if (searchParams.has("priceRange")) {
      setPriceRange(Number(searchParams.get("priceRange")) || 30);
    }
    if (searchParams.has("days")) {
      setSelectedDays((searchParams.get("days") || currentDay.toString()).split(",").map(Number));
    }
    if (searchParams.has("outdoor")) {
      setIsOutdoor(searchParams.get("outdoor") === "true");
    }
    if (searchParams.has("indoor")) {
      setIsIndoor(searchParams.get("indoor") === "true");
    }
    if (searchParams.has("familyFriendly")) {
      setIsFamilyFriendly(searchParams.get("familyFriendly") === "true");
    }
  }, [searchParams, currentDay]);

  const handleDayToggle = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    
    // Add month and year to URL params
    params.set("month", selectedMonth.toString());
    params.set("year", selectedYear.toString());
    
    if (selectedDays.length > 0) {
      params.set("days", selectedDays.join(","));
    }
    
    params.set("priceRange", priceRange.toString());
    
    if (isOutdoor) {
      params.set("outdoor", "true");
    }
    
    if (isIndoor) {
      params.set("indoor", "true");
    }
    
    if (isFamilyFriendly) {
      params.set("familyFriendly", "true");
    }
    
    router.push(`/?${params.toString()}`);
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    setSelectedDays([currentDay]);
    setPriceRange(30);
    setIsOutdoor(false);
    setIsIndoor(true);
    setIsFamilyFriendly(false);
    router.push("/");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-mira-beige-light md:absolute md:inset-auto md:top-16 md:left-0 md:right-0 md:mx-4 md:rounded-lg md:shadow-lg">
      <div className="p-4 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">FILTERS</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close filters"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Active Filters */}
        {(selectedCategory || selectedDays.length > 0 || isOutdoor || isIndoor || isFamilyFriendly || priceRange !== 30) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="bg-mira-orange-lightest text-black px-3 py-1 rounded-full text-sm font-source-code flex items-center">
                {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory("")}
                  className="ml-2 hover:text-mira-orange"
                  aria-label="Remove category filter"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {selectedDays.length > 0 && (
              <div className="bg-mira-orange-lightest text-black px-3 py-1 rounded-full text-sm font-source-code flex items-center">
                {formatMonthYear(selectedMonth, selectedYear, false)} {selectedDays.join(", ")}
                <button 
                  onClick={() => setSelectedDays([])}
                  className="ml-2 hover:text-mira-orange"
                  aria-label="Remove date filter"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {isOutdoor && (
              <div className="bg-mira-orange-lightest text-black px-3 py-1 rounded-full text-sm font-source-code flex items-center">
                OUTDOOR
                <button 
                  onClick={() => setIsOutdoor(false)}
                  className="ml-2 hover:text-mira-orange"
                  aria-label="Remove outdoor filter"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {isIndoor && (
              <div className="bg-mira-orange-lightest text-black px-3 py-1 rounded-full text-sm font-source-code flex items-center">
                INDOOR
                <button 
                  onClick={() => setIsIndoor(false)}
                  className="ml-2 hover:text-mira-orange"
                  aria-label="Remove indoor filter"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {isFamilyFriendly && (
              <div className="bg-mira-orange-lightest text-black px-3 py-1 rounded-full text-sm font-source-code flex items-center">
                FAMILY FRIENDLY
                <button 
                  onClick={() => setIsFamilyFriendly(false)}
                  className="ml-2 hover:text-mira-orange"
                  aria-label="Remove family friendly filter"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {priceRange !== 30 && (
              <div className="bg-mira-orange-lightest text-black px-3 py-1 rounded-full text-sm font-source-code flex items-center">
                ${priceRange}
                <button 
                  onClick={() => setPriceRange(30)}
                  className="ml-2 hover:text-mira-orange"
                  aria-label="Reset price range"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        <div className="mb-4">
          <div 
            className="relative bg-mira-black text-white p-2 rounded flex justify-between items-center cursor-pointer"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            <span className="font-bold">CATEGORIES</span>
            <ChevronDown size={20} className={`transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {isCategoryDropdownOpen && (
            <div className="mt-1 bg-mira-beige rounded p-2">
              {CATEGORIES.map((category) => (
                <div 
                  key={category}
                  className={`py-1 px-2 cursor-pointer ${selectedCategory === category ? 'text-mira-orange font-bold' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category === selectedCategory ? "" : category);
                    setIsCategoryDropdownOpen(false);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Month & Days */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            {/* Month Selector */}
            <div className="relative w-3/5">
              <div 
                className="relative bg-mira-black text-white p-2 rounded flex justify-between items-center cursor-pointer"
                onClick={() => {
                  setIsMonthDropdownOpen(!isMonthDropdownOpen);
                  setIsYearDropdownOpen(false);
                }}
              >
                <span className="font-bold">{formatMonthYear(selectedMonth, selectedYear, false)}</span>
                <ChevronDown size={20} className={`transition-transform ${isMonthDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isMonthDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto">
                  {[
                    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
                  ].map((month, index) => (
                    <div 
                      key={month}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedMonth === index ? 'text-mira-orange font-bold' : ''}`}
                      onClick={() => {
                        setSelectedMonth(index);
                        setIsMonthDropdownOpen(false);
                        // Reset selected days if they're invalid for the new month
                        const daysInNewMonth = getDaysInMonth(selectedYear, index);
                        setSelectedDays(selectedDays.filter(day => day <= daysInNewMonth));
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Year Selector */}
            <div className="relative w-1/3">
              <div 
                className="relative bg-mira-black text-white p-2 rounded flex justify-between items-center cursor-pointer"
                onClick={() => {
                  setIsYearDropdownOpen(!isYearDropdownOpen);
                  setIsMonthDropdownOpen(false);
                }}
              >
                <span className="font-bold">{selectedYear}</span>
                <ChevronDown size={20} className={`transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isYearDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto">
                  {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map((year) => (
                    <div 
                      key={year}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedYear === year ? 'text-mira-orange font-bold' : ''}`}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsYearDropdownOpen(false);
                      }}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={`day-label-${index}`} className="w-8 h-8 flex items-center justify-center text-xs font-bold">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div 
                key={`day-${index}`}
                className={`w-8 h-8 flex items-center justify-center cursor-pointer text-sm
                  ${day === null 
                    ? 'invisible' 
                    : selectedDays.includes(day) 
                      ? 'bg-mira-orange text-white rounded-full' 
                      : 'bg-gray-200 text-mira-black rounded-full'}`}
                onClick={() => day !== null && handleDayToggle(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">PRICE RANGE</h3>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-sm">
              <span>$0</span>
              <span className="text-mira-orange font-bold">${priceRange}</span>
              <span>$100+</span>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mb-6 flex space-x-4">
          <div 
            className={`px-4 py-2 rounded cursor-pointer ${isOutdoor ? 'bg-mira-beige' : 'bg-mira-beige bg-opacity-50'}`}
            onClick={() => setIsOutdoor(!isOutdoor)}
          >
            <div className="flex items-center">
              {isOutdoor && <Check size={16} className="mr-1 text-mira-orange" />}
              <span>OUTDOOR</span>
            </div>
          </div>
          
          <div 
            className={`px-4 py-2 rounded cursor-pointer ${isIndoor ? 'bg-mira-beige' : 'bg-mira-beige bg-opacity-50'}`}
            onClick={() => setIsIndoor(!isIndoor)}
          >
            <div className="flex items-center">
              {isIndoor && <Check size={16} className="mr-1 text-mira-orange" />}
              <span>INDOOR</span>
            </div>
          </div>
          
          <div 
            className={`px-4 py-2 rounded cursor-pointer ${isFamilyFriendly ? 'bg-mira-beige' : 'bg-mira-beige bg-opacity-50'}`}
            onClick={() => setIsFamilyFriendly(!isFamilyFriendly)}
          >
            <div className="flex items-center">
              {isFamilyFriendly && <Check size={16} className="mr-1 text-mira-orange" />}
              <span>FAMILY FRIENDLY</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleApplyFilters}
            className="flex-1 bg-mira-black text-white py-2 px-4 rounded font-bold"
          >
            APPLY
          </button>
          <button
            onClick={handleClearFilters}
            className="flex-1 bg-white border border-mira-black text-mira-black py-2 px-4 rounded font-bold"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}
