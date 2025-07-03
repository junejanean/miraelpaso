"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

interface PopoverProps {
  title: string;
  children: ReactNode;
  backgroundColor?: string;
  onClose?: () => void;
  backLink?: string;
}

export default function Popover({
  title,
  children,
  backgroundColor = "bg-mira-beige",
  onClose,
  backLink = "/"
}: PopoverProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push(backLink);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-start justify-center overflow-y-auto bg-mira-beige">
      <div className="w-full min-h-screen">
        <Navbar />
        <div className={`w-full ${backgroundColor} rounded-t-3xl flex-1 min-h-[calc(100vh-64px)]`}>
          <div className="flex justify-between items-center p-4">
            <h1 className="font-source-code text-xl font-black uppercase tracking-tight border-b-2 border-black pb-1">{title}</h1>
            <button onClick={handleClose} className="p-1 hover:text-gray-700">
              <X size={24} className="text-black" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
