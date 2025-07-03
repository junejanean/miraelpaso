"use client";

import { SlidersHorizontal } from "lucide-react";

type FilterToggleProps = {
  onClick: () => void;
  filtersActive: boolean;
};

export default function FilterToggle({ onClick, filtersActive }: FilterToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
        filtersActive 
          ? "bg-mira-black text-white" 
          : "bg-mira-beige text-mira-black"
      }`}
    >
      <SlidersHorizontal size={16} />
      <span className="font-medium">Filters</span>
      {filtersActive && (
        <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white bg-black rounded-full">
          !
        </span>
      )}
    </button>
  );
}
