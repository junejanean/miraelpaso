"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterTagsProps {
  inline?: boolean;
}

export default function FilterTags({ inline = false }: FilterTagsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<{id: string, label: string, param: string, value: string}[]>([]);
  
  // Format the month name
  const formatMonth = (month: number) => {
    const monthNames = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    return monthNames[month];
  };

  useEffect(() => {
    const newTags: {id: string, label: string, param: string, value: string}[] = [];
    
    // Category filter
    if (searchParams.has("category")) {
      const category = searchParams.get("category") || "";
      if (category) {
        newTags.push({
          id: "category",
          label: category,
          param: "category",
          value: category
        });
      }
    }
    
    // Date filter
    if (searchParams.has("month") && searchParams.has("days")) {
      const month = parseInt(searchParams.get("month") || "0");
      const days = (searchParams.get("days") || "").split(",").map(Number);
      if (days.length > 0) {
        newTags.push({
          id: "date",
          label: `${formatMonth(month)} ${days.join(", ")}`,
          param: "days",
          value: ""
        });
      }
    }
    
    // Indoor filter
    if (searchParams.has("indoor") && searchParams.get("indoor") === "true") {
      newTags.push({
        id: "indoor",
        label: "INDOOR",
        param: "indoor",
        value: "true"
      });
    }
    
    // Outdoor filter
    if (searchParams.has("outdoor") && searchParams.get("outdoor") === "true") {
      newTags.push({
        id: "outdoor",
        label: "OUTDOOR",
        param: "outdoor",
        value: "true"
      });
    }
    
    // Family friendly filter
    if (searchParams.has("familyFriendly") && searchParams.get("familyFriendly") === "true") {
      newTags.push({
        id: "familyFriendly",
        label: "FAMILY FRIENDLY",
        param: "familyFriendly",
        value: "true"
      });
    }
    
    // Price range filter
    if (searchParams.has("priceRange") && searchParams.get("priceRange") !== "30") {
      const price = searchParams.get("priceRange") || "30";
      newTags.push({
        id: "priceRange",
        label: `$${price}`,
        param: "priceRange",
        value: price
      });
    }
    
    setTags(newTags);
  }, [searchParams]);
  
  if (tags.length === 0) return null;
  
  return (
    <div className={`flex flex-wrap gap-2 ${inline ? 'ml-2 items-center' : 'mb-4'}`}>
      {tags.map(tag => (
        <div 
          key={tag.id}
          className="bg-mira-orange-lightest text-black px-3 py-1 rounded-full text-sm font-source-code flex items-center"
        >
          {tag.label}
          <button 
            onClick={(e) => {
              e.preventDefault();
              const newParams = new URLSearchParams(
                Array.from(searchParams.entries())
                  .filter(([key]) => key !== tag.param)
              );
              router.push(`?${newParams.toString()}`, { scroll: false });
            }}
            className="ml-2 hover:text-mira-orange border-none bg-transparent cursor-pointer p-0"
            aria-label={`Remove ${tag.label} filter`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      
      {tags.length > 0 && (
        <div className="flex items-center">
          <button 
            onClick={(e) => {
              e.preventDefault();
              router.push('?', { scroll: false });
            }}
            className="text-mira-black hover:text-mira-orange text-xs font-source-code underline ml-1 border-none bg-transparent cursor-pointer p-0"
            aria-label="Clear all filters"
          >
            CLEAR ALL
          </button>
        </div>
      )}
    </div>
  );
}
